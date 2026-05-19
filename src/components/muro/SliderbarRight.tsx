'use client';

import { useState } from 'react';
import { mockUsers } from '@/lib/mock-data/users';
import { UserPlus, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function SidebarRight() {
    const [following, setFollowing] = useState<string[]>([]);

    const toggleFollow = (userId: string) => {
        setFollowing(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    return (
        <div className="flex flex-col gap-4">

            {/* Tip del día */}
           {/*  <div className="bg-gradient-to-br from-[#00252a] to-[#003c43] text-white p-6 rounded-xl relative overflow-hidden">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-inconsolata text-[60px] font-bold text-white/5 select-none leading-none">
                    RML
                </span>
                <p className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#E3FEF7]/50 mb-2 relative z-10">
                    Tip del día
                </p>
                <p className="text-sm text-[#E3FEF7]/80 font-noto-sans leading-relaxed relative z-10">
                    La hidratación constante ayuda a que tu piel se recupere mejor durante el tratamiento.
                </p>
            </div>
 */}
            {/* Miembros sugeridos */}
            <div className="bg-white rounded-xl p-5 hover:shadow-[0_4px_20px_rgba(0,60,67,0.07)] transition-shadow">
                <p className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/50 mb-4">
                    Miembros sugeridos
                </p>

                <div className="flex flex-col gap-4">
                    {mockUsers.slice(1, 4).map(user => {
                        const isFollowing = following.includes(user.id);
                        return (
                            <div key={user.id} className="flex items-center gap-3">

                                {/* Avatar — link al perfil */}
                                <Link href={`/muro/usuario/${user.id}`}>
                                    <div
                                        className="rounded-full bg-[#E3FEF7] flex items-center justify-center shrink-0 font-inconsolata font-bold text-[#003C43] text-sm hover:opacity-75 transition-opacity cursor-pointer"
                                        style={{ width: '36px', height: '36px', minWidth: '36px' }}
                                    >
                                        {user.name.charAt(0)}
                                    </div>
                                </Link>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <Link href={`/muro/usuario/${user.id}`}>
                                        <p className="font-inconsolata font-bold text-[#003C43] text-xs truncate hover:underline underline-offset-2">
                                            {user.name}
                                        </p>
                                    </Link>
                                    <p className="text-[0.65rem] text-[#181c1d]/50 font-noto-sans truncate">
                                        {user.location}
                                    </p>
                                </div>

                                {/* Botón seguir */}
                                <button
                                    onClick={() => toggleFollow(user.id)}
                                    style={{ minWidth: '76px' }}
                                    className={`shrink-0 flex items-center justify-center gap-1 font-inconsolata text-[0.6rem] font-bold uppercase tracking-wide px-2.5 py-1.5 rounded-md transition-colors relative ${
                                        isFollowing
                                            ? 'bg-[#003C43] text-[#E3FEF7]'
                                            : 'bg-[#E3FEF7] text-[#003C43] hover:bg-[#003C43] hover:text-[#E3FEF7]'
                                    }`}
                                >
                                    <span className={isFollowing ? 'opacity-0' : 'opacity-100'}>
                                        <UserPlus className="w-3 h-3" />
                                    </span>
                                    <span className={`absolute inset-0 flex items-center justify-center gap-1 ${isFollowing ? 'opacity-100' : 'opacity-0'}`}>
                                        <UserCheck className="w-3 h-3" />
                                    </span>
                                    <span className="ml-1">
                                        {isFollowing ? 'Siguiendo' : 'Seguir'}
                                    </span>
                                </button>

                            </div>
                        );
                    })}
                </div>

                <Link
                    href="/muro/miembros"
                    className="mt-4 w-full font-inconsolata text-xs font-bold uppercase tracking-wide text-[#003C43]/55 hover:text-[#003C43] transition-colors py-2 block text-center"
                >
                    Ver todos los miembros →
                </Link>
            </div>
        </div>
    );
}