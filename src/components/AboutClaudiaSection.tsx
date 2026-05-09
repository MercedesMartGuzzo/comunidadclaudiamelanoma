'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

export default function AboutClaudiaSection() {
  const router = useRouter();

  const overlayRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

const handleMouseEnter = () => {
  gsap.to(overlayRef.current, {
    x: 0,
    duration: 0.4,
    ease: 'power2.out',
  });

  // El texto no se desplaza, solo cambia de color
  gsap.to(textRef.current, {
    color: '#E3FEF7',
    duration: 0.4,
  });

  // Solo el ícono se mueve hacia la derecha
  gsap.to(iconRef.current, {
    x: 20,
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

  // El texto vuelve únicamente a su color original
  gsap.to(textRef.current, {
    color: '#003C43',
    duration: 0.4,
  });

  // El ícono vuelve a su posición original
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
              Capa Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quia commodi soluta quibusdam provident iure optio et maxime qui perspiciatis nihil, modi pariatur alias! Iure, corrupti labore? Animi, vel voluptatum!
            </p>

            <p className="text-base text-gray-200 mb-8 font-noto-sans leading-relaxed">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam sed soluta itaque facere quos? Fugit rem excepturi distinctio praesentium temporibus. Necessitatibus repellat ad eos facilis blanditiis dignissimos natus? Iure, aperiam.
            </p>

            <button
              onClick={() => router.push('/about-claudia')}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative overflow-hidden bg-[#E3FEF7] border border-[#E3FEF7] px-8 py-3 rounded-md font-medium font-noto-sans uppercase text-sm font-bold tracking-wide flex items-center gap-3 cursor-pointer"
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

              {/* Lucide icon */}
              <ArrowRight
                ref={iconRef}
                className="relative z-10 w-4 h-4 text-[#003C43]"
              />
            </button>
          </div>

          {/* Right Image Placeholder */}
          <div className="w-full h-[400px] rounded-lg bg-[#d9e7e7] flex items-center justify-center">
            <span className="font-inconsolata text-[#003C43] text-sm tracking-widest uppercase">
              Imagen de Claudia
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}