import { ImageResponse } from "next/og";

export const alt = "Fabio Fruto Jimenez - Desarrollador de software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "linear-gradient(135deg, #0f172a 0%, #172554 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 28, color: "#42a5f5", letterSpacing: 4 }}>
          PORTAFOLIO
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 16 }}>
          Fabio Fruto Jimenez
        </div>
        <div style={{ fontSize: 40, marginTop: 24, color: "#cbd5e1" }}>
          Desarrollador full stack · React, Next.js y React Native
        </div>
      </div>
    ),
    size,
  );
}
