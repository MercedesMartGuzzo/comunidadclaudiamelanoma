'use client';

import { useState, useEffect } from 'react';
import LinkActual from 'next/link'; 
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, MessageSquare, Clock3 } from 'lucide-react';
import { addComment } from '@/lib/supabase/actions';
import { supabase } from '@/lib/supabase/client';

interface Profile {
    name: string;
    avatar_url?: string | null;
}

interface Reply {
    id: string;
    content: string;
    created_at: string;
    profiles: Profile | null;
}

interface Post {
    id: string;
    title: string;
    content: string;
    created_at: string;
    profiles: Profile | null;
    likes_count?: number;
    forum_title?: string;
    forum_id?: string;
}

interface Props {
    slug: string;
    post: Post | null;
    comments: Reply[];
}

function formatTimeAgo(dateString: string): string {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();
    
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Hace un momento';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    return `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
}

export default function ForoPostPage({ slug, post, comments }: Props) {
    const [replyContent, setReplyContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post?.likes_count || 0);
    
    const router = useRouter();

    useEffect(() => {
        if (!post) return;
        
        async function syncLikeData() {
            const { data: { user } } = await supabase.auth.getUser();
            
            // 1. Verificar si el usuario actual dio like
            if (user) {
                const { data } = await supabase
                    .from('likes')
                    .select('id')
                    .eq('post_id', post!.id)
                    .eq('target_type', 'foro')
                    .eq('user_id', user.id)
                    .maybeSingle();

                if (data) setIsLiked(true);
            }

            // 2. Obtener el conteo real y actualizado de la DB
            const { count, error } = await supabase
                .from('likes')
                .select('*', { count: 'exact', head: true })
                .eq('post_id', post!.id)
                .eq('target_type', 'foro');
                
            if (!error && count !== null) {
                setLikeCount(count);
            }
        }
        syncLikeData();
    }, [post]);

    const handleToggleLike = async () => {
        if (!post) return;
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return alert("Debes iniciar sesión para dar me gusta");

        const wasLiked = isLiked;
        const previousCount = likeCount;

        // Optimistic UI
        setIsLiked(!wasLiked);
        setLikeCount(wasLiked ? likeCount - 1 : likeCount + 1);

        try {
            if (wasLiked) {
                await supabase.from('likes')
                    .delete()
                    .eq('post_id', post!.id)
                    .eq('target_type', 'foro')
                    .eq('user_id', user.id);
            } else {
                await supabase.from('likes')
                    .insert({ 
                        post_id: post!.id, 
                        user_id: user.id, 
                        target_type: 'foro' 
                    });
            }
            // Sincronizar estado final
            router.refresh();
        } catch (error) {
            setIsLiked(wasLiked);
            setLikeCount(previousCount);
            console.error("Error al gestionar like:", error);
        }
    };

    const handleAddReply = async () => {
        if (!replyContent.trim() || !post) return;
        setIsSubmitting(true);
        try {
            await addComment(post!.id, replyContent);
            setReplyContent('');
            router.refresh();
        } catch (error) {
            console.error("Error al publicar:", error);
            alert("No se pudo publicar la respuesta.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!post) {
        return (
            <div className="pt-40 text-center">
                <p className="font-inconsolata text-[#003C43] text-xl">Tema no encontrado.</p>
                <LinkActual href={`/foros/${slug}`} className="text-sm text-[#003C43]/60 mt-4 inline-block hover:opacity-70">
                    ← Volver al foro
                </LinkActual>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
            <LinkActual href={`/foros/${slug}`} className="flex items-center gap-2 text-sm text-[#003C43]/55 hover:text-[#003C43] transition font-noto-sans mb-6 group w-fit">
                <ArrowLeft className="w-4 h-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
                <span className="leading-none">{post.forum_title || 'Foro'}</span>
            </LinkActual>

            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,60,67,0.05)] overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="relative rounded-full bg-[#E3FEF7] flex items-center justify-center shrink-0 font-inconsolata font-bold text-[#003C43] text-sm mt-1 overflow-hidden" style={{ width: '40px', height: '40px' }}>
                            {post.profiles?.avatar_url ? (
                                <Image src={post.profiles.avatar_url} alt={post.profiles.name || 'Avatar'} width={40} height={40} className="object-cover w-full h-full" />
                            ) : (
                                post.profiles?.name?.charAt(0).toUpperCase() || '?'
                            )}
                        </div>
                        <div>
                            <p className="font-inconsolata font-bold text-[#003C43] text-sm">{post.profiles?.name || 'Anónimo'}</p>
                            <p className="text-xs text-[#181c1d]/45 font-noto-sans flex items-center gap-1 mt-0.5">
                                <Clock3 className="w-3 h-3" /> {formatTimeAgo(post.created_at)}
                            </p>
                        </div>
                    </div>
                    
                    <h1 className="font-inconsolata text-xl sm:text-2xl font-bold text-[#003C43] leading-snug mb-3">{post.title}</h1>
                    <p className="text-sm text-[#181c1d]/75 font-noto-sans leading-relaxed mb-6">{post.content}</p>
                    
                    <div className="flex items-center gap-6 text-xs text-[#181c1d]/45 font-noto-sans">
                        <button 
                            onClick={handleToggleLike}
                            className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-red-500' : 'text-[#003C43] hover:text-[#003C43]/70'}`}
                        >
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} /> 
                            {likeCount} me gusta
                        </button>
                        <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-[#003C43]" /> {comments.length} respuestas</span>
                    </div>
                </div>

                {comments.length > 0 && (
                    <div className="bg-[#fcfefe] border-t border-[#E3FEF7] px-6 sm:px-8 py-6 flex flex-col gap-5">
                        <p className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/50 mb-1">
                            Respuestas ({comments.length})
                        </p>
                        
                        {comments.map((reply) => (
                            <div key={reply.id} className="flex items-start gap-3 pl-2 sm:pl-4">
                                <div className="relative rounded-full bg-[#E3FEF7] flex items-center justify-center shrink-0 font-inconsolata font-bold text-[#003C43] text-xs mt-0.5 overflow-hidden" style={{ width: '32px', height: '32px' }}>
                                    {reply.profiles?.avatar_url ? (
                                        <Image src={reply.profiles.avatar_url} alt={reply.profiles.name || 'Avatar'} width={32} height={32} className="object-cover w-full h-full" />
                                    ) : (
                                        reply.profiles?.name?.charAt(0).toUpperCase() || '?'
                                    )}
                                </div>
                                <div className="flex-1 bg-white border border-[#E3FEF7] rounded-xl p-4 shadow-[0_2px_8px_rgba(0,60,67,0.02)]">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="font-inconsolata font-bold text-[#003C43] text-xs">{reply.profiles?.name || 'Usuario'}</p>
                                        <p className="text-[10px] text-[#181c1d]/40 font-noto-sans flex items-center gap-1">
                                            <Clock3 className="w-2.5 h-2.5" /> {formatTimeAgo(reply.created_at)}
                                        </p>
                                    </div>
                                    <p className="text-sm text-[#181c1d]/75 font-noto-sans leading-relaxed">{reply.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-white border-t border-[#E3FEF7] p-6 sm:p-8">
                    <div className="flex items-start gap-3">
                        <div className="w-full">
                            <textarea
                                value={replyContent}
                                onChange={e => setReplyContent(e.target.value)}
                                placeholder="Escribe una respuesta..."
                                rows={3}
                                className="w-full font-noto-sans text-sm text-[#181c1d] bg-[#f6fafa] rounded-xl p-4 outline-none border-2 border-transparent focus:border-[#E3FEF7] transition-colors resize-none mb-3"
                            />
                            <div className="flex justify-end">
                                <button
                                    disabled={!replyContent.trim() || isSubmitting}
                                    onClick={handleAddReply}
                                    className="bg-[#003C43] text-[#E3FEF7] font-inconsolata text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-lg hover:bg-[#00252a] transition-colors disabled:opacity-40 flex items-center gap-2"
                                >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    {isSubmitting ? 'Enviando...' : 'Responder'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}