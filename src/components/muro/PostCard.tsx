'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Clock, Send, Trash2, Edit2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import CreatePost from './CreatePost';

function timeAgo(dateStr: string) {
    const now = new Date();
    const date = new Date(dateStr);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

    if (diffInSeconds < 60) return rtf.format(0, 'second');
    if (diffInSeconds < 3600) return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    if (diffInSeconds < 86400) return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
}

export interface PostCardType {
    id: string;
    userId: string;
    content: string;
    createdAt: string;
    likesCount: number;
    commentsCount: number;
    authorName: string;
    authorLocation: string;
    authorAvatar: string | null;
}

export interface CommentCardType {
    id: string;
    postId: string;
    authorName: string;
    authorAvatar: string | null;
    content: string;
    createdAt: string;
}

interface Props {
    post: PostCardType;
    comments: CommentCardType[];
    onAddComment: (postId: string, content: string) => void;
    onDelete: (postId: string) => void;
    onRefresh: () => void; // ← reemplaza a onUpdate
    currentUserId: string;
    currentUserAvatar?: string | null;
    currentUserName?: string;
}

export default function PostCard({
    post,
    comments,
    onAddComment,
    onDelete,
    onRefresh,
    currentUserId,
    currentUserAvatar,
    currentUserName
}: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentInput, setCommentInput] = useState('');

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likesCount);

    useEffect(() => {
        async function fetchLikeStatus() {
            const { data: userLike } = await supabase
                .from('likes')
                .select('id')
                .eq('post_id', post.id)
                .eq('user_id', currentUserId)
                .single();

            if (userLike) setIsLiked(true);

            const { count, error } = await supabase
                .from('likes')
                .select('*', { count: 'exact', head: true })
                .eq('post_id', post.id);

            if (!error && count !== null) {
                setLikeCount(count);
            }
        }

        fetchLikeStatus();
    }, [post.id, currentUserId]);

    const handleLike = async () => {
        const previousLiked = isLiked;
        const previousCount = likeCount;

        setIsLiked(!previousLiked);
        setLikeCount(previousLiked ? likeCount - 1 : likeCount + 1);

        try {
            if (previousLiked) {
                await supabase.from('likes').delete().eq('post_id', post.id).eq('user_id', currentUserId);
            } else {
                await supabase.from('likes').insert({ post_id: post.id, user_id: currentUserId });
            }
        } catch (error) {
            setIsLiked(previousLiked);
            setLikeCount(previousCount);
            console.error("Error al actualizar like:", error);
        }
    };

    const handleComment = () => {
        if (!commentInput.trim()) return;
        onAddComment(post.id, commentInput.trim());
        setCommentInput('');
    };

    // CreatePost ya hizo el update real en Supabase.
    // Acá solo cerramos el modo edición y pedimos al padre que refresque los datos.
    const handleEditPublished = () => {
        setIsEditing(false);
        onRefresh();
    };

    const renderContent = (content: string) => {
        const imgRegex = /!\[img\]\((https?:\/\/[^\s]+)\)/;
        const match = content.match(imgRegex);
        if (match) {
            const text = content.replace(match[0], '');
            return (
                <>
                    {text && <p className="text-sm text-[#181c1d]/80 font-noto-sans mb-3">{text}</p>}
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                        <Image src={match[1]} alt="Imagen del post" fill className="object-contain" unoptimized />
                    </div>
                </>
            );
        }
        return <p className="text-sm text-[#181c1d]/80 font-noto-sans mb-4">{content}</p>;
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-3 mb-4">
                <div className="rounded-full bg-[#E3FEF7] w-10 h-10 flex items-center justify-center overflow-hidden relative">
                    {post.authorAvatar ? <Image src={post.authorAvatar} alt={post.authorName} fill className="object-cover" unoptimized /> : post.authorName.charAt(0)}
                </div>
                <div className="flex-1">
                    <p className="font-bold text-sm text-[#003C43]">{post.authorName}</p>
                    <p className="text-xs text-[#181c1d]/45 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {timeAgo(post.createdAt)} · {post.authorLocation}
                    </p>
                </div>
                {post.userId === currentUserId && !isEditing && (
                    <div className="flex gap-3">
                        <button type="button" onClick={() => setIsEditing(true)} className="text-[#003C43]/60 hover:text-[#003C43]"><Edit2 size={16} /></button>
                        <button type="button" onClick={() => onDelete(post.id)} className="text-[#003C43]/60 hover:text-[#003C43]"><Trash2 size={16} /></button>
                    </div>
                )}
            </div>

            {isEditing ? (
                <CreatePost
                    initialData={{ id: post.id, content: post.content }}
                    onPublish={handleEditPublished}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <div className="mb-4">{renderContent(post.content)}</div>
            )}

            <div className="flex gap-4 pt-4 border-t border-[#003C43]/08">
                <button
                    type="button"
                    onClick={handleLike}
                    className={`flex items-center gap-1 text-xs ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
                >
                    <Heart size={16} fill={isLiked ? "currentColor" : "none"} /> {likeCount}
                </button>
                <button
                    type="button"
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-1 text-xs text-gray-500"
                >
                    <MessageCircle size={16} /> {comments.length}
                </button>
            </div>

            {showComments && (
                <div className="mt-4 space-y-4">
                    <div className="space-y-3">
                        {comments.map((c) => (
                            <div key={c.id} className="flex gap-2 p-2 bg-[#f6fafa] rounded-lg">
                                <div className="w-6 h-6 rounded-full bg-[#E3FEF7] flex items-center justify-center text-[10px] font-bold text-[#003C43]">
                                    {c.authorAvatar ? <Image src={c.authorAvatar} alt={c.authorName} width={24} height={24} className="rounded-full" unoptimized /> : c.authorName.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-[#003C43]">{c.authorName}</p>
                                    <p className="text-[11px] text-[#181c1d]/80">{c.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#E3FEF7] flex items-center justify-center text-xs font-bold text-[#003C43]">
                            {currentUserAvatar ? <Image src={currentUserAvatar} alt={currentUserName || 'User'} width={32} height={32} className="rounded-full" unoptimized /> : (currentUserName?.charAt(0) || 'U')}
                        </div>
                        <input
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            placeholder="Escribir un comentario..."
                            className="flex-1 bg-[#f6fafa] rounded-lg px-3 py-2 text-xs outline-none"
                        />
                        <button type="button" onClick={handleComment} className="text-[#003C43]"><Send size={16} /></button>
                    </div>
                </div>
            )}
        </div>
    );
}