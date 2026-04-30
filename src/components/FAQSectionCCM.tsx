'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: '¿Cómo me registro en la plataforma?',
        answer:
            'Podés crear tu cuenta gratuitamente desde el botón de ingreso o registro. Solo necesitás tu correo electrónico para comenzar.',
    },
    {
        question: '¿La comunidad tiene costo?',
        answer:
            'No. Comunidad Claudia Melanoma es completamente gratuita para pacientes, familiares, cuidadores y acompañantes.',
    },
    {
        question: '¿Qué recursos ofrece la plataforma?',
        answer:
            'Incluye información clínica curada, foros temáticos, recursos emocionales, experiencias compartidas y contenido educativo actualizado.',
    },
    {
        question: '¿Cómo puedo contactar al equipo?',
        answer:
            'Podés hacerlo mediante la sección de contacto o ayuda dentro de la plataforma, donde encontrarás formularios y canales directos.',
    },
    {
        question: '¿Puedo participar aunque no sea paciente?',
        answer:
            'Sí. Familiares, cuidadores y personas de apoyo también forman parte esencial de esta comunidad.',
    },
    {
        question: '¿La información reemplaza a mi médico?',
        answer:
            'No. La plataforma brinda acompañamiento e información educativa, pero siempre debe complementarse con atención médica profesional.',
    },
];

function FAQCard({ item }: { item: FAQItem }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl p-7 flex flex-col self-start transition-shadow hover:shadow-[0_20px_40px_rgba(0,60,67,0.06)]">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-start gap-4 text-left"
            >
                <h3
                    className="font-inconsolata text-[1.125rem] font-semibold text-[#003C43] leading-snug"
                    style={{ letterSpacing: '-0.01em' }}
                >
                    {item.question}
                </h3>

                <span className="text-[#003C43] text-xl leading-none shrink-0">
                    {open ? '−' : '+'}
                </span>
            </button>

            {open && (
                <div className="mt-5 pt-4 border-t border-[rgba(0,60,67,0.08)]">
                    <p className="text-[14px] text-[#181c1d]/75 leading-relaxed font-noto-sans">
                        {item.answer}
                    </p>
                </div>
            )}
        </div>
    );
}

function CommunityCTAButton() {
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
            color: '#003C43',
            duration: 0.4,
        });

        gsap.to(iconRef.current, {
            x: 6,
            stroke: '#003C43',
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
            color: '#E3FEF7',
            duration: 0.4,
        });

        gsap.to(iconRef.current, {
            x: 0,
            stroke: '#E3FEF7',
            duration: 0.4,
        });
    };;

    return (
        <div className="flex justify-center mt-16">
            <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative overflow-hidden bg-[#003C43] border-2 border-[#003C43] px-8 py-3 rounded-md font-medium font-noto-sans flex items-center justify-center gap-3 min-w-[220px] shadow-md"
            >
                <span
                    ref={overlayRef}
                    className="absolute inset-0 bg-[#E3FEF7] translate-x-[-100%]"
                />

                <span
                    ref={textRef}
                    className="relative z-10 text-[#E3FEF7] uppercase text-sm tracking-wide font-bold"
                >
                    Unirme
                </span>

                <svg
                    ref={iconRef}
                    className="relative z-10 w-4 h-4 text-[#E3FEF7]"
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
    );
}

export default function FAQSectionCCM() {
    return (
        <section className="bg-[#f6fafa] py-24 px-4">
            <div className="w-full flex justify-center px-6">
                <div className="max-w-[1000px] w-full">
                    <div className="mb-14">
                        <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/55 mb-3">
                            Centro de ayuda
                        </p>

                        <h2
                            className="font-inconsolata text-3xl sm:text-4xl font-bold text-[#003C43] mb-4"
                            style={{ letterSpacing: '-0.02em' }}
                        >
                            FAQ
                        </h2>

                        <p className="text-[#181c1d] text-base font-noto-sans max-w-2xl leading-relaxed">
                            Resolvé tus dudas sobre el funcionamiento de la plataforma,
                            acceso a recursos y formas de participación dentro de la comunidad.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {faqData.map((item, index) => (
                            <FAQCard key={index} item={item} />
                        ))}
                    </div>

                    <CommunityCTAButton />
                </div>
            </div>
        </section>
    );
}
