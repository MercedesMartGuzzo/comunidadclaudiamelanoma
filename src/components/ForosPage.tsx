'use client';

import Link from 'next/link';
import { useState } from 'react';
import { mockForums } from '@/lib/mock-data/foro/forums';
import { Wheat, Leaf, LeafyGreen, Clover, Microscope, Dumbbell, Plus, X } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
    inmunologia: <LeafyGreen className="w-8 h-8 text-[#003C43]" />,
    nutricion: <Wheat className="w-8 h-8 text-[#003C43]" />,
    bienestar: <Leaf className="w-8 h-8 text-[#003C43]" />,
    'cuidado-del-cuidador': <Clover className="w-8 h-8 text-[#003C43]" />,
    dermatologia: <Microscope className="w-8 h-8 text-[#003C43]" />,
    'actividad-fisica': <Dumbbell className="w-8 h-8 text-[#003C43]" />,
};

export default function ForosPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleClose = () => {
        setModalOpen(false);
        setNombre('');
        setDescripcion('');
    };

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

            {/* CTA Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#00252a] to-[#003c43] p-12">
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
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-[#E3FEF7] text-[#003C43] font-inconsolata text-xs sm:text-sm font-bold uppercase tracking-wide px-4 sm:px-8 py-3 sm:py-3 rounded-md hover:opacity-90 transition-opacity flex items-center gap-2"
                    >

                        Proponer nuevo foro
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Modal Proponer Foro */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-[#00252a]/60 backdrop-blur-sm"
                        onClick={handleClose}
                    />
                    <div className="relative bg-white rounded-2xl w-full max-w-xl p-10 shadow-[0_20px_60px_rgba(0,60,67,0.2)] z-10">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/50 mb-1">
                                    Comunidad CCM
                                </p>
                                <h2
                                    className="font-inconsolata text-xl font-bold text-[#003C43] "
                                    style={{ letterSpacing: '-0.02em' }}
                                >
                                    Proponer nuevo foro
                                </h2>
                            </div>
                            <button
                                onClick={handleClose}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f0f4f4] transition-colors text-[#003C43]/50 hover:text-[#003C43]"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Formulario */}
                        <div className="flex flex-col gap-5">

                            <div className="flex flex-col gap-1.5">
                                <label className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/55">
                                    Nombre del foro
                                </label>
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                    placeholder="ej: Salud mental y melanoma"
                                    className="w-full font-noto-sans text-sm text-[#181c1d] placeholder:text-[#181c1d]/30 bg-transparent border-b-2 border-[#003C43]/15 focus:border-[#003C43] outline-none pb-4 transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/55 pb-1">
                                    ¿Por qué sería útil para la comunidad?
                                </label>
                                <textarea
                                    value={descripcion}
                                    onChange={e => setDescripcion(e.target.value)}
                                    placeholder="Contanos qué temas se tratarían y a quiénes beneficiaría..."
                                    rows={5}
                                    className="w-full font-noto-sans text-sm text-[#181c1d] placeholder:text-[#181c1d]/30 bg-[#f6fafa] rounded-lg px-3 py-3 outline-none border-2 border-transparent focus:border-[#003C43]/20 transition-colors resize-none"
                                />
                            </div>

                            <div className="flex justify-start items-center md:justify-end gap-3 pt-2">
                                <button
                                    onClick={handleClose}
                                    className="font-inconsolata text-xs font-bold uppercase tracking-wide text-[#003C43]/55 hover:text-[#003C43] transition-colors px-4 py-2.5"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleClose}
                                    disabled={!nombre.trim() || !descripcion.trim()}
                                    className="bg-[#003C43] text-[#E3FEF7] font-inconsolata text-xs sm:text-sm font-bold uppercase tracking-wide px-4 sm:px-8 py-3 sm:py-3 rounded-md hover:bg-[#00252a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    Enviar sugerencia
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}