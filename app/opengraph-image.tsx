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
          background: "linear-gradient(135deg, #1b3f73, #122c52)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 44, fontWeight: 700 }}>
          <svg width="72" height="72" viewBox="0 0 48 48">
            <rect x="1" y="1" width="46" height="46" rx="13" fill="#2b7a8c" />
            <path d="M9 20c5.5-2.4 11-1.6 15 1.4V37c-4-2.8-9.5-3.6-15-1.2z" fill="#fff" />
            <path d="M39 20c-5.5-2.4-11-1.6-15 1.4V37c4-2.8 9.5-3.6 15-1.2z" fill="#fff" fillOpacity="0.88" />
            <path d="M29.2 28.2l2.6 2.6 4.6-5.2" fill="none" stroke="#1b3f73" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="24" cy="12.2" r="3.2" fill="#f5b82e" />
          </svg>
          {site.name}
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
          School &amp; college management, made simple.
        </div>
        <div style={{ fontSize: 34, marginTop: 32, opacity: 0.85 }}>Admissions · Attendance · Fees · Results</div>
      </div>
    ),
    size,
  );
}
