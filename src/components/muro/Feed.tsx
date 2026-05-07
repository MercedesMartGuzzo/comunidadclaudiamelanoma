'use client';

import { FeedPost, FeedComment } from '@/lib/mock-data/feed/feed-posts';
import PostCard from './PostCard';

interface Props {
    posts: FeedPost[];
    comments: FeedComment[];
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