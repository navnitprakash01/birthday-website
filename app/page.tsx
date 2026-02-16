"use client";

import { useState, useEffect } from "react";
import { FloatingBalloons } from "@/components/birthday/floating-balloons";
import { Confetti } from "@/components/birthday/confetti";
import { HeroSection } from "@/components/birthday/hero-section";
import { PhotoMemories } from "@/components/birthday/photo-memories";
import { HeartMessage } from "@/components/birthday/heart-message";
import { SurpriseSection } from "@/components/birthday/surprise-section";
import { BirthdayFooter } from "@/components/birthday/footer";

export default function BirthdayPage() {
  const [loadConfetti, setLoadConfetti] = useState(false);

  useEffect(() => {
    setLoadConfetti(true);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <FloatingBalloons />
      <Confetti active={loadConfetti} />

      <HeroSection />
      <PhotoMemories />
      <HeartMessage />
      <SurpriseSection />
      <BirthdayFooter />
    </main>
  );
}

