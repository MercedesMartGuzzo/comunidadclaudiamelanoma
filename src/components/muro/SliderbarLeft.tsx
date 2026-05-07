import { mockUsers } from '@/lib/mock-data/users';
import Link from 'next/link';

import {
    Activity,
    Bookmark,
    Users,
    Settings,
    LogOut,
    UserRoundPen,
    CircleUserRound,
} from 'lucide-react';

export default function SidebarLeft() {

    const user = mockUsers[0];

    return (
        <div className="flex flex-col gap-4">

            {/* PERFIL */}
            <div className="bg-white rounded-xl p-6 hover:shadow-[0_4px_20px_rgba(0,60,67,0.07)] transition-shadow">

                {/* Avatar + info */}
                <div className="flex flex-col items-center text-center mb-5">

                    <div
                        className="rounded-full bg-[#E3FEF7] flex items-center justify-center font-inconsolata font-bold text-[#003C43] text-lg mb-3"
                        style={{ width: '56px', height: '56px' }}
                    >
                        {user.name.charAt(0)}
                    </div>

                    <p
                        className="font-inconsolata font-bold text-[#003C43] text-sm"
                        style={{ letterSpacing: '-0.01em' }}
                    >
                        {user.name}
                    </p>

                    <p className="text-xs text-[#181c1d]/50 font-noto-sans mt-0.5">
                        {user.location}
                    </p>

                    <span className="mt-2 font-inconsolata text-[0.6rem] font-bold uppercase tracking-wider text-[#003C43] bg-[#E3FEF7] px-2.5 py-1 rounded-full">
                        {user.stage}
                    </span>

                </div>

                {/* ACCIONES */}
                <div className="flex flex-col gap-1">

                    {[
                        {
                            icon: CircleUserRound,
                            label: 'Mi Perfil',
                            href: `/muro/usuario/${user.id}`,
                        },
                        {
                            icon: UserRoundPen,
                            label: 'Editar Perfil',
                            href: '/muro/perfil/editar',
                        },
                        {
                            icon: Settings,
                            label: 'Configuración',
                            href: '/muro/configuracion',
                        },
                        {
                            icon: Activity,
                            label: 'Mi Actividad',
                            href: '/muro/actividad',
                        },
                        {
                            icon: Bookmark,
                            label: 'Mis Favoritos',
                            href: '/muro/favoritos',
                        },
                        {
                            icon: Users,
                            label: 'Foros',
                            href: '/muro/foros',
                        },
                    ].map(({ icon: Icon, label, href }) => (

                        <Link
                            key={label}
                            href={href}
                            className="flex items-center gap-2.5 text-sm text-[#181c1d]/70 hover:text-[#003C43] hover:bg-[#f6fafa] rounded-lg px-3 py-2 transition-colors font-noto-sans text-left w-full"
                        >

                            <Icon className="w-4 h-4 shrink-0 text-[#003C43]/50" />

                            <span>
                                {label}
                            </span>

                        </Link>

                    ))}

                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#003C43]/8 my-4" />

                {/* Logout */}
                <button
                    className="flex items-center gap-2.5 text-sm text-[#181c1d]/45 hover:text-[#003C43] hover:bg-[#f6fafa] rounded-lg px-3 py-2 transition-colors font-noto-sans text-left w-full"
                >
                    <LogOut className="w-4 h-4 shrink-0 text-[#003C43]/40" />
                    <span>Cerrar sesión</span>
                </button>

            </div>

            {/* STATS */}
            <div className="bg-white rounded-xl p-5 hover:shadow-[0_4px_20px_rgba(0,60,67,0.07)] transition-shadow">

                <p className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/50 mb-3">
                    Tu actividad
                </p>

                <div className="flex flex-col gap-3">

                    {[
                        {
                            label: 'Publicaciones',
                            value: user.postsCount,
                        },
                        {
                            label: 'Foros unidos',
                            value: user.forumsJoined.length,
                        },
                    ].map(({ label, value }) => (

                        <div
                            key={label}
                            className="flex items-center justify-between"
                        >

                            <span className="text-xs text-[#181c1d]/60 font-noto-sans">
                                {label}
                            </span>

                            <span className="font-inconsolata font-bold text-[#003C43] text-sm">
                                {value}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}