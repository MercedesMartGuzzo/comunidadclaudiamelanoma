'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroSection() {
  const { scrollY } = useScroll();

  // Parallax
  const titleY = useTransform(scrollY, [0, 500], [0, 120]);
  const textY = useTransform(scrollY, [0, 500], [0, 80]);
  const buttonsY = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Refs Primary
  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const primaryOverlayRef = useRef<HTMLSpanElement>(null);
  const primaryTextRef = useRef<HTMLSpanElement>(null);
  const primaryIconRef = useRef<SVGSVGElement>(null);

  // Refs Secondary
  const secondaryBtnRef = useRef<HTMLButtonElement>(null);
  const secondaryOverlayRef = useRef<HTMLSpanElement>(null);
  const secondaryTextRef = useRef<HTMLSpanElement>(null);

  // Primary hover
  const handlePrimaryEnter = () => {
    gsap.to(primaryOverlayRef.current, {
      x: 0,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(primaryTextRef.current, {
      x: 4,
      color: '#E3FEF7',
      duration: 0.4,
    });

    gsap.to(primaryIconRef.current, {
      x: 6,
      stroke: '#E3FEF7',
      duration: 0.4,
    });
  };

  const handlePrimaryLeave = () => {
    gsap.to(primaryOverlayRef.current, {
      x: '-100%',
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(primaryTextRef.current, {
      x: 0,
      color: '#003C43',
      duration: 0.4,
    });

    gsap.to(primaryIconRef.current, {
      x: 0,
      stroke: '#003C43',
      duration: 0.4,
    });
  };

  // Secondary hover
  const handleSecondaryEnter = () => {
    gsap.to(secondaryOverlayRef.current, {
      x: 0,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(secondaryTextRef.current, {
      x: 4,
      color: '#ffffff',
      duration: 0.4,
    });
  };

  const handleSecondaryLeave = () => {
    gsap.to(secondaryOverlayRef.current, {
      x: '-100%',
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(secondaryTextRef.current, {
      x: 0,
      color: '#003C43',
      duration: 0.4,
    });
  };

  return (
    <section className="bg-gradient-to-br from-[#00252a] to-[#003C43] text-white min-h-screen flex items-center justify-center sm:pt-28 pt-22 pb-4 overflow-hidden">
      <div className="w-full flex justify-center px-8 sm:px-10 md:px-6">
        <div className="max-w-[1000px] w-full flex flex-col items-center text-center gap-14 md:gap-10">

          {/* Title */}
          <motion.h1
            className="font-inconsolata text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-center"
            style={{ letterSpacing: '-0.02em', y: titleY, opacity }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            Bienvenidos a la Comunidad
            <br />
            Claudia Melanoma
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-200 max-w-2xl mx-auto font-noto-sans leading-relaxed text-center"
            style={{ y: textY, opacity }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          >
            Un espacio digital diseñado para brindar apoyo y conexión. Aquí la información clínica se encuentra con la calidez humana para ofrecerte un refugio de conocimiento y apoyo mutuo.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full pt-8"
            style={{ y: buttonsY, opacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
          >

            {/* Primary Button */}
            <button
              ref={primaryBtnRef}
              onMouseEnter={handlePrimaryEnter}
              onMouseLeave={handlePrimaryLeave}
              className="relative overflow-hidden bg-[#E3FEF7] border-2 border-[#E3FEF7] px-8 py-3 rounded-md font-medium font-noto-sans flex items-center justify-center gap-3 min-w-[180px] shadow-md"
            >
              <span
                ref={primaryOverlayRef}
                className="absolute inset-0 bg-[#003C43] translate-x-[-100%]"
              />

              <span
                ref={primaryTextRef}
                className="relative z-10 text-[#003C43]"
              >
                Unirme
              </span>

              <svg
                ref={primaryIconRef}
                className="relative z-10 w-4 h-4 text-[#003C43]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Secondary Button */}
            <button
              ref={secondaryBtnRef}
              onMouseEnter={handleSecondaryEnter}
              onMouseLeave={handleSecondaryLeave}
              className="relative overflow-hidden bg-white border-2 border-white px-8 py-3 rounded-md font-medium font-noto-sans flex items-center justify-center min-w-[220px] shadow-md"
            >
              <span
                ref={secondaryOverlayRef}
                className="absolute inset-0 bg-[#003C43] translate-x-[-100%]"
              />

              <span
                ref={secondaryTextRef}
                className="relative z-10 text-[#003C43]"
              >
                Sobre Claudia
              </span>
            </button>

          </motion.div>

        </div>
      </div>
    </section>
  );
}