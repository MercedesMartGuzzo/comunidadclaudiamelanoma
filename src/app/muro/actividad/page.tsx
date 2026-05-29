'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import {
    ArrowLeft,
    Heart,
    MessageCircle,
    FileText,
    Clock3,
} from 'lucide-react';

interface RuntimeActivity {
    id: string;
    type: 'post' | 'comment' | 'like';
    title: string;
    description: string;
    imageUrl?: string | null;
    time: string;
    createdAtDate: Date;
}

// Interfaz para la respuesta de Supabase con el join de posts
interface LikeQueryResult {
    id: string;
    created_at: string;
    posts: { content: string } | { content: string }[] | null;
}

function extractImageUrl(content: string): string | null {
    const match = content.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
}

function cleanContent(content: string): string {
    return content.replace(/!\[.*?\]\(.*?\)/g, '').trim();
}

function formatTimeAgo(dateString: string): string {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();
    
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Hace un momento';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    return `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
}

export default function ActividadPage() {
    const [activities, setActivities] = useState<RuntimeActivity[]>([]);

    useEffect(() => {
        async function fetchUserActivity() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: postsData } = await supabase
                .from('posts')
                .select('id, content, created_at')
                .eq('user_id', user.id);

            const { data: commentsData } = await supabase
                .from('comments')
                .select('id, content, created_at')
                .eq('user_id', user.id);

            const { data: likesData } = await supabase
                .from('likes')
                .select('id, created_at, posts(content)')
                .eq('user_id', user.id);

            const mappedPosts: RuntimeActivity[] = (postsData || []).map(p => ({
                id: p.id,
                type: 'post',
                title: 'Publicaste una nueva experiencia',
                description: cleanContent(p.content),
                imageUrl: extractImageUrl(p.content),
                time: formatTimeAgo(p.created_at),
                createdAtDate: new Date(p.created_at)
            }));

            const mappedComments: RuntimeActivity[] = (commentsData || []).map(c => ({
                id: c.id,
                type: 'comment',
                title: 'Comentaste en una publicación',
                description: cleanContent(c.content),
                imageUrl: extractImageUrl(c.content),
                time: formatTimeAgo(c.created_at),
                createdAtDate: new Date(c.created_at)
            }));

            const mappedLikes: RuntimeActivity[] = ((likesData as unknown as LikeQueryResult[]) || []).map(l => {
                // Normalización segura del contenido del post relacionado
                let postContent = '';
                if (Array.isArray(l.posts)) {
                    postContent = l.posts[0]?.content || '';
                } else if (l.posts && typeof l.posts === 'object') {
                    postContent = (l.posts as { content: string }).content || '';
                }

                return {
                    id: l.id,
                    type: 'like',
                    title: 'Te gustó una publicación',
                    description: postContent ? cleanContent(postContent) : 'Publicación eliminada',
                    time: formatTimeAgo(l.created_at),
                    createdAtDate: new Date(l.created_at)
                };
            });

            const combinedActivities = [...mappedPosts, ...mappedComments, ...mappedLikes].sort(
                (a, b) => b.createdAtDate.getTime() - a.createdAtDate.getTime()
            );

            setActivities(combinedActivities);
        }

        fetchUserActivity();
    }, []);

    const getIcon = (type: 'post' | 'comment' | 'like') => {
        if (type === 'comment') return MessageCircle;
        if (type === 'like') return Heart;
        return FileText;
    };

    return (
        <main className="bg-[#f6fafa] min-h-screen pt-14 pb-20 px-4">
            <div className="max-w-[900px] mx-auto">
                <Link href="/muro" className="inline-flex items-center gap-2 text-sm text-[#003C43]/60 hover:text-[#003C43] transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Volver a la comunidad
                </Link>

                <div className="flex flex-col gap-4">
                    {activities.length === 0 ? (
                        <p className="text-[#181c1d]/50 font-noto-sans text-sm text-center py-10">
                            Aún no tenés actividad registrada.
                        </p>
                    ) : (
                        activities.map((activity) => {
                            const Icon = getIcon(activity.type);
                            return (
                                <article key={activity.id} className="bg-white rounded-2xl p-5 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#E3FEF7] flex items-center justify-center shrink-0">
                                            <Icon className="w-5 h-5 text-[#003C43]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-inconsolata font-bold text-[#003C43] text-lg">{activity.title}</p>
                                            
                                            {activity.imageUrl && (
                                                <div className="relative w-full h-64 my-3 rounded-lg overflow-hidden bg-gray-50">
                                                    <Image 
                                                        src={activity.imageUrl} 
                                                        alt="Imagen de actividad" 
                                                        fill 
                                                        className="object-contain"
                                                        unoptimized
                                                    />
                                                </div>
                                            )}

                                            <p className="text-[#181c1d]/75 font-noto-sans mb-4">{activity.description}</p>
                                            <div className="text-xs text-[#181c1d]/45 flex items-center gap-1">
                                                <Clock3 className="w-3.5 h-3.5" /> {activity.time}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })
                    )}
                </div>
            </div>
        </main>
    );
}