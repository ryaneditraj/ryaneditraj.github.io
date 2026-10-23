import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Ryan Editraj. I build security and AI products, and I explain tech so anyone can use it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const font = fs.readFileSync(
    path.join(process.cwd(), "node_modules/@fontsource/fraunces/files/fraunces-latin-600-normal.woff"),
  );
  return new ImageResponse(
    (
      <div
        style={{
          background: "#efeae0",
          color: "#17241c",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "Fraunces",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 3 }}>RYAN EDITRAJ, INDIA, AGE 16</div>
        <div style={{ fontSize: 58, lineHeight: 0.95, maxWidth: 1000 }}>I build security and AI products, and I explain tech so anyone can use it.</div>
        <div style={{ fontSize: 26 }}>The bridge from non-tech to tech.</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Fraunces", data: font, weight: 600, style: "normal" }] },
  );
}
