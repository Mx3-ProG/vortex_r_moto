import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

export const alt = "VORTEX R — Engineered without compromise";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logoPath = join(process.cwd(), "public", "logo.png");
  const logoBase64 = readFileSync(logoPath).toString("base64");
  const logoSrc = `data:image/png;base64,${logoBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          backgroundImage:
            "radial-gradient(circle at 50% 42%, rgba(225,6,0,0.16), rgba(5,5,5,0) 60%)",
        }}
      >
        <img src={logoSrc} width={840} height={560} style={{ objectFit: "contain" }} alt="" />
      </div>
    ),
    { ...size },
  );
}
