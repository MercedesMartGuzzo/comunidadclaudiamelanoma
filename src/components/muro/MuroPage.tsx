'use client';

import { useState } from 'react';
import { feedPosts, feedComments, FeedPost, FeedComment } from '@/lib/mock-data/feed/feed-posts';
import PostCard from '@/components/muro/PostCard';
import CreatePost from '@/components/muro/CreatePost';
import SidebarLeft from '@/components/muro/SliderbarLeft';
import SidebarRight from '@/components/muro/SliderbarRight';


export default function MuroPage() {
    const [localPosts, setLocalPosts] = useState<FeedPost[]>(feedPosts);
    const [localComments, setLocalComments] = useState<FeedComment[]>(feedComments);

    const handleAddPost = (content: string) => {
        const newPost: FeedPost = {
            id: String(Date.now()),
            userId: '1',
            content,
            tags: [],
            likesCount: 0,
            commentsCount: 0,
            createdAt: new Date().toISOString(),
        };
        setLocalPosts(prev => [newPost, ...prev]);
    };

    const handleAddComment = (postId: string, content: string) => {
        const newComment: FeedComment = {
            id: String(Date.now()),
            postId,
            authorName: 'Vos',
            content,
            createdAt: new Date().toISOString(),
        };
        setLocalComments(prev => [...prev, newComment]);
        setLocalPosts(prev =>
            prev.map(p => p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p)
        );
    };

    return (
        <main className="bg-[#f6fafa] min-h-screen pt-24 pb-10 px-4">
            <div className="max-w-[1200px] mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/55 mb-3">
                        Comunidad CCM
                    </p>
                    <h1
                        className="font-inconsolata text-4xl sm:text-5xl font-bold text-[#003C43] mb-4"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Muro
                    </h1>
                    <p className="text-[#181c1d]/70 text-lg font-noto-sans max-w-2xl leading-relaxed">
                        Compartí tu experiencia, leé las historias de la comunidad y conectate con otras personas.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    <div className="lg:col-span-1 order-2 lg:order-1">
                        <SidebarLeft />
                    </div>

                    <div className="lg:col-span-2 order-1 lg:order-2 flex flex-col gap-4">
                        <CreatePost onPublish={handleAddPost} />
                        <div className="flex flex-col gap-4">
                            {localPosts.map(post => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    comments={localComments.filter(c => c.postId === post.id)}
                                    onAddComment={handleAddComment}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1 order-3">
                        <SidebarRight />
                    </div>

                </div>
            </div>
        </main>
    );
}