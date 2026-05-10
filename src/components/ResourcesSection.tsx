'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

interface InfoCardProps {
  chip: string;
  title: string;
  summary: string;
}

interface BarDatum {
  label: string;
  pct: number;
  color: string;
}

interface DonutDatum {
  label: string;
  pct: number;
  color: string;
}

function InfoCard({ chip, title, summary }: InfoCardProps) {
  return (
    <div className="bg-white rounded-xl p-7 flex flex-col self-start transition-shadow hover:shadow-[0_20px_40px_rgba(0,60,67,0.07)]">
      <span className="inline-block self-start bg-[#aaeaf5] text-[#003C43] font-inconsolata text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
        {chip}
      </span>
      <h3
        className="font-inconsolata text-[1.125rem] font-semibold text-[#003C43] leading-snug mb-3"
        style={{ letterSpacing: '-0.01em' }}
      >
        {title}
      </h3>
      <p className="text-[14px] text-[#181c1d]/75 leading-relaxed">
        {summary}
      </p>
    </div>
  );
}

function BarChart({ data }: { data: BarDatum[] }) {
  const max = Math.max(...data.map((d) => d.pct));

  return (
    <div className="flex items-end gap-3 h-28">
      {data.map((d, index) => (
        <div key={d.label} className="flex flex-col items-center flex-1 gap-1.5 h-full justify-end">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.15 }}
            className="font-inconsolata text-[0.65rem] font-bold text-[#003C43]"
          >
            {d.pct}%
          </motion.span>
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: `${(d.pct / max) * 100}%` }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, delay: index * 0.15, ease: 'easeOut' }}
            className="w-full rounded-t-sm"
            style={{ background: d.color }}
          />
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.5 + index * 0.15 }}
            className="text-[0.6rem] text-[#181c1d]/55 text-center font-noto-sans leading-tight"
          >
            {d.label}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data }: { data: DonutDatum[] }) {
  const r = 40;
  const circ = 2 * Math.PI * r;

  const slices = data.map((d, index) => {
    const dash = (d.pct / 100) * circ;
    const offset = data.slice(0, index).reduce((sum, item) => sum + (item.pct / 100) * circ, 0);
    return { ...d, dash, offset };
  });

  return (
    <div className="flex items-center gap-8">
      <svg width="120" height="120" viewBox="0 0 110 110" className="shrink-0">
        {slices.map((s, index) => (
          <motion.circle
            key={s.label}
            cx="55" cy="55" r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="18"
            strokeDasharray={`${s.dash} ${circ - s.dash}`}
            strokeDashoffset={circ}
            whileInView={{ strokeDashoffset: -s.offset }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, delay: index * 0.2, ease: 'easeOut' }}
            transform="rotate(-90 55 55)"
          />
        ))}
        <motion.text
          x="55" y="50" textAnchor="middle"
          fontFamily="Inconsolata, monospace" fontSize="15" fontWeight="700" fill="#003C43"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 1 }}
        >
          70%
        </motion.text>
        <motion.text
          x="55" y="64" textAnchor="middle"
          fontFamily="Noto Sans, sans-serif" fontSize="8" fill="#181c1d" opacity="0.55"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.55 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 1.2 }}
        >
          más común
        </motion.text>
      </svg>

      <div className="flex flex-col gap-3">
        {data.map((d, index) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.8 + index * 0.15 }}
            className="flex items-center gap-3"
          >
            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
            <div>
              <span className="font-inconsolata text-sm font-bold text-[#003C43]">{d.pct}%</span>{' '}
              <span className="text-sm text-[#181c1d]/70 font-noto-sans">{d.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ResourcesSection() {
  const router = useRouter();

  const overlayRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    gsap.to(overlayRef.current, { x: 0, duration: 0.4, ease: 'power2.out' });
    gsap.to(textRef.current, { color: '#003C43', duration: 0.4 });
    gsap.to(iconRef.current, { x: 10, color: '#003C43', duration: 0.4 });
  };

  const handleMouseLeave = () => {
    gsap.to(overlayRef.current, { x: '-100%', duration: 0.4, ease: 'power2.out' });
    gsap.to(textRef.current, { color: '#E3FEF7', duration: 0.4 });
    gsap.to(iconRef.current, { x: 0, color: '#E3FEF7', duration: 0.4 });
  };

  const barData: BarDatum[] = [
    { label: 'Estadio I', pct: 47, color: 'linear-gradient(180deg,#00252a,#003c43)' },
    { label: 'Estadio II', pct: 29, color: 'linear-gradient(180deg,#005662,#00252a)' },
    { label: 'Estadio III', pct: 14, color: 'linear-gradient(180deg,#aaeaf5,#77d8ec)' },
    { label: 'Estadio IV', pct: 10, color: 'linear-gradient(180deg,#d0f5f8,#aaeaf5)' },
  ];

  const donutData: DonutDatum[] = [
    { label: 'Extensivo superficial', pct: 70, color: '#003C43' },
    { label: 'Nodular', pct: 15, color: '#aaeaf5' },
    { label: 'Lentiginoso acral', pct: 10, color: '#005662' },
    { label: 'Lentigo maligno', pct: 5, color: '#d0f5f8' },
  ];

  return (
    <section className="bg-[#f6fafa] py-6 px-4">
      <div className="w-full flex justify-center px-6">
        <div className="max-w-[1000px] w-full">

          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-12 mt-8">
            <div>
              <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/55 mb-3">
                Información clínica curada
              </p>
              <h2
                className="font-inconsolata text-3xl sm:text-4xl font-bold text-[#003C43] mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Acerca del Melanoma
              </h2>
              <p className="text-[#181c1d] text-base font-noto-sans max-w-lg">
                Artículos, datos y fundamentos científicos para comprender el melanoma con claridad.
              </p>
            </div>

            {/* Botón animado */}
            <button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => router.push('/resources')}
              className="relative overflow-hidden bg-[#003C43] border-2 border-[#003C43] px-4 py-3 rounded-md font-medium font-inconsolata   flex items-center justify-center gap-2 shadow-md self-start md:self-auto"
            >
              <span ref={overlayRef} className="absolute inset-[-2px] bg-[#f6fafa] translate-x-[-100%]" />
              <span ref={textRef} className="relative z-10 text-[#E3FEF7] font-bold text-[1rem] u tracking-wider font-bold leading-none">
                Ver todos los recursos
              </span>
              <span ref={iconRef} className="relative z-10 flex items-center text-[#E3FEF7] leading-none">
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start mb-8">
            <InfoCard chip="definición" title="¿Qué es el Melanoma?" summary="Tumor maligno originado en los melanocitos, las células productoras de pigmento. Es el tipo más grave de cáncer de piel." />
            <InfoCard chip="tratamientos" title="Principales Tratamientos" summary="Desde cirugía de resección hasta inmunoterapia y terapia dirigida con inhibidores BRAF/MEK, el abordaje es multidisciplinario." />
            <InfoCard chip="detección" title="Regla ABCDE" summary="La detección temprana cambia el pronóstico. La regla ABCDE es la herramienta clínica de primera línea para evaluar lesiones." />
            <InfoCard chip="estadísticas" title="Tasas de Supervivencia" summary="Diagnosticado en estadio I, la supervivencia a 5 años supera el 98%. La detección temprana es decisiva." />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-7 hover:shadow-[0_20px_40px_rgba(0,60,67,0.06)] transition-shadow">
              <p className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-widest text-[#003C43]/50 mb-1">
                Epidemiología global
              </p>
              <p className="font-inconsolata text-[0.95rem] font-semibold text-[#003C43] mb-6" style={{ letterSpacing: '-0.01em' }}>
                Nuevos casos diagnosticados por estadio
              </p>
              <BarChart data={barData} />
            </div>

            <div className="bg-white rounded-xl p-7 hover:shadow-[0_20px_40px_rgba(0,60,67,0.06)] transition-shadow">
              <p className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-widest text-[#003C43]/50 mb-1">
                Clasificación histológica
              </p>
              <p className="font-inconsolata text-[0.95rem] font-semibold text-[#003C43] mb-6" style={{ letterSpacing: '-0.01em' }}>
                Distribución de subtipos de melanoma
              </p>
              <DonutChart data={donutData} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}