'use client';

import { useState } from 'react';
import { FeedPost, FeedComment } from '@/lib/mock-data/feed/feed-posts';
import { mockUsers } from '@/lib/mock-data/users';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, Clock, Send } from 'lucide-react';

function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'hoy';
    if (days === 1) return 'ayer';
    return `hace ${days} días`;
}

interface Props {
    post: FeedPost;
    comments: FeedComment[];
    onAddComment: (postId: string, content: string) => void;
}

export default function PostCard({ post, comments, onAddComment }: Props) {
    const [showComments, setShowComments] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [liked, setLiked] = useState(false);

    const user = mockUsers.find(u => u.id === post.userId);
    if (!user) return null;

    const handleComment = () => {
        if (!commentInput.trim()) return;
        onAddComment(post.id, commentInput.trim());
        setCommentInput('');
    };

    return (
        <div className="bg-white rounded-xl p-6 hover:shadow-[0_20px_40px_rgba(0,60,67,0.07)] transition-shadow">

            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
                <div
                    className="rounded-full bg-[#E3FEF7] flex items-center justify-center shrink-0 font-inconsolata font-bold text-[#003C43] text-sm"
                    style={{ width: '40px', height: '40px', minWidth: '40px' }}
                >
                    {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-inconsolata font-bold text-[#003C43] text-sm" style={{ letterSpacing: '-0.01em' }}>
                        {user.name}
                    </p>
                    <p className="text-xs text-[#181c1d]/45 font-noto-sans flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 shrink-0" />
                        {timeAgo(post.createdAt)} · {user.location}
                    </p>
                </div>
            </div>

            {/* Content */}
            <p className="text-sm text-[#181c1d]/80 font-noto-sans leading-relaxed mb-4">
                {post.content}
            </p>

            {/* Image */}
            {post.image && (
                <div className="relative w-full h-52 rounded-xl overflow-hidden mb-4">
                    <Image src={post.image} alt="imagen del post" fill className="object-cover" />
                </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, i) => (
                        <span key={i} className="font-inconsolata text-[0.6rem] font-bold uppercase tracking-wider text-[#003C43] bg-[#E3FEF7] px-2.5 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-5 pt-4 border-t border-[#003C43]/08 text-xs text-[#181c1d]/50 font-noto-sans">
                <button
                    onClick={() => setLiked(v => !v)}
                    className={`flex items-center gap-1.5 transition-colors ${liked ? 'text-red-400' : 'hover:text-[#003C43]'}`}
                >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-red-400 stroke-red-400' : ''}`} />
                    {post.likesCount + (liked ? 1 : 0)}
                </button>

                <button
                    onClick={() => setShowComments(v => !v)}
                    className="flex items-center gap-1.5 hover:text-[#003C43] transition-colors"
                >
                    <MessageCircle className="w-4 h-4" />
                    {post.commentsCount}
                </button>

                <button className="flex items-center gap-1.5 hover:text-[#003C43] transition-colors ml-auto">
                    <Share2 className="w-4 h-4" />
                    Compartir
                </button>
            </div>

            {/* Comentarios */}
            {showComments && (
                <div className="mt-4 pt-4 border-t border-[#003C43]/08 flex flex-col gap-3">

                    {/* Lista de comentarios */}
                    {comments.length === 0 ? (
                        <p className="text-xs text-[#181c1d]/40 font-noto-sans text-center py-2">
                            Sin comentarios aún. ¡Sé el primero!
                        </p>
                    ) : (
                        comments.map(comment => (
                            <div key={comment.id} className="flex items-start gap-2.5">
                                <div
                                    className="rounded-full bg-[#E3FEF7] flex items-center justify-center shrink-0 font-inconsolata font-bold text-[#003C43] text-xs"
                                    style={{ width: '28px', height: '28px', minWidth: '28px' }}
                                >
                                    {comment.authorName.charAt(0)}
                                </div>
                                <div className="bg-[#f6fafa] rounded-xl px-3 py-2 flex-1">
                                    <p className="font-inconsolata font-bold text-[#003C43] text-xs mb-0.5">
                                        {comment.authorName}
                                    </p>
                                    <p className="text-xs text-[#181c1d]/70 font-noto-sans leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Input comentario */}
                    <div className="flex items-center gap-2 mt-1">
                        <div
                            className="rounded-full bg-[#E3FEF7] flex items-center justify-center shrink-0 font-inconsolata font-bold text-[#003C43] text-xs"
                            style={{ width: '28px', height: '28px', minWidth: '28px' }}
                        >
                            V
                        </div>
                        <div className="flex-1 flex items-center gap-2 bg-[#f6fafa] rounded-xl px-3 py-2">
                            <input
                                value={commentInput}
                                onChange={e => setCommentInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleComment()}
                                placeholder="Escribí un comentario..."
                                className="flex-1 bg-transparent text-xs font-noto-sans text-[#181c1d] placeholder:text-[#181c1d]/30 outline-none"
                            />
                            <button
                                onClick={handleComment}
                                disabled={!commentInput.trim()}
                                className="text-[#003C43]/50 hover:text-[#003C43] transition-colors disabled:opacity-30"
                            >
                                <Send className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}