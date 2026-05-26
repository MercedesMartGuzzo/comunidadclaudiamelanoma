
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
    time: string;
    createdAtDate: Date;
}

// Función auxiliar para calcular el tiempo transcurrido de forma amigable
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserActivity() {
            try {
                setLoading(true);
                
                // Obtener el usuario autenticado
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                // 1. Traer los posts del usuario
                const { data: postsData, error: postsError } = await supabase
                    .from('posts')
                    .select('id, content, created_at')
                    .eq('user_id', user.id);

                if (postsError) throw postsError;

                // 2. Traer los comentarios del usuario
                const { data: commentsData, error: commentsError } = await supabase
                    .from('comments')
                    .select('id, content, created_at')
                    .eq('user_id', user.id);

                if (commentsError) throw commentsError;

                // Transformar posts a formato de actividad
                const mappedPosts: RuntimeActivity[] = (postsData || []).map(p => ({
                    id: p.id,
                    type: 'post',
                    title: 'Publicaste una nueva experiencia',
                    description: p.content.length > 60 ? `“${p.content.substring(0, 60)}...”` : `“${p.content}”`,
                    time: formatTimeAgo(p.created_at),
                    createdAtDate: new Date(p.created_at)
                }));

                // Transformar comentarios a formato de actividad
                const mappedComments: RuntimeActivity[] = (commentsData || []).map(c => ({
                    id: c.id,
                    type: 'comment',
                    title: 'Comentaste en una publicación',
                    description: c.content.length > 60 ? `“${c.content.substring(0, 60)}...”` : `“${c.content}”`,
                    time: formatTimeAgo(c.created_at),
                    createdAtDate: new Date(c.created_at)
                }));

                // Combinar y ordenar cronológicamente por fecha (más reciente primero)
                const combinedActivities = [...mappedPosts, ...mappedComments].sort(
                    (a, b) => b.createdAtDate.getTime() - a.createdAtDate.getTime()
                );

                setActivities(combinedActivities);
            } catch (err: unknown) {
                const errorMsg = err instanceof Error ? err.message : String(err);
                console.error('Error cargando el historial de actividad:', errorMsg);
            } finally {
                setLoading(false);
            }
        }

        fetchUserActivity();
    }, []);

    // Helper para renderizar dinámicamente el ícono sin mutar el estado
    const getIcon = (type: 'post' | 'comment' | 'like') => {
        if (type === 'comment') return MessageCircle;
        if (type === 'like') return Heart;
        return FileText;
    };

    return (
        <main className="bg-[#f6fafa] min-h-screen pt-14 pb-20 px-4">

            <div className="max-w-[900px] mx-auto">

                {/* VOLVER */}
                <Link
                    href="/muro"
                    className="inline-flex items-center gap-2 text-sm text-[#003C43]/60 hover:text-[#003C43] transition-colors mb-8 font-noto-sans"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver a la comunidad
                </Link>

                {/* HEADER */}
                <div className="mb-10">

                    <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#003C43]/55 mb-3">
                        Comunidad RLM
                    </p>

                    <h1
                        className="font-inconsolata text-4xl sm:text-5xl font-bold text-[#003C43] mb-4"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Mi actividad
                    </h1>

                    <p className="text-[#181c1d]/70 text-lg font-noto-sans max-w-2xl leading-relaxed">
                        Un historial de tus publicaciones, interacciones y participación dentro de la comunidad.
                    </p>

                </div>

                {/* LISTA */}
                <div className="flex flex-col gap-4">

                    {loading ? (
                        <p className="animate-pulse text-[#003C43] font-inconsolata text-sm text-center py-10">
                            Cargando tu historial de actividad...
                        </p>
                    ) : activities.length === 0 ? (
                        <p className="text-[#181c1d]/50 font-noto-sans text-sm text-center py-10">
                            Aún no registrás interacciones ni publicaciones en el muro.
                        </p>
                    ) : (
                        activities.map((activity) => {
                            const Icon = getIcon(activity.type);

                            return (
                                <article
                                    key={activity.id}
                                    className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,60,67,0.04)] hover:shadow-[0_8px_28px_rgba(0,60,67,0.08)] transition-shadow"
                                >
                                    <div className="flex items-start gap-4">

                                        {/* ICONO */}
                                        <div className="w-12 h-12 rounded-xl bg-[#E3FEF7] flex items-center justify-center shrink-0">
                                            <Icon className="w-5 h-5 text-[#003C43]" />
                                        </div>

                                        {/* INFO */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-inconsolata font-bold text-[#003C43] text-lg">
                                                    {activity.title}
                                                </p>
                                            </div>

                                            <p className="text-[#181c1d]/75 font-noto-sans leading-relaxed mb-4 break-words">
                                                {activity.description}
                                            </p>

                                            <div className="flex items-center gap-2 text-xs text-[#181c1d]/45 font-noto-sans">
                                                <Clock3 className="w-3.5 h-3.5" />
                                                {activity.time}
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
