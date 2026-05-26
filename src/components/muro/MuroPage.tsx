'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { type PostCardType, type CommentCardType } from '@/components/muro/PostCard';
import Feed from '@/components/muro/Feed';
import CreatePost from '@/components/muro/CreatePost';
import SidebarLeft from '@/components/muro/SliderbarLeft';
import SidebarRight from '@/components/muro/SliderbarRight';
import { Birdhouse, X } from 'lucide-react';

interface SupabasePostJoin {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    profiles: {
        name: string | null;
        location: string | null;
        avatar_url: string | null;
    } | null;
}

interface SupabaseCommentJoin {
    id: string;
    post_id: string;
    user_id: string;
    content: string;
    created_at: string;
    profiles: {
        name: string | null;
    } | null;
}

export default function MuroPage() {
    const [localPosts, setLocalPosts] = useState<PostCardType[]>([]);
    const [localComments, setLocalComments] = useState<CommentCardType[]>([]);
    const [loadingFeed, setLoadingFeed] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);

    async function fetchFeedData() {
        try {
            setLoadingFeed(true);

            // 1. Obtener publicaciones cruzadas con perfiles de usuarios (Join)
            const { data: postsData, error: postsError } = await supabase
                .from('posts')
                .select('id, user_id, content, created_at, profiles(name, location, avatar_url)')
                .order('created_at', { ascending: false });

            if (postsError) throw postsError;

            const mappedPosts: PostCardType[] = ((postsData || []) as unknown as SupabasePostJoin[]).map(p => ({
                id: p.id,
                userId: p.user_id,
                content: p.content,
                createdAt: p.created_at,
                likesCount: 0,
                commentsCount: 0,
                authorName: p.profiles?.name || 'Usuario',
                authorLocation: p.profiles?.location || 'Sin ubicación',
                authorAvatar: p.profiles?.avatar_url || null,
            }));

            // 2. Obtener comentarios globales trayendo el autor desde profiles
            const { data: commentsData, error: commentsError } = await supabase
                .from('comments')
                .select('id, post_id, user_id, content, created_at, profiles(name)')
                .order('created_at', { ascending: true });

            if (commentsError) throw commentsError;

            const mappedComments: CommentCardType[] = ((commentsData || []) as unknown as SupabaseCommentJoin[]).map(c => ({
                id: c.id,
                postId: c.post_id,
                authorName: c.profiles?.name || 'Usuario',
                content: c.content,
                createdAt: c.created_at,
            }));

            // Sincronizar recuentos de comentarios por post
            const postsWithCounts = mappedPosts.map(post => ({
                ...post,
                commentsCount: mappedComments.filter(c => c.postId === post.id).length
            }));

            setLocalPosts(postsWithCounts);
            setLocalComments(mappedComments);
        } catch (err: unknown) {
            let errorMsg = '';
            if (err instanceof Error) {
                errorMsg = err.message;
            } else if (typeof err === 'object' && err !== null) {
                errorMsg = JSON.stringify(err);
            } else {
                errorMsg = String(err);
            }
            console.error('Error detallado cargando el feed de comunidad:', errorMsg);
        } finally {
            setLoadingFeed(false);
        }
    }

    useEffect(() => {
        fetchFeedData();
    }, []);

    const handleAddPost = async (content: string) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: currentProfile } = await supabase
                .from('profiles')
                .select('name, location, avatar_url')
                .eq('id', user.id)
                .maybeSingle();

            const { data: newPostData, error } = await supabase
                .from('posts')
                .insert([{ user_id: user.id, content }])
                .select('id, user_id, content, created_at')
                .single();

            if (error) throw error;

            const newPost: PostCardType = {
                id: newPostData.id,
                userId: newPostData.user_id,
                content: newPostData.content,
                createdAt: newPostData.created_at,
                likesCount: 0,
                commentsCount: 0,
                authorName: currentProfile?.name || user.user_metadata?.name || 'Vos',
                authorLocation: currentProfile?.location || 'Sin ubicación',
                authorAvatar: currentProfile?.avatar_url || null,
            };

            setLocalPosts(prev => [newPost, ...prev]);
        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            console.error('Error insertando post:', errorMsg);
        }
    };

    const handleAddComment = async (postId: string, content: string) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: profile } = await supabase
                .from('profiles')
                .select('name')
                .eq('id', user.id)
                .maybeSingle();

            const currentAuthorName = profile?.name || user.user_metadata?.name || 'Vos';

            const { data: newCommentData, error } = await supabase
                .from('comments')
                .insert([{ post_id: postId, user_id: user.id, content }])
                .select('id, post_id, user_id, content, created_at')
                .single();

            if (error) throw error;

            const newComment: CommentCardType = {
                id: newCommentData.id,
                postId: newCommentData.post_id,
                authorName: currentAuthorName,
                content: newCommentData.content,
                createdAt: newCommentData.created_at,
            };

            setLocalComments(prev => [...prev, newComment]);
            setLocalPosts(prev =>
                prev.map(p => p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p)
            );
        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            console.error('Error insertando comentario:', errorMsg);
        }
    };

    return (
        <main className="bg-[#f6fafa] min-h-screen pt-24 pb-10 px-4">
            <div className="max-w-[1200px] mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/55 mb-3">
                        Comunidad RLM
                    </p>
                    <h1
                        className="font-inconsolata text-4xl sm:text-5xl font-bold text-[#003C43] mb-4"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Comunidad
                    </h1>
                    <p className="text-[#181c1d]/70 text-lg font-noto-sans max-w-2xl leading-relaxed">
                        Compartí tu experiencia, leé las historias de la comunidad y conectate con otras personas.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* LEFT — oculto en mobile */}
                    <div className="hidden lg:block lg:col-span-1">
                        <SidebarLeft />
                    </div>

                    {/* CENTER */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <CreatePost onPublish={handleAddPost} />
                        
                        {loadingFeed ? (
                            <p className="animate-pulse text-[#003C43] font-inconsolata text-sm text-center py-10">
                                Cargando publicaciones de la comunidad...
                            </p>
                        ) : localPosts.length === 0 ? (
                            <p className="text-[#181c1d]/50 font-noto-sans text-sm text-center py-10">
                                No hay publicaciones aún. ¡Comenzá la conversación!
                            </p>
                        ) : (
                            <Feed
                                posts={localPosts}
                                comments={localComments}
                                onAddComment={handleAddComment}
                            />
                        )}
                    </div>

                    {/* RIGHT — oculto en mobile */}
                    <div className="hidden lg:block lg:col-span-1">
                        <SidebarRight />
                    </div>

                </div>
            </div>

            {/* Botón flotante mobile — abre drawer */}
            <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-40 w-12 h-12 bg-[#003C43] text-[#E3FEF7] rounded-full shadow-[0_8px_24px_rgba(0,60,67,0.3)] flex items-center justify-center hover:bg-[#00252a] transition-colors"
            >
                <Birdhouse className="w-5 h-5" />
            </button>

            {/* Drawer mobile */}
            <AnimatePresence>
                {drawerOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden fixed inset-0 z-40 bg-[#00252a]/50 backdrop-blur-sm"
                            onClick={() => setDrawerOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed top-0 left-0 z-50 h-full w-[300px] bg-[#f6fafa] shadow-2xl overflow-y-auto"
                        >
                            {/* Header del drawer */}
                            <div className="flex items-center justify-between p-5 border-b border-[#003C43]/10">
                                <span className="font-inconsolata font-bold text-[#003C43] text-sm uppercase tracking-wide">
                                    Mi perfil
                                </span>
                                <button
                                    onClick={() => setDrawerOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#003C43]/10 transition-colors text-[#003C43]/50"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Contenido del drawer */}
                            <div className="p-4 flex flex-col gap-4">
                                <SidebarLeft />
                                <SidebarRight />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </main>
    );
}