import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: school and college management for Bangladesh`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0f766e, #134e4a)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 40, opacity: 0.85 }}>{site.name}</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
          School &amp; college management, made simple.
        </div>
        <div style={{ fontSize: 34, marginTop: 32, opacity: 0.85 }}>Admissions · Attendance · Fees · Results</div>
      </div>
    ),
    size,
  );
}
