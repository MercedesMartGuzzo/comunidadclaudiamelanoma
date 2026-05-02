'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { mockForums } from '@/lib/mock-data/forums';
import { mockForumPosts } from '@/lib/mock-data/forum-post';
import {
    Wheat, Leaf, LeafyGreen, Clover, Microscope, Dumbbell,
    ArrowLeft, Users, MessageSquare, Heart, Pin, Clock
} from 'lucide-react';



const iconComponents: Record<string, React.ElementType> = {
    inmunologia: LeafyGreen,
    nutricion: Wheat,
    bienestar: Leaf,
    'cuidado-del-cuidador': Clover,
    dermatologia: Microscope,
    'actividad-fisica': Dumbbell,
};

function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'hoy';
    if (days === 1) return 'ayer';
    return `hace ${days} días`;
}

interface Props {
    slug: string;
}

export default function ForoDetallePage({ slug }: Props) {
    const [isDesktop, setIsDesktop] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [joined, setJoined] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (tags.length < 5) {
                setTags(prev => [...prev, tagInput.trim().toLowerCase()]);
                setTagInput('');
            }
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setTitulo('');
        setContenido('');
        setTags([]);
        setTagInput('');
    };

    const forum = mockForums.find(f => f.slug === slug);
    const posts = mockForumPosts.filter(p => p.forumSlug === slug);
    const IconComponent = iconComponents[slug];

    if (!forum) {
        return (
            <div className="pt-40 text-center">
                <p className="font-inconsolata text-[#003C43] text-xl">Foro no encontrado.</p>
                <Link href="/foros" className="text-sm text-[#003C43]/60 mt-4 inline-block hover:opacity-70">
                    ← Volver al directorio
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">

            {/* Breadcrumb */}
            <Link
                href="/foros"
                className="flex items-center gap-2 text-sm text-[#003C43]/55 hover:text-[#003C43] transition font-noto-sans mb-8 group w-fit"
            >
                <ArrowLeft className="w-4 h-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
                <span className="leading-none">Directorio de Foros</span>
            </Link>

            {/* Hero del foro */}
            <div className="bg-gradient-to-br from-[#00252a] to-[#003c43] rounded-2xl p-10 sm:p-16 mb-14 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

                        {/* Contenido izquierda */}
                        <div className="flex flex-col min-w-0 gap-4">

                            {/* Icono */}
                            <div
                                className="rounded-xl bg-white/10 flex items-center justify-center mb-4 p-2 shrink-0 self-start"
                                style={{
                                    width: isDesktop ? '64px' : '48px',
                                    height: isDesktop ? '64px' : '48px',
                                }}
                            >
                                <IconComponent
                                    size={isDesktop ? 36 : 30}
                                    className="text-[#E3FEF7]"
                                />
                            </div>

                            <p className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#E3FEF7] opacity-50 mb-2">
                                Foro temático
                            </p>

                            <h1
                                className="font-inconsolata text-3xl sm:text-4xl font-bold text-[#E3FEF7] mb-3"
                                style={{ letterSpacing: '-0.02em' }}
                            >
                                {forum.title}
                            </h1>

                            <p className="text-[#E3FEF7]/70 font-noto-sans text-sm leading-relaxed mb-5 max-w-xl">
                                {forum.description}
                            </p>

                            {/* Stats */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                                <span className="flex items-center gap-2 text-[#E3FEF7] text-sm font-noto-sans">
                                    <Users className="w-4 h-4 shrink-0" />
                                    <span>
                                        {forum.membersCount >= 1000
                                            ? `${(forum.membersCount / 1000).toFixed(1)}k`
                                            : forum.membersCount} miembros
                                    </span>
                                </span>
                                <span className="hidden sm:block w-px h-4 bg-[#E3FEF7]/20" />
                                <span className="flex items-center gap-2 text-[#E3FEF7] text-sm font-noto-sans">
                                    <MessageSquare className="w-4 h-4 shrink-0" />
                                    <span>{forum.activeTopics} temas activos</span>
                                </span>
                            </div>

                            {/* Botón mobile */}
                            <button
                                onClick={() => setJoined(v => !v)}
                                style={{ minWidth: '100px' }}
                                className={`md:hidden mt-6 self-start font-inconsolata text-xs font-bold uppercase tracking-wide px-6 py-3 rounded-md transition-all relative border border-[#E3FEF7]/30  ${joined
                                        ? 'bg-white/20 text-[#E3FEF7]'
                                        : 'bg-[#E3FEF7] text-[#003C43] hover:opacity-90'
                                    }`}
                            >
                                <span className={joined ? 'opacity-0' : 'opacity-100'}>Unirme</span>
                                <span className={`absolute inset-0 flex items-center justify-center ${joined ? 'opacity-100' : 'opacity-0'}`}>
                                    Unido
                                </span>
                            </button>
                        </div>

                        {/* Botón desktop */}
                        <div className="hidden md:flex shrink-0 self-start pt-1">
                            <button
                                onClick={() => setJoined(v => !v)}
                                style={{ minWidth: '100px' }}
                                className={`font-inconsolata text-xs font-bold uppercase tracking-wide px-6 py-3 rounded-md transition-all relative border border-[#E3FEF7]/30  ${joined
                                        ? 'bg-white/20 text-[#E3FEF7]'
                                        : 'bg-[#E3FEF7] text-[#003C43] hover:opacity-90'
                                    }`}
                            >
                                <span className={joined ? 'opacity-0' : 'opacity-100'}>Unirme</span>
                                <span className={`absolute inset-0 flex items-center justify-center ${joined ? 'opacity-100' : 'opacity-0'}`}>
                                    Unido
                                </span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex mb-6 mt-4 gap-4 items-center px-3">
                <h2
                    className="font-inconsolata text-lg font-bold text-[#003C43]"
                    style={{ letterSpacing: '-0.01em' }}
                >
                    Temas recientes
                </h2>
                <button
                    onClick={() => setModalOpen(true)}
                    className="bg-[#003C43] text-[#E3FEF7] font-inconsolata text-xs font-bold uppercase tracking-wide px-4 py-3 rounded-md hover:bg-[#00252a] transition-colors flex items-center gap-2"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Nuevo tema
                </button>
            </div>

            {/* Lista de posts */}
            {posts.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center">
                    <MessageSquare className="w-10 h-10 text-[#003C43]/20 mx-auto mb-4" />
                    <p className="font-inconsolata text-[#003C43] font-semibold mb-2">Todavía no hay temas</p>
                    <p className="text-sm text-[#181c1d]/55 font-noto-sans">Sé el primero en abrir una conversación.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {posts.map((post) => (
                        <Link
                            href={`/foros/${slug}/${post.id}`}
                            key={post.id}
                            className="group bg-white rounded-xl p-6 hover:shadow-[0_20px_40px_rgba(0,60,67,0.07)] transition-shadow cursor-pointer"
                        >
                            <div className="flex items-start gap-4">

                                {/* Avatar */}
                                <div
                                    className="rounded-full bg-[#E3FEF7] flex items-center justify-center shrink-0 font-inconsolata font-bold text-[#003C43] text-sm mt-1"
                                    style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px' }}
                                >
                                    {post.authorName.charAt(0)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    {/* Título + pin */}
                                    <div className="flex items-center gap-2 mb-1">
                                        {post.isPinned && (
                                            <Pin className="w-3 h-3 text-[#003C43]/40 shrink-0" />
                                        )}
                                        <h3
                                            className="font-inconsolata font-bold text-[#003C43] text-base leading-snug group-hover:text-[#00252a] transition-colors"
                                            style={{ letterSpacing: '-0.01em' }}
                                        >
                                            {post.title}
                                        </h3>
                                    </div>

                                    {/* Extracto */}
                                    <p className="text-sm text-[#181c1d]/65 font-noto-sans leading-relaxed mb-3 line-clamp-2">
                                        {post.content}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {post.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="font-inconsolata text-[0.6rem] font-bold uppercase tracking-wider text-[#003C43] bg-[#E3FEF7] px-3 py-1.5 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#181c1d]/45 font-noto-sans">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3 shrink-0" />
                                            {post.authorName} · {timeAgo(post.createdAt)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MessageSquare className="w-3 h-3 shrink-0" />
                                            {post.repliesCount} respuestas
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Heart className="w-3 h-3 shrink-0" />
                                            {post.likesCount}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Modal Nuevo Tema */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-[#00252a]/60 backdrop-blur-sm"
                        onClick={handleCloseModal}
                    />
                    <div className="relative bg-white rounded-2xl w-full max-w-xl p-10 shadow-[0_20px_60px_rgba(0,60,67,0.2)] z-10">

                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/50 mb-1">
                                    {forum.title}
                                </p>
                                <h2
                                    className="font-inconsolata text-xl font-bold text-[#003C43]"
                                    style={{ letterSpacing: '-0.02em' }}
                                >
                                    Nuevo tema
                                </h2>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f0f4f4] transition-colors text-[#003C43]/50 hover:text-[#003C43]"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col gap-5">

                            <div className="flex flex-col gap-1.5">
                                <label className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/55">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                    placeholder="¿Sobre qué querés hablar?"
                                    className="w-full font-noto-sans text-sm text-[#181c1d] placeholder:text-[#181c1d]/30 bg-transparent border-b-2 border-[#003C43]/15 focus:border-[#003C43] outline-none py-2 transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/55">
                                    Contenido
                                </label>
                                <textarea
                                    value={contenido}
                                    onChange={e => setContenido(e.target.value)}
                                    placeholder="Compartí tu experiencia, pregunta o reflexión..."
                                    rows={5}
                                    className="w-full font-noto-sans text-sm text-[#181c1d] placeholder:text-[#181c1d]/30 bg-[#f6fafa] rounded-lg p-3 outline-none border-2 border-transparent focus:border-[#003C43]/20 transition-colors resize-none"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/55">
                                    Etiquetas <span className="normal-case opacity-60">(Enter para agregar, máx. 5)</span>
                                </label>
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={e => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    placeholder="ej: inmunoterapia"
                                    className="w-full font-noto-sans text-sm text-[#181c1d] placeholder:text-[#181c1d]/30 bg-transparent border-b-2 border-[#003C43]/15 focus:border-[#003C43] outline-none py-2 transition-colors"
                                />
                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="inline-flex items-center gap-1.5 font-inconsolata text-[0.6rem] font-bold uppercase tracking-wider text-[#003C43] bg-[#E3FEF7] px-3 py-1.5 rounded-full"
                                            >
                                                {tag}
                                                <button
                                                    onClick={() => setTags(prev => prev.filter((_, idx) => idx !== i))}
                                                    className="hover:opacity-60 transition-opacity leading-none"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    onClick={handleCloseModal}
                                    className="font-inconsolata text-xs font-bold uppercase tracking-wide text-[#003C43]/55 hover:text-[#003C43] transition-colors px-4 py-2.5"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    disabled={!titulo.trim() || !contenido.trim()}
                                    className="bg-[#003C43] text-[#E3FEF7] font-inconsolata text-xs font-bold uppercase tracking-wide px-6 py-3 rounded-md hover:bg-[#00252a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    Publicar tema
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}