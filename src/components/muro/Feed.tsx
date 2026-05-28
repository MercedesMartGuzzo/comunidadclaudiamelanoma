'use client';

import PostCard, { PostCardType, CommentCardType } from './PostCard';

interface Props {
    posts: PostCardType[];
    comments: CommentCardType[];
    onAddComment: (postId: string, content: string) => void;
    onDelete: (postId: string) => void;
    onUpdate: (postId: string, content: string) => void;
    currentUserId: string;
    currentUserAvatar?: string | null;
    currentUserName?: string;
}

export default function Feed({ 
    posts, 
    comments, 
    onAddComment, 
    onDelete, 
    onUpdate, 
    currentUserId, 
    currentUserAvatar, 
    currentUserName 
}: Props) {
    return (
        <div className="flex flex-col gap-4">
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    comments={comments.filter((c) => c.postId === post.id)}
                    onAddComment={onAddComment}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    currentUserId={currentUserId}
                    currentUserAvatar={currentUserAvatar}
                    currentUserName={currentUserName}
                />
            ))}
        </div>
    );
}