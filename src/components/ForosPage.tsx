'use client';

import Link from 'next/link';
import { mockForums } from '@/lib/mock-data/forums';
import { Wheat, Leaf, LeafyGreen, Clover, Microscope, Dumbbell } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
    inmunologia: <LeafyGreen className="w-8 h-8 text-[#003C43]" />,
    nutricion: <Wheat className="w-8 h-8 text-[#003C43]" />,
    bienestar: <Leaf className="w-8 h-8 text-[#003C43]" />,
    'cuidado-del-cuidador': <Clover className="w-8 h-8 text-[#003C43]" />,
    dermatologia: <Microscope className="w-8 h-8 text-[#003C43]" />,
    'actividad-fisica': <Dumbbell className="w-8 h-8 text-[#003C43]" />,
};

export default function ForosPage() {
    return (
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

            {/* Header */}
            <div className="mb-12">
                <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/55 mb-3">
                    Comunidad CCM
                </p>
                <h1
                    className="font-inconsolata text-4xl sm:text-5xl font-bold text-[#003C43] mb-4"
                    style={{ letterSpacing: '-0.02em' }}
                >
                    Directorio de Foros
                </h1>
                <p className="text-[#181c1d]/70 text-lg font-noto-sans max-w-2xl leading-relaxed">
                    Espacios de encuentro, aprendizaje y apoyo. Conectate con especialistas
                    y pacientes en nuestras comunidades temáticas.
                </p>
            </div>

            {/* Grid 3 columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {mockForums.map((forum) => (
                    <Link
                        key={forum.id}
                        href={`/foros/${forum.slug}`}
                        className="bg-white rounded-xl p-8 flex flex-col h-full group transition-all hover:shadow-[0_20px_40px_rgba(0,60,67,0.08)] cursor-pointer"
                    >
                        {/* Icono */}
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-[#E3FEF7] group-hover:scale-110 transition-transform">
                            {iconMap[forum.slug]}
                        </div>

                        {/* Título */}
                        <h3
                            className="font-inconsolata text-xl font-bold text-[#003C43] mb-3"
                            style={{ letterSpacing: '-0.01em' }}
                        >
                            {forum.title}
                        </h3>

                        {/* Descripción */}
                        <p className="text-[#181c1d]/70 text-sm font-noto-sans leading-relaxed flex-grow mb-8">
                            {forum.description}
                        </p>

                        {/* Footer de la card */}
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#003C43]/08">
                            <span className="text-xs font-semibold text-[#003C43]/60 font-noto-sans flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                                </svg>
                                {forum.membersCount >= 1000
                                    ? `${(forum.membersCount / 1000).toFixed(1)}k`
                                    : forum.membersCount} Miembros
                            </span>

                            <span className="font-inconsolata text-xs font-bold text-[#003C43] bg-[#E3FEF7] px-4 py-1.5 rounded-full group-hover:bg-[#003C43] group-hover:text-white transition-colors">
                                Ver foro →
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* CTA Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#00252a] to-[#003c43] p-12">
                {/* Watermark */}
                <span className="absolute right-8 top-1/2 -translate-y-1/2 font-inconsolata text-[120px] font-bold text-white/5 select-none leading-none">
                    CCM
                </span>

                <div className="relative z-10 max-w-xl">
                    <h2
                        className="font-inconsolata text-2xl sm:text-3xl font-bold text-[#E3FEF7] mb-4"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        ¿No encontrás lo que buscás?
                    </h2>
                    <p className="text-[#E3FEF7]/70 text-base font-noto-sans mb-8 leading-relaxed">
                        Nuestra comunidad crece con tus sugerencias. Si tenés un tema de
                        interés específico, proponé un nuevo foro temático.
                    </p>
                    <button className="bg-[#E3FEF7] text-[#003C43] font-inconsolata text-sm font-bold uppercase tracking-wide px-8 py-3 rounded-md hover:opacity-90 transition-opacity flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Proponer nuevo foro
                    </button>
                </div>
            </div>

        </div>
    );
}