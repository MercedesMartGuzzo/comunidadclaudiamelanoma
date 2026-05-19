'use client';
import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockUsers } from '@/lib/mock-data/users';

import {
    Camera,
    Save,
    UserRound,
    MapPin,
    FileText,
} from 'lucide-react';

export default function EditProfilePage() {

    const user = mockUsers[0];

    const [name, setName] = useState(user.name);
    const [location, setLocation] = useState(user.location);
    const [bio, setBio] = useState(user.bio);

    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {

        setIsSaving(true);

        await new Promise(resolve => setTimeout(resolve, 1200));

        setIsSaving(false);
        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 3000);
    };
    return (
        <>
            <Header />

            <main className="bg-[#f6fafa] min-h-screen pt-24 pb-14 px-4">

                <div className="max-w-[900px] mx-auto">
                    <Link
                        href="/muro"
                        className="inline-flex items-center gap-2 text-sm text-[#003C43]/60 hover:text-[#003C43] transition-colors mb-8 font-noto-sans"
                    >
                        <span className="text-base">←</span>

                        <span>
                            Volver a la comunidad
                        </span>
                    </Link>
                    {/* TOP */}
                    <div className="mb-10">

                        <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/55 mb-3">
                            Comunidad RLM
                        </p>

                        <h1
                            className="font-inconsolata text-4xl sm:text-5xl font-bold text-[#003C43] mb-4"
                            style={{ letterSpacing: '-0.02em' }}
                        >
                            Editar perfil
                        </h1>

                        <p className="text-[#181c1d]/70 text-lg font-noto-sans max-w-2xl leading-relaxed">
                            Actualizá tu información personal y compartí un poco más sobre vos con la comunidad.
                        </p>

                    </div>

                    {/* CARD */}
                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,60,67,0.05)]">

                        {/* AVATAR */}
                        <div className="flex flex-col items-center mb-10">

                            <div className="relative">

                                <div
                                    className="w-24 h-24 rounded-full bg-[#E3FEF7] flex items-center justify-center font-inconsolata text-3xl font-bold text-[#003C43]"
                                >
                                    {user.name.charAt(0)}
                                </div>

                                <button
                                    className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-[#003C43] text-white flex items-center justify-center hover:bg-[#00252a] transition-colors"
                                >
                                    <Camera className="w-4 h-4" />
                                </button>

                            </div>

                            <p className="mt-4 font-inconsolata font-bold text-[#003C43] text-lg">
                                {user.name}
                            </p>

                        {/*     <span className="mt-2 font-inconsolata text-[0.65rem] font-bold uppercase tracking-wider text-[#003C43] bg-[#E3FEF7] px-3 py-1 rounded-full">
                                {user.stage}
                            </span> */}

                        </div>

                        {/* FORM */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* NOMBRE */}
                            <div className="flex flex-col gap-2">

                                <label className="text-sm font-medium text-[#003C43] font-noto-sans">
                                    Nombre
                                </label>

                                <div className="relative">

                                    <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003C43]/40" />

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full h-12 rounded-xl border border-[#d7e7e5] bg-[#fdfefe] pl-11 pr-4 outline-none focus:border-[#5d9ca0] transition-colors text-sm font-noto-sans"
                                    />

                                </div>

                            </div>

                            {/* UBICACION */}
                            <div className="flex flex-col gap-2">

                                <label className="text-sm font-medium text-[#003C43] font-noto-sans">
                                    Ubicación
                                </label>

                                <div className="relative">

                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003C43]/40" />

                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full h-12 rounded-xl border border-[#d7e7e5] bg-[#fdfefe] pl-11 pr-4 outline-none focus:border-[#5d9ca0] transition-colors text-sm font-noto-sans"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* BIO */}
                        <div className="mt-5 flex flex-col gap-2">

                            <label className="text-sm font-medium text-[#003C43] font-noto-sans">
                                Biografía
                            </label>

                            <div className="relative">

                                <FileText className="absolute left-4 top-4 w-4 h-4 text-[#003C43]/40" />

                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={5}
                                    className="w-full rounded-2xl border border-[#d7e7e5] bg-[#fdfefe] pl-11 pr-4 py-4 outline-none focus:border-[#5d9ca0] transition-colors text-sm font-noto-sans resize-none"
                                />

                            </div>

                        </div>

                        {/* BUTTON */}
                        <div className="mt-8 flex justify-end relative">

                            {/* Tooltip */}
                            {saved && (
                                <div className="absolute -top-12 right-0 bg-[#E3FEF7] border border-[#cfe7e5] text-[#003C43] text-sm font-noto-sans px-4 py-2 rounded-xl shadow-sm">
                                    Cambios guardados
                                </div>
                            )}

                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="py-2 px-4 rounded-xl bg-[#003C43] text-white font-medium font-noto-sans flex items-center gap-2 hover:bg-[#00252a] transition-colors disabled:opacity-60"
                            >
                                {isSaving ? 'Guardando...' : 'Guardar cambios'}
                                <Save className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}