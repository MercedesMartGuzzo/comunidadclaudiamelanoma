'use client';

import Link from 'next/link';
import { mockForums } from '@/lib/mock-data/foro/forums';
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
                    Comunidad RLM
                </p>
                <h1
                    className="font-inconsolata text-4xl sm:text-5xl font-bold text-[#003C43] mb-4"
                    style={{ letterSpacing: '-0.02em' }}
                >
                    Directorio de Grupos
                </h1>
                <p className="text-[#181c1d]/70 text-lg font-noto-sans max-w-2xl leading-relaxed">
                    Espacios de encuentro, aprendizaje y apoyo. Conectate con especialistas
                    y pacientes en nuestras comunidades temáticas.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 ">
                {mockForums.map((forum) => (
                    <Link
                        key={forum.id}
                        href={`/foros/${forum.slug}`}
                        className="group w-full bg-[var(--clr-surface-low)] rounded-lg p-6 gap-2 hover:shadow-[0_20px_40px_rgba(0,80,70,0.1)] transition-shadow flex flex-col font-inconsolata"
                    >
                        <div className="mb-6">{iconMap[forum.slug]}</div>

                        <h3 className="font-inconsolata text-lg font-semibold text-[#003C43] mb-2">
                            {forum.title}
                        </h3>

                        <p className="text-sm text-[#181c1d] mb-3 font-noto-sans leading-relaxed flex-grow">
                            {forum.description}
                        </p>

                        <div className="flex gap-3 flex-wrap mb-3">
                            <span className="text-xs uppercase font-medium text-[#003C43] tracking-wider font-inconsolata">
                                {forum.activeTopics} temas activos
                            </span>
                            <span className="text-xs uppercase font-medium text-[#003C43] tracking-wider font-inconsolata">
                                {forum.membersCount >= 1000
                                    ? `${(forum.membersCount / 1000).toFixed(1)}k`
                                    : forum.membersCount} miembros
                            </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                            <span className="font-inconsolata text-xs font-bold uppercase tracking-wide bg-[#003C43] text-[#E3FEF7] px-6 py-3 rounded-md hover:bg-[#00252a] transition-colors">
                                Unirme
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}