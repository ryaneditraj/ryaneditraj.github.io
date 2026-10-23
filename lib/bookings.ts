import fs from "node:fs";
import path from "node:path";
import type { Offering } from "@/lib/schemas";

export type BookingStatus = "hold" | "paid" | "cancelled";

export type Booking = {
  id: string;
  offeringSlug: string;
  start: string;
  end: string;
  status: BookingStatus;
  holdExpires: string;
  name: string;
  contact: string;
  timezone: "Asia/Kolkata";
  amountInr: number | null;
  provider: "razorpay" | "stripe" | null;
  providerRef: string | null;
};

export type Slot = {
  start: string;
  end: string;
  label: string;
};

const IST_OFFSET_MS = Math.round(5.5 * 60 * 60 * 1000);
const HOLD_MS = 15 * 60 * 1000;

export function kolkataToUtc(year: number, month: number, day: number, hour: number, minute: number): Date {
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - IST_OFFSET_MS);
}

export function formatInKolkata(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

export function overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return aStart < bEnd && bStart < aEnd;
}

export function isBlocking(booking: Booking, now: Date): boolean {
  if (booking.status === "paid") return true;
  if (booking.status === "cancelled") return false;
  return new Date(booking.holdExpires).getTime() > now.getTime();
}

function parseMinutes(value: string): number {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

/** Next `days` of slots in Asia/Kolkata. Sunday = 0. */
export function generateSlots(offering: Pick<Offering, "durationMin" | "windows">, now: Date, days = 14): Slot[] {
  const slots: Slot[] = [];
  const istNow = new Date(now.getTime() + IST_OFFSET_MS);
  for (let offset = 0; offset < days; offset += 1) {
    const day = new Date(Date.UTC(istNow.getUTCFullYear(), istNow.getUTCMonth(), istNow.getUTCDate() + offset));
    const dow = day.getUTCDay();
    for (const window of offering.windows) {
      if (window.dow !== dow) continue;
      const open = parseMinutes(window.start);
      const close = parseMinutes(window.end);
      for (let minute = open; minute + offering.durationMin <= close; minute += offering.durationMin) {
        const slotStart = kolkataToUtc(day.getUTCFullYear(), day.getUTCMonth() + 1, day.getUTCDate(), Math.floor(minute / 60), minute % 60);
        const slotEnd = new Date(slotStart.getTime() + offering.durationMin * 60 * 1000);
        if (slotStart.getTime() <= now.getTime()) continue;
        slots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          label: `${formatInKolkata(slotStart)} – ${formatInKolkata(slotEnd)} IST`,
        });
      }
    }
  }
  return slots;
}

export function slotIsFree(bookings: Booking[], start: string, end: string, now: Date): boolean {
  return !bookings.some((booking) => isBlocking(booking, now) && overlaps(booking.start, booking.end, start, end));
}

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "bookings.json");
const lockPath = path.join(dataDir, "bookings.lock");

let queue: Promise<unknown> = Promise.resolve();

function withQueue<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function withFileLock<T>(fn: () => Promise<T>): Promise<T> {
  fs.mkdirSync(dataDir, { recursive: true });
  const started = Date.now();
  for (;;) {
    try {
      const handle = await fs.promises.open(lockPath, "wx");
      try {
        return await fn();
      } finally {
        await handle.close();
        await fs.promises.unlink(lockPath).catch(() => undefined);
      }
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code !== "EEXIST") throw error;
      if (Date.now() - started > 4000) {
        await fs.promises.unlink(lockPath).catch(() => undefined);
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
}

export function readBookings(): Booking[] {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf8");
  if (!raw.trim()) return [];
  return JSON.parse(raw) as Booking[];
}

function writeBookings(bookings: Booking[]): void {
  fs.mkdirSync(dataDir, { recursive: true });
  const tmp = `${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(bookings, null, 2)}\n`);
  fs.renameSync(tmp, filePath);
}

export type HoldResult =
  | { ok: true; booking: Booking }
  | { ok: false; code: "conflict" | "unknown_slot" | "not_live" | "payments_not_configured" | "invalid" };

export async function createHold(input: {
  offering: Offering;
  start: string;
  name: string;
  contact: string;
  paymentsReady: boolean;
  now?: Date;
}): Promise<HoldResult> {
  const now = input.now ?? new Date();
  if (input.offering.status !== "published" || input.offering.scheduleStatus !== "confirmed") {
    return { ok: false, code: "not_live" };
  }
  if (!input.paymentsReady || input.offering.priceInr == null) {
    return { ok: false, code: "payments_not_configured" };
  }
  const slots = generateSlots(input.offering, now);
  const slot = slots.find((item) => item.start === input.start);
  if (!slot) return { ok: false, code: "unknown_slot" };

  return withQueue(() =>
    withFileLock(async () => {
      const bookings = readBookings();
      if (!slotIsFree(bookings, slot.start, slot.end, now)) return { ok: false, code: "conflict" } as HoldResult;
      const booking: Booking = {
        id: `bk_${now.getTime().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
        offeringSlug: input.offering.slug,
        start: slot.start,
        end: slot.end,
        status: "hold",
        holdExpires: new Date(now.getTime() + HOLD_MS).toISOString(),
        name: input.name,
        contact: input.contact,
        timezone: "Asia/Kolkata",
        amountInr: input.offering.priceInr,
        provider: null,
        providerRef: null,
      };
      bookings.push(booking);
      writeBookings(bookings);
      return { ok: true, booking };
    }),
  );
}

export async function attachProvider(bookingId: string, provider: "razorpay" | "stripe", providerRef: string): Promise<void> {
  await withQueue(() =>
    withFileLock(async () => {
      const bookings = readBookings();
      const booking = bookings.find((item) => item.id === bookingId);
      if (!booking || booking.status === "cancelled") return;
      booking.provider = provider;
      booking.providerRef = providerRef;
      writeBookings(bookings);
    }),
  );
}

export async function cancelHold(bookingId: string): Promise<void> {
  await withQueue(() =>
    withFileLock(async () => {
      const bookings = readBookings();
      const booking = bookings.find((item) => item.id === bookingId);
      if (!booking || booking.status === "paid") return;
      booking.status = "cancelled";
      writeBookings(bookings);
    }),
  );
}

export async function markPaid(bookingId: string, provider: "razorpay" | "stripe", providerRef: string, amountInr: number): Promise<boolean> {
  return withQueue(() =>
    withFileLock(async () => {
      const bookings = readBookings();
      const booking = bookings.find((item) => item.id === bookingId);
      if (!booking) return false;
      if (booking.amountInr == null || booking.amountInr !== amountInr) return false;
      if (booking.status === "paid") return booking.providerRef === providerRef;
      booking.status = "paid";
      booking.provider = provider;
      booking.providerRef = providerRef;
      writeBookings(bookings);
      return true;
    }),
  );
}
