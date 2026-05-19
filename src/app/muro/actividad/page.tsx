'use client';

import Link from 'next/link';

import {
    ArrowLeft,
    Heart,
    MessageCircle,
    FileText,
    Clock3,
} from 'lucide-react';

const activities = [
    {
        id: '1',
        type: 'post',
        title: 'Publicaste una nueva experiencia',
        description:
            '“Hoy terminé mi última sesión de inmunoterapia...”',
        time: 'Hace 2 horas',
        icon: FileText,
    },
    {
        id: '2',
        type: 'comment',
        title: 'Comentaste en un foro',
        description:
            'Respondiste en “¿Efectos secundarios con pembrolizumab?”',
        time: 'Hace 5 horas',
        icon: MessageCircle,
    },
    {
        id: '3',
        type: 'like',
        title: 'Te gustó una publicación',
        description:
            'Marcaste como favorita una publicación de Marta Ruiz.',
        time: 'Hace 1 día',
        icon: Heart,
    },
    {
        id: '4',
        type: 'post',
        title: 'Publicaste una actualización',
        description:
            '“Volví a caminar después de varias semanas...”',
        time: 'Hace 3 días',
        icon: FileText,
    },
];

export default function ActividadPage() {

    return (
        <main className="bg-[#f6fafa] min-h-screen pt-14 pb-20 px-4">

            <div className="max-w-[900px] mx-auto">

                {/* VOLVER */}
                <Link
                    href="/muro"
                    className="inline-flex items-center gap-2 text-sm text-[#003C43]/60 hover:text-[#003C43] transition-colors mb-8 font-noto-sans"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver a la comunidad
                </Link>

                {/* HEADER */}
                <div className="mb-10">

                    <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#003C43]/55 mb-3">
                        Comunidad RLM
                    </p>

                    <h1
                        className="font-inconsolata text-4xl sm:text-5xl font-bold text-[#003C43] mb-4"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Mi actividad
                    </h1>

                    <p className="text-[#181c1d]/70 text-lg font-noto-sans max-w-2xl leading-relaxed">
                        Un historial de tus publicaciones, interacciones y participación dentro de la comunidad.
                    </p>

                </div>

                {/* LISTA */}
                <div className="flex flex-col gap-4">

                    {activities.map((activity) => {

                        const Icon = activity.icon;

                        return (

                            <article
                                key={activity.id}
                                className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,60,67,0.04)] hover:shadow-[0_8px_28px_rgba(0,60,67,0.08)] transition-shadow"
                            >

                                <div className="flex items-start gap-4">

                                    {/* ICONO */}
                                    <div className="w-12 h-12 rounded-xl bg-[#E3FEF7] flex items-center justify-center shrink-0">

                                        <Icon className="w-5 h-5 text-[#003C43]" />

                                    </div>

                                    {/* INFO */}
                                    <div className="flex-1 min-w-0">

                                        <div className="flex items-center gap-2 mb-1">

                                            <p className="font-inconsolata font-bold text-[#003C43] text-lg">
                                                {activity.title}
                                            </p>

                                        </div>

                                        <p className="text-[#181c1d]/75 font-noto-sans leading-relaxed mb-4">
                                            {activity.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-xs text-[#181c1d]/45 font-noto-sans">

                                            <Clock3 className="w-3.5 h-3.5" />

                                            {activity.time}

                                        </div>

                                    </div>

                                </div>

                            </article>

                        );
                    })}

                </div>

            </div>

        </main>
    );
}