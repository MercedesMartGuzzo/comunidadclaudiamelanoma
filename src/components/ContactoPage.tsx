'use client';

import { Mail, Send } from 'lucide-react';
import Image from 'next/image';

export default function ContactoPage() {
    return (
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

            {/* Header alineado al top */}
            <div className="mb-16 flex flex-col md:flex-row items-start gap-8">

                <div className="flex-1">
                    <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/55 mb-3">
                        Red Melanoma Latam
                    </p>
                    <h1 className="font-inconsolata text-4xl sm:text-5xl font-bold text-[#003C43] mb-4" style={{ letterSpacing: '-0.02em' }}>
                        Contacto
                    </h1>
                    <p className="text-[#181c1d]/70 text-lg font-noto-sans max-w-2xl leading-relaxed">
                        Estamos aquí para escucharte. Envíanos tus dudas, sugerencias o comentarios y te responderemos a la brevedad posible.
                    </p>
                </div>

                {/* Contenedor de Imagen con Filtro */}
                <div className="w-full md:w-1/3 h-64 relative rounded-2xl overflow-hidden border border-[#003C43]/10">
                    <div className="absolute inset-0 bg-[#003C43]/20 mix-blend-multiply z-10" />
                    <Image
                        src="/images/hero/comunidad-sinmarca.png"
                        alt="Contacto Red Melanoma Latam"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Grid principal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Columna Izquierda: Información */}
                <div className="bg-[#f6fafa] p-8 rounded-xl border border-[#003C43]/50 h-fit">
                    <h3 className="font-inconsolata text-xl font-bold text-[#003C43] mb-6">
                        Información de contacto
                    </h3>
                    <div className="flex items-start gap-4 mb-8">
                        <Mail className="w-6 h-6 text-[#003C43] mt-1" />
                        <div>
                            <p className="font-semibold text-[#003C43] font-noto-sans">Email oficial</p>
                            <a
                                href="mailto:info@redmelanomalatam.org"
                                className="text-[#181c1d]/80 hover:text-[#003C43] transition font-noto-sans underline decoration-[#003C43]/20 underline-offset-4"
                            >
                                info@redmelanomalatam.org
                            </a>
                        </div>
                    </div>
                    <p className="text-sm text-[#181c1d]/60 font-noto-sans leading-relaxed">
                        Nuestro equipo de profesionales y voluntarios revisa los mensajes diariamente.
                        Si tienes una emergencia médica, por favor contacta a tu centro de salud local inmediatamente.
                    </p>
                </div>

                {/* Columna Derecha: Formulario con borde y título */}
                <div className="bg-[#f6fafa] p-8 rounded-xl border border-[#003C43]/50">
                    <h3 className="font-inconsolata text-xl font-bold text-[#003C43] mb-6">
                        Consultas
                    </h3>
                    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase text-[#003C43] font-inconsolata tracking-wide">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    placeholder="Tu nombre completo"
                                    className="bg-white border border-[#003C43]/10 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#003C43]/20 font-noto-sans text-sm placeholder:text-gray-400"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase text-[#003C43] font-inconsolata tracking-wide">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    className="bg-white border border-[#003C43]/10 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#003C43]/20 font-noto-sans text-sm placeholder:text-gray-400"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase text-[#003C43] font-inconsolata tracking-wide">
                                Mensaje
                            </label>
                            <textarea
                                rows={5}
                                placeholder="Escribe aquí tu consulta o comentario..."
                                className="bg-white border border-[#003C43]/10 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#003C43]/20 font-noto-sans text-sm placeholder:text-gray-400 resize-none"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full sm:w-auto self-start font-inconsolata text-sm font-bold uppercase tracking-wide bg-[#003C43] text-[#E3FEF7] px-8 py-3 rounded-md hover:bg-[#00252a] transition-colors flex items-center justify-center gap-2"
                        >
                            Enviar Mensaje <Send size={16} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}