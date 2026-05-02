'use client';

import Link from 'next/link';
import { useState } from 'react';
import { mockForums } from '@/lib/mock-data/forums';
import { mockForumPosts } from '@/lib/mock-data/forum-post';
import { mockForumReplies } from '@/lib/mock-data/forum-post';
import { ArrowLeft, Heart, MessageSquare, Clock } from 'lucide-react';

function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'hoy';
    if (days === 1) return 'ayer';
    return `hace ${days} días`;
}

interface Props {
    slug: string;
    postId: string;
}

export default function ForoPostPage({ slug, postId }: Props) {
    const [replyContent, setReplyContent] = useState('');

    const forum = mockForums.find(f => f.slug === slug);
    const post = mockForumPosts.find(p => p.id === postId);
    const initialReplies = mockForumReplies.filter(r => r.postId === postId);
    const [localReplies, setLocalReplies] = useState(initialReplies);

    if (!forum || !post) {
        return (
            <div className="pt-40 text-center">
                <p className="font-inconsolata text-[#003C43] text-xl">Tema no encontrado.</p>
                <Link href={`/foros/${slug}`} className="text-sm text-[#003C43]/60 mt-4 inline-block hover:opacity-70">
                    ← Volver al foro
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">

            {/* Breadcrumb */}
            <Link
                href={`/foros/${slug}`}
                className="flex items-center gap-2 text-sm text-[#003C43]/55 hover:text-[#003C43] transition font-noto-sans mb-8 group w-fit"
            >
                <ArrowLeft className="w-4 h-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
                <span className="leading-none">{forum.title}</span>
            </Link>

            {/* Post principal */}
            <div className="bg-white rounded-2xl p-10 mb-6 shadow-[0_4px_20px_rgba(0,60,67,0.05)]">

                <div className="flex items-start gap-4 mb-6">
                    <div
                        className="rounded-full bg-[#E3FEF7] flex items-center justify-center shrink-0 font-inconsolata font-bold text-[#003C43] text-sm mt-1"
                        style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px' }}
                    >
                        {post.authorName.charAt(0)}
                    </div>
                    <div>
                        <p className="font-inconsolata font-bold text-[#003C43] text-sm">{post.authorName}</p>
                        <p className="text-xs text-[#181c1d]/45 font-noto-sans flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3 shrink-0" />
                            {timeAgo(post.createdAt)}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-2 mb-4">
                    <h1
                        className="font-inconsolata text-xl sm:text-2xl font-bold text-[#003C43] leading-snug"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        {post.title}
                    </h1>
                </div>

                <p className="text-sm text-[#181c1d]/75 font-noto-sans leading-relaxed mb-6">
                    {post.content}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="font-inconsolata text-[0.6rem] font-bold uppercase tracking-wider text-[#003C43] bg-[#E3FEF7] px-3 py-1.5 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-[#E3FEF7]/08 text-xs text-[#181c1d]/45 font-noto-sans">
                    <span className="flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 shrink-0 text-[#003C43]" />
                        {post.likesCount} me gusta
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 shrink-0 text-[#003C43]" />
                        {localReplies.length} respuestas
                    </span>
                </div>
            </div>

            {/* Respuestas */}
            <div className="mb-8">
                <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/50 mb-4 px-3">
                    {localReplies.length} {localReplies.length === 1 ? 'respuesta' : 'respuestas'}
                </p>

                <div className="flex flex-col gap-4">
                    {localReplies.length === 0 ? (
                        <div className="bg-white rounded-xl p-10 text-center">
                            <MessageSquare className="w-8 h-8 text-[#003C43]/20 mx-auto mb-3" />
                            <p className="font-inconsolata text-[#003C43] font-semibold text-sm mb-1">Sin respuestas aún</p>
                            <p className="text-xs text-[#181c1d]/50 font-noto-sans">Sé el primero en responder.</p>
                        </div>
                    ) : (
                        localReplies.map((reply) => (
                            <div
                                key={reply.id}
                                className="bg-white rounded-xl p-6 hover:shadow-[0_8px_24px_rgba(0,60,67,0.06)] transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className="rounded-full bg-[#E3FEF7] flex items-center justify-center shrink-0 font-inconsolata font-bold text-[#003C43] text-sm mt-1"
                                        style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px' }}
                                    >
                                        {reply.authorName.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="font-inconsolata font-bold text-[#003C43] text-sm">
                                                {reply.authorName}
                                            </p>
                                            <p className="text-xs text-[#181c1d]/40 font-noto-sans flex items-center gap-1">
                                                <Clock className="w-3 h-3 shrink-0" />
                                                {timeAgo(reply.createdAt)}
                                            </p>
                                        </div>
                                        <p className="text-sm text-[#181c1d]/75 font-noto-sans leading-relaxed mb-3">
                                            {reply.content}
                                        </p>
                                        <button className="flex items-center gap-1.5 text-xs text-[#003C43]/50 hover:text-[#003C43] transition-colors font-noto-sans">
                                            <Heart className="w-3 h-3 shrink-0" />
                                            {reply.likesCount}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Caja de respuesta */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,60,67,0.05)]">
                <p className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/50 mb-4">
                    Tu respuesta
                </p>
                <textarea
                    value={replyContent}
                    onChange={e => setReplyContent(e.target.value)}
                    placeholder="Compartí tu experiencia o respondé la pregunta..."
                    rows={4}
                    className="w-full font-noto-sans text-sm text-[#181c1d] placeholder:text-[#181c1d]/30 bg-[#f6fafa] rounded-lg p-4 outline-none border-2 border-transparent focus:border-[#003C43]/20 transition-colors resize-none mb-4"
                />
                <div className="flex justify-end">
                    <button
                        disabled={!replyContent.trim()}
                        onClick={() => {
                            if (!replyContent.trim()) return;
                            setLocalReplies(prev => [...prev, {
                                id: String(Date.now()),
                                postId,
                                authorName: 'Vos',
                                content: replyContent.trim(),
                                likesCount: 0,
                                createdAt: new Date().toISOString(),
                            }]);
                            setReplyContent('');
                        }}
                        className="bg-[#003C43] text-[#E3FEF7] font-inconsolata text-xs font-bold uppercase tracking-wide px-6 py-3 rounded-md hover:bg-[#00252a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Responder
                    </button>
                </div>
            </div>

        </div>
    );
}