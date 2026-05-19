'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
    ArrowLeft,
    Bell,
    Shield,
    Moon,
    Save,
    Mail,
    UserX,
    Trash2,
    X,
    AlertTriangle,
} from 'lucide-react';
import { mockUsers } from '@/lib/mock-data/users';

export default function ConfiguracionPage() {
    const user = mockUsers[0];

    const [emailNotifications, setEmailNotifications] = useState(true);
    const [communityNotifications, setCommunityNotifications] = useState(true);
    const [privateProfile, setPrivateProfile] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [saved, setSaved] = useState(false);

    // Email
    const [newEmail, setNewEmail] = useState('');
    const [emailSaved, setEmailSaved] = useState(false);

    // Bloquear usuarios
    const [blockInput, setBlockInput] = useState('');
    const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

    // Eliminar cuenta
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState('');

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const handleEmailSave = () => {
        if (!newEmail.trim()) return;
        setEmailSaved(true);
        setNewEmail('');
        setTimeout(() => setEmailSaved(false), 2500);
    };

    const handleBlock = () => {
        const name = blockInput.trim();
        if (!name || blockedUsers.includes(name)) return;
        setBlockedUsers(prev => [...prev, name]);
        setBlockInput('');
    };

    const handleUnblock = (name: string) => {
        setBlockedUsers(prev => prev.filter(u => u !== name));
    };

    return (
        <main className="bg-[#f6fafa] min-h-screen pt-14 pb-20 px-4">
            <div className="max-w-[900px] mx-auto">

                {/* VOLVER */}
                <Link
                    href="/muro"
                    className="inline-flex items-center gap-2 text-sm text-[#003C43]/60 hover:text-[#003C43] transition-colors mb-8 font-noto-sans group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Volver a la comunidad   
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

                    {/* EMAIL */}
                    <section className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,60,67,0.04)]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-11 h-11 rounded-xl bg-[#E3FEF7] flex items-center justify-center">
                                <Mail className="w-5 h-5 text-[#003C43]" />
                            </div>
                            <div>
                                <h2 className="font-inconsolata text-xl font-bold text-[#003C43]">
                                    Correo electrónico
                                </h2>
                                <p className="text-sm text-[#181c1d]/60 font-noto-sans">
                                    Actualizá tu dirección de email.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/55">
                                    Email actual
                                </label>
                                <p className="text-sm font-noto-sans text-[#181c1d]/60 bg-[#f6fafa] rounded-lg px-3 py-2.5">
                                    {user.name.toLowerCase().replace(' ', '.')}@ejemplo.com
                                </p>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/55">
                                    Nuevo email
                                </label>
                                <div className="flex gap-3">
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={e => setNewEmail(e.target.value)}
                                        placeholder="nuevo@ejemplo.com"
                                        className="flex-1 bg-[#f6fafa] rounded-lg px-3 py-2.5 text-sm font-noto-sans text-[#181c1d] placeholder:text-[#181c1d]/30 outline-none border-2 border-transparent focus:border-[#003C43]/20 transition-colors"
                                    />
                                    <button
                                        onClick={handleEmailSave}
                                        disabled={!newEmail.trim()}
                                        className="bg-[#003C43] text-[#E3FEF7] font-inconsolata text-xs font-bold uppercase tracking-wide px-4 py-2.5 rounded-lg hover:bg-[#00252a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                                    >
                                        {emailSaved ? '✓ Guardado' : 'Actualizar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

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
                            <label className="flex items-center justify-between cursor-pointer">
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

                            <label className="flex items-center justify-between cursor-pointer">
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

                        <label className="flex items-center justify-between cursor-pointer">
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

                    {/* BLOQUEAR USUARIOS */}
                    <section className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,60,67,0.04)]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-11 h-11 rounded-xl bg-[#E3FEF7] flex items-center justify-center">
                                <UserX className="w-5 h-5 text-[#003C43]" />
                            </div>
                            <div>
                                <h2 className="font-inconsolata text-xl font-bold text-[#003C43]">
                                    Usuarios bloqueados
                                </h2>
                                <p className="text-sm text-[#181c1d]/60 font-noto-sans">
                                    Los usuarios bloqueados no podrán ver tu perfil ni contactarte.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 mb-4">
                            <input
                                type="text"
                                value={blockInput}
                                onChange={e => setBlockInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleBlock()}
                                placeholder="Nombre del usuario a bloquear"
                                className="flex-1 bg-[#f6fafa] rounded-lg px-3 py-2.5 text-sm font-noto-sans text-[#181c1d] placeholder:text-[#181c1d]/30 outline-none border-2 border-transparent focus:border-[#003C43]/20 transition-colors"
                            />
                            <button
                                onClick={handleBlock}
                                disabled={!blockInput.trim()}
                                className="bg-[#003C43] text-[#E3FEF7] font-inconsolata text-xs font-bold uppercase tracking-wide px-4 py-2.5 rounded-lg hover:bg-[#00252a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Bloquear
                            </button>
                        </div>

                        {blockedUsers.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                {blockedUsers.map(name => (
                                    <div
                                        key={name}
                                        className="flex items-center justify-between bg-[#f6fafa] rounded-lg px-3 py-2.5"
                                    >
                                        <span className="text-sm font-noto-sans text-[#181c1d]/70">
                                            {name}
                                        </span>
                                        <button
                                            onClick={() => handleUnblock(name)}
                                            className="text-xs font-inconsolata font-bold uppercase tracking-wide text-[#003C43]/50 hover:text-[#003C43] transition-colors flex items-center gap-1"
                                        >
                                            <X className="w-3 h-3" />
                                            Desbloquear
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-[#181c1d]/40 font-noto-sans text-center py-2">
                                No tenés usuarios bloqueados.
                            </p>
                        )}
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

                        <label className="flex items-center justify-between cursor-pointer">
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

                    {/* GUARDAR */}
                    <div className="flex justify-start sm:justify-end">
                        <div className="relative">
                            <button
                                onClick={handleSave}
                                className="py-2 px-4 rounded-lg bg-[#003C43] text-white flex items-center gap-2 hover:bg-[#00252a] transition-colors"
                            >
                                Guardar cambios
                                <Save className="w-4 h-4" />
                            </button>

                            {saved && (
                                <div className="absolute top-[calc(100%+10px)] left-0 sm:left-auto sm:right-0 whitespace-nowrap bg-[#E3FEF7] text-[#003C43] text-sm px-4 py-2 rounded-lg shadow-lg font-noto-sans">
                                    ✓ Cambios guardados
                                </div>
                            )}
                        </div>
                    </div>
                    {/* ZONA DE PELIGRO */}
                    <section className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,60,67,0.04)] border border-red-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                                <Trash2 className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                                <h2 className="font-inconsolata text-xl font-bold text-[#181c1d]">
                                    Zona de peligro
                                </h2>
                                <p className="text-sm text-[#181c1d]/60 font-noto-sans">
                                    Acciones irreversibles sobre tu cuenta.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-red-50 rounded-xl p-4 gap-4">
                            <div>
                                <p className="font-medium text-[#181c1d] font-noto-sans text-sm">
                                    Eliminar cuenta
                                </p>
                                <p className="text-xs text-[#181c1d]/55 font-noto-sans mt-0.5">
                                    Esta acción es permanente e irreversible.
                                </p>
                            </div>

                            <button
                                onClick={() => setDeleteModalOpen(true)}
                                className="font-inconsolata text-xs font-bold uppercase tracking-wide text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 px-4 py-2 rounded-lg transition-colors self-start sm:self-auto"
                            >
                                Eliminar cuenta
                            </button>
                        </div>
                    </section>

                </div>
            </div>

            {/* MODAL CONFIRMAR ELIMINACIÓN */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-[#00252a]/60 backdrop-blur-sm"
                        onClick={() => { setDeleteModalOpen(false); setDeleteConfirm(''); }}
                    />
                    <div className="relative bg-white rounded-2xl w-full max-w-md p-8 shadow-[0_20px_60px_rgba(0,60,67,0.2)] z-10">

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-5 h-5 text-red-400" />
                            </div>
                            <h2 className="font-inconsolata text-xl font-bold text-[#181c1d]">
                                Eliminar cuenta
                            </h2>
                        </div>

                        <p className="text-sm font-noto-sans text-[#181c1d]/70 leading-relaxed mb-6">
                            Esta acción es <strong>permanente e irreversible</strong>. Se eliminarán todos tus datos, publicaciones y actividad en la comunidad.
                        </p>

                        <div className="flex flex-col gap-1.5 mb-6">
                            <label className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#181c1d]/55">
                                Escribí <span className="text-red-400">ELIMINAR</span> para confirmar
                            </label>
                            <input
                                type="text"
                                value={deleteConfirm}
                                onChange={e => setDeleteConfirm(e.target.value)}
                                placeholder="ELIMINAR"
                                className="w-full bg-[#f6fafa] rounded-lg px-3 py-2.5 text-sm font-noto-sans text-[#181c1d] placeholder:text-[#181c1d]/30 outline-none border-2 border-transparent focus:border-red-200 transition-colors"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => { setDeleteModalOpen(false); setDeleteConfirm(''); }}
                                className="font-inconsolata text-xs font-bold uppercase tracking-wide text-[#003C43]/55 hover:text-[#003C43] transition-colors px-4 py-2.5"
                            >
                                Cancelar
                            </button>
                            <button
                                disabled={deleteConfirm !== 'ELIMINAR'}
                                className="bg-red-400 text-white font-inconsolata text-xs font-bold uppercase tracking-wide px-6 py-2.5 rounded-lg hover:bg-red-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Confirmar eliminación
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}