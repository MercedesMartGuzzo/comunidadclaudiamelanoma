'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockUsers } from '@/lib/mock-data/users';
import { ArrowLeft, UserPlus, UserCheck, MapPin } from 'lucide-react';

export default function MiembrosPage() {
    const [following, setFollowing] = useState<string[]>([]);

    const toggleFollow = (userId: string) => {
        setFollowing(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    return (
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">

            {/* Volver */}
            <Link
                href="/muro"
                className="flex items-center gap-2 text-sm text-[#003C43]/55 hover:text-[#003C43] transition font-noto-sans mb-8 group w-fit"
            >
                <ArrowLeft className="w-4 h-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
                <span className="leading-none">Volver a </span>
            </Link>

            {/* Header */}
            <div className="mb-10">
                <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/55 mb-3">
                    Comunidad RLM
                </p>
                <h1
                    className="font-inconsolata text-4xl sm:text-5xl font-bold text-[#003C43] mb-4"
                    style={{ letterSpacing: '-0.02em' }}
                >
                    Miembros
                </h1>
                <p className="text-[#181c1d]/70 text-lg font-noto-sans leading-relaxed">
                    Conocé a las personas que forman parte de la comunidad.
                </p>
            </div>

            {/* Grid de miembros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockUsers.map(user => {
                    const isFollowing = following.includes(user.id);
                    return (
                        <div
                            key={user.id}
                            className="bg-white rounded-xl p-6 hover:shadow-[0_20px_40px_rgba(0,60,67,0.07)] transition-shadow flex flex-col gap-4"
                        >
                            {/* Avatar + info */}
                            <div className="flex items-center gap-4">
                                <Link href={`/muro/usuario/${user.id}`}>
                                    <div
                                        className="rounded-full bg-[#E3FEF7] flex items-center justify-center shrink-0 font-inconsolata font-bold text-[#003C43] text-lg hover:opacity-75 transition-opacity cursor-pointer"
                                        style={{ width: '52px', height: '52px', minWidth: '52px' }}
                                    >
                                        {user.name.charAt(0)}
                                    </div>
                                </Link>
                                <div className="flex-1 min-w-0">
                                    <Link href={`/muro/usuario/${user.id}`}>
                                        <p className="font-inconsolata font-bold text-[#003C43] text-sm hover:underline underline-offset-2 truncate">
                                            {user.name}
                                        </p>
                                    </Link>
                                    <p className="text-xs text-[#181c1d]/50 font-noto-sans flex items-center gap-1 mt-0.5">
                                        <MapPin className="w-3 h-3 shrink-0" />
                                        {user.location}
                                    </p>
                                </div>
                            </div>

                            {/* Bio */}
                            <p className="text-xs text-[#181c1d]/65 font-noto-sans leading-relaxed line-clamp-2">
                                {user.bio}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                <span className="font-inconsolata text-[0.6rem] font-bold uppercase tracking-wider text-[#003C43] bg-[#E3FEF7] px-2.5 py-1 rounded-full">
                                    {user.diagnosis}
                                </span>
                               {/*  <span className="font-inconsolata text-[0.6rem] font-bold uppercase tracking-wider text-[#003C43] bg-[#f6fafa] px-2.5 py-1 rounded-full">
                                    {user.stage}
                                </span> */}
                            </div>

                            {/* Botón seguir */}
                            <button
                                onClick={() => toggleFollow(user.id)}
                                style={{ minWidth: '100px' }}
                                className={`self-start flex items-center justify-center gap-1.5 font-inconsolata text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-md transition-colors relative ${
                                    isFollowing
                                        ? 'bg-[#003C43] text-[#E3FEF7]'
                                        : 'bg-[#E3FEF7] text-[#003C43] hover:bg-[#003C43] hover:text-[#E3FEF7]'
                                }`}
                            >
                                {isFollowing
                                    ? <><UserCheck className="w-3.5 h-3.5" /> Siguiendo</>
                                    : <><UserPlus className="w-3.5 h-3.5" /> Seguir</>
                                }
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}