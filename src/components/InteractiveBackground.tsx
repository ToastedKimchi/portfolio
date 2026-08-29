"use client";

import React, { useEffect, useState } from "react";

interface CursorGridProps {
  gridSize?: number; // Size of each grid square in px
  gridColor?: string; // Color of grid lines
  revealRadius?: number; // Radius around the cursor to reveal the grid
}

export default function CursorGridReveal({
  gridSize = 40,
  gridColor = "rgba(0,0,0,0.5)", // Bright sky blue (or white / gray)
  revealRadius = 180,
}: CursorGridProps) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-50">
      {/* 1. Base Hidden Grid Layer with Radial Mask applied */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          // Generate background grid using CSS repeating linear gradients
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,

          // CSS Mask revealing grid ONLY around mouse position
          WebkitMaskImage: `radial-gradient(
            circle ${revealRadius}px at ${mousePos.x}px ${mousePos.y}px,
            black 0%,
            transparent 80%
          )`,
          maskImage: `radial-gradient(
            circle ${revealRadius}px at ${mousePos.x}px ${mousePos.y}px,
            black 0%,
            transparent 80%
          )`,
        }}
      />
    </div>
  );
}