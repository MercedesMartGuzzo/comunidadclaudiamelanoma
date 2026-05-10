'use client';

import Link from 'next/link';

import {
    ArrowLeft,Leaf,
    Users,
    MessageCircle,
    ChevronRight,
} from 'lucide-react';

import { mockForums } from '@/lib/mock-data/foro/forums';
import { mockUsers } from '@/lib/mock-data/users';

export default function MisForosPage() {

    const user = mockUsers[0];

    const joinedForums = mockForums.filter((forum) =>
        user.forumsJoined.includes(forum.slug)
    );

    return (
        <main className="bg-[#f6fafa] min-h-screen pt-14 pb-20 px-4">

            <div className="max-w-[1000px] mx-auto">

                {/* VOLVER */}
                <Link
                    href="/muro"
                    className="inline-flex items-center gap-2 text-sm text-[#003C43]/60 hover:text-[#003C43] transition-colors mb-8 font-noto-sans"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver al muro
                </Link>

                {/* HEADER */}
                <div className="mb-10">

                    <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#003C43]/55 mb-3">
                        Comunidad CCM
                    </p>

                    <h1
                        className="font-inconsolata text-4xl sm:text-5xl font-bold text-[#003C43] mb-4"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Mis foros
                    </h1>

                    <p className="text-[#181c1d]/70 text-lg font-noto-sans max-w-2xl leading-relaxed">
                        Espacios donde participás, compartís experiencias y seguís conversaciones con la comunidad.
                    </p>

                </div>

                {/* LISTA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {joinedForums.map((forum) => (

                        <Link
                            key={forum.id}
                            href={`/foros/${forum.slug}`}
                            className="group bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,60,67,0.04)] hover:shadow-[0_8px_28px_rgba(0,60,67,0.08)] transition-all"
                        >

                            {/* TOP */}
                            <div className="flex items-start justify-between gap-4 mb-5">

                                <div className="w-12 h-12 rounded-xl bg-[#E3FEF7] flex items-center justify-center shrink-0">

                                    <Leaf className="w-5 h-5 text-[#003C43]" />

                                </div>

                                <ChevronRight className="w-5 h-5 text-[#003C43]/30 group-hover:text-[#003C43] transition-colors" />

                            </div>

                            {/* INFO */}
                            <div>

                                <h2
                                    className="font-inconsolata text-2xl font-bold text-[#003C43] mb-3"
                                    style={{ letterSpacing: '-0.02em' }}
                                >
                                    {forum.title}
                                </h2>

                                <p className="text-[#181c1d]/70 font-noto-sans leading-relaxed mb-6">
                                    {forum.description}
                                </p>

                            </div>

                            {/* FOOTER */}
                            <div className="flex items-center justify-between border-t border-[#003C43]/8 pt-4">

                                <div className="flex items-center gap-2 text-sm text-[#181c1d]/60 font-noto-sans">

                                    <Users className="w-4 h-4 text-[#003C43]/50" />

                                    {forum.membersCount} miembros

                                </div>

                                <div className="flex items-center gap-2 text-sm text-[#181c1d]/60 font-noto-sans">

                                    <MessageCircle className="w-4 h-4 text-[#003C43]/50" />

                                    {forum.activeTopics} temas

                                </div>

                            </div>

                        </Link>

                    ))}

                </div>

            </div>

        </main>
    );
}