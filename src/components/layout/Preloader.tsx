"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes preloader-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .preloader-logo {
          animation: preloader-pulse 1.8s ease-in-out infinite;
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
          visibility: visible ? "visible" : "hidden",
          transition: "opacity 0.6s ease, visibility 0.6s ease",
          pointerEvents: visible ? "all" : "none",
        }}
      >
        {/* Pulsing logo */}
        <div className="preloader-logo">
          <Image
            src="/logo.jpg"
            alt="Archit Associates"
            width={120}
            height={120}
            priority
            style={{ borderRadius: "8px" }}
          />
        </div>

        {/* Brand name */}
        <p
          style={{
            position: "absolute",
            bottom: "48px",
            left: 0,
            right: 0,
            textAlign: "center",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            margin: 0,
          }}
        >
          ARCHIT ASSOCIATES
        </p>
      </div>
    </>
  );
}
