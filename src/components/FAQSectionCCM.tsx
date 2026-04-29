'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
    category: string;
    question: string;
    answer: string;
}

function FAQCard({
    item,
    isOpen,
    onToggle,
}: {
    item: FAQItem;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="bg-white rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,60,67,0.06)] self-start">
            <button
                onClick={onToggle}
                className="w-full text-left flex items-start justify-between gap-4 min-h-[44px]"
            >
                <div>
                    <span className="inline-block bg-[#aaeaf5] text-[#003C43] font-inconsolata text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                        {item.category}
                    </span>

                    <h3
                        className="font-inconsolata text-[1.05rem] sm:text-[1.15rem] font-semibold text-[#003C43] leading-snug"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        {item.question}
                    </h3>
                </div>

                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 mt-1"
                >
                    <ChevronDown className="w-5 h-5 text-[#003C43]" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pt-5 mt-5 border-t border-[#003C43]/10">
                            <p className="text-[0.95rem] leading-relaxed text-[#181c1d]/75 font-noto-sans max-w-3xl">
                                {item.answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQSectionCCM() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqItems: FAQItem[] = [
        {
            category: 'acceso',
            question: '¿Cómo ingreso a la plataforma Comunidad Claudia Melanoma?',
            answer:
                'Podés acceder desde cualquier dispositivo con conexión a internet a través del sitio oficial. Solo necesitás registrarte con tus datos básicos para participar en foros, explorar recursos y acceder a contenidos exclusivos diseñados para pacientes, familiares y acompañantes.',
        },
        {
            category: 'membresía',
            question: '¿La comunidad tiene algún costo?',
            answer:
                'No. Comunidad Claudia Melanoma es un espacio gratuito pensado para brindar apoyo, información clínica curada y contención emocional accesible para todas las personas que atraviesan el melanoma, directa o indirectamente.',
        },
        {
            category: 'contacto',
            question: '¿Cómo puedo comunicarme con el equipo de CCM?',
            answer:
                'Podés contactarte mediante el formulario disponible en la sección de contacto del sitio, o a través de los canales oficiales de correo electrónico y redes sociales. Nuestro equipo busca responder consultas generales, institucionales o colaborativas con cercanía y claridad.',
        },
        {
            category: 'participación',
            question: '¿Quién puede formar parte de la comunidad?',
            answer:
                'La plataforma está abierta a pacientes, sobrevivientes, familiares, cuidadores y personas interesadas en información confiable sobre melanoma. El objetivo es construir una red inclusiva donde experiencia, ciencia y acompañamiento convivan.',
        },
        {
            category: 'privacidad',
            question: '¿Mi información personal y participación son confidenciales?',
            answer:
                'Sí. CCM prioriza la privacidad, la seguridad de datos y el respeto por cada integrante. Toda participación dentro de la plataforma está diseñada para promover un entorno seguro, protegido y centrado en el bienestar de la comunidad.',
        },
    ];

    return (
        <section className="bg-[#f6fafa] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-[#E3FEF7] rounded-full blur-3xl" />
            </div>

            <div className="w-full flex justify-center relative z-10">
                <div className="max-w-[1000px] w-full">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
                        <div className="max-w-2xl">
                            <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/55 mb-4">
                                claridad clínica
                            </p>

                            <h2
                                className="font-inconsolata text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003C43] mb-6 leading-tight"
                                style={{ letterSpacing: '-0.02em' }}
                            >
                                Preguntas Frecuentes
                            </h2>

                            <p className="text-base sm:text-lg text-[#181c1d]/75 font-noto-sans leading-relaxed max-w-xl">
                                Respuestas confiables para acompañar decisiones informadas,
                                reducir incertidumbre y brindar orientación serena en cada etapa.
                            </p>
                        </div>

                        <div className="bg-[#f0f4f4] rounded-2xl px-6 py-5 max-w-sm">
                            <p className="font-inconsolata text-[0.7rem] uppercase tracking-widest text-[#003C43]/50 mb-2">
                                CCM / conocimiento accesible
                            </p>
                            <p className="text-sm text-[#181c1d]/70 font-noto-sans leading-relaxed">
                                Información editorialmente curada con enfoque humano y precisión médica.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {faqItems.map((item, index) => (
                            <FAQCard
                                key={index}
                                item={item}
                                isOpen={openIndex === index}
                                onToggle={() =>
                                    setOpenIndex(openIndex === index ? null : index)
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
