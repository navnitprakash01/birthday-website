"use client";

import { useEffect, useState } from "react";

const BALLOON_COLORS = [
  "#f2c4ce", // soft pink
  "#e8d5f5", // lavender
  "#fce4d6", // peach
  "#d4e8f7", // baby blue
  "#fef3c7", // cream yellow
];

interface Balloon {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  sway: number;
}

export function FloatingBalloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const generated: Balloon[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 10,
      size: 30 + Math.random() * 25,
      color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      sway: 20 + Math.random() * 30,
    }));
    setBalloons(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute"
          style={{
            left: `${b.left}%`,
            bottom: "-80px",
            animation: `floatUp ${b.duration}s ease-in-out ${b.delay}s infinite`,
          }}
        >
          <svg
            width={b.size}
            height={b.size * 1.3}
            viewBox="0 0 40 52"
            fill="none"
          >
            <ellipse cx="20" cy="18" rx="17" ry="18" fill={b.color} opacity="0.6" />
            <path d="M20 36 L20 52" stroke={b.color} strokeWidth="1" opacity="0.4" />
            <ellipse cx="15" cy="12" rx="4" ry="5" fill="white" opacity="0.25" />
          </svg>
        </div>
      ))}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          50% {
            transform: translateY(-50vh) translateX(20px);
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-110vh) translateX(-15px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
