'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

import {
    Activity,
    Bookmark,
    Users,
    Settings,
    LogOut,
    UserRoundPen,
    CircleUserRound,
} from 'lucide-react';

interface DBProfile {
    id: string;
    name: string | null;
    location: string | null;
    avatar_url: string | null;
}

export default function SidebarLeft() {
    const router = useRouter();
    const [profile, setProfile] = useState<DBProfile | null>(null);
    const [stats, setStats] = useState({ postsCount: 0, forumsCount: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUserSession() {
            try {
                setLoading(true);
                
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    router.push('/auth');
                    return;
                }

                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('id, name, location, avatar_url')
                    .eq('id', user.id)
                    .maybeSingle(); 

                if (profileError) throw profileError;

                if (profileData) {
                    setProfile(profileData);

                    const [postsRes, followsRes] = await Promise.all([
                        supabase.from('posts').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
                        supabase.from('follows').select('id', { count: 'exact', head: true }).eq('follower_id', user.id)
                    ]);

                    setStats({
                        postsCount: postsRes.count || 0,
                        forumsCount: followsRes.count || 0 
                    });
                }
            } catch (error) {
                const errorMsg = error instanceof Error ? error.message : String(error);
                console.error('Error cargando la sesión del Sidebar:', errorMsg);
            } finally {
                setLoading(false);
            }
        }

        loadUserSession();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-4 w-full animate-pulse">
                <div className="bg-white rounded-xl p-6 h-64" />
                <div className="bg-white rounded-xl p-5 h-24" />
            </div>
        );
    }

    const userId = profile?.id;
    const userName = profile?.name || 'Usuario';
    const userLocation = profile?.location || 'Sin ubicación';
    const userAvatar = profile?.avatar_url;

    const menuItems = [
        { icon: CircleUserRound, label: 'Mi Perfil', href: userId ? `/muro/usuario/${userId}` : '/muro' },
        { icon: UserRoundPen, label: 'Editar Perfil', href: '/muro/perfil/editar' },
        { icon: Settings, label: 'Configuración', href: '/muro/configuracion' },
        { icon: Activity, label: 'Mi Actividad', href: '/muro/actividad' },
        { icon: Bookmark, label: 'Mis Favoritos', href: '/muro/favoritos' },
        { icon: Users, label: 'Mis grupos', href: '/muro/foros' },
    ];

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl p-6 hover:shadow-[0_4px_20px_rgba(0,60,67,0.07)] transition-shadow">
                
                {/* AVATAR DINÁMICO CON NEXT/IMAGE */}
                <div className="flex flex-col items-start mb-5">
                    <div
                        className="relative rounded-full bg-[#E3FEF7] flex items-center justify-center font-inconsolata font-bold text-[#003C43] text-lg mb-3 overflow-hidden w-[56px] h-[56px]"
                    >
                        {userAvatar ? (
                            <Image 
                                src={userAvatar} 
                                alt={userName} 
                                fill
                                sizes="56px"
                                className="object-cover"
                                priority
                            />
                        ) : (
                            userName.charAt(0).toUpperCase()
                        )}
                    </div>

                    <p className="font-inconsolata font-bold text-[#003C43] text-sm" style={{ letterSpacing: '-0.01em' }}>
                        {userName}
                    </p>

                    <p className="text-xs text-[#181c1d]/50 font-noto-sans mt-0.5">
                        {userLocation}
                    </p>
                </div>

                {/* ACCIONES */}
                <div className="flex flex-col gap-1">
                    {menuItems.map(({ icon: Icon, label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="flex items-center gap-2.5 text-sm text-[#181c1d]/70 hover:text-[#003C43] hover:bg-[#f6fafa] rounded-lg px-3 py-2 transition-colors font-noto-sans text-left w-full"
                        >
                            <Icon className="w-4 h-4 shrink-0 text-[#003C43]/50" />
                            <span>{label}</span>
                        </Link>
                    ))}
                </div>

                <div className="w-full h-px bg-[#003C43]/10 my-4" />

                <button
                    onClick={handleLogout}
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
                        { label: 'Publicaciones', value: stats.postsCount },
                        { label: 'Foros unidos', value: stats.forumsCount },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between">
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