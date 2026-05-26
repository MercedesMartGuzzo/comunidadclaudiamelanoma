'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';

import {
    Camera,
    Save,
    UserRound,
    FileText,
    Shield,
    Activity,
    Eye,
    EyeOff,
    MapPin,
    Loader2
} from 'lucide-react';

export default function EditProfilePage() {
    const router = useRouter();

    // Estados de control de la página
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    // Estados del formulario conectados con tu tabla real
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [stage, setStage] = useState('');
    const [role, setRole] = useState('user');
    const [isPublic, setIsPublic] = useState(true);

    // Cargar datos reales desde Supabase al entrar
    useEffect(() => {
        async function loadProfile() {
            try {
                const { data: { user }, error: userError } = await supabase.auth.getUser();

                if (userError || !user) {
                    router.push('/auth?tab=login');
                    return;
                }

                setUserId(user.id);

                const response = await supabase
                    .from('profiles')
                    .select('name, location, bio, avatar_url, stage, role, is_public')
                    .eq('id', user.id)
                    .single();

                if (response.error && response.error.code !== 'PGRST116') {
                    console.error('Error al traer el perfil:', response.error.message);
                    return;
                }

                if (response.data) {
                    setName(response.data.name || '');
                    setLocation(response.data.location || '');
                    setBio(response.data.bio || '');
                    setAvatarUrl(response.data.avatar_url || '');
                    setStage(response.data.stage || '');
                    setRole(response.data.role || 'user');
                    setIsPublic(response.data.is_public ?? true);
                }
            } catch (err) {
                console.error('Error cargando perfil:', err);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, [router]);

    // Función para subir la imagen real al bucket de Supabase
    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) return;
            if (!userId) return;

            setUploading(true);
            const file = e.target.files[0];

            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}/avatar-${Math.floor(Date.now() / 1000)}.${fileExt}`;

            // Subir al Bucket "avatars"
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, file, { upsert: true });

            if (uploadError) throw uploadError;

            // Obtener URL pública
            const { data } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName);

            setAvatarUrl(data.publicUrl);

            // Reemplazo por Toast de éxito
            toast.success('¡Imagen subida! No te olvides de guardar los cambios.');

        } catch (error) {
            console.error('Error subiendo avatar:', error);

            // Reemplazo por Toast de error controlado
            if (error instanceof Error) {
                toast.error(`Error al subir la imagen: ${error.message}`);
            } else {
                toast.error('Error al subir la imagen: Ocurrió un error desconocido');
            }
        } finally {
            setUploading(false);
        }
    };

    // Guardar todos los cambios del perfil
    const handleSave = async () => {
        if (!userId) return;
        setIsSaving(true);

        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: userId,
                name,
                location,
                bio,
                avatar_url: avatarUrl,
                stage,
                role,
                is_public: isPublic,
                updated_at: new Date().toISOString(),
            });

        setIsSaving(false);

        if (error) {
            // Reemplazo por Toast de error
            toast.error(`Error al guardar: ${error.message}`);
        } else {
            // Reemplazo por Toast de éxito moderno
            toast.success('Perfil actualizado correctamente');
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#f6fafa]">
                <Loader2 className="h-8 w-8 animate-spin text-[#003C43]" />
            </div>
        );
    }

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
                        <span>Volver a la comunidad</span>
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
                                    className="w-24 h-24 rounded-full bg-[#E3FEF7] flex items-center justify-center font-inconsolata text-3xl font-bold text-[#003C43] overflow-hidden relative"
                                >
                                    {uploading ? (
                                        <Loader2 className="h-6 w-6 animate-spin text-[#003C43]" />
                                    ) : avatarUrl ? (
                                        <Image
                                            src={avatarUrl}
                                            alt={name || 'Avatar'}
                                            fill
                                            sizes="96px"
                                            className="object-cover"
                                            priority
                                        />
                                    ) : (
                                        (name ? name.charAt(0).toUpperCase() : 'U')
                                    )}
                                </div>

                                <input
                                    type="file"
                                    id="avatar-input"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    disabled={uploading || !userId}
                                    className="hidden"
                                />

                                <button
                                    type="button"
                                    onClick={() => document.getElementById('avatar-input')?.click()}
                                    disabled={uploading}
                                    className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-[#003C43] text-white flex items-center justify-center hover:bg-[#00252a] transition-colors z-10 disabled:opacity-50"
                                >
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="mt-4 font-inconsolata font-bold text-[#003C43] text-lg">
                                {name || 'Usuario'}
                            </p>

                            {stage && (
                                <span className="mt-2 font-inconsolata text-[0.65rem] font-bold uppercase tracking-wider text-[#003C43] bg-[#E3FEF7] px-3 py-1 rounded-full">
                                    {stage.replace('_', ' ')}
                                </span>
                            )}
                        </div>

                        {/* FORM */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* NOMBRE */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-[#003C43] font-noto-sans">
                                    Nombre completo
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

                            {/* UBICACIÓN */}
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

                            {/* ROL */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-[#003C43] font-noto-sans">
                                    Tu Rol en la comunidad
                                </label>
                                <div className="relative">
                                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003C43]/40 z-10" />
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full h-12 rounded-xl border border-[#d7e7e5] bg-[#fdfefe] pl-11 pr-4 outline-none focus:border-[#5d9ca0] transition-colors text-sm font-noto-sans appearance-none"
                                    >
                                        <option value="user">Paciente</option>
                                        <option value="familiar">Familiar / Acompañante</option>
                                        <option value="medico">Profesional de la Salud</option>
                                    </select>
                                </div>
                            </div>

                            {/* ETAPA (STAGE) */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-[#003C43] font-noto-sans">
                                    Etapa / Estado actual
                                </label>
                                <div className="relative">
                                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003C43]/40 z-10" />
                                    <select
                                        value={stage}
                                        onChange={(e) => setStage(e.target.value)}
                                        className="w-full h-12 rounded-xl border border-[#d7e7e5] bg-[#fdfefe] pl-11 pr-4 outline-none focus:border-[#5d9ca0] transition-colors text-sm font-noto-sans appearance-none"
                                    >
                                        <option value="">Seleccionar etapa...</option>
                                        <option value="diagnostico">Recién diagnosticado/a</option>
                                        <option value="tratamiento">En tratamiento</option>
                                        <option value="control">En control / Seguimiento</option>
                                        <option value="alta">Alta médica</option>
                                    </select>
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
                                    placeholder="Contanos un poco sobre vos..."
                                    className="w-full rounded-2xl border border-[#d7e7e5] bg-[#fdfefe] pl-11 pr-4 py-4 outline-none focus:border-[#5d9ca0] transition-colors text-sm font-noto-sans resize-none"
                                />
                            </div>
                        </div>

                        {/* PRIVACIDAD (IS_PUBLIC) */}
                        <div className="mt-6 flex items-center justify-between p-4 bg-[#f6fafa] rounded-2xl border border-[#d7e7e5]">
                            <div className="flex gap-3 items-center">
                                {isPublic ? (
                                    <Eye className="w-5 h-5 text-[#003C43]" />
                                ) : (
                                    <EyeOff className="w-5 h-5 text-[#003C43]/50" />
                                )}
                                <div className="font-noto-sans">
                                    <p className="text-sm font-medium text-[#003C43]">Perfil Público</p>
                                    <p className="text-xs text-[#003C43]/60">
                                        {isPublic
                                            ? 'Cualquier miembro registrado puede ver tu bío y estado.'
                                            : 'Tu perfil es privado; solo vos verás tus detalles.'}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsPublic(!isPublic)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isPublic ? 'bg-[#003C43]' : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isPublic ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        {/* BUTTON */}
                        <div className="mt-8 flex justify-end relative">
                            <button
                                onClick={handleSave}
                                disabled={isSaving || uploading}
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