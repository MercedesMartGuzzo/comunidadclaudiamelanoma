'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // 1. Importación agregada
import { gsap } from 'gsap';
import { ArrowRight, Clover, Flower, Flower2, Leaf, LeafyGreen, Rose, Sprout, Wheat } from 'lucide-react';

/* ==========================================================================
   SECCIONES
   ========================================================================== */
const sections = [
  {
    id: 'welcome',
    label: 'Bienvenida',
    title: 'Bienvenidos a Red Melanoma Latinoamérica',
    description: 'Un espacio digital diseñado para brindar apoyo, información y conexión a toda la comunidad.',
    image: '/images/hero/bienvenida.png',
    tag: 'Inicio',
  },
  {
    id: 'community',
    label: 'Comunidad',
    title: 'Una comunidad que te acompaña',
    description: 'Historias reales, escucha activa y contención mutua. Un espacio construido desde la empatía para quienes más lo necesitan.',
    image: '/images/hero/comunidad-nueva.png',
    tag: 'Comunidad',
  },
  {
    id: 'groups',
    label: 'Grupos',
    title: 'Grupos temáticos de bienestar',
    description: 'Espacios de nutrición, dermatología, actividad física y más. Conectate con personas que comparten tu camino.',
    image: '/images/hero/ronda.png',
    tag: 'Grupos',
  },
  {
    id: 'resources',
    label: 'Recursos',
    title: 'Información clínica confiable',
    description: 'Recursos validados para comprender diagnósticos, tratamientos y cuidados. La información correcta en el momento justo.',
    image: '/images/hero/informacion.png',
    tag: 'Recursos',
  },
  {
    id: 'about',
    label: 'Nosotros',
    title: 'La historia detrás de la red',
    description: 'Una red creada para transformar la experiencia del melanoma en compañía. Conocé quiénes somos y por qué lo hacemos.',
    image: '/images/hero/clau-dibujo.png',
    tag: 'Sobre nosotros',
  },
];

/* ==========================================================================
   TARJETA COMPARTIDA — usada en mobile y tablet
   ========================================================================== */
function StaticCard({
  section,
  minHeight = 220,
}: {
  section: (typeof sections)[0];
  minHeight?: number;
}) {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ minHeight }}
    >
      {/* 2. Reemplazo de img nativa por el componente de Next.js */}
      <Image
        src={section.image}
        alt={section.title}
        fill
        sizes="(max-w: 640px) 100vw, (max-w: 1024px) 50vw, 33vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#001a1d]/75 via-[#001a1d]/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <span className="inline-block font-inconsolata text-[0.55rem] font-bold uppercase tracking-[0.2em] text-[#aaeaf5] bg-[#003C43]/80 border border-[#aaeaf5]/20 px-2.5 py-1 rounded-full mb-2 self-start">
          {section.tag}
        </span>
        <h3 className="font-inconsolata text-base font-bold text-white leading-snug mb-1">
          {section.title}
        </h3>
        <p className="text-xs text-white/75 leading-relaxed font-noto-sans">
          {section.description}
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   MOBILE (<md) — columna única, imágenes estáticas
   ========================================================================== */
function MobileSections() {
  return (
    <div className="flex flex-col gap-4 w-full mt-8">
      {sections.map((section) => (
        <StaticCard key={section.id} section={section} minHeight={280} />
      ))}
    </div>
  );
}

/* ==========================================================================
   TABLET (md → lg) — grid: primera ancha | medio 2 col | última ancha
   ========================================================================== */
function TabletGrid() {
  const [first, ...rest] = sections;
  const middle = rest.slice(0, rest.length - 1);
  const last = rest[rest.length - 1];

  return (
    <div className="flex flex-col gap-4 w-full mt-8">
      <StaticCard section={first} minHeight={360} />

      <div className="grid grid-cols-3 gap-4">
        {middle.map((section) => (
          <StaticCard key={section.id} section={section} minHeight={280} />
        ))}
      </div>

      <StaticCard section={last} minHeight={360} />
    </div>
  );
}

/* ==========================================================================
   DESKTOP (lg+) — panel derecho con fade scroll
   ========================================================================== */
function RightPanel() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {sections.map((section, index) => (
        <SectionSlide key={section.id} section={section} index={index} />
      ))}
    </div>
  );
}

