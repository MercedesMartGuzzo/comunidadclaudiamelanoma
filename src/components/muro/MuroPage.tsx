'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { feedPosts, feedComments, FeedPost, FeedComment } from '@/lib/mock-data/feed/feed-posts';
import Feed from '@/components/muro/Feed';
import CreatePost from '@/components/muro/CreatePost';
import SidebarLeft from '@/components/muro/SliderbarLeft';
import SidebarRight from '@/components/muro/SliderbarRight';
import { LayoutDashboard, X } from 'lucide-react';

export default function MuroPage() {
    const [localPosts, setLocalPosts] = useState<FeedPost[]>(feedPosts);
    const [localComments, setLocalComments] = useState<FeedComment[]>(feedComments);
    const [drawerOpen, setDrawerOpen] = useState(false);

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

                    {/* LEFT — oculto en mobile */}
                    <div className="hidden lg:block lg:col-span-1">
                        <SidebarLeft />
                    </div>

                    {/* CENTER */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <CreatePost onPublish={handleAddPost} />
                        <Feed
                            posts={localPosts}
                            comments={localComments}
                            onAddComment={handleAddComment}
                        />
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
                <LayoutDashboard className="w-5 h-5" />
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