'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { UserPlus, UserCheck, Loader2 } from 'lucide-react';

interface Profile {
    id: string;
    name: string;
    location: string | null;
    avatar_url: string | null;
}

export default function SidebarRight() {
    const [users, setUsers] = useState<Profile[]>([]);
    const [following, setFollowing] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        const initData = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const userId = session?.user?.id || null;
            setCurrentUserId(userId);

            // Cargar perfiles
            const { data: profiles } = await supabase
                .from('profiles')
                .select('id, name, location, avatar_url')
                .limit(5); // Traemos un poco más por si nos filtramos a nosotros mismos
            
            // FILTRO APLICADO: Excluimos al usuario actual de la lista
            const filteredProfiles = profiles 
                ? profiles.filter(profile => profile.id !== userId).slice(0, 3) 
                : [];
            
            setUsers(filteredProfiles);

            // Cargar estado de seguimiento si hay usuario
            if (userId) {
                const { data: follows } = await supabase
                    .from('follows')
                    .select('following_id')
                    .eq('follower_id', userId);
                
                if (follows) {
                    setFollowing(follows.map(f => f.following_id));
                }
            }
            setLoading(false);
        };
        initData();
    }, []);

    const toggleFollow = async (targetUserId: string) => {
        if (!currentUserId) return;

        const isFollowing = following.includes(targetUserId);

        // Actualización optimista
        setFollowing(prev => 
            isFollowing ? prev.filter(id => id !== targetUserId) : [...prev, targetUserId]
        );

        if (isFollowing) {
            await supabase.from('follows').delete().eq('follower_id', currentUserId).eq('following_id', targetUserId);
        } else {
            await supabase.from('follows').insert({ follower_id: currentUserId, following_id: targetUserId });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl p-5 hover:shadow-[0_4px_20px_rgba(0,60,67,0.07)] transition-shadow">
                <p className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/50 mb-4">
                    Miembros sugeridos
                </p>

                {loading ? (
                    <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 animate-spin text-[#003C43]" /></div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {users.map(user => {
                            const isFollowing = following.includes(user.id);
                            return (
                                <div key={user.id} className="flex items-center gap-3">
                                    <Link href={`/muro/usuario/${user.id}`}>
                                        {user.avatar_url ? (
                                            <div className="relative w-9 h-9 cursor-pointer hover:opacity-75 transition-opacity">
                                                <Image 
                                                    src={user.avatar_url} 
                                                    alt={user.name || 'Avatar'} 
                                                    fill 
                                                    className="rounded-full object-cover" 
                                                    sizes="36px"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-9 h-9 rounded-full bg-[#E3FEF7] flex items-center justify-center font-inconsolata font-bold text-[#003C43] text-sm hover:opacity-75 transition-opacity cursor-pointer">
                                                {user.name?.charAt(0) || '?'}
                                            </div>
                                        )}
                                    </Link>

                                    <div className="flex-1 min-w-0">
                                        <Link href={`/muro/usuario/${user.id}`}>
                                            <p className="font-inconsolata font-bold text-[#003C43] text-xs truncate hover:underline">{user.name}</p>
                                        </Link>
                                        <p className="text-[0.65rem] text-[#181c1d]/50 font-noto-sans truncate">{user.location || 'Sin ubicación'}</p>
                                    </div>

                                    <button
                                        onClick={() => toggleFollow(user.id)}
                                        className={`shrink-0 flex items-center justify-center gap-1 font-inconsolata text-[0.6rem] font-bold uppercase tracking-wide px-2.5 py-1.5 rounded-md transition-colors ${
                                            isFollowing ? 'bg-[#003C43] text-[#E3FEF7]' : 'bg-[#E3FEF7] text-[#003C43] hover:bg-[#003C43] hover:text-[#E3FEF7]'
                                        }`}
                                    >
                                        {isFollowing ? <UserCheck className="w-3 h-3" /> : <UserPlus className="w-3 h-3" />}
                                        <span className="ml-1">{isFollowing ? 'Siguiendo' : 'Seguir'}</span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                <Link href="/muro/miembros" className="mt-4 w-full font-inconsolata text-xs font-bold uppercase tracking-wide text-[#003C43]/55 hover:text-[#003C43] transition-colors py-2 block text-center">
                    Ver todos los miembros →
                </Link>
            </div>
        </div>
    );
}