function SectionSlide({ section }: { section: (typeof sections)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.75, 0.9, 1], [0, 1, 1, 0.15, 0]);
  const y = useTransform(scrollYProgress, [0, 0.08], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.75, 1], [1.03, 1, 0.97]);

  return (
    <motion.div
      ref={ref}
      className="relative h-[72vh] w-full rounded-2xl overflow-hidden mb-6 last:mb-0 transform-gpu"
      style={{ opacity, y, scale }}
    >
      <Image
        src={section.image}
        alt={section.title}
        fill
        sizes="(max-w: 1300px) 56vw, 730px"

        unoptimized={true}
        className="object-cover z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#001a1d]/55 via-[#001a1d]/10 to-transparent z-10" />

      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
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

function LeftText({
  router,
  handlePrimaryEnter,
  handlePrimaryLeave,
  handleSecondaryEnter,
  handleSecondaryLeave,
  primaryOverlayRef,
  primaryTextRef,
  primaryIconRef,
  secondaryOverlayRef,
  secondaryTextRef,
}: {
  router: ReturnType<typeof useRouter>;
  handlePrimaryEnter: () => void;
  handlePrimaryLeave: () => void;
  handleSecondaryEnter: () => void;
  handleSecondaryLeave: () => void;
  primaryOverlayRef: React.RefObject<HTMLSpanElement | null>;
  primaryTextRef: React.RefObject<HTMLSpanElement | null>;
  primaryIconRef: React.RefObject<HTMLSpanElement | null>;
  secondaryOverlayRef: React.RefObject<HTMLSpanElement | null>;
  secondaryTextRef: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <>
      <div className="flex flex-wrap gap-x-2 gap-y-1 mb-6">
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
      </div>

      <h1 className="font-inconsolata text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-pretty mb-5">
        Red Melanoma
        <br />
        <span className="text-[#aaeaf5]">Latinoamérica</span>
      </h1>

      <p className="text-base sm:text-lg text-gray-300 font-noto-sans leading-relaxed mb-8">
        Compartí experiencias, encontrá apoyo real y conectate con quienes entienden tu camino. Para que nadie enfrente el melanoma en soledad.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 font-inconsolata">
        <button
          onMouseEnter={handlePrimaryEnter}
          onMouseLeave={handlePrimaryLeave}
          onClick={() => router.push('/auth?tab=registro')}
          className="relative overflow-hidden bg-[#E3FEF7] border-2 border-[#E3FEF7] px-6 py-1 rounded-md text-[#003C43] font-bold text-[1.2rem] tracking-wider flex items-center justify-center gap-3 shadow-md"
        >
          <span
            ref={primaryOverlayRef}
            className="absolute inset-0 bg-[#003C43] translate-x-[-100%]"
          />
          <span ref={primaryTextRef} className="relative z-10">
            Unirme
          </span>
          <span
            ref={primaryIconRef}
            className="relative z-10 text-[#003C43] flex items-center"
          >
            <ArrowRight className="w-5 h-5 pt-[1px] shrink-0" />
          </span>
        </button>

        <button
          onMouseEnter={handleSecondaryEnter}
          onMouseLeave={handleSecondaryLeave}
          onClick={() => router.push('/about-claudia')}
          className="relative overflow-hidden bg-white border-2 border-white px-6 py-1 rounded-md font-bold text-[1.2rem] tracking-wider flex items-center justify-center min-w-[180px] shadow-md"
        >
          <span
            ref={secondaryOverlayRef}
            className="absolute inset-0 bg-[#003C43] translate-x-[-100%]"
          />
          <span
            ref={secondaryTextRef}
            className="relative z-10 text-[#003C43]"
          >
            Sobre Nosotros
          </span>
        </button>
      </div>

      <div className="flex flex-row gap-3 mt-8">
        <Leaf className="w-4 h-4 text-white/30" />
        <Clover className="w-4 h-4 text-white/30" />
        <LeafyGreen className="w-4 h-4 text-white/30" />
        <Sprout className="w-4 h-4 text-white/30" />
        <Rose className="w-4 h-4 text-white/30" />
        <Flower2 className="w-4 h-4 text-white/30" />
        <Wheat className="w-4 h-4 text-white/30" />
        <Flower className="w-4 h-4 text-white/30" />
      </div>
    </>
  );
}

/* ==========================================================================
   HERO SECTION — COMPONENTE PRINCIPAL
   ========================================================================== */
export default function HeroSection() {
  const router = useRouter();

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // ── GSAP refs ─────────────────────────────────────────────────────────────
  const primaryOverlayRef = useRef<HTMLSpanElement>(null);
  const primaryTextRef = useRef<HTMLSpanElement>(null);
  const primaryIconRef = useRef<HTMLSpanElement>(null);
  const secondaryOverlayRef = useRef<HTMLSpanElement>(null);
  const secondaryTextRef = useRef<HTMLSpanElement>(null);

  const handlePrimaryEnter = () => {
    gsap.to(primaryOverlayRef.current, { x: 0, duration: 0.4, ease: 'power2.out' });
    gsap.to(primaryTextRef.current, { color: '#E3FEF7', duration: 0.4 });
    gsap.to(primaryIconRef.current, { x: 16, color: '#E3FEF7', duration: 0.4 });
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

  return (
    <section className="bg-gradient-to-br from-[#00252a] to-[#003C43] text-white relative selection:bg-[#E3FEF7]/20">

      {/* MOBILE (<sm) */}
      <div className="sm:hidden max-w-[480px] mx-auto px-6 pb-16 pt-28">
        <LeftText
          router={router}
          handlePrimaryEnter={handlePrimaryEnter}
          handlePrimaryLeave={handlePrimaryLeave}
          handleSecondaryEnter={handleSecondaryEnter}
          handleSecondaryLeave={handleSecondaryLeave}
          primaryOverlayRef={primaryOverlayRef}
          primaryTextRef={primaryTextRef}
          primaryIconRef={primaryIconRef}
          secondaryOverlayRef={secondaryOverlayRef}
          secondaryTextRef={secondaryTextRef}
        />
        <MobileSections />
      </div>

      {/* TABLET (sm → lg) */}
      <div className="hidden sm:block lg:hidden max-w-[900px] mx-auto px-6 sm:px-10 pb-16 pt-28">
        <LeftText
          router={router}
          handlePrimaryEnter={handlePrimaryEnter}
          handlePrimaryLeave={handlePrimaryLeave}
          handleSecondaryEnter={handleSecondaryEnter}
          handleSecondaryLeave={handleSecondaryLeave}
          primaryOverlayRef={primaryOverlayRef}
          primaryTextRef={primaryTextRef}
          primaryIconRef={primaryIconRef}
          secondaryOverlayRef={secondaryOverlayRef}
          secondaryTextRef={secondaryTextRef}
        />
        <TabletGrid />
      </div>

      {/* DESKTOP (lg+) */}
      <div className="hidden lg:flex max-w-[1300px] mx-auto px-6 sm:px-10 flex-row gap-4 lg:gap-16">

        {/* Columna izquierda — sticky */}
        <div className="lg:w-[44%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-20 lg:py-28 shrink-0">
          <motion.div
            className="flex gap-2 mb-8"
            style={{ opacity }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {sections.map((s) => (
              <span key={s.id} className="font-inconsolata text-[0.6rem] font-bold uppercase tracking-widest text-[#E3FEF7]/40">
                {s.label}
                {s.id !== sections[sections.length - 1].id && (
                  <span className="ml-2 text-[#E3FEF7]/20">·</span>
                )}
              </span>
            ))}
          </motion.div>

          <motion.h1
            className="font-inconsolata text-4xl sm:text-5xl font-bold leading-tight text-start tracking-tight text-pretty mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            Red Melanoma<br />
            <span className="text-[#aaeaf5]">Latinoamérica</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-gray-300 max-w-md font-noto-sans leading-relaxed mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: 'easeOut' }}
          >
            Compartí experiencias, encontrá apoyo real y conectate con quienes entienden tu camino. Para que nadie enfrente el melanoma en soledad.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-5 font-inconsolata"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
          >
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

          <motion.div
            className="flex flex-row  gap-3 mt-10"
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

        {/* Columna derecha */}
        <div className="lg:w-[56%] pt-0 pb-20 lg:py-28">
          <RightPanel />
        </div>

      </div>
    </section>
  );
}