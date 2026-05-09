'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();

  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 500], [0, 120]);
  const textY = useTransform(scrollY, [0, 500], [0, 80]);
  const buttonsY = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const primaryOverlayRef = useRef<HTMLSpanElement>(null);
  const primaryTextRef = useRef<HTMLSpanElement>(null);
  const primaryIconRef = useRef<HTMLSpanElement>(null);

  const secondaryBtnRef = useRef<HTMLButtonElement>(null);
  const secondaryOverlayRef = useRef<HTMLSpanElement>(null);
  const secondaryTextRef = useRef<HTMLSpanElement>(null);

  const handlePrimaryEnter = () => {
  gsap.to(primaryOverlayRef.current, {
    x: 0,
    duration: 0.4,
    ease: 'power2.out',
  });

  // El texto ya no se mueve, solo cambia de color
  gsap.to(primaryTextRef.current, {
    color: '#E3FEF7',
    duration: 0.4,
  });

  // Solo el ícono se desplaza hacia la derecha
  gsap.to(primaryIconRef.current, {
    x: 25,
    color: '#E3FEF7',
    duration: 0.4,
  });
};

const handlePrimaryLeave = () => {
  gsap.to(primaryOverlayRef.current, {
    x: '-100%',
    duration: 0.4,
    ease: 'power2.out',
  });

  // El texto vuelve solo al color original
  gsap.to(primaryTextRef.current, {
    color: '#003C43',
    duration: 0.4,
  });

  // El ícono vuelve a su posición original
  gsap.to(primaryIconRef.current, {
    x: 0,
    color: '#003C43',
    duration: 0.4,
  });
};

  const handleSecondaryEnter = () => {
    gsap.to(secondaryOverlayRef.current, { x: 0, duration: 0.4, ease: 'power2.out' });
    gsap.to(secondaryTextRef.current, { x: 4, color: '#ffffff', duration: 0.4 });
  };

  const handleSecondaryLeave = () => {
    gsap.to(secondaryOverlayRef.current, { x: '-100%', duration: 0.4, ease: 'power2.out' });
    gsap.to(secondaryTextRef.current, { x: 0, color: '#003C43', duration: 0.4 });
  };

  return (
    <section className="bg-gradient-to-br from-[#00252a] to-[#003C43] text-white min-h-screen flex items-center justify-center sm:pt-28 pt-22 pb-4 overflow-hidden">
      <div className="w-full flex justify-center px-8 sm:px-10 md:px-6">
        <div className="max-w-[1000px] w-full flex flex-col items-center text-center gap-14 md:gap-10">

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

          <motion.p
            className="text-lg text-gray-200 max-w-2xl mx-auto font-noto-sans leading-relaxed text-center"
            style={{ y: textY, opacity }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          >
            Un espacio digital diseñado para brindar apoyo y conexión. Aquí la información clínica se encuentra con la calidez humana para ofrecerte un refugio de conocimiento y apoyo mutuo.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full pt-0 pb-2 md:pt-8"
            style={{ y: buttonsY, opacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
          >

            {/* Primary */}
            <button
              ref={primaryBtnRef}
              onMouseEnter={handlePrimaryEnter}
              onMouseLeave={handlePrimaryLeave}
              onClick={() => router.push('/auth?tab=registro')}
              className="relative overflow-hidden bg-[#E3FEF7] border-2 border-[#E3FEF7] px-8 py-3 rounded-md font-medium font-noto-sans flex items-center gap-3 min-w-[180px] shadow-md"
            >
              <span ref={primaryOverlayRef} className="absolute inset-0 bg-[#003C43] translate-x-[-100%]" />
              <span ref={primaryTextRef} className="relative z-10 text-[#003C43] font-[1rem]">
                Unirme
              </span>
              <span ref={primaryIconRef} className="relative z-10 text-[#003C43] flex items-center">
                <ArrowRight className="w-5 h-5 pt-[1px] shrink-0"/>
              </span>
            </button>

            {/* Secondary */}
            <button
              ref={secondaryBtnRef}
              onMouseEnter={handleSecondaryEnter}
              onMouseLeave={handleSecondaryLeave}
              onClick={() => router.push('/about-claudia')}
              className="relative overflow-hidden bg-white border-2 border-white px-8 py-3 rounded-md font-medium font-noto-sans flex items-center justify-center min-w-[180px] shadow-md"
            >
              <span ref={secondaryOverlayRef} className="absolute inset-0 bg-[#003C43] translate-x-[-100%]" />
              <span ref={secondaryTextRef} className="relative z-10 text-[#003C43] font-[1rem]">
                Sobre Claudia
              </span>
            </button>

          </motion.div>
        </div>
      </div>
    </section>
  );
}