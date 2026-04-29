'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';

export default function AboutClaudiaSection() {
  const overlayRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  const handleMouseEnter = () => {
    gsap.to(overlayRef.current, {
      x: 0,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(textRef.current, {
      x: 4,
      color: '#E3FEF7',
      duration: 0.4,
    });

    gsap.to(iconRef.current, {
      x: 6,
      stroke: '#E3FEF7',
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
      x: 0,
      color: '#003C43',
      duration: 0.4,
    });

    gsap.to(iconRef.current, {
      x: 0,
      stroke: '#003C43',
      duration: 0.4,
    });
  };

  return (
    <section className="bg-gradient-to-br from-[#003C43] to-[#135D66] text-white py-32 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E3FEF7] rounded-full blur-3xl"></div>
      </div>

      <div className="w-full flex justify-center px-6">
        <div className="max-w-[1000px] w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-[#E3FEF7] mb-6">
              la inspiración detrás
            </p>

            <h2
              className="font-inconsolata text-4xl sm:text-5xl font-bold mb-8 leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Sobre Claudia
            </h2>

            <p className="text-lg text-gray-100 mb-8 font-noto-sans leading-relaxed">
              La verdadera luz no es que otros nos ciegue, sino la que nos
              permite ver el camino con claridad, incluido el penumbra.
            </p>

            <p className="text-base text-gray-200 mb-8 font-noto-sans leading-relaxed">
              Esta comunidad nace de la voluntad de transformar una experiencia
              desafiante en un espacio de encuentro. Melanoma no es solo un
              nombre, es el símbolo de una búsqueda incesante por la verdad
              médica y la serenidad emocional.
            </p>

            <button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative overflow-hidden bg-[#E3FEF7] border-1 border-[#E3FEF7] px-8 py-3 rounded-md font-medium font-noto-sans uppercase text-sm font-bold tracking-wide flex items-center gap-3"
            >
              {/* Animated overlay */}
              <span
                ref={overlayRef}
                className="absolute inset-0 bg-[#0D535C] translate-x-[-100%]"
              />

              {/* Button text */}
              <span
                ref={textRef}
                className="relative z-10 text-[#003C43]"
              >
                Conocer su historia completa
              </span>

              {/* Arrow icon */}
              <svg
                ref={iconRef}
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
          </div>

          {/* Right Image Placeholder */}
          <div className="bg-gradient-to-br from-[#77B0AA] to-[#135D66] rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-24 h-24 text-white/30 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>

              <p className="text-white/50 font-noto-sans">
                Imagen de Claudia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}