'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
    Wheat, Leaf, LeafyGreen, Clover, Microscope, Dumbbell,
    ArrowLeft, Users, MessageSquare, Clock
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

interface ForumData {
    id: string;
    slug: string;
    title: string;
    description: string;
    icon?: string;
    member_count?: number;
    is_member?: boolean;
}

interface CommentCount {
    count: number;
}

interface PostData {
    id: string;
    title: string;
    content: string;
    created_at: string;
    profiles: {
        name: string;
        avatar_url?: string | null;
    } | null;
    comments?: CommentCount[] | CommentCount | null; 
}

interface ForoDetallePageProps {
    slug: string;
    forum: ForumData;
    posts: PostData[];
}

function getCommentCount(comments: PostData['comments']): number {
    if (!comments) return 0;
    if (Array.isArray(comments)) {
        return comments[0]?.count ?? 0;
    }
    return (comments as CommentCount).count ?? 0;
}

export default function ForoDetallePage({ slug, forum, posts }: ForoDetallePageProps) {
    const router = useRouter();
    const supabase = createClient();

    const [isDesktop, setIsDesktop] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const IconComponent = iconComponents[slug] || MessageSquare;

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleCloseModal = () => {
        setModalOpen(false);
        setTitulo('');
        setContenido('');
    };

    const handlePublicarTema = async () => {
        if (!titulo.trim() || !contenido.trim()) return;

        try {
            setSubmitting(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert("Debés estar logueado para publicar.");
                return;
            }

            const { error } = await supabase
                .from('posts')
                .insert([
                    {
                        forum_id: forum.id,
                        user_id: user.id,
                        title: titulo.trim(),
                        content: contenido.trim(),
                    }
                ]);

            if (error) throw error;

            handleCloseModal();
            router.refresh();
        } catch (err: unknown) {
            console.error("Error al publicar:", err);
            alert("Error al publicar, intentá nuevamente.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <Link href="/foros" className="flex items-center gap-2 text-sm text-[#003C43]/55 hover:text-[#003C43] transition font-noto-sans mb-8 group w-fit">
                <ArrowLeft className="w-4 h-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
                <span className="leading-none">Directorio de Foros</span>
            </Link>

            <div className="bg-gradient-to-br from-[#00252a] to-[#003c43] rounded-2xl p-10 sm:p-16 mb-14 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                        <div className="flex flex-col min-w-0 gap-4">
                            <div className="rounded-xl bg-white/10 flex items-center justify-center mb-4 p-2 shrink-0 self-start" style={{ width: isDesktop ? '64px' : '48px', height: isDesktop ? '64px' : '48px' }}>
                                <IconComponent size={isDesktop ? 36 : 30} className="text-[#E3FEF7]" />
                            </div>
                            <h1 className="font-inconsolata text-3xl sm:text-4xl font-bold text-[#E3FEF7] mb-3">{forum.title}</h1>
                            <p className="text-[#E3FEF7]/70 font-noto-sans text-sm leading-relaxed mb-5 max-w-xl">{forum.description}</p>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                                <span className="flex items-center gap-2 text-[#E3FEF7] text-sm font-noto-sans">
                                    <Users className="w-4 h-4 shrink-0" />
                                    <span>{forum.member_count ?? 0} miembros</span>
                                </span>
                                <span className="hidden sm:block w-px h-4 bg-[#E3FEF7]/20" />
                                <span className="flex items-center gap-2 text-[#E3FEF7] text-sm font-noto-sans">
                                    <MessageSquare className="w-4 h-4 shrink-0" />
                                    <span>{posts.length} temas abiertos</span>
                                </span>
                            </div>
                        </div>

                        {forum.is_member && (
                            <div className="hidden md:flex shrink-0 self-start pt-1">
                                <div className="flex items-center gap-2 bg-white/10 border border-[#E3FEF7]/30 text-[#E3FEF7] font-inconsolata text-xs font-bold uppercase tracking-wide px-6 py-3 rounded-md">
                                    ✓ Miembro
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex mb-6 mt-4 gap-4 items-center px-3">
                <h2 className="font-inconsolata text-lg font-bold text-[#003C43]">Temas recientes</h2>
                <button onClick={() => setModalOpen(true)} className="bg-[#003C43] text-[#E3FEF7] font-inconsolata text-xs font-bold uppercase tracking-wide px-4 py-3 rounded-md hover:bg-[#00252a] transition-colors flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Nuevo tema
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {posts.map((post) => {
                    const totalComments = getCommentCount(post.comments);
                    return (
                        <Link href={`/foros/${slug}/${post.id}`} key={post.id} className="group bg-white rounded-xl p-6 hover:shadow-[0_20px_40px_rgba(0,60,67,0.07)] transition-shadow cursor-pointer block">
                            <div className="flex items-start gap-4">
                                <div className="relative rounded-full bg-[#E3FEF7] flex items-center justify-center shrink-0 font-inconsolata font-bold text-[#003C43] text-sm mt-1 overflow-hidden" style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px' }}>
                                    {post.profiles?.avatar_url ? (
                                        <Image src={post.profiles.avatar_url} alt={post.profiles.name || 'Avatar'} fill className="object-cover" />
                                    ) : (
                                        (post.profiles?.name || 'A').charAt(0).toUpperCase()
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-inconsolata font-bold text-[#003C43] text-base leading-snug group-hover:text-[#00252a] transition-colors">{post.title}</h3>
                                    <p className="text-sm text-[#181c1d]/65 font-noto-sans leading-relaxed mb-3 line-clamp-2">{post.content}</p>
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#181c1d]/45 font-noto-sans">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            Publicado por <strong className="text-[#003C43]/70">{post.profiles?.name || 'Usuario'}</strong> · {timeAgo(post.created_at)}
                                        </span>
                                        {/* CORRECCIÓN: Usamos totalComments aquí para que ESLint no marque el error */}
                                        <span className="flex items-center gap-1 ml-auto">
                                            <MessageSquare className="w-3 h-3" /> {totalComments} respuestas
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-[#00252a]/60 backdrop-blur-sm" onClick={handleCloseModal} />
                    <div className="relative bg-white rounded-2xl w-full max-w-xl p-10 shadow-[0_20px_60px_rgba(0,60,67,0.2)] z-10">
                        <h2 className="font-inconsolata text-xl font-bold text-[#003C43] mb-6">Nuevo tema</h2>
                        <div className="flex flex-col gap-5">
                            <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título" className="w-full p-2 border-b-2 border-[#003C43]/15 outline-none" />
                            <textarea value={contenido} onChange={e => setContenido(e.target.value)} placeholder="Contenido..." rows={5} className="w-full p-3 bg-[#f6fafa] rounded-lg outline-none" />
                            <div className="flex justify-end gap-3">
                                <button onClick={handleCloseModal} className="px-4 py-2 text-[#003C43]/50">Cancelar</button>
                                <button onClick={handlePublicarTema} disabled={submitting} className="bg-[#003C43] text-white px-6 py-2 rounded-md">
                                    {submitting ? 'Publicando...' : 'Publicar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}