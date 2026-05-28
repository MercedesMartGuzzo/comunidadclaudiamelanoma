'use client';

import PostCard, { PostCardType, CommentCardType } from './PostCard';

interface Props {
    posts: PostCardType[];
    comments: CommentCardType[];
    onAddComment: (postId: string, content: string) => void;
    currentUserAvatar?: string | null; // <-- Pasamos el avatar actual del usuario autenticado
    currentUserName?: string;          // <-- Pasamos el nombre actual del usuario autenticado
}

export default function Feed({ posts, comments, onAddComment, currentUserAvatar, currentUserName }: Props) {
    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => (
                <PostCard
                    key={post.id}
                    post={post}
                    comments={comments.filter(c => c.postId === post.id)}
                    onAddComment={onAddComment}
                    currentUserAvatar={currentUserAvatar} // <-- Inyectado al PostCard
                    currentUserName={currentUserName}     // <-- Inyectado al PostCard
                />
            ))}
        </div>
    );
}