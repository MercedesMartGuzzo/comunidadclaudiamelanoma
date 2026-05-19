'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ArrowRight, Clover, Flower, Flower2, Leaf, LeafyGreen, Rose, Sprout, Wheat } from 'lucide-react';

/* ==========================================================================
   SECCIONES — reemplazá los src con tus imágenes reales
   ========================================================================== */
const sections = [
  {
    id: 'welcome',
    label: 'Bienvenida',
    title: 'Bienvenidos a Red Melanoma Latinoamérica',
    description:
      'Un espacio digital diseñado para brindar apoyo, información y conexión a toda la comunidad.',
    // Usamos unsplash como placeholder — reemplazá por tus imágenes
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80',
    tag: 'Inicio',
  },
  {
    id: 'community',
    label: 'Comunidad',
    title: 'Una comunidad que te acompaña',
    description:
      'Historias reales, escucha activa y contención mutua. Un espacio construido desde la empatía para quienes más lo necesitan.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80',
    tag: 'Comunidad',
  },
  {
    id: 'groups',
    label: 'Grupos',
    title: 'Grupos temáticos de bienestar',
    description:
      'Espacios de nutrición, dermatología, actividad física y más. Conectate con personas que comparten tu camino.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=900&q=80',
    tag: 'Grupos',
  },
  {
    id: 'resources',
    label: 'Recursos',
    title: 'Información clínica confiable',
    description:
      'Recursos validados para comprender diagnósticos, tratamientos y cuidados. La información correcta en el momento justo.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80',
    tag: 'Recursos',
  },
  {
    id: 'about',
    label: 'Nosotros',
    title: 'La historia detrás de la red',
    description:
      'Una red creada para transformar la experiencia del melanoma en compañía. Conocé quiénes somos y por qué lo hacemos.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&q=80',
    tag: 'Sobre nosotros',
  },
];

/* ==========================================================================
   PANEL DERECHO — cada sección es una imagen con fade al entrar en viewport
   ========================================================================== */


function RightPanel() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {sections.map((section) => (
        <SectionSlide key={section.id} section={section} />
      ))}
    </div>
  );
}

