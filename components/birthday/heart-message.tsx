"use client";

import { useEffect, useRef, useState } from "react";

const lines = [
  "Dear RESHU,",
  "",
  "You are the most amazing person I know.",
  "Your smile lights up every room you walk into.",
  "Your laughter is the soundtrack of my happiest memories.",
  "",
  "Through every storm, you've been my shelter.",
  "Through every joy, you've been my celebration.",
  "You're not just my sister — you're my best friend,",
  "my confidant, and my forever person.",
  "",
  "On this special day, I want you to know",
  "how incredibly loved and cherished you are.",
  "",
  "Happy Birthday, beautiful soul. 🎂",
  "Here's to another year of making magic together.",
  "",
  "With all my love, always. 💕",
];

export function HeartMessage() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          lines.forEach((_, i) => {
            setTimeout(() => {
              setVisibleLines((prev) => [...prev, i]);
            }, i * 200);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-4 py-20 sm:px-6 lg:px-8" id="message">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, #fce4ec20 30%, #f3e5f530 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl bg-card/80 p-8 shadow-xl backdrop-blur-sm sm:p-12">
          <h2 className="mb-8 text-center font-display text-3xl text-foreground sm:text-4xl">
            From My Heart
          </h2>
          <div className="space-y-1">
            {lines.map((line, i) => (
              <p
                key={`line-${i}-${line.slice(0, 10)}`}
                className={`font-handwritten text-lg leading-relaxed text-foreground transition-all duration-700 sm:text-xl ${
                  visibleLines.includes(i)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                {line || "\u00A0"}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
