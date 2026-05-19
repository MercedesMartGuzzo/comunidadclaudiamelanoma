'use client';

import { use } from 'react';
import { useState } from 'react';

import Link from 'next/link';
import { notFound } from 'next/navigation';

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
import PostCard from '@/components/muro/PostCard';

import { mockUsers } from '@/lib/mock-data/users';

import { AnimatePresence, motion } from 'framer-motion';
import {
    feedPosts,
    feedComments,
    FeedComment,
    FeedPost,
} from '@/lib/mock-data/feed/feed-posts';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function UserProfilePage({ params }: Props) {

    const { id } = use(params);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const user = mockUsers.find((u) => u.id === id);

    if (!user) {
        notFound();
    }

    const [localPosts, setLocalPosts] = useState<FeedPost[]>((
        feedPosts.filter((post) => post.userId === user.id)
    ));

    const [localComments, setLocalComments] =
        useState<FeedComment[]>(feedComments);

    const handleAddComment = (
        postId: string,
        content: string
    ) => {

        const newComment: FeedComment = {
            id: crypto.randomUUID(),
            postId,
            authorName: 'Vos',
            content,
            createdAt: new Date().toISOString(),
        };

        setLocalComments((prev) => [...prev, newComment]);

        setLocalPosts((prev) =>
            prev.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        commentsCount: post.commentsCount + 1,
                    }
                    : post
            )
        );
    };

    const handleAddPost = (content: string) => {

        const newPost: FeedPost = {
            id: crypto.randomUUID(),
            userId: user.id,
            content,
            likesCount: 0,
            commentsCount: 0,
            createdAt: new Date().toISOString(),
        };

        setLocalPosts((prev) => [newPost, ...prev]);
    };

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

                                    <div
                                        className="w-24 h-24 rounded-full bg-[#E3FEF7] flex items-center justify-center text-[#003C43] font-inconsolata text-3xl font-bold shrink-0"
                                    >
                                        {user.name.charAt(0)}
                                    </div>

                                    <div className="flex-1">

                                        <h1
                                            className="font-inconsolata text-3xl font-bold text-[#003C43]"
                                            style={{ letterSpacing: '-0.02em' }}
                                        >
                                            {user.name}
                                        </h1>

                                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-[#181c1d]/60 font-noto-sans">

                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />

                                                {user.location}
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <CalendarDays className="w-4 h-4" />

                                                Miembro desde {user.joinedAt}
                                            </div>

                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-2">

                                            <span className="bg-[#E3FEF7] text-[#003C43] text-xs font-inconsolata uppercase tracking-wider px-3 py-1 rounded-full">
                                                {user.diagnosis}
                                            </span>

                                      {/*       <span className="bg-[#f6fafa] text-[#003C43] text-xs font-inconsolata uppercase tracking-wider px-3 py-1 rounded-full">
                                                {user.stage}
                                            </span> */}

                                        </div>

                                    </div>

                                </div>

                                <div className="mt-8 pt-6 border-t border-[#003C43]/10">

                                    <p className="font-noto-sans text-[#181c1d]/80 leading-relaxed">
                                        {user.bio}
                                    </p>

                                </div>

                                {/* Siguiendo */}
                                {user.following.length > 0 && (
                                    <div className="mt-6 pt-6 border-t border-[#003C43]/10">
                                        <p className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/50 mb-4">
                                            Siguiendo — {user.following.length}
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {user.following.map(followingId => {
                                                const followedUser = mockUsers.find(u => u.id === followingId);
                                                if (!followedUser) return null;
                                                return (
                                                    <Link
                                                        key={followingId}
                                                        href={`/muro/usuario/${followedUser.id}`}
                                                        className="flex items-center gap-2 bg-[#f6fafa] hover:bg-[#E3FEF7] rounded-xl px-3 py-2 transition-colors"
                                                    >
                                                        <div
                                                            className="rounded-full bg-[#E3FEF7] flex items-center justify-center shrink-0 font-inconsolata font-bold text-[#003C43] text-xs"
                                                            style={{ width: '28px', height: '28px', minWidth: '28px' }}
                                                        >
                                                            {followedUser.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-inconsolata font-bold text-[#003C43] text-xs">
                                                                {followedUser.name}
                                                            </p>
                                                            <p className="text-[0.6rem] text-[#181c1d]/50 font-noto-sans">
                                                                {followedUser.location}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* Crear publicación */}
                            <div className="mb-6">

                                <CreatePost
                                    onPublish={handleAddPost}
                                />

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

            <Footer />
        </>
    );
}