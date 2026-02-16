"use client";

import { useEffect, useState } from "react";

const SUBTITLE = 'To my built-in best friend';

export function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(SUBTITLE.slice(0, i + 1));
        i++;
        if (i >= SUBTITLE.length) {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 1500);
        }
      }, 60);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* Gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 30%, #e8eaf6 60%, #fce4d6 100%)",
        }}
        aria-hidden="true"
      />

      {/* Animated title */}
      <div
        className={`text-center transition-all duration-1000 ease-out ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <h1
          className="font-display text-4xl leading-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ textShadow: "0 2px 20px rgba(242,196,206,0.4)" }}
        >
          <span className="text-balance">
            {"Happy Birthday, RESHU "}
          </span>
          <span className="inline-block animate-bounce" role="img" aria-label="celebration">
            🎉
          </span>
        </h1>
      </div>

      {/* Typing subtitle */}
      <div
        className={`mt-6 h-10 text-center transition-all delay-500 duration-1000 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <p className="font-handwritten text-2xl text-muted-foreground sm:text-3xl md:text-4xl">
          {typedText}
          {showCursor && (
            <span className="ml-0.5 inline-block animate-pulse text-primary">|</span>
          )}
          <span className="ml-1" role="img" aria-label="heart">
            {typedText.length === SUBTITLE.length ? " 💖" : ""}
          </span>
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 transition-all delay-[2000ms] duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground">Scroll down</span>
          <div className="h-8 w-5 rounded-full border-2 border-primary/40 p-1">
            <div className="mx-auto h-2 w-1 animate-bounce rounded-full bg-primary/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
