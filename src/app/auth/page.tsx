'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Leaf, Clover, LeafyGreen, Rose, Flower2, Wheat, Flower, Sprout } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Link from 'next/link';

function AuthContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const tab = searchParams.get('tab') === 'registro' ? 'registro' : 'login';

    const setTab = (newTab: 'login' | 'registro') => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('tab', newTab);
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
        <div className="min-h-screen w-full bg-[#f6fafa] flex flex-col">

            {/* Hero superior */}
            <div className="w-full bg-gradient-to-br from-[#00252a] to-[#003c43] py-10 px-4 relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-80 h-80 bg-[#aaeaf5]/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-[-20%] left-[-5%] w-60 h-60 bg-[#E3FEF7]/5 rounded-full blur-[60px] pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 text-xs text-[#E3FEF7]/50 hover:text-[#E3FEF7] transition-colors font-noto-sans mb-8 w-fit group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        Volver al inicio
                    </Link>

                    <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#E3FEF7]/40 mb-3">
                        Comunidad Claudia Melanoma
                    </p>

                    <h1
                        className="font-inconsolata text-3xl sm:text-4xl font-bold text-[#E3FEF7] mb-3"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        {tab === 'login' ? 'Bienvenido de nuevo' : 'Unite a la comunidad'}

                    </h1>

                    <p className="text-[#E3FEF7]/60 font-noto-sans text-sm">
                        {tab === 'login'
                            ? 'Ingresá tus credenciales para continuar.'
                            : 'Creá tu cuenta gratuitamente y empezá a ser parte.'}
                    </p>
                   
                </div>
             {    <div className="max-w-5xl mx-auto relative z-10 flex gap-4 mt-2 px-0 py-2 pr-0 md:pr-14 mt-4">
                        <Leaf className="w-4 h-4 text-white" />
                        <Clover className="w-4 h-4 text-white" />
                        <LeafyGreen className="w-4 h-4 text-white" />
                        <Sprout className="w-4 h-4 text-white" />
                        <Rose className="w-4 h-4 text-white" />
                        <Flower2 className="w-4 h-4 text-white" />
                        <Wheat className="w-4 h-4 text-white" />
                        <Flower className="w-4 h-4 text-white" />
                    </div>}
            </div>

            {/* Formulario */}
            <div className="flex-1 w-full px-4 py-12">
                <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,60,67,0.08)]">

                    {/* Tabs */}
                    <div className="flex gap-1 mb-6 border-b border-[#003C43]/10">
                        <button
                            type="button"
                            onClick={() => setTab('login')}
                            className={`pb-2 mr-6 border-b-2 text-sm transition-colors ${tab === 'login'
                                ? 'text-[#003C43] border-[#003C43]'
                                : 'text-[#003C43]/40 border-transparent hover:text-[#003C43]/60'
                                }`}
                        >
                            Iniciar sesión
                        </button>
                        <button
                            type="button"
                            onClick={() => setTab('registro')}
                            className={`pb-2 border-b-2 text-sm transition-colors ${tab === 'registro'
                                ? 'text-[#003C43] border-[#003C43]'
                                : 'text-[#003C43]/40 border-transparent hover:text-[#003C43]/60'
                                }`}
                        >
                            Registrarse
                        </button>
                    </div>

                    {/* LOGIN */}
                    {tab === 'login' && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log('login', { email, password });
                            }}
                            className="flex flex-col gap-4"
                        >
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003C43]/50" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="nombre@ejemplo.com"
                                    className="w-full pl-10 py-2.5 bg-[#f6fafa] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003C43]/20 font-noto-sans"
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003C43]/50" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-2.5 bg-[#f6fafa] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003C43]/20 font-noto-sans"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003C43]/50 hover:text-[#003C43]"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm cursor-pointer text-[#003C43]/70 font-noto-sans">
                                    <input
                                        type="checkbox"
                                        checked={remember}
                                        onChange={e => setRemember(e.target.checked)}
                                        className="rounded border-[#003C43]/20"
                                    />
                                    Mantener sesión iniciada
                                </label>
                                <button type="button" className="text-xs text-[#003C43]/55 hover:text-[#003C43] transition-colors font-noto-sans">
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 bg-[#003C43] text-white rounded-xl text-sm font-semibold hover:bg-[#00252a] transition-colors font-inconsolata uppercase tracking-wide"
                            >
                                Iniciar sesión
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="h-px flex-1 bg-[#003C43]/10" />
                                <span className="text-xs text-[#003C43]/40 font-noto-sans">O ingresá con</span>
                                <div className="h-px flex-1 bg-[#003C43]/10" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-[#003C43]/10 rounded-lg text-sm hover:bg-[#f6fafa] transition-colors font-noto-sans">
                                    <FcGoogle size={18} />
                                    Google
                                </button>
                                <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-[#003C43]/10 rounded-lg text-sm hover:bg-[#f6fafa] transition-colors font-noto-sans">
                                    <FaFacebook size={18} className="text-[#1877F2]" />
                                    Facebook
                                </button>
                            </div>

                            <p className="text-center text-sm text-[#003C43]/60 font-noto-sans">
                                ¿No tenés cuenta?{' '}
                                <button
                                    type="button"
                                    onClick={() => setTab('registro')}
                                    className="font-bold text-[#003C43] hover:underline underline-offset-4"
                                >
                                    Registrate gratis
                                </button>
                            </p>
                        </form>
                    )}

                    {/* REGISTRO */}
                    {tab === 'registro' && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log('registro', { nombre, emailReg, passwordReg });
                            }}
                            className="flex flex-col gap-3"
                        >
                            <input
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                className="py-2.5 px-3 bg-[#f6fafa] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003C43]/20 font-noto-sans"
                                placeholder="Nombre completo"
                            />

                            <input
                                type="email"
                                value={emailReg}
                                onChange={e => setEmailReg(e.target.value)}
                                className="py-2.5 px-3 bg-[#f6fafa] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003C43]/20 font-noto-sans"
                                placeholder="Correo electrónico"
                            />

                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwordReg}
                                    onChange={e => setPasswordReg(e.target.value)}
                                    className="w-full py-2.5 px-3 bg-[#f6fafa] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003C43]/20 font-noto-sans"
                                    placeholder="Contraseña"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003C43]/50 hover:text-[#003C43]"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    className="w-full py-2.5 px-3 bg-[#f6fafa] rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003C43]/20 font-noto-sans"
                                    placeholder="Confirmar contraseña"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003C43]/50 hover:text-[#003C43]"
                                >
                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="bg-[#003C43] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#00252a] transition-colors mt-1 font-inconsolata uppercase tracking-wide"
                            >
                                Crear cuenta
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="h-px flex-1 bg-[#003C43]/10" />
                                <span className="text-xs text-[#003C43]/40 font-noto-sans">O registrate con</span>
                                <div className="h-px flex-1 bg-[#003C43]/10" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-[#003C43]/10 rounded-lg text-sm hover:bg-[#f6fafa] transition-colors font-noto-sans">
                                    <FcGoogle size={18} />
                                    Google
                                </button>
                                <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-[#003C43]/10 rounded-lg text-sm hover:bg-[#f6fafa] transition-colors font-noto-sans">
                                    <FaFacebook size={18} className="text-[#1877F2]" />
                                    Facebook
                                </button>
                            </div>

                            <p className="text-center text-sm text-[#003C43]/60 font-noto-sans mt-1">
                                ¿Ya tenés cuenta?{' '}
                                <button
                                    type="button"
                                    onClick={() => setTab('login')}
                                    className="font-bold text-[#003C43] hover:underline underline-offset-4"
                                >
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

export default function AuthPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen w-full flex items-center justify-center bg-[#f6fafa]">
                <div className="animate-pulse text-[#003C43] font-medium font-noto-sans">Cargando...</div>
            </div>
        }>
            <AuthContent />
        </Suspense>
    );
}