function SectionSlide({ section }: { section: (typeof sections)[0] }) {
  const ref = useRef<HTMLDivElement>(null);

  // La animación comienza cuando la imagen entra al viewport
  // y desaparece rápidamente apenas el top llega al top del viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0'],
  });

  // Aparece rápido, permanece visible y se desvanece
  // de forma abrupta al llegar al top del viewport.
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.75, 0.9, 1],
    [0, 1, 1, 0.15, 0]
  );

  // Entrada suave desde abajo
  const y = useTransform(scrollYProgress, [0, 0.08], [24, 0]);

  // Leve zoom-out al desaparecer
  const scale = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1.03, 1, 0.97]
  );

  return (
    <motion.div
      ref={ref}
      className="relative h-[72vh] md:h-[65vh] lg:h-[72vh] w-full rounded-2xl overflow-hidden mb-6 last:mb-0"
      style={{ opacity, y, scale }}
    >
      {/* Imagen de fondo */}
      <img
        src={section.image}
        alt={section.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay MUCHO más sutil para no opacar la imagen */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#001a1d]/55 via-[#001a1d]/10 to-transparent" />

      {/* Texto encima */}
      <div className="absolute bottom-0 left-0 right-0 p-8">

        <span className="inline-block font-inconsolata text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#aaeaf5] bg-[#003C43]/80 border border-[#aaeaf5]/20 px-3 py-1 rounded-full mb-4">
          {section.tag}
        </span>

        <h3 className="font-inconsolata text-2xl font-bold text-white leading-snug mb-3">
          {section.title}
        </h3>

        <p className="text-sm text-white/80 leading-relaxed max-w-sm font-noto-sans">
          {section.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ==========================================================================
   HERO SECTION — COMPONENTE PRINCIPAL
   ========================================================================== */
export default function HeroSection() {
  const router = useRouter();

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // ── GSAP refs — botones intactos ──────────────────────────────────────────
  const primaryOverlayRef = useRef<HTMLSpanElement>(null);
  const primaryTextRef = useRef<HTMLSpanElement>(null);
  const primaryIconRef = useRef<HTMLSpanElement>(null);
  const secondaryOverlayRef = useRef<HTMLSpanElement>(null);
  const secondaryTextRef = useRef<HTMLSpanElement>(null);

  const handlePrimaryEnter = () => {
    gsap.to(primaryOverlayRef.current, { x: 0, duration: 0.4, ease: 'power2.out' });
    gsap.to(primaryTextRef.current, { color: '#E3FEF7', duration: 0.4 });
    gsap.to(primaryIconRef.current, { x: 25, color: '#E3FEF7', duration: 0.4 });
  };
  const handlePrimaryLeave = () => {
    gsap.to(primaryOverlayRef.current, { x: '-100%', duration: 0.4, ease: 'power2.out' });
    gsap.to(primaryTextRef.current, { color: '#003C43', duration: 0.4 });
    gsap.to(primaryIconRef.current, { x: 0, color: '#003C43', duration: 0.4 });
  };
  const handleSecondaryEnter = () => {
    gsap.to(secondaryOverlayRef.current, { x: 0, duration: 0.4, ease: 'power2.out' });
    gsap.to(secondaryTextRef.current, { x: 4, color: '#ffffff', duration: 0.4 });
  };
  const handleSecondaryLeave = () => {
    gsap.to(secondaryOverlayRef.current, { x: '-100%', duration: 0.4, ease: 'power2.out' });
    gsap.to(secondaryTextRef.current, { x: 0, color: '#003C43', duration: 0.4 });
  };
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section className="bg-gradient-to-br from-[#00252a] to-[#003C43] text-white relative selection:bg-[#E3FEF7]/20">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 flex flex-col lg:flex-row gap-4 lg:gap-16">

        {/* ── COLUMNA IZQUIERDA — sticky ── */}
        <div className="lg:w-[44%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-20 lg:py-28 shrink-0">

          {/* Indicador de secciones */}
          <motion.div
            className="flex gap-2 mb-8"
            style={{ opacity }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {sections.map((s) => (
              <span
                key={s.id}
                className="font-inconsolata text-[0.6rem] font-bold uppercase tracking-widest text-[#E3FEF7]/40"
              >
                {s.label}
                {s.id !== sections[sections.length - 1].id && (
                  <span className="ml-2 text-[#E3FEF7]/20">·</span>
                )}
              </span>
            ))}
          </motion.div>

          {/* Título principal */}
          <motion.h1
            className="font-inconsolata text-4xl sm:text-5xl font-bold leading-tight text-start tracking-tight text-pretty mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            Red Melanoma<br />
            <span className="text-[#aaeaf5]">Latinoamérica</span>
          </motion.h1>

          {/* Descripción */}
          <motion.p
            className="text-base sm:text-lg text-gray-300 max-w-md font-noto-sans leading-relaxed mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: 'easeOut' }}
          >
            Un espacio digital diseñado para brindar apoyo y conexión. Información clínica con calidez humana.
          </motion.p>

          {/* Botones GSAP — idénticos al original */}
          <motion.div
            className="flex flex-col sm:flex-row gap-5 font-inconsolata"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
          >
            {/* Primary */}
            <button
              onMouseEnter={handlePrimaryEnter}
              onMouseLeave={handlePrimaryLeave}
              onClick={() => router.push('/auth?tab=registro')}
              className="relative overflow-hidden bg-[#E3FEF7] border-2 border-[#E3FEF7] px-6 py-1 rounded-md text-[#003C43] font-bold text-[1.2rem] tracking-wider flex items-center justify-center gap-6 min-w-[10px] shadow-md md:gap-3"
            >
              <span ref={primaryOverlayRef} className="absolute inset-0 bg-[#003C43] translate-x-[-100%]" />
              <span ref={primaryTextRef} className="relative z-10">Unirme</span>
              <span ref={primaryIconRef} className="relative z-10 text-[#003C43] flex items-center">
                <ArrowRight className="w-5 h-5 pt-[1px] shrink-0" />
              </span>
            </button>

            {/* Secondary */}
            <button
              onMouseEnter={handleSecondaryEnter}
              onMouseLeave={handleSecondaryLeave}
              onClick={() => router.push('/about-claudia')}
              className="relative overflow-hidden bg-white border-2 border-white sm:px-2 sm:-py-1 py-1 px-3 rounded-md font-bold text-[1.2rem] tracking-wider flex items-center justify-center min-w-[180px] shadow-md"
            >
              <span ref={secondaryOverlayRef} className="absolute inset-0 bg-[#003C43] translate-x-[-100%]" />
              <span ref={secondaryTextRef} className="relative z-10 text-[#003C43]">Sobre Nosotros</span>
            </button>
          </motion.div>

          {/* Íconos decorativos */}
          <motion.div
            className="flex flex-row gap-3 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <Leaf className="w-4 h-4 text-white/30" />
            <Clover className="w-4 h-4 text-white/30" />
            <LeafyGreen className="w-4 h-4 text-white/30" />
            <Sprout className="w-4 h-4 text-white/30" />
            <Rose className="w-4 h-4 text-white/30" />
            <Flower2 className="w-4 h-4 text-white/30" />
            <Wheat className="w-4 h-4 text-white/30" />
            <Flower className="w-4 h-4 text-white/30" />
          </motion.div>
        </div>

        {/* ── COLUMNA DERECHA — scrolleable ── */}
        <div className="lg:w-[56%] pt-0 pb-20 lg:py-28">
          <RightPanel />
        </div>

      </div>
    </section>
  );
}