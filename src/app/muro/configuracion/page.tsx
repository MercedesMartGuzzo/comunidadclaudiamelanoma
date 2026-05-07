'use client';

import Link from 'next/link';
import { useState } from 'react';

import {
    ArrowLeft,
    Bell,
    Shield,
    Moon,
    Save,
} from 'lucide-react';

export default function ConfiguracionPage() {

    const [emailNotifications, setEmailNotifications] = useState(true);
    const [communityNotifications, setCommunityNotifications] = useState(true);
    const [privateProfile, setPrivateProfile] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2500);
    };

    return (
        <main className="bg-[#f6fafa] min-h-screen pt-28 pb-20 px-4">

            <div className="max-w-[900px] mx-auto">

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
                        Cuenta
                    </p>

                    <h1
                        className="font-inconsolata text-4xl sm:text-5xl font-bold text-[#003C43] mb-4"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Configuración
                    </h1>

                    <p className="text-[#181c1d]/70 text-lg font-noto-sans max-w-2xl leading-relaxed">
                        Administrá tus preferencias de privacidad, notificaciones y experiencia dentro de la comunidad.
                    </p>

                </div>

                <div className="flex flex-col gap-6">

                    {/* NOTIFICACIONES */}
                    <section className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,60,67,0.04)]">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="w-11 h-11 rounded-xl bg-[#E3FEF7] flex items-center justify-center">
                                <Bell className="w-5 h-5 text-[#003C43]" />
                            </div>

                            <div>
                                <h2 className="font-inconsolata text-xl font-bold text-[#003C43]">
                                    Notificaciones
                                </h2>

                                <p className="text-sm text-[#181c1d]/60 font-noto-sans">
                                    Elegí qué avisos querés recibir.
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-col gap-5">

                            <label className="flex items-center justify-between">

                                <div>
                                    <p className="font-medium text-[#181c1d] font-noto-sans">
                                        Notificaciones por email
                                    </p>

                                    <p className="text-sm text-[#181c1d]/55 font-noto-sans">
                                        Recibir novedades importantes y actividad reciente.
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    checked={emailNotifications}
                                    onChange={() => setEmailNotifications(!emailNotifications)}
                                    className="w-5 h-5 accent-[#003C43]"
                                />

                            </label>

                            <label className="flex items-center justify-between">

                                <div>
                                    <p className="font-medium text-[#181c1d] font-noto-sans">
                                        Actividad de la comunidad
                                    </p>

                                    <p className="text-sm text-[#181c1d]/55 font-noto-sans">
                                        Avisos sobre respuestas, likes y menciones.
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    checked={communityNotifications}
                                    onChange={() => setCommunityNotifications(!communityNotifications)}
                                    className="w-5 h-5 accent-[#003C43]"
                                />

                            </label>

                        </div>

                    </section>

                    {/* PRIVACIDAD */}
                    <section className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,60,67,0.04)]">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="w-11 h-11 rounded-xl bg-[#E3FEF7] flex items-center justify-center">
                                <Shield className="w-5 h-5 text-[#003C43]" />
                            </div>

                            <div>
                                <h2 className="font-inconsolata text-xl font-bold text-[#003C43]">
                                    Privacidad
                                </h2>

                                <p className="text-sm text-[#181c1d]/60 font-noto-sans">
                                    Controlá cómo se muestra tu perfil.
                                </p>
                            </div>

                        </div>

                        <label className="flex items-center justify-between">

                            <div>
                                <p className="font-medium text-[#181c1d] font-noto-sans">
                                    Perfil privado
                                </p>

                                <p className="text-sm text-[#181c1d]/55 font-noto-sans">
                                    Solo miembros registrados podrán ver tu perfil.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={privateProfile}
                                onChange={() => setPrivateProfile(!privateProfile)}
                                className="w-5 h-5 accent-[#003C43]"
                            />

                        </label>

                    </section>

                    {/* APARIENCIA */}
                    <section className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,60,67,0.04)]">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="w-11 h-11 rounded-xl bg-[#E3FEF7] flex items-center justify-center">
                                <Moon className="w-5 h-5 text-[#003C43]" />
                            </div>

                            <div>
                                <h2 className="font-inconsolata text-xl font-bold text-[#003C43]">
                                    Apariencia
                                </h2>

                                <p className="text-sm text-[#181c1d]/60 font-noto-sans">
                                    Preferencias visuales de la plataforma.
                                </p>
                            </div>

                        </div>

                        <label className="flex items-center justify-between">

                            <div>
                                <p className="font-medium text-[#181c1d] font-noto-sans">
                                    Modo oscuro
                                </p>

                                <p className="text-sm text-[#181c1d]/55 font-noto-sans">
                                    Próximamente disponible.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                                className="w-5 h-5 accent-[#003C43]"
                            />

                        </label>

                    </section>

                    {/* BOTÓN */}
                    <div className="flex justify-end">

                        <div className="relative">

                            <button
                                onClick={handleSave}
                                className="h-12 px-6 rounded-xl bg-[#003C43] text-white font-medium font-noto-sans flex items-center gap-2 hover:bg-[#00252a] transition-colors"
                            >

                                <Save className="w-4 h-4" />

                                Guardar configuración

                            </button>

                            {saved && (
                                <div className="absolute top-[calc(100%+10px)] right-0 whitespace-nowrap bg-[#E3FEF7] text-[#003C43] text-sm px-4 py-2 rounded-lg shadow-lg font-noto-sans">
                                    Configuración guardada
                                </div>
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}