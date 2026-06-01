'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Bird } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SidebarLeft from '@/components/muro/SliderbarLeft';
import SidebarRight from '@/components/muro/SliderbarRight';
import Feed from '@/components/muro/Feed';
import CreatePost from '@/components/muro/CreatePost';
import { type PostCardType, type CommentCardType } from '@/components/muro/PostCard';

// 1. Definición de tipos basada en lo que realmente recibes de Supabase
interface UserProfile {
    name: string;
    location: string;
    bio: string;
}

interface SupabasePost {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    profiles: {
        name: string;
        location: string;
        avatar_url: string | null;
    } | null;
}

interface SupabaseComment {
    id: string;
    post_id: string;
    content: string;
    created_at: string;
    profiles: {
        name: string;
        avatar_url: string | null;
    } | null;
}

type Params = Promise<{ id: string }>;

export default function UserProfilePage(props: { params: Params }) {
    const params = use(props.params);
    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [posts, setPosts] = useState<PostCardType[]>([]);
    const [comments, setComments] = useState<CommentCardType[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchEverything = async () => {
            setLoading(true);
            const userId = params.id;

            // Consultas directas a Supabase sin funciones intermedias que fallan
            const { data: profileData } = await supabase
                .from('profiles')
                .select('name, location, bio')
                .eq('id', userId)
                .maybeSingle();

            const { data: postsData } = await supabase
                .from('posts')
                .select('id, user_id, content, created_at, profiles(name, location, avatar_url)')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            const { data: commentsData } = await supabase
                .from('comments')
                .select('id, post_id, content, created_at, profiles(name, avatar_url)');

            // Actualización de estado con mapeo explícito
            if (profileData) {
                setProfile(profileData as UserProfile);
            }

            if (postsData) {
                const formattedPosts: PostCardType[] = (postsData as unknown as SupabasePost[]).map((item) => ({
                    id: item.id,
                    userId: item.user_id,
                    content: item.content,
                    createdAt: item.created_at,
                    likesCount: 0,
                    commentsCount: 0,
                    authorName: item.profiles?.name ?? 'Usuario',
                    authorLocation: item.profiles?.location ?? 'Sin ubicación',
                    authorAvatar: item.profiles?.avatar_url ?? null
                }));
                setPosts(formattedPosts);
            }

            if (commentsData) {
                const formattedComments: CommentCardType[] = (commentsData as unknown as SupabaseComment[]).map((item) => ({
                    id: item.id,
                    postId: item.post_id,
                    content: item.content,
                    createdAt: item.created_at,
                    authorName: item.profiles?.name ?? 'Usuario',
                    authorAvatar: item.profiles?.avatar_url ?? null
                }));
                setComments(formattedComments);
            }

            setLoading(false);
        };

        fetchEverything();
    }, [params.id]);

    const handleAddComment = async (postId: string, content: string): Promise<void> => {
        const { data: authData } = await supabase.auth.getUser();
        if (!authData.user) return;

        const { data: newCommentData } = await supabase
            .from('comments')
            .insert([{
                post_id: postId,
                user_id: authData.user.id,
                content: content
            }])
            .select('id, post_id, content, created_at, profiles(name, avatar_url)')
            .single();

        if (newCommentData) {
            const raw = newCommentData as unknown as SupabaseComment;
            const newComment: CommentCardType = {
                id: raw.id,
                postId: raw.post_id,
                content: raw.content,
                createdAt: raw.created_at,
                authorName: raw.profiles?.name ?? 'Usuario',
                authorAvatar: raw.profiles?.avatar_url ?? null
            };
            setComments((prev) => [...prev, newComment]);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin w-10 h-10 text-[#003C43]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f6fafa]">
            <Header />
            <main className="pt-24 pb-10 px-4">
                {/* Navegación Móvil */}
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 z-50 bg-black/50 lg:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <div
                            className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-[#f6fafa] shadow-xl p-6 overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <SidebarLeft />
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <SidebarRight />
                            </div>
                        </div>
                    </div>
                )}

                {/* Botón flotante móvil */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="lg:hidden fixed bottom-6 right-6 z-40 bg-[#003C43] text-white p-4 rounded-full shadow-lg"
                >
                    <Bird size={24} />
                </button>

                <div className="max-w-[1200px] mx-auto">
                    <Link href="/muro" className="flex items-center gap-2 text-xs font-bold uppercase text-[#003C43]/60 mb-6">
                        <ArrowLeft className="w-4 h-4" /> Volver al muro
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="hidden lg:block lg:col-span-1"><SidebarLeft /></div>
                        <div className="lg:col-span-2">
                            <div className="bg-[var(--clr-primary)] text-white p-6 rounded-xl mb-6 shadow-sm border border-gray-100">
                                <h1 className="text-2xl text-white font-bold text-[#003C43]">{profile?.name ?? 'Cargando...'}</h1>
                                <p className="text-sm text-white">{profile?.location ?? 'Ubicación no disponible'}</p>
                                <p className="mt-4 text-white">{profile?.bio ?? 'Este usuario no tiene biografía.'}</p>
                            </div>
                            <CreatePost onPublish={() => {}} />
                            <Feed
                                posts={posts}
                                comments={comments}
                                onAddComment={handleAddComment}
                                onDelete={async (id) => {
                                    await supabase.from('posts').delete().eq('id', id);
                                    setPosts(prev => prev.filter(p => p.id !== id));
                                }}
                                onUpdate={async (id, content) => {
                                    await supabase.from('posts').update({ content }).eq('id', id);
                                    setPosts(prev => prev.map(p => p.id === id ? { ...p, content } : p));
                                }}
                                currentUserId={params.id}
                                currentUserName={profile?.name ?? 'Usuario'}
                            />
                        </div>

                        <div className="hidden lg:block lg:col-span-1"><SidebarRight /></div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}