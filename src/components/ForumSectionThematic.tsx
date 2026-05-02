'use client';

import ForumCard from './ForumCard';
import { Wheat, Leaf, LeafyGreen, Clover } from 'lucide-react';
import Link from 'next/link';

export default function ForumSectionThematic() {
  const forums = [
    {
      icon: <LeafyGreen className="w-8 h-8 text-[#003C43]" />,
      title: 'Inmunología',
      description:
        'Conversaciones profundas sobre los últimos avances en inmunoterapia, manejo de efectos secundarios y respuestas al tratamiento.',
      tags: ['42 TEMAS ACTIVOS', '134 MIEMBROS PARTICIPANDO'],
    },
    {
      icon: <Wheat className="w-8 h-8 text-[#003C43]" />,
      title: 'Nutrición',
      description:
        'Guías y consejos sobre alimentación consciente y soporte nutricional durante el proceso terapéutico.',
      tags: ['NUTRICIÓN', 'GUÍAS PRÁCTICAS'],
    },
    {
      icon: <Leaf className="w-8 h-8 text-[#003C43]" />,
      title: 'Bienestar',
      description:
        'Espacio dedicado a la salud emocional, meditación y herramientas para el cuidado integral del bienestar.',
      tags: ['BIENESTAR', 'RECURSOS'],
    },
    {
      icon: <Clover className="w-8 h-8 text-[#003C43]" />,
      title: 'Cuidado del Cuidador',
      description:
        'Porque el entorno también necesita sostén. Un foro exclusivo para familiares y acompañantes.',
      tags: ['RECURSOS', 'APOYO'],
    },
  ];

  return (
    <section className="bg-[#f6fafa] py-6 px-4">
      <div className="w-full flex justify-center px-6">
        <div className="max-w-[1000px] w-full">

          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-12 mt-8">
            <div>
              <h2
                className="font-inconsolata text-3xl sm:text-4xl font-bold text-[#003C43] mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Foros Temáticos
              </h2>

              <p className="text-[#181c1d] text-base font-noto-sans max-w-lg">
                Espacios de diálogo especializados para compartir experiencias,
                dudas y hallazgos en comunidad.
              </p>
            </div>
            <Link
              href="/foros"
              className="group flex items-center gap-1 text-sm font-medium text-[#003C43] hover:text-[#00252a] transition font-noto-sans"
            >
              Ver todos los foros
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forums.map((forum, idx) => (
              <ForumCard key={idx} {...forum} showButton={false} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}