import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Ryan Editraj. I build companies. AI first.";
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
        <div style={{ fontSize: 22, letterSpacing: 3 }}>RYAN EDITRAJ, 16, TAMIL NADU</div>
        <div style={{ fontSize: 68, lineHeight: 0.92, maxWidth: 1000 }}>I build companies.</div>
        <div style={{ fontSize: 26 }}>AI first. Then I explain it to 300K+ people.</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Fraunces", data: font, weight: 600, style: "normal" }] },
  );
}
