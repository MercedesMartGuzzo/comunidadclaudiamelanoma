'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Clock, Send, Trash2, Edit2 } from 'lucide-react';
import CreatePost from './CreatePost';

// Función para calcular el tiempo relativo
function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'hoy';
    if (days === 1) return 'ayer';
    return `hace ${days} días`;
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
    onUpdate: (postId: string, content: string) => void;
    currentUserId: string;
    currentUserAvatar?: string | null;
    currentUserName?: string;
}

export default function PostCard({ 
    post, 
    comments, 
    onAddComment, 
    onDelete, 
    onUpdate, 
    currentUserId,
    currentUserAvatar, // Ahora usado
    currentUserName    // Ahora usado
}: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentInput, setCommentInput] = useState('');

    const handleComment = () => {
        if (!commentInput.trim()) return;
        onAddComment(post.id, commentInput.trim());
        setCommentInput('');
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
            {/* Header */}
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
                        <button onClick={() => setIsEditing(true)} className="text-[#003C43] hover:text-[#005f6b]"><Edit2 size={16} /></button>
                        <button onClick={() => onDelete(post.id)} className="text-[#003C43] hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                )}
            </div>

            {isEditing ? (
                <CreatePost 
                    initialData={{ id: post.id, content: post.content }} 
                    onPublish={(c) => { onUpdate(post.id, c); setIsEditing(false); }} 
                    onCancel={() => setIsEditing(false)} 
                />
            ) : (
                <div className="mb-4">{renderContent(post.content)}</div>
            )}

            {/* Acciones */}
            <div className="flex gap-4 pt-4 border-t border-[#003C43]/08">
                <button className="flex items-center gap-1 text-xs text-gray-500"><Heart size={16} /> {post.likesCount}</button>
                <button 
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-1 text-xs text-gray-500"
                >
                    <MessageCircle size={16} /> {comments.length}
                </button>
            </div>

            {/* Input de comentarios (uso de currentUserAvatar y currentUserName aquí para quitar el error) */}
            {showComments && (
                <div className="mt-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#E3FEF7] flex items-center justify-center text-xs font-bold text-[#003C43]">
                        {currentUserAvatar ? <Image src={currentUserAvatar} alt={currentUserName || 'User'} width={32} height={32} className="rounded-full" unoptimized /> : (currentUserName?.charAt(0) || 'U')}
                    </div>
                    <input
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Escribir un comentario..."
                        className="flex-1 bg-[#f6fafa] rounded-lg px-3 py-2 text-xs outline-none"
                    />
                    <button onClick={handleComment} className="text-[#003C43]"><Send size={16} /></button>
                </div>
            )}
        </div>
    );
}