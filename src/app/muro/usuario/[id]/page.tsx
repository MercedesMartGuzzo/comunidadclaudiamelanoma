'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, X } from 'lucide-react';

// Interfaces ficticias basadas en tu modelo de datos
interface Post {
    id: string;
    content: string;
    createdAt: string;
    likes: number;
    commentsCount: number;
}

interface Comment {
    id: string;
    postId: string;
    authorName: string;
    authorUsername: string;
    authorAvatar?: string;
    content: string;
}

interface UserProfile {
    name: string;
    username: string;
    bio?: string;
    location?: string;
    diagnosis?: string;
    avatar_url?: string;
}

// Componentes Mock para la estructura
const Header = () => <header className="bg-white h-16 fixed top-0 w-full z-50 border-b" />;
const Footer = () => <footer className="bg-white h-16 border-t mt-10" />;
const SidebarLeft = () => <div className="bg-white p-4 rounded-xl">Menú Izquierdo</div>;
const SidebarRight = () => <div className="bg-white p-4 rounded-xl">Menú Derecho</div>;
const Birdhouse = ({ className }: { className?: string }) => <span className={className}>🏠</span>;

// COMPONENTE POSTCARD CORREGIDO
// Ahora maneja dinámicamente la imagen real del usuario en la caja de entrada y en la lista
interface PostCardProps {
    post: Post;
    comments: Comment[];
    onAddComment: (postId: string, content: string) => void;
    currentUserAvatar?: string;
    currentUserName?: string;
}

const PostCard: React.FC<PostCardProps> = ({ 
    post, 
    comments, 
    onAddComment, 
    currentUserAvatar,
    currentUserName 
}) => {
    const [commentText, setCommentText] = useState('');

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        onAddComment(post.id, commentText);
        setCommentText('');
    };

    // Inicial de respaldo para el usuario actual
    const userInitial = (currentUserName || 'U').charAt(0).toUpperCase();

    return (
        <div className="bg-white rounded-xl p-6 border border-[#003C43]/5 shadow-sm">
            {/* Encabezado de la Publicación */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E3FEF7] relative overflow-hidden flex items-center justify-center font-bold text-[#003C43]">
                    {currentUserAvatar ? (
                        <Image src={currentUserAvatar} alt="Avatar" fill className="object-cover" unoptimized />
                    ) : (
                        userInitial
                    )}
                </div>
                <div>
                    <h3 className="font-inconsolata font-bold text-[#003C43] text-sm">{currentUserName || 'Mema'}</h3>
                    <p className="text-xs text-[#181c1d]/40 font-noto-sans">hoy · Sin ubicación</p>
                </div>
            </div>

            {/* Contenido */}
            <p className="text-sm font-noto-sans text-[#181c1d] mb-4">{post.content}</p>
            
            <hr className="border-[#003C43]/10 my-3" />

            {/* Lista de Comentarios Existentes */}
            <div className="flex flex-col gap-3 mb-4">
                {comments.map((comment) => {
                    const commentInitial = (comment.authorName || 'U').charAt(0).toUpperCase();
                    // PRIORIDAD: Usamos el avatar que viene en el comentario, si no, el del perfil actual como fallback
                    const avatarToRender = comment.authorAvatar || currentUserAvatar;

                    return (
                        <div key={comment.id} className="flex gap-3 items-start bg-[#f6fafa] p-3 rounded-xl">
                            <div className="w-8 h-8 rounded-full bg-[#E3FEF7] relative overflow-hidden flex items-center justify-center font-bold text-[#003C43] text-xs shrink-0">
                                {avatarToRender ? (
                                    <Image src={avatarToRender} alt={comment.authorName} fill className="object-cover" unoptimized />
                                ) : (
                                    commentInitial
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-inconsolata font-bold text-xs text-[#003C43]">{comment.authorName}</h4>
                                <p className="text-xs font-noto-sans text-[#181c1d]/90 mt-0.5">{comment.content}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CAJA PARA ESCRIBIR COMENTARIO (Corregida la 'V' por la foto real) */}
            <form onSubmit={handleSubmitComment} className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-[#E3FEF7] relative overflow-hidden flex items-center justify-center font-bold text-[#003C43] text-xs shrink-0">
                    {currentUserAvatar ? (
                        <Image src={currentUserAvatar} alt="Tu Avatar" fill className="object-cover" unoptimized />
                    ) : (
                        userInitial
                    )}
                </div>
                <div className="flex-1 relative flex items-center">
                    <input
                        type="text"
                        placeholder="Escribí un comentario..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full bg-[#f6fafa] rounded-full pl-4 pr-10 py-2 text-xs font-noto-sans text-[#181c1d] placeholder-[#181c1d]/40 focus:outline-none focus:ring-1 focus:ring-[#003C43]/20"
                    />
                    <button type="submit" className="absolute right-3 text-[#003C43]/40 hover:text-[#003C43] transition-colors">
                        ➔
                    </button>
                </div>
            </form>
        </div>
    );
};

// VISTA DE LA PÁGINA DE PERFIL
export default function UserProfilePage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading] = useState(false);

    // Estado simulación del Perfil de Mema (Con su foto de perritos)
    const [profile] = useState<UserProfile>({
        name: 'Mema',
        username: 'mema_ok',
        bio: 'Amante de los animales y compartiendo mi día a día.',
        location: 'Buenos Aires, Argentina',
        diagnosis: 'Ansiedad Generalizada',
        avatar_url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=100' // Tu imagen de perritos
    });

    // Publicaciones locales
    const [localPosts] = useState<Post[]>([
        { id: 'post-1', content: 'jaaaa', createdAt: '2026-05-28', likes: 0, commentsCount: 1 }
    ]);

    // Comentarios locales
    const [localComments, setLocalComments] = useState<Comment[]>([
        {
            id: 'comment-1',
            postId: 'post-1',
            authorName: 'Mema',
            authorUsername: 'mema_ok',
            authorAvatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=100', // Foto de perritos
            content: 'ahah'
        }
    ]);

    const handleAddComment = (postId: string, content: string) => {
        const newComment: Comment = {
            id: `comment-${Date.now()}`,
            postId,
            authorName: profile?.name || 'Usuario',
            authorUsername: profile?.username || 'user',
            authorAvatar: profile?.avatar_url, // Se le asigna la foto actual automáticamente
            content
        };
        setLocalComments((prev) => [...prev, newComment]);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f6fafa] flex items-center justify-center font-inconsolata text-[#003C43]">
                Cargando perfil...
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-[#f6fafa] flex flex-col items-center justify-center font-inconsolata text-[#003C43] gap-4">
                <p>El perfil que estás buscando no existe.</p>
                <Link href="/muro" className="flex items-center gap-2 text-sm font-bold underline">
                    <ArrowLeft className="w-4 h-4" /> Volver al Muro
                </Link>
            </div>
        );
    }

    return (
        <>
            <Header />
            <main className="bg-[#f6fafa] min-h-screen pt-24 pb-10 px-4">
                <div className="max-w-[1200px] mx-auto">
                    {/* Botón Volver */}
                    <Link href="/muro" className="inline-flex items-center gap-2 text-xs font-inconsolata font-bold uppercase tracking-wider text-[#003C43]/60 hover:text-[#003C43] mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al Muro
                    </Link>

                    {/* Banner / Info del Perfil */}
                    <div className="bg-white rounded-xl p-6 mb-6 hover:shadow-[0_4px_20px_rgba(0,60,67,0.04)] transition-shadow">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                            <div className="rounded-full bg-[#E3FEF7] flex items-center justify-center shrink-0 font-inconsolata font-bold text-[#003C43] text-2xl overflow-hidden relative w-20 h-20 shadow-inner">
                                {profile.avatar_url ? (
                                    <Image src={profile.avatar_url} alt={profile.name || ''} fill sizes="80px" className="object-cover" unoptimized />
                                ) : (
                                    (profile.name || 'U').charAt(0).toUpperCase()
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h1 className="font-inconsolata text-2xl font-bold text-[#003C43] mb-1">
                                    {profile.name || 'Usuario'}
                                </h1>
                                <p className="text-xs text-[#003C43]/60 font-inconsolata mb-3">
                                    @{profile.username || 'sin_usuario'}
                                </p>
                                
                                {profile.bio && (
                                    <p className="text-sm text-[#181c1d]/80 font-noto-sans mb-4 max-w-2xl leading-relaxed">
                                        {profile.bio}
                                    </p>
                                )}

                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-xs text-[#181c1d]/50 font-noto-sans">
                                    {profile.location && (
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" /> {profile.location}
                                        </span>
                                    )}
                                    {profile.diagnosis && (
                                        <span className="bg-[#E3FEF7] text-[#003C43] px-2 py-0.5 rounded font-medium text-[11px]">
                                            {profile.diagnosis}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Layout Principal del Perfil */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="hidden lg:block lg:col-span-1">
                            <SidebarLeft />
                        </div>

                        <div className="lg:col-span-2 flex flex-col gap-4">
                            <h2 className="font-inconsolata text-lg font-bold text-[#003C43] px-1 mt-2">
                                Publicaciones de {profile.name || 'este usuario'}
                            </h2>

                            {localPosts.length === 0 ? (
                                <p className="text-[#181c1d]/50 font-noto-sans text-sm text-center py-10 bg-white rounded-xl">
                                    Este usuario todavía no realizó ninguna publicación.
                                </p>
                            ) : (
                                localPosts.map((post) => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        comments={localComments.filter((c) => c.postId === post.id)}
                                        onAddComment={handleAddComment}
                                        currentUserAvatar={profile.avatar_url}
                                        currentUserName={profile.name}
                                    />
                                ))
                            )}
                        </div>

                        <div className="hidden lg:block lg:col-span-1">
                            <SidebarRight />
                        </div>
                    </div>
                </div>

                {/* Botón Drawer para Mobile */}
                <button
                    onClick={() => setDrawerOpen(true)}
                    className="lg:hidden fixed bottom-6 right-6 z-40 w-12 h-12 bg-[#003C43] text-[#E3FEF7] rounded-full shadow-lg flex items-center justify-center"
                >
                    <Birdhouse className="w-5 h-5" />
                </button>

                {/* Drawer Menu */}
                <AnimatePresence>
                    {drawerOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="lg:hidden fixed inset-0 z-40 bg-[#00252a]/50 backdrop-blur-sm"
                                onClick={() => setDrawerOpen(false)}
                            />
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="lg:hidden fixed top-0 left-0 z-50 h-full w-[300px] bg-[#f6fafa] shadow-2xl overflow-y-auto"
                            >
                                <div className="flex items-center justify-between p-5 border-b border-[#003C43]/10">
                                    <span className="font-inconsolata font-bold text-[#003C43] text-sm uppercase">Menú</span>
                                    <button onClick={() => setDrawerOpen(false)} className="text-[#003C43]/50">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-4 flex flex-col gap-4">
                                    <SidebarLeft />
                                    <SidebarRight />
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </main>
            <Footer />
        </>
    );
}