'use client';


import { useRef } from 'react';
import { gsap } from 'gsap';
import { Rose, HandHeart, Clover } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function AboutClaudia() {
    const primaryOverlayRef = useRef<HTMLSpanElement>(null);
    const primaryTextRef = useRef<HTMLSpanElement>(null);
    const router = useRouter();
    /* const secondaryOverlayRef = useRef<HTMLSpanElement>(null);
    const secondaryTextRef = useRef<HTMLSpanElement>(null);
 */
    // HANDLE PRIMARY
    const handlePrimaryEnter = () => {
        gsap.to(primaryOverlayRef.current, {
            x: 0,
            duration: 0.4,
            ease: 'power2.out',
        });

        gsap.to(primaryTextRef.current, {
            x: 4,
            color: '#E3FEF7',
            duration: 0.4,
        });
    };

    const handlePrimaryLeave = () => {
        gsap.to(primaryOverlayRef.current, {
            x: '-100%',
            duration: 0.4,
            ease: 'power2.out',
        });

        gsap.to(primaryTextRef.current, {
            x: 0,
            color: '#003C43',
            duration: 0.4,
        });
    };

    /*     const handleSecondaryEnter = () => {
            gsap.to(secondaryOverlayRef.current, {
                x: 0,
                duration: 0.4,
                ease: 'power2.out',
            });
    
            gsap.to(secondaryTextRef.current, {
                x: 4,
                color: '#E3FEF7',
                duration: 0.4,
            });
        };
    
        const handleSecondaryLeave = () => {
            gsap.to(secondaryOverlayRef.current, {
                x: '-100%',
                duration: 0.4,
                ease: 'power2.out',
            });
    
            gsap.to(secondaryTextRef.current, {
                x: 0,
                color: '#003C43',
                duration: 0.4,
            });
        }; */

    return (
        <>
            <Header />

            <main className="bg-[#f6fafa] min-h-screen">

                {/* HERO */}
                <section className="pt-32 pb-28 px-6 md:px-12 bg-[#f6fafa]">
                    <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                        <div className="space-y-8">
                            <p className="font-inconsolata text-xs uppercase tracking-[0.3em] text-[#003C43]">
                                HOMENAJE · LEGADO · COMUNIDAD HISPANOHABLANTE
                            </p>

                            <h1
                                className="font-inconsolata text-3xl sm:text-4xl font-bold text-[#003C43] leading-tight"
                                style={{ letterSpacing: '-0.02em' }}
                            >
                                Sobre Claudia
                            </h1>

                            <p className="font-noto-sans text-base text-[#181c1d] leading-relaxed max-w-2xl">
                                Claudia, idola,Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Rem, maxime. Nostrum repellendus ipsa explicabo, sunt amet tempore
                                numquam sed aliquid, laudantium asperiores reiciendis facere enim
                                debitis deserunt iure cum nobis? Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </p>

                            <p className="font-noto-sans text-base text-[#181c1d] leading-relaxed max-w-2xl">
                                Frente a la ausencia de espacios equivalentes para pacientes
                                hispanohablantes, nació la visión de crear una plataforma propia para
                                Argentina y toda la communidad latina. Hoy, tras su fallecimiento en
                                febrero de 2026, esta plataforma honra su memoria continuando ese
                                propósito: construir una comunidad donde nadie enfrente el melanoma en
                                soledad.
                            </p>
                        </div>

                        <div className="w-full h-[500px] rounded-lg bg-[#d9e7e7] flex items-center justify-center">
                            <span className="font-inconsolata text-[#003C43] text-sm tracking-widest uppercase">
                                Imagen de Claudia
                            </span>
                        </div>

                    </div>
                </section>

                {/* LEGADO */}
                {/*                 <section className="py-28 px-6 md:px-12 bg-[#f0f4f4]">
                    <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-14">

                        <div className="lg:col-span-2">
                            <h2
                                className="font-inconsolata text-3xl sm:text-4xl font-bold text-[#003C43]"
                                style={{ letterSpacing: '-0.02em' }}
                            >
                                Un puente para quienes necesitan compañía
                            </h2>

                            <div className="mt-6 w-14 h-1 bg-[#5d9ca0] rounded-full"></div>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-lg p-10">
                                <p className="font-noto-sans text-base text-[#181c1d] leading-relaxed mb-6">
                                    Claudia comprendió que el acceso a una comunidad puede marcar profundamente
                                    la experiencia del tratamiento. Sus vínculos internacionales le brindaron
                                    información, apoyo emocional y contención en momentos clave.
                                </p>

                                <p className="font-noto-sans text-base text-[#181c1d] leading-relaxed">
                                    Inspirados en su recorrido, este espacio busca ofrecer esa misma posibilidad
                                    a pacientes y familias hispanohablantes, creando una red donde compartir
                                    experiencias, recursos y humanidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </section> */}

                {/* PRINCIPIOS */}
                <section className="py-28 px-6 md:px-12 bg-[#f6fafa]">
                    <div className="max-w-[1000px] mx-auto">

                        <div className="max-w-3xl mb-20 text-left">
                            <h2
                                className="font-inconsolata text-3xl sm:text-4xl font-bold text-[#003C43] mb-6"
                                style={{ letterSpacing: '-0.02em' }}
                            >
                                El espíritu de nuestra comunidad
                            </h2>

                            <p className="font-noto-sans text-base text-[#181c1d] ">
                                “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic facilis.”
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                            {[
                                {
                                    icon: HandHeart,
                                    title: 'Conexión real',
                                    description:
                                        'Creamos una red para pacientes y familias hispanohablantes basada en comprensión mutua.',
                                },
                                {
                                    icon: Clover,
                                    title: 'Homenaje activo',
                                    description:
                                        'Cada espacio de esta plataforma honra la vida de Claudia y su deseo de ayudar.',
                                },
                                {
                                    icon: Rose,
                                    title: 'Acceso compartido',
                                    description:
                                        'Facilitamos recursos y experiencias para reducir el aislamiento y fortalecer decisiones informadas.',
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg p-10 text-center"
                                >
                                    <div className="flex justify-center mb-6">
                                        <div className="p-4 bg-[#E3FEF7] rounded-lg">
                                            <item.icon className="w-8 h-8 text-[#003C43]" />
                                        </div>
                                    </div>

                                    <h3
                                        className="font-inconsolata text-xl font-semibold text-[#003C43] mb-4"
                                        style={{ letterSpacing: '-0.02em' }}
                                    >
                                        {item.title}
                                    </h3>

                                    <p className="font-noto-sans text-sm text-[#181c1d] leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA FINAL */}
                <section className="py-28 px-6 md:px-12 bg-gradient-to-br from-[#00252a] to-[#003C43]">
                    <div className="max-w-[900px] mx-auto text-center">

                        <h2
                            className="font-inconsolata text-3xl sm:text-4xl font-bold text-[#E3FEF7] mb-8"
                            style={{ letterSpacing: '-0.02em' }}
                        >
                            Continuar su propósito
                        </h2>

                        <p className="font-noto-sans text-base text-white/90 max-w-2xl mx-auto mb-14 leading-relaxed">
                            Ser parte de esta comunidad significa preservar el legado de Claudia y ampliar
                            una red creada para que pacientes de Argentina y toda la comunidad hispanohablante
                            encuentren apoyo, información y compañía.
                        </p>

                        <div className="flex justify-center">

                            <div>
                                <button
                                    onMouseEnter={handlePrimaryEnter}
                                    onMouseLeave={handlePrimaryLeave}
                                     onClick={() => router.push('/auth?tab=registro')}
                                    className="relative overflow-hidden bg-[#E3FEF7] border-2 border-[#E3FEF7] px-8 py-3 rounded-md font-medium font-noto-sans min-w-[220px]"
                                >
                                    <span
                                        ref={primaryOverlayRef}
                                        className="absolute inset-0 bg-[#003C43] translate-x-[-100%]"
                                    />

                                    <span
                                        ref={primaryTextRef}
                                        className="relative z-10 text-[#003C43]"
                                    >
                                        Quiero ser parte
                                    </span>
                                </button>
                            </div>

                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
}