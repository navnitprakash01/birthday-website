"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Confetti } from "./confetti";
import { Gift, Volume2, VolumeX } from "lucide-react";

export function SurpriseSection() {
  const [revealed, setRevealed] = useState(false);
  const [burstConfetti, setBurstConfetti] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSurprise = useCallback(() => {
    setRevealed(true);
    setBurstConfetti(true);
    setTimeout(() => setBurstConfetti(false), 5000);
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"
      );
      audioRef.current.loop = true;
    }
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicPlaying(!musicPlaying);
  }, [musicPlaying]);

  return (
    <section ref={sectionRef} className="relative px-4 py-20 sm:px-6 lg:px-8" id="surprise">
      <Confetti active={burstConfetti} burst />

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, #e8d5f520 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-xl text-center">
        <div
          className={`transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-8 font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
            One More Thing...
          </h2>

          {!revealed ? (
            <button
              onClick={handleSurprise}
              className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-sans text-lg font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 sm:px-10 sm:py-5 sm:text-xl"
              style={{
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
              aria-label="Open your birthday surprise"
            >
              <Gift className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span>{"Open Your Surprise 🎁"}</span>
            </button>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="rounded-3xl bg-card p-8 shadow-xl sm:p-12">
                <div className="mb-6 text-5xl sm:text-6xl" role="img" aria-label="cake">
                  🎂
                </div>
                <h3 className="mb-4 font-display text-2xl text-foreground sm:text-3xl">
                  {"Happy Birthday!"}
                </h3>
                <p className="mb-4 font-handwritten text-xl leading-relaxed text-foreground sm:text-2xl">
                  You deserve the entire universe and more.
                  May this year bring you endless joy, boundless love,
                  and all the dreams your beautiful heart can hold.
                </p>
                <p className="font-handwritten text-xl text-primary sm:text-2xl">
                  {"I love you more than words can say! 🥰✨"}
                </p>

                <button
                  onClick={toggleMusic}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
                  aria-label={musicPlaying ? "Pause music" : "Play birthday music"}
                >
                  {musicPlaying ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                  <span>{musicPlaying ? "Pause Music" : "Play Birthday Music"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(242, 196, 206, 0.3), 0 4px 15px rgba(0,0,0,0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(242, 196, 206, 0.6), 0 4px 20px rgba(0,0,0,0.15);
            transform: scale(1.02);
          }
        }
      `}</style>
    </section>
  );
}
