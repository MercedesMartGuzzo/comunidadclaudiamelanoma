'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { type PostCardType } from '@/components/muro/PostCard';
import Feed from '@/components/muro/Feed';
import CreatePost from '@/components/muro/CreatePost';
import SidebarLeft from '@/components/muro/SliderbarLeft';
import SidebarRight from '@/components/muro/SliderbarRight'; 

interface PostProfile {
    name: string;
    location: string;
    avatar_url: string | null;
}

interface PostRaw {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    profiles: PostProfile | null;
}

export default function MuroPage() {
    const [localPosts, setLocalPosts] = useState<PostCardType[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string>('');
    const [currentUserAvatar, setCurrentUserAvatar] = useState<string | null>(null);
    const [currentUserName, setCurrentUserName] = useState<string>('Usuario');

    const fetchFeedData = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            setCurrentUserId(user.id);
            const { data: profile } = await supabase.from('profiles').select('name, avatar_url').eq('id', user.id).maybeSingle();
            if (profile) {
                setCurrentUserAvatar(profile.avatar_url);
                setCurrentUserName(profile.name || 'Vos');
            }
        }

        const { data: postsData } = await supabase
            .from('posts')
            .select('id, user_id, content, created_at, profiles(name, location, avatar_url)')
            .order('created_at', { ascending: false });
        
        const typedPosts = (postsData as unknown as PostRaw[]) || [];
        
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
    }, []);

    const handleDelete = async (postId: string) => {
        await supabase.from('posts').delete().eq('id', postId);
        setLocalPosts(prev => prev.filter(p => p.id !== postId));
    };

    const handleUpdate = async (postId: string, newContent: string) => {
        await supabase.from('posts').update({ content: newContent }).eq('id', postId);
        setLocalPosts(prev => prev.map(p => p.id === postId ? { ...p, content: newContent } : p));
    };

    useEffect(() => {
        (async () => {
            await fetchFeedData();
        })();
    }, [fetchFeedData]);

    return (
        <main className="bg-[#f6fafa] min-h-screen pt-24 pb-10 px-4">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="hidden lg:block lg:col-span-1"><SidebarLeft /></div>
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <CreatePost onPublish={fetchFeedData} />
                        <Feed 
                            posts={localPosts} 
                            comments={[]} 
                            onAddComment={() => {}} 
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