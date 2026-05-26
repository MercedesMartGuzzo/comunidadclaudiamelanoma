
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importado para la redirección post-eliminación
import {
    ArrowLeft,
    Bell,
    Moon,
    Save,
    Mail,
    UserX,
    Trash2,
    X,
    AlertTriangle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

interface UserProfile {
    id: string;
    name: string;
    email: string;
}

export default function ConfiguracionPage() {
    const router = useRouter();

    // Estados para el usuario y la carga de datos
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // Estados de las preferencias (locales por ahora)
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [communityNotifications, setCommunityNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    
    // Estados de UI de guardado
    const [saved, setSaved] = useState(false);
    const [emailSaved, setEmailSaved] = useState(false);

    // Input de Email nuevo
    const [newEmail, setNewEmail] = useState('');

    // Estado del Toast unificado (Éxito / Error)
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Bloquear usuarios
    const [blockInput, setBlockInput] = useState('');
    const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

    // Eliminar cuenta
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState('');
    const [isDeleting, setIsDeleting] = useState(false); // Estado para controlar el spinner/bloqueo de borrado

    // Función auxiliar para disparar el Toast elegante
    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    // 1. CARGAR DATOS DE SESIÓN DESDE SUPABASE
    useEffect(() => {
        async function loadUserData() {
            setLoading(true);
            
            const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

            if (authError || !authUser) {
                console.error('No hay usuario autenticado:', authError?.message);
                setLoading(false);
                return;
            }

            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('name')
                .eq('id', authUser.id)
                .single();

            if (profileError) {
                console.warn('No se encontró perfil en tabla profiles, usando datos de auth:', profileError.message);
            }

            setUser({
                id: authUser.id,
                name: profileData?.name || 'Usuario',
                email: authUser.email || '',
            });
            
            setLoading(false);
        }

        loadUserData();
    }, []);

    // 2. GUARDAR PREFERENCIAS GENERALES
    const handleSave = async () => {
        if (!user) return;
        setSaved(true);
        showToast('Preferencias guardadas correctamente.');
        setTimeout(() => setSaved(false), 2500);
    };

    // 3. ACTUALIZAR EMAIL DE LA CUENTA
    const handleEmailSave = async () => {
        if (!newEmail.trim()) return;

        const { error } = await supabase.auth.updateUser({ email: newEmail });

        if (error) {
            console.error('Error al actualizar el email:', error.message);
            showToast('Error al intentar cambiar el correo electrónico', 'error');
            return;
        }

        setEmailSaved(true);
        setNewEmail('');
        setTimeout(() => setEmailSaved(false), 2500);
        showToast('¡Enviamos un correo de confirmación a tu nueva dirección!');
    };

    // 4. FUNCIONES DE BLOQUEO DE USUARIOS (LOCALES)
    const handleBlock = () => {
        const name = blockInput.trim();
        if (!name || blockedUsers.includes(name)) return;
        setBlockedUsers(prev => [...prev, name]);
        setBlockInput('');
        showToast(`Usuario "${name}" bloqueado.`);
    };

    const handleUnblock = (name: string) => {
        setBlockedUsers(prev => prev.filter(u => u !== name));
        showToast(`Usuario "${name}" desbloqueado.`);
    };

    // 5. EJECUTAR ELIMINACIÓN DE CUENTA EN BACKEND
    const handleDeleteAccount = async () => {
        if (deleteConfirm !== 'ELIMINAR' || !user) return;

        setIsDeleting(true);

        try {
            // Obtenemos el token de la sesión del usuario del cliente
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                showToast('No se encontró una sesión activa.', 'error');
                setIsDeleting(false);
                return;
            }

            // Llamamos a la API Route pasándole el token en las cabeceras
            const response = await fetch('/api/delete-account', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Error al eliminar la cuenta');
            }

            showToast('Tu cuenta ha sido eliminada con éxito.', 'success');
            
            // Forzar el deslogueo en la instancia local del cliente
            await supabase.auth.signOut();
            
            // Esperamos un momento breve para que lea el toast y lo mandamos a la landing
            setTimeout(() => {
                router.push('/');
            }, 2000);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Hubo un problema al eliminar tu cuenta.';
            showToast(errorMessage, 'error');
            setIsDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f6fafa] flex items-center justify-center font-inconsolata text-[#003C43]">
                Cargando configuración...
            </div>
        );
    }

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
                    <h1 className="font-inconsolata text-4xl sm:text-5xl font-bold text-[#003C43] mb-4" style={{ letterSpacing: '-0.02em' }}>
                        Configuración
                    </h1>
                    <p className="text-[#181c1d]/70 text-lg font-noto-sans max-w-2xl leading-relaxed">
                        Administrá tus preferencias de privacidad, notificaciones y experiencia dentro de la comunidad.
                    </p>
                </div>

                <div className="flex flex-col gap-6">

                    {/* CORREO ELECTRÓNICO */}
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
                                    {user?.email}
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

                    {/* USUARIOS BLOQUEADOS */}
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
                                    <div key={name} className="flex items-center justify-between bg-[#f6fafa] rounded-lg px-3 py-2.5">
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

                    {/* BOTÓN GUARDAR CAMBIOS */}
                    <div className="flex justify-start sm:justify-end">
                        <div className="relative">
                            <button
                                onClick={handleSave}
                                className="py-2 px-4 rounded-lg bg-[#003C43] text-white flex items-center gap-2 hover:bg-[#00252a] transition-colors font-inconsolata font-bold uppercase text-xs tracking-wider"
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
                        onClick={() => { if (!isDeleting) { setDeleteModalOpen(false); setDeleteConfirm(''); } }}
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
                                disabled={isDeleting}
                                onChange={e => setDeleteConfirm(e.target.value)}
                                placeholder="ELIMINAR"
                                className="w-full bg-[#f6fafa] rounded-lg px-3 py-2.5 text-sm font-noto-sans text-[#181c1d] placeholder:text-[#181c1d]/30 outline-none border-2 border-transparent focus:border-red-200 transition-colors disabled:opacity-60"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                disabled={isDeleting}
                                onClick={() => { setDeleteModalOpen(false); setDeleteConfirm(''); }}
                                className="font-inconsolata text-xs font-bold uppercase tracking-wide text-[#003C43]/55 hover:text-[#003C43] transition-colors px-4 py-2.5 disabled:opacity-40"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteAccount}
                                disabled={deleteConfirm !== 'ELIMINAR' || isDeleting}
                                className="bg-red-400 text-white font-inconsolata text-xs font-bold uppercase tracking-wide px-6 py-2.5 rounded-lg hover:bg-red-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                {isDeleting ? 'Eliminando...' : 'Confirmar eliminación'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TOAST ELEGANTE FLOTANTE (ESTILO EDITAR PERFIL) */}
            {toast && (
                <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-[0_8px_30px_rgba(0,60,67,0.15)] font-noto-sans text-sm tracking-wide border transition-all duration-300 ${
                    toast.type === 'error' 
                        ? 'bg-red-50 text-red-600 border-red-100' 
                        : 'bg-[#003C43] text-[#E3FEF7] border-transparent'
                }`}>
                    <div className="flex items-center gap-2">
                        {toast.type === 'error' && <AlertTriangle className="w-4 h-4" />}
                        {toast.message}
                    </div>
                </div>
            )}
        </main>
    );
}

