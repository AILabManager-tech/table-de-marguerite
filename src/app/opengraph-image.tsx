import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "La Table de Marguerite — Bistro gastronomique";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #4A5A3C 0%, #3C4A30 50%, #2E3A24 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 700, color: "#FBF7F0", letterSpacing: "-2px" }}>
            La Table de Marguerite
          </div>
          <div style={{ fontSize: 28, color: "#D4854A", fontWeight: 400 }}>
            Bistro gastronomique
          </div>
          <div
            style={{
              marginTop: "24px",
              width: "80px",
              height: "4px",
              background: "linear-gradient(90deg, #D4854A, #6B3A5E)",
              borderRadius: "2px",
            }}
          />
          <div style={{ fontSize: 20, color: "#FBF7F0", marginTop: "8px", opacity: 0.8 }}>
            Vieux-Québec — Depuis 1987
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
