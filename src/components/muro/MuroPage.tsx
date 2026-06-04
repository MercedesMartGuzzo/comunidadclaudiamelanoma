'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { type PostCardType, type CommentCardType } from '@/components/muro/PostCard';
import Feed from '@/components/muro/Feed';
import CreatePost from '@/components/muro/CreatePost';
import SidebarLeft from '@/components/muro/SliderbarLeft';
import SidebarRight from '@/components/muro/SliderbarRight';
import { Bird } from 'lucide-react';



interface PostProfile {
    name: string
    location: string
    avatar_url: string | null;
}



interface PostRaw {
    id: string
    user_id: string;
    content: string;
    created_at: string;
    profiles: PostProfile | null;
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



export default function MuroPage() {

    const [localPosts, setLocalPosts] = useState<PostCardType[]>([]);
    const [comments, setComments] = useState<CommentCardType[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string>('');
    const [currentUserAvatar, setCurrentUserAvatar] = useState<string | null>(null);
    const [currentUserName, setCurrentUserName] = useState<string>('Usuario');
    const [isMenuOpen, setIsMenuOpen] = useState(false);



    const fetchFeedData = useCallback(async () => {

        const { data: { user } } = await supabase.auth.getUser();

        if (user) {

            setCurrentUserId(user.id);

            const { data: profile } = await supabase.from('profiles').select('name, avatar_url').eq('id', user.id).maybeSingle();

            if (profile) {

                setCurrentUserAvatar(profile.avatar_url)
                setCurrentUserName(profile.name || 'Vos');
            }
        }



        const { data: postsData } = await supabase

            .from('posts')
            .select('id, user_id, content, created_at, profiles(name, location, avatar_url)')
            .order('created_at', { ascending: false });

        const { data: commentsData } = await supabase
            .from('comments')
            .select('id, post_id, content, created_at, profiles(name, avatar_url)');



        const typedPosts = (postsData as unknown as PostRaw[]) || [];
        const typedComments = (commentsData as unknown as SupabaseComment[]) || [];



        setLocalPosts(typedPosts.map(p => ({

            id: p.id,
            userId: p.user_id,
            content: p.content,
            createdAt: p.created_at,
            likesCount: 0,
            commentsCount: 0,
            authorName: p.profiles?.name || 'Usuario',
            authorLocation: p.profiles?.location || 'Sin ubicación',
            authorAvatar: p.profiles?.avatar_url || null,
        })));

        setComments(typedComments.map(c => ({
            id: c.id,
            postId: c.post_id,
            content: c.content,
            createdAt: c.created_at,
            authorName: c.profiles?.name || 'Usuario',
            authorAvatar: c.profiles?.avatar_url || null,
        })));
    }, []);



    const handleDelete = async (postId: string) => {
        await supabase.from('posts').delete().eq('id', postId);
        setLocalPosts(prev => prev.filter(p => p.id !== postId));
    };



    const handleUpdate = async (postId: string, newContent: string) => {
        await supabase.from('posts').update({ content: newContent }).eq('id', postId);
        setLocalPosts(prev => prev.map(p => p.id === postId ? { ...p, content: newContent } : p));
    };

    const handleAddComment = async (postId: string, content: string): Promise<void> => {
        const { data: authData } = await supabase.auth.getUser();
        if (!authData.user) return;

        const { data: newCommentData } = await supabase
            .from('comments')
            .insert([{ post_id: postId, user_id: authData.user.id, content: content }])
            .select('id, post_id, content, created_at, profiles(name, avatar_url)')
            .single();

        if (newCommentData) {
            const raw = newCommentData as unknown as SupabaseComment;
            setComments((prev) => [...prev, {
                id: raw.id,
                postId: raw.post_id,
                content: raw.content,
                createdAt: raw.created_at,
                authorName: raw.profiles?.name || 'Usuario',
                authorAvatar: raw.profiles?.avatar_url || null,
            }]);
        }
    };



    useEffect(() => {
        (async () => {
            await fetchFeedData();
        })();
    }, [fetchFeedData]);



    return (
        <main className="bg-[#f6fafa] min-h-screen pt-24 pb-10 px-4 relative">

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
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="hidden lg:block lg:col-span-1"><SidebarLeft /></div>
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <CreatePost onPublish={fetchFeedData} />
                        <Feed
                            posts={localPosts}
                            comments={comments}
                            onAddComment={handleAddComment}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                            currentUserId={currentUserId}
                            currentUserAvatar={currentUserAvatar}
                            currentUserName={currentUserName}
                        />
                    </div>
                    <div className="hidden lg:block lg:col-span-1"><SidebarRight /></div>
                </div>
            </div>
        </main>
    );
}

