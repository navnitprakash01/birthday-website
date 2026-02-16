"use client";

import React from "react"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const photos = [
  { src: "/images/image.1.jpeg", caption: "Laughing together" },
  { src: "/images/image.2.jpeg", caption: "Birthday celebrations" },
  { src: "/images/image.3.jpeg", caption: "Sunset moments" },
  { src: "/images/image.4.jpeg", caption: "Cozy evenings" },
  { src: "/images/image.1.jpeg", caption: "Spring adventures" },
  { src: "/images/image.2.jpeg", caption: "Sweet treats" },
];

const rotations = [-3, 2, -2, 3, -1, 2];

function PhotoCard({
  photo,
  rotation,
  index,
}: {
  photo: (typeof photos)[0];
  rotation: number;
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className="group cursor-pointer rounded-2xl bg-card p-3 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-4"
        style={{
          transform: `rotate(${rotation}deg) perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
          <Image
            src={photo.src || "/placeholder.svg"}
            alt={photo.caption}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <p className="mt-3 text-center font-handwritten text-lg text-muted-foreground">
          {photo.caption}
        </p>
      </div>
    </div>
  );
}

export function PhotoMemories() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-4 py-20 sm:px-6 lg:px-8" id="memories">
      <div className="mx-auto max-w-6xl">
        <h2
          className={`mb-12 text-center font-display text-3xl text-foreground transition-all duration-700 sm:text-4xl md:text-5xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Our Memories Together
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {photos.map((photo, i) => (
            <PhotoCard key={photo.src} photo={photo} rotation={rotations[i]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
