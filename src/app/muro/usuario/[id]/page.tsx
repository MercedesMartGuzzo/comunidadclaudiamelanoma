'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';

import {
    ArrowLeft,
    MapPin,
    CalendarDays,
    Birdhouse,
    X,
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SidebarLeft from '@/components/muro/SliderbarLeft';
import SidebarRight from '@/components/muro/SliderbarRight';
import CreatePost from '@/components/muro/CreatePost';
import PostCard, { type PostCardType, type CommentCardType } from '@/components/muro/PostCard';

import { AnimatePresence, motion } from 'framer-motion';

interface DBProfile {
    id: string;
    name: string | null;
    username: string | null;
    location: string | null;
    bio: string | null;
    avatar_url: string | null;
    diagnosis: string | null;
    created_at?: string;
}

interface SUPABASE_POST {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
}

interface SUPABASE_COMMENT {
    id: string;
    post_id: string;
    user_id: string;
    content: string;
    author_name: string | null;
    created_at: string;
}

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function UserProfilePage({ params }: Props) {
    const { id: targetUserId } = use(params);

    const [profile, setProfile] = useState<DBProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [localPosts, setLocalPosts] = useState<PostCardType[]>([]);
    const [localComments, setLocalComments] = useState<CommentCardType[]>([]);

    useEffect(() => {
        async function fetchProfileAndContent() {
            try {
                setLoading(true);

                // 1. Obtener los datos del perfil del usuario
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('id, name, username, location, bio, avatar_url, diagnosis, created_at')
                    .eq('id', targetUserId)
                    .maybeSingle();

                if (profileError) throw profileError;

                if (!profileData) {
                    setProfile(null);
                    setLoading(false);
                    return;
                }

                setProfile(profileData);

                // 2. Traer publicaciones reales del usuario desde Supabase
                const { data: postsData, error: postsError } = await supabase
                    .from('posts')
                    .select('id, user_id, content, created_at')
                    .eq('user_id', targetUserId)
                    .order('created_at', { ascending: false });

                if (postsError) throw postsError;

                // Mapeamos usando las propiedades requeridas por PostCardType
                const mappedPosts: PostCardType[] = ((postsData || []) as SUPABASE_POST[]).map((p) => ({
                    id: p.id,
                    userId: p.user_id,
                    content: p.content,
                    likesCount: 0,
                    commentsCount: 0,
                    createdAt: p.created_at,
                    authorName: profileData.name || 'Usuario',
                    authorLocation: profileData.location || 'Sin ubicación',
                    authorAvatar: profileData.avatar_url || null,
                }));

                setLocalPosts(mappedPosts);

                // 3. Traer los comentarios asociados a esas publicaciones si existen
                if (mappedPosts.length > 0) {
                    const postIds = mappedPosts.map((p) => p.id);
                    const { data: commentsData, error: commentsError } = await supabase
                        .from('comments')
                        .select('id, post_id, user_id, content, author_name, created_at')
                        .in('post_id', postIds)
                        .order('created_at', { ascending: true });

                    if (commentsError) throw commentsError;

                    const mappedComments: CommentCardType[] = ((commentsData || []) as SUPABASE_COMMENT[]).map((c) => ({
                        id: c.id,
                        postId: c.post_id,
                        authorName: c.author_name || 'Usuario',
                        content: c.content,
                        createdAt: c.created_at,
                    }));

                    setLocalComments(mappedComments);

                    // Sincronizar el contador de comentarios en el estado local de cada post
                    setLocalPosts((prevPosts) =>
                        prevPosts.map((post) => ({
                            ...post,
                            commentsCount: mappedComments.filter((c) => c.postId === post.id).length,
                        }))
                    );
                }

            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : String(err);
                console.error('Error cargando el contenido del perfil:', errorMsg);
            } finally {
                setLoading(false);
            }
        }

        if (targetUserId) {
            fetchProfileAndContent();
        }
    }, [targetUserId]);

    const handleAddComment = async (postId: string, content: string) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: profileResponse } = await supabase
                .from('profiles')
                .select('name')
                .eq('id', user.id)
                .maybeSingle();

            const authorName = profileResponse?.name || user.user_metadata?.name || 'Vos';

            const { data: newCommentData, error } = await supabase
                .from('comments')
                .insert([
                    {
                        post_id: postId,
                        user_id: user.id,
                        content: content,
                        author_name: authorName,
                    },
                ])
                .select()
                .single();

            if (error) throw error;

            const insertedComment = newCommentData as SUPABASE_COMMENT;

            const newComment: CommentCardType = {
                id: insertedComment.id,
                postId: insertedComment.post_id,
                authorName: insertedComment.author_name || 'Vos',
                content: insertedComment.content,
                createdAt: insertedComment.created_at,
            };

            setLocalComments((prev) => [...prev, newComment]);

            setLocalPosts((prev) =>
                prev.map((post) =>
                    post.id === postId
                        ? { ...post, commentsCount: post.commentsCount + 1 }
                        : post
                )
            );
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            console.error('Error al agregar comentario:', errorMsg);
        }
    };

    const handleAddPost = async (content: string) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: newPostData, error } = await supabase
                .from('posts')
                .insert([
                    {
                        user_id: user.id,
                        content: content,
                    },
                ])
                .select()
                .single();

            if (error) throw error;

            const insertedPost = newPostData as SUPABASE_POST;

            const newPost: PostCardType = {
                id: insertedPost.id,
                userId: insertedPost.user_id,
                content: insertedPost.content,
                likesCount: 0,
                commentsCount: 0,
                createdAt: insertedPost.created_at,
                authorName: profile?.name || 'Vos',
                authorLocation: profile?.location || 'Sin ubicación',
                authorAvatar: profile?.avatar_url || null,
            };

            setLocalPosts((prev) => [newPost, ...prev]);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            console.error('Error al agregar publicación:', errorMsg);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <main className="bg-[#f6fafa] min-h-screen pt-28 pb-16 px-4 flex justify-center items-center">
                    <p className="animate-pulse text-[#003C43] font-inconsolata">Cargando perfil...</p>
                </main>
                <Footer />
            </>
        );
    }

    if (!profile) {
        return (
            <>
                <Header />
                <main className="bg-[#f6fafa] min-h-screen pt-28 pb-16 px-4 flex flex-col justify-center items-center gap-4">
                    <p className="text-red-500 font-inconsolata">El usuario no existe o el perfil no fue encontrado.</p>
                    <Link href="/muro" className="text-sm text-[#003C43] underline">Volver al muro</Link>
                </main>
                <Footer />
            </>
        );
    }

    const userName = profile.name || 'Usuario';
    const userLocation = profile.location || 'Sin ubicación';
    const joinedDate = profile.created_at 
        ? new Date(profile.created_at).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
        : 'Recientemente';

    return (
        <>
            <Header />

            <main className="bg-[#f6fafa] min-h-screen pt-28 pb-16 px-4">
                <div className="max-w-[1400px] mx-auto">

                    {/* Volver */}
                    <Link
                        href="/muro"
                        className="inline-flex items-center gap-2 text-sm text-[#003C43]/60 hover:text-[#003C43] transition-colors font-noto-sans mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a la comunidad
                    </Link>

                    {/* GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 items-start">

                        {/* LEFT */}
                        <aside className="hidden lg:block sticky top-28">
                            <SidebarLeft />
                        </aside>

                        {/* CENTER */}
                        <div className="min-w-0">

                            {/* Perfil */}
                            <section className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,60,67,0.05)] mb-6">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-6">

                                    {/* AVATAR OPTIMIZADO CON NEXT/IMAGE */}
                                    <div className="relative w-24 h-24 rounded-full bg-[#E3FEF7] flex items-center justify-center text-[#003C43] font-inconsolata text-3xl font-bold shrink-0 overflow-hidden">
                                        {profile.avatar_url ? (
                                            <Image 
                                                src={profile.avatar_url}
                                                alt={userName}
                                                fill
                                                sizes="96px"
                                                className="object-cover"
                                                priority
                                            />
                                        ) : (
                                            userName.charAt(0).toUpperCase()
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <h1
                                            className="font-inconsolata text-3xl font-bold text-[#003C43]"
                                            style={{ letterSpacing: '-0.02em' }}
                                        >
                                            {userName}
                                        </h1>

                                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-[#181c1d]/60 font-noto-sans">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />
                                                {userLocation}
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <CalendarDays className="w-4 h-4" />
                                                Miembro desde {joinedDate}
                                            </div>
                                        </div>

                                        {profile.diagnosis && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <span className="bg-[#E3FEF7] text-[#003C43] text-xs font-inconsolata uppercase tracking-wider px-3 py-1 rounded-full">
                                                    {profile.diagnosis}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-[#003C43]/10">
                                    <p className="font-noto-sans text-[#181c1d]/80 leading-relaxed">
                                        {profile.bio || 'Este usuario aún no ha escrito una biografía.'}
                                    </p>
                                </div>
                            </section>

                            {/* Crear publicación */}
                            <div className="mb-6">
                                <CreatePost onPublish={handleAddPost} />
                            </div>

                            {/* Publicaciones */}
                            <section>
                                <div className="flex items-center justify-between mb-6 px-1">
                                    <div>
                                        <p className="font-inconsolata text-[0.7rem] uppercase tracking-[0.12em] text-[#003C43]/50 mb-2">
                                            Actividad
                                        </p>
                                        <h2
                                            className="font-inconsolata text-2xl font-bold text-[#003C43]"
                                            style={{ letterSpacing: '-0.02em' }}
                                        >
                                            Publicaciones
                                        </h2>
                                    </div>

                                    <div className="text-sm text-[#181c1d]/50 font-noto-sans">
                                        {localPosts.length} publicaciones
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {localPosts.map((post) => (
                                        <PostCard
                                            key={post.id}
                                            post={post}
                                            comments={localComments.filter(
                                                (comment) => comment.postId === post.id
                                            )}
                                            onAddComment={handleAddComment}
                                        />
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* RIGHT */}
                        <aside className="hidden lg:block sticky top-28">
                            <SidebarRight />
                        </aside>

                    </div>
                </div>

                {/* Botón flotante mobile */}
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