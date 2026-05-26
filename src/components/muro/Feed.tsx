'use client';

import PostCard, { PostCardType, CommentCardType } from './PostCard';

interface Props {
    posts: PostCardType[];
    comments: CommentCardType[];
    onAddComment: (postId: string, content: string) => void;
}

export default function Feed({ posts, comments, onAddComment }: Props) {
    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => (
                <PostCard
                    key={post.id}
                    post={post}
                    comments={comments.filter(c => c.postId === post.id)}
                    onAddComment={onAddComment}
                />
            ))}
        </div>
    );
}