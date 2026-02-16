"use client";

import { useEffect, useRef, useCallback } from "react";

interface ConfettiPiece {
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
  gravity: number;
  opacity: number;
  shape: "rect" | "circle";
}

const COLORS = [
  "#f2c4ce",
  "#e8d5f5",
  "#fce4d6",
  "#d4e8f7",
  "#fef3c7",
  "#f9a8d4",
  "#c4b5fd",
  "#fbbf24",
];

export function Confetti({
  active,
  burst = false,
}: {
  active: boolean;
  burst?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const piecesRef = useRef<ConfettiPiece[]>([]);
  const animFrameRef = useRef<number>(0);

  const createPiece = useCallback(
    (centerX?: number, centerY?: number): ConfettiPiece => {
      const x = centerX ?? Math.random() * (canvasRef.current?.width ?? window.innerWidth);
      const y = centerY ?? -20;
      return {
        x,
        y,
        size: 4 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        speedX: burst ? (Math.random() - 0.5) * 12 : (Math.random() - 0.5) * 3,
        speedY: burst ? -(Math.random() * 10 + 5) : Math.random() * 2 + 1,
        gravity: 0.12,
        opacity: 1,
        shape: Math.random() > 0.5 ? "rect" : "circle",
      };
    },
    [burst]
  );

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    if (burst) {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      for (let i = 0; i < 150; i++) {
        piecesRef.current.push(createPiece(cx, cy));
      }
    } else {
      for (let i = 0; i < 60; i++) {
        piecesRef.current.push(createPiece());
      }
    }

    let frameCount = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      if (!burst && frameCount % 3 === 0 && piecesRef.current.length < 100) {
        piecesRef.current.push(createPiece());
      }

      piecesRef.current = piecesRef.current.filter((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= burst ? 0.005 : 0.002;

        if (p.opacity <= 0 || p.y > canvas.height + 20) return false;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
        return true;
      });

      if (piecesRef.current.length > 0 || !burst) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const timeout = burst
      ? setTimeout(() => cancelAnimationFrame(animFrameRef.current), 5000)
      : setTimeout(() => cancelAnimationFrame(animFrameRef.current), 8000);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
      piecesRef.current = [];
    };
  }, [active, burst, createPiece]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  );
}
