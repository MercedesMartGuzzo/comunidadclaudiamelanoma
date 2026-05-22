'use client';

import ForumCard from './ForumCard';
import {
  Wheat,
  Leaf,
  LeafyGreen,
  Clover,
  ArrowRight,
} from 'lucide-react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { supabase } from '@/lib/supabase/client';
export default function ForumSectionThematic() {
  const router = useRouter();

  const overlayRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    gsap.to(overlayRef.current, {
      x: 0,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(textRef.current, {
      color: '#003C43',
      duration: 0.4,
    });

    gsap.to(iconRef.current, {
      x: 10,
      color: '#003C43',
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(overlayRef.current, {
      x: '-100%',
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(textRef.current, {
      color: '#E3FEF7',
      duration: 0.4,
    });

    gsap.to(iconRef.current, {
      x: 0,
      color: '#E3FEF7',
      duration: 0.4,
    });
  };

const handleForumsClick = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      router.push('/foros'); 
    } else {
      // Le avisamos a la pantalla de Auth que después del login queremos ir a /foros
      router.push('/auth?tab=login&redirectTo=/foros');
    }
  };

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
                Grupos
              </h2>

              <p className="text-[#181c1d] text-base font-noto-sans max-w-lg">
                Espacios de diálogo especializados para compartir experiencias,
                dudas y hallazgos en comunidad.
              </p>
            </div>

            {/* Botón animado */}
            <button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleForumsClick}
              className="relative overflow-hidden bg-[#003C43] border-2 border-[#003C43] px-4 py-3 rounded-md font-medium font-inconsolata flex items-center justify-center gap-2 shadow-md self-start md:self-auto mt-2 md:mt-0"
            >
              <span
                ref={overlayRef}
                className="absolute -inset-[2px] bg-[#f6fafa] translate-x-[-101%] rounded-md"
              />

              <span
                ref={textRef}
                className="relative z-10 text-[#E3FEF7] tracking-wider font-bold text-[1rem] leading-none"
              >
                Ver todos los grupos
              </span>

              <span
                ref={iconRef}
                className="relative z-10 flex items-center text-[#E3FEF7] leading-none pt-[1px]"
              >
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forums.map((forum, idx) => (
              <ForumCard
                key={idx}
                {...forum}
                showButton={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}