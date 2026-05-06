'use client';

import { useState } from 'react';
import { feedPosts, feedComments, FeedPost, FeedComment } from '@/lib/mock-data/feed/feed-posts';
import PostCard from './PostCard';

export default function Feed() {
    const [localPosts, setLocalPosts] = useState<FeedPost[]>(feedPosts);
    const [localComments, setLocalComments] = useState<FeedComment[]>(feedComments);

/*     const handleAddPost = (content: string) => {
        const newPost: FeedPost = {
            id: String(Date.now()),
            userId: '1', // usuario logueado mock
            content,
            tags: [],
            likesCount: 0,
            commentsCount: 0,
            createdAt: new Date().toISOString(),
        };
        setLocalPosts(prev => [newPost, ...prev]);
    }; */

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
        <div className="flex flex-col gap-4">
            {localPosts.map(post => (
                <PostCard
                    key={post.id}
                    post={post}
                    comments={localComments.filter(c => c.postId === post.id)}
                    onAddComment={handleAddComment}
                />
            ))}
        </div>
    );
}