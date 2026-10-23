import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";

const shotDir = "/opt/cursor/artifacts/visual";

test.beforeAll(() => {
  fs.mkdirSync(shotDir, { recursive: true });
});

test("home states who Ryan is and how to collaborate", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "I build security and AI products, and I explain tech so anyone can use it." })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Who is Ryan Editraj?" })).toBeVisible();
  await expect(page.getByRole("link", { name: "See what he builds" })).toBeVisible();
  await expect(page.getByRole("link", { name: "@ryaneditraj" }).first()).toBeVisible();
});

test("unknown routes and the old gallery", async ({ page }) => {
  const missing = await page.goto("/not-a-real-page");
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("not on the internet");

  await page.goto("/gallery.html");
  await expect(page).toHaveURL("http://127.0.0.1:3000/");
});

test("collaborate form reports validation and does not pretend to send", async ({ page }) => {
  await page.goto("/collaborate");
  await page.getByRole("button", { name: "Send the inquiry" }).click();
  await expect(page.getByText("Enter your name")).toBeVisible();

  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Organisation").fill("Independent");
  await page.getByLabel("Contact").fill("ada@example.com");
  await page.getByLabel("Objective").fill("Explain a research tool to a non-technical board.");
  await page.getByLabel("Deliverables").fill("A short brief and a ten minute explanation.");
  await page.getByLabel("Budget range").selectOption("Not sure yet");
  await page.getByLabel("Timeline").selectOption("No fixed date");
  await page.getByRole("checkbox", { name: /Ryan may store/ }).check();
  await page.getByRole("button", { name: "Send the inquiry" }).click();
  await expect(page.getByText("nothing was sent", { exact: false })).toBeVisible();
});

test("dispatches stay disabled and admin is locked", async ({ page }) => {
  await page.goto("/dispatches");
  await expect(page.getByRole("button", { name: "Signup unavailable" })).toBeDisabled();

  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
  await expect(page.getByText("not configured")).toBeVisible();
});

test("booking control does not confirm a session", async ({ page }) => {
  await page.goto("/mentorship/book");
  await expect(page.getByRole("button", { name: "Booking is not open" })).toBeDisabled();
  await expect(page.getByText("Asia/Kolkata · IST, UTC+5:30")).toBeVisible();
});

test("robots policy and sitemap omit admin", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  const text = await robots.text();
  expect(text).toContain("User-Agent: GPTBot");
  expect(text).toContain("User-Agent: Googlebot");
  expect(text).toContain("Sitemap:");
  const sitemap = await request.get("/sitemap.xml");
  const xml = await sitemap.text();
  expect(xml).not.toContain("/admin");
  expect(xml).toContain("/work/indiquant");
  expect(xml).not.toContain("/portal");
});

test("axe on representative pages", async ({ page }) => {
  test.setTimeout(120_000);
  for (const path of ["/", "/about", "/build", "/learn", "/learn/start", "/contact", "/work", "/collaborate", "/directory", "/media-kit"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, `${path} ${JSON.stringify(results.violations, null, 2)}`).toEqual([]);
  }
});

test("visual screenshots", async ({ page }) => {
  test.setTimeout(180_000);
  const representative = ["/", "/build", "/learn", "/learn/start", "/contact", "/about", "/links", "/work"];
  for (const width of [360, 390, 768, 1280, 1600]) {
    await page.setViewportSize({ width, height: width < 800 ? 844 : 1000 });
    await page.goto("/");
    if (width < 768) {
      await expect(page.locator(".nav-inline")).toBeHidden();
      await expect(page.locator(".nav-fold")).toBeVisible();
    } else {
      await expect(page.locator(".nav-inline")).toBeVisible();
      await expect(page.locator(".nav-fold")).toBeHidden();
    }
    for (const path of representative) {
      await page.goto(path);
      const name = path === "/" ? "home" : path.slice(1).replaceAll("/", "-");
await page.screenshot({ path: `${shotDir}/${name}-${width}.png`, fullPage: true });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${path} @ ${width}`).toBeLessThanOrEqual(1);
      }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("dialog", { name: "Site menu" })).toBeVisible();
  await page.screenshot({ path: `${shotDir}/menu-390.png` });
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Site menu" })).toBeHidden();

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/collaborate");
  await page.screenshot({ path: `${shotDir}/collaborate-reduced-motion-390.png`, fullPage: true });
});
