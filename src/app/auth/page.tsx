'use client';

import { useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // 1. DERIVAMOS EL ESTADO DE LA URL (Sin useState ni useEffect)
    // Esto evita el error de "cascading renders"
    const tab = searchParams.get('tab') === 'registro' ? 'registro' : 'login';

    // 2. FUNCIÓN PARA CAMBIAR DE TAB
    // En lugar de modificar un estado local, actualizamos la URL
    const setTab = (newTab: 'login' | 'registro') => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('tab', newTab);
        // Usamos push o replace para cambiar la URL sin recargar la página
        router.push(`${pathname}?${params.toString()}`);
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const [nombre, setNombre] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f6fafa] px-4 py-10 md:py-6">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,37,42,0.15)] md:max-h-[640px]">

                {/* IZQUIERDA */}
                <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-[#00252a] to-[#003c43] relative overflow-hidden">
                    <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-[#aaeaf5]/20 rounded-full blur-[80px]" />
                    <div className="absolute bottom-[-5%] left-[-5%] w-60 h-60 bg-[#E3FEF7]/10 rounded-full blur-[60px]" />

                    <span className="font-inconsolata text-2xl font-bold text-[#E3FEF7]">
                        Comunidad Claudia Melanoma
                    </span>

                    <div>
                        <h2 className="font-inconsolata text-xl font-bold text-[#E3FEF7] mb-2">
                            Acompañándote en cada paso del camino.
                        </h2>
                        <p className="text-[#E3FEF7]/70 font-noto-sans text-sm">
                            Únete a la red de apoyo para pacientes y familiares.
                        </p>
                    </div>
                </div>

                {/* DERECHA */}
                <div className="flex flex-col justify-start px-8 py-8 md:px-10 bg-white overflow-y-auto">

                    {/* Tabs */}
                    <div className="flex gap-1 mb-6 border-b border-[#003C43]/10">
                        <button
                            onClick={() => setTab('login')}
                            className={`pb-2 mr-6 border-b-2 text-sm transition-colors ${tab === 'login'
                                ? 'text-[#003C43] border-[#003C43]'
                                : 'text-[#003C43]/40 border-transparent hover:text-[#003C43]/60'
                                }`}
                        >
                            Iniciar sesión
                        </button>

                        <button
                            onClick={() => setTab('registro')}
                            className={`pb-2 border-b-2 text-sm transition-colors ${tab === 'registro'
                                ? 'text-[#003C43] border-[#003C43]'
                                : 'text-[#003C43]/40 border-transparent hover:text-[#003C43]/60'
                                }`}
                        >
                            Registrarse
                        </button>
                    </div>

                    {/* FORMULARIO LOGIN */}
                    {tab === 'login' && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log('login', { email, password });
                            }}
                            className="flex flex-col gap-4"
                        >
                            <h2 className="text-xl font-bold text-[#003C43]">Bienvenido de nuevo</h2>

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003C43]/50" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="nombre@ejemplo.com"
                                    className="w-full pl-10 py-2.5 bg-[#f6fafa] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003C43]/20"
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003C43]/50" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-2.5 bg-[#f6fafa] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003C43]/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003C43]/50 hover:text-[#003C43]"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            <label className="flex items-center gap-2 text-sm cursor-pointer text-[#003C43]/70">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={e => setRemember(e.target.checked)}
                                    className="rounded border-[#003C43]/20"
                                />
                                Mantener sesión iniciada
                            </label>

                            <button type="submit" className="w-full py-2.5 bg-[#003C43] text-white rounded-xl text-sm font-semibold hover:bg-[#00252a] transition-colors">
                                Iniciar sesión
                            </button>

                            <div className="flex items-center gap-3 my-2">
                                <div className="h-px flex-1 bg-[#003C43]/10" />
                                <span className="text-xs text-[#003C43]/40">O ingresá con</span>
                                <div className="h-px flex-1 bg-[#003C43]/10" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button type="button" className="flex items-center justify-center gap-2 py-2 border border-[#003C43]/10 rounded-lg text-sm hover:bg-[#f6fafa] transition-colors">
                                    Google
                                </button>
                                <button type="button" className="flex items-center justify-center gap-2 py-2 border border-[#003C43]/10 rounded-lg text-sm hover:bg-[#f6fafa] transition-colors">
                                    Facebook
                                </button>
                            </div>

                            <p className="text-center text-sm text-[#003C43]/60 mt-2">
                                ¿No tenés cuenta?{' '}
                                <button type="button" onClick={() => setTab('registro')} className="font-bold text-[#003C43] hover:underline">
                                    Registrate
                                </button>
                            </p>
                        </form>
                    )}

                    {/* FORMULARIO REGISTRO */}
                    {tab === 'registro' && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log('registro', { nombre, emailReg, passwordReg });
                            }}
                            className="flex flex-col gap-3"
                        >
                            <h2 className="text-xl font-bold text-[#003C43]">Crear cuenta</h2>

                            <input
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                className="py-2 px-3 bg-[#f6fafa] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003C43]/20"
                                placeholder="Nombre completo"
                            />

                            <input
                                type="email"
                                value={emailReg}
                                onChange={e => setEmailReg(e.target.value)}
                                className="py-2 px-3 bg-[#f6fafa] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003C43]/20"
                                placeholder="Correo electrónico"
                            />

                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwordReg}
                                    onChange={e => setPasswordReg(e.target.value)}
                                    className="w-full py-2 px-3 bg-[#f6fafa] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003C43]/20"
                                    placeholder="Contraseña"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003C43]/50"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    className="w-full py-2 px-3 bg-[#f6fafa] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003C43]/20"
                                    placeholder="Confirmar contraseña"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003C43]/50"
                                >
                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            <button type="submit" className="bg-[#003C43] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#00252a] transition-colors mt-2">
                                Crear cuenta
                            </button>

                            <div className="grid grid-cols-2 gap-3 mt-2">
                                <button type="button" className="border border-[#003C43]/10 py-2 rounded-lg text-sm hover:bg-[#f6fafa]">Google</button>
                                <button type="button" className="border border-[#003C43]/10 py-2 rounded-lg text-sm hover:bg-[#f6fafa]">Facebook</button>
                            </div>

                            <p className="text-center text-sm text-[#003C43]/60 mt-2">
                                ¿Ya tenés cuenta?{' '}
                                <button type="button" onClick={() => setTab('login')} className="font-bold text-[#003C43] hover:underline">
                                    Iniciá sesión
                                </button>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}