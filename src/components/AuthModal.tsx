'use client';

import { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: 'login' | 'registro';
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }: Props) {
    const [tab, setTab] = useState<'login' | 'registro'>(defaultTab);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Login state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    // Registro state
    const [nombre, setNombre] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleClose = () => {
        onClose();
        setEmail('');
        setPassword('');
        setNombre('');
        setEmailReg('');
        setPasswordReg('');
        setConfirmPassword('');
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70"
                style={{ backdropFilter: 'blur(10px)' }}
                onClick={handleClose}
            />

            {/* Modal */}
            <div className=" relative z-10 w-full max-w-4xl h-full md:h-[500px] grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,37,42,0.3)] p-10">

                {/* Panel izquierdo — branding */}
                <div className=" hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-[#00252a] to-[#003c43] relative overflow-hidden rounded-2xl">
                    {/* Decoración */}
                    <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-[#aaeaf5]/20 rounded-full blur-[80px] pointer-events-none" />
                    <div className="absolute bottom-[-5%] left-[-5%] w-60 h-60 bg-[#E3FEF7]/10 rounded-full blur-[60px] pointer-events-none" />

                    {/* Logo */}
                     <div className="relative z-10">
                        <span className="font-inconsolata md:text-2xl font-bold text-[#E3FEF7] tracking-tight mb-4">
                            Comunidad Claudia Melanoma
                        </span>
                    </div> 

                    {/* Contenido */}
                    <div className="relative z-10">
                        <h2
                            className="font-inconsolata text-2xl font-bold text-[#E3FEF7] leading-tight mt-4 mb-2"
                            style={{ letterSpacing: '-0.02em' }}
                        >
                            Acompañándote en cada paso del camino.
                        </h2>
                        <p className="text-[#E3FEF7]/65 font-noto-sans text-base leading-relaxed text-[#E3FEF7] ">
                            Únete a la red de apoyo para pacientes y familiares. Comparte experiencias y encontrá los recursos que necesitás.
                        </p>
                    </div>

                    {/* Quote */}
                  {/*   <div className="relative z-10 border-l-2 border-[#E3FEF7]/30 pl-5">
                        <p className="text-sm text-[#E3FEF7]/50 font-noto-sans">
                            La esperanza es el sueño del hombre despierto.¨
                        </p>
                    </div> */}
                </div>

                {/* Panel derecho — formulario */}
                <div className="flex flex-col justify-start px-8 py-8 md:px-12 bg-white relative overflow-y-auto md:max-h-[360px]">

                    {/* Cerrar */}
                    <button
                        onClick={handleClose}
                        className="absolute top-5 right-5 w-8 h-8  bg-[black]flex items-center justify-center rounded-full hover:bg-[#f0f4f4] transition-colors text-[#003C43]/50 hover:text-[#003C43]"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    {/* Logo mobile */}
                    <div className="md:hidden flex justify-start mb-8 pt-2">
                        <span className="font-inconsolata text-[1.5rem]  text-[#003C43]">Comunidad Claudia Melanoma</span>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mb-8 border-b border-[#003C43]/10">
                        <button
                            onClick={() => setTab('login')}
                            className={`pb-3 px-1 mr-6 font-inconsolata text-sm font-bold uppercase tracking-wide transition-all border-b-2 -mb-px ${tab === 'login'
                                ? 'text-[#003C43] border-[#003C43]'
                                : 'text-[#003C43]/40 border-transparent hover:text-[#003C43]/70'
                                }`}
                        >
                            Iniciar sesión |
                        </button>
                        <button
                            onClick={() => setTab('registro')}
                            className={`pb-3 px-1 font-inconsolata text-sm font-bold uppercase tracking-wide transition-all border-b-2 -mb-px ${tab === 'registro'
                                ? 'text-[#003C43] border-[#003C43]'
                                : 'text-[#003C43]/40 border-transparent hover:text-[#003C43]/70'
                                }`}
                        >
                            Registrarse
                        </button>
                    </div>

                    {/* LOGIN */}
                    {tab === 'login' && (
                        <div className="flex flex-col gap-5">
                            <div>
                                <h2
                                    className="font-inconsolata text-2xl font-bold text-[#003C43] mb-1"
                                    style={{ letterSpacing: '-0.02em' }}
                                >
                                    Bienvenido de nuevo
                                </h2>
                                <p className="text-sm text-[#181c1d]/55 font-noto-sans">
                                    Ingresá tus credenciales para continuar
                                </p>
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <label className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/55">
                                    Correo electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003C43]/30" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="nombre@ejemplo.com"
                                        className="w-full pl-10 pr-4 py-3 bg-[#f6fafa] rounded-lg font-noto-sans text-sm text-[#181c1d] placeholder:text-[#181c1d]/30 outline-none border-2 border-transparent focus:border-[#003C43]/20 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/55">
                                        Contraseña
                                    </label>
                                    <button className="text-xs font-noto-sans text-[#003C43]/55 hover:text-[#003C43] transition-colors">
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003C43]/30" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-10 py-3 bg-[#f6fafa] rounded-lg font-noto-sans text-sm text-[#181c1d] placeholder:text-[#181c1d]/30 outline-none border-2 border-transparent focus:border-[#003C43]/20 transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003C43]/30 hover:text-[#003C43]/60 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={e => setRemember(e.target.checked)}
                                    className="w-4 h-4 rounded border-[#003C43]/20 text-[#003C43] focus:ring-[#003C43]/20"
                                />
                                <span className="text-sm text-[#181c1d]/55 font-noto-sans">Mantener sesión iniciada</span>
                            </label>

                            {/* Botón login */}
                            <button
                                disabled={!email.trim() || !password.trim()}
                                className="w-full py-3.5 bg-[#003C43] text-[#E3FEF7] font-inconsolata text-sm font-bold uppercase tracking-wide rounded-xl hover:bg-[#00252a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Iniciar sesión
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-[#003C43]/10" />
                                <span className="font-inconsolata text-[0.6rem] font-bold uppercase tracking-widest text-[#003C43]/40">
                                    O ingresá con
                                </span>
                                <div className="h-px flex-1 bg-[#003C43]/10" />
                            </div>

                            {/* Social */}
                            {/* Google */}
                            <button className="flex items-center justify-center gap-2 py-2.5 border border-[#003C43]/15 rounded-lg hover:bg-[#f6fafa] transition-colors font-noto-sans text-sm font-medium text-[#003C43]">
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </button>

                            {/* Facebook */}
                            <button className="flex items-center justify-center gap-2 py-2.5 border border-[#003C43]/15 rounded-lg hover:bg-[#f6fafa] transition-colors font-noto-sans text-sm font-medium text-[#003C43]">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                            </button>

                            {/* Switch a registro */}
                            <p className="text-center text-sm text-[#181c1d]/55 font-noto-sans">
                                ¿No tenés una cuenta?{' '}
                                <button
                                    onClick={() => setTab('registro')}
                                    className="font-bold text-[#003C43] hover:underline underline-offset-4"
                                >
                                    Registrate gratis
                                </button>
                            </p>
                        </div>
                    )}

                    {/* REGISTRO */}
                    {tab === 'registro' && (
                        <div className="flex flex-col gap-4 ">
           
                            <div>
                                <h2
                                    className="font-inconsolata text-2xl font-bold text-[#003C43] mb-1"
                                    style={{ letterSpacing: '-0.02em' }}
                                >
                                    Crear una cuenta
                                </h2>
                                <p className="text-sm text-[#181c1d]/55 font-noto-sans">
                                    Unite a la comunidad gratuitamente
                                </p>
                            </div>

                            {/* Nombre */}
                            <div className="flex flex-col gap-1.5">
                                <label className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/55">
                                    Nombre completo
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003C43]/30" />
                                    <input
                                        type="text"
                                        value={nombre}
                                        onChange={e => setNombre(e.target.value)}
                                        placeholder="Tu nombre"
                                        className="w-full pl-10 pr-4 py-3 bg-[#f6fafa] rounded-lg font-noto-sans text-sm text-[#181c1d] placeholder:text-[#181c1d]/30 outline-none border-2 border-transparent focus:border-[#003C43]/20 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <label className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/55">
                                    Correo electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003C43]/30" />
                                    <input
                                        type="email"
                                        value={emailReg}
                                        onChange={e => setEmailReg(e.target.value)}
                                        placeholder="nombre@ejemplo.com"
                                        className="w-full pl-10 pr-4 py-3 bg-[#f6fafa] rounded-lg font-noto-sans text-sm text-[#181c1d] placeholder:text-[#181c1d]/30 outline-none border-2 border-transparent focus:border-[#003C43]/20 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1.5">
                                <label className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/55">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003C43]/30" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={passwordReg}
                                        onChange={e => setPasswordReg(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-10 py-3 bg-[#f6fafa] rounded-lg font-noto-sans text-sm text-[#181c1d] placeholder:text-[#181c1d]/30 outline-none border-2 border-transparent focus:border-[#003C43]/20 transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003C43]/30 hover:text-[#003C43]/60 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirmar password */}
                            <div className="flex flex-col gap-1.5">
                                <label className="font-inconsolata text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#003C43]/55">
                                    Confirmar contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003C43]/30" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-10 py-3 bg-[#f6fafa] rounded-lg font-noto-sans text-sm text-[#181c1d] placeholder:text-[#181c1d]/30 outline-none border-2 border-transparent focus:border-[#003C43]/20 transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003C43]/30 hover:text-[#003C43]/60 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Botón registro */}
                            <button
                                disabled={!nombre.trim() || !emailReg.trim() || !passwordReg.trim() || !confirmPassword.trim()}
                                className="w-full py-3.5 bg-[#003C43] text-[#E3FEF7] font-inconsolata text-sm font-bold uppercase tracking-wide rounded-xl hover:bg-[#00252a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-1"
                            >
                                Crear cuenta
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-[#003C43]/10" />
                                <span className="font-inconsolata text-[0.6rem] font-bold uppercase tracking-widest text-[#003C43]/40">
                                    O registrate con
                                </span>
                                <div className="h-px flex-1 bg-[#003C43]/10" />
                            </div>

                            {/* Social */}
                            {/* Google */}
                            {/* Google */}
                            <button className="flex items-center justify-center gap-2 py-2.5 border border-[#003C43]/15 rounded-lg hover:bg-[#f6fafa] transition-colors font-noto-sans text-sm font-medium text-[#003C43]">
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </button>

                            {/* Facebook */}
                            <button className="flex items-center justify-center gap-2 py-2.5 border border-[#003C43]/15 rounded-lg hover:bg-[#f6fafa] transition-colors font-noto-sans text-sm font-medium text-[#003C43]">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                            </button>
                            {/* Switch a login */}
                            <p className="text-center text-sm text-[#181c1d]/55 font-noto-sans">
                                ¿Ya tenés una cuenta?{' '}
                                <button
                                    onClick={() => setTab('login')}
                                    className="font-bold text-[#003C43] hover:underline underline-offset-4"
                                >
                                    Iniciá sesión
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}