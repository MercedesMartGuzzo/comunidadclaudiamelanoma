'use client';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // 1. Importación agregada
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

    gsap.to(textRef.current, {
      color: '#E3FEF7',
      duration: 0.4,
    });

    gsap.to(iconRef.current, {
      x: 10,
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
    <section className="bg-gradient-to-br from-[#003C43] to-[#135D66] text-white py-12 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E3FEF7] rounded-full blur-3xl"></div>
      </div>

      <div className="w-full flex justify-center px-6">
        <div className="max-w-[1000px] w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Content */}
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-[#E3FEF7] mb-6">
              la inspiración detrás
            </p>

            <h2
              className="font-inconsolata text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Sobre Nosotros
            </h2>

            <p className="text-[#E3FEF7]/90 text-base font-noto-sans leading-relaxed max-w-lg mb-8">
              Capa Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quia commodi soluta quibusdam provident iure optio et maxime qui perspiciatis nihil, modi pariatur alias! Iure, corrupti labore? Animi, vel voluptatum!
            </p>

            <p className="text-[#E3FEF7]/70 text-base font-noto-sans leading-relaxed max-w-lg mb-12">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam sed soluta itaque facere quos? Fugit rem excepturi distinctio praesentium temporibus. Necessitatibus repellat ad eos facilis blanditiis dignissimos natus? Iure, aperiam.
            </p>

            <button
              onClick={() => router.push('/about-claudia')}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative overflow-hidden bg-[#E3FEF7] border border-[#E3FEF7] px-4 py-3 rounded-md font-medium font-inconsolata flex items-center justify-center gap-2 shadow-md"
            >
              {/* Animated overlay */}
              <span
                ref={overlayRef}
                className="absolute inset-0 bg-[#0D535C] translate-x-[-100%]"
              />

              {/* Button text */}
              <span
                ref={textRef}
                className="relative z-10 text-[#003C43]  font-bold"
              >
                Conocé nuestra historia
              </span>

              {/* Lucide icon */}
              <ArrowRight
                ref={iconRef}
                className="relative z-10 w-5 h-5 text-[#003C43] pt-[2px]"
              />
            </button>
          </div>

          {/* Right Image Container */}
          {/* Mantengo intactas tus alturas responsivas relativas */}
          <div className="relative w-full h-[280px] lg:h-[400px] rounded-2xl overflow-hidden">
            {/* 2. Etapa nativa reemplazada con z-0 para no interferir con el degradado */}
            <Image
              src="/images/hero/nosotros.png"
              alt="Nosotros"
              fill
              sizes="(max-w: 768px) 100vw, 500px"
              unoptimized={true}
              className="object-cover z-0"
            />

            {/* 3. Ajuste de z-index al gradiente para que se pose sobre la imagen */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#003C43]/30 to-transparent z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}