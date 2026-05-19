'use client';

import Link from 'next/link';

import {
    ArrowLeft,
    Heart,
    MessageCircle,
    Bookmark,
} from 'lucide-react';

const favoritePosts = [
    {
        id: '1',
        author: 'Ana García',
        content:
            'Hoy terminé mi última sesión de inmunoterapia. Gracias a todos por acompañarme durante este proceso.',
        likes: 32,
        comments: 8,
        savedAt: 'Guardado hace 2 días',
    },
    {
        id: '2',
        author: 'Carlos Méndez',
        content:
            'Comparto una lista de alimentos que me ayudaron muchísimo con el cansancio durante el tratamiento.',
        likes: 18,
        comments: 5,
        savedAt: 'Guardado hace 1 semana',
    },
    {
        id: '3',
        author: 'Marta Ruiz',
        content:
            'Volví a caminar 5km después de meses. A veces los pequeños pasos son enormes.',
        likes: 54,
        comments: 14,
        savedAt: 'Guardado hace 3 semanas',
    },
];

export default function FavoritosPage() {

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
                        Favoritos
                    </h1>

                    <p className="text-[#181c1d]/70 text-lg font-noto-sans max-w-2xl leading-relaxed">
                        Guardá publicaciones importantes para volver a leerlas cuando quieras.
                    </p>

                </div>

                {/* LISTA */}
                <div className="flex flex-col gap-5">

                    {favoritePosts.map((post) => (

                        <article
                            key={post.id}
                            className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,60,67,0.04)] hover:shadow-[0_8px_28px_rgba(0,60,67,0.08)] transition-shadow"
                        >

                            {/* TOP */}
                            <div className="flex items-start justify-between gap-4 mb-5">

                                <div>

                                    <p className="font-inconsolata font-bold text-[#003C43] text-lg">
                                        {post.author}
                                    </p>

                                    <p className="text-sm text-[#181c1d]/45 font-noto-sans mt-1">
                                        {post.savedAt}
                                    </p>

                                </div>

                                <div className="w-10 h-10 rounded-xl bg-[#E3FEF7] flex items-center justify-center shrink-0">

                                    <Bookmark className="w-4 h-4 text-[#003C43]" />

                                </div>

                            </div>

                            {/* CONTENIDO */}
                            <p className="text-[#181c1d]/80 leading-relaxed font-noto-sans mb-6">
                                {post.content}
                            </p>

                            {/* FOOTER */}
                            <div className="flex items-center gap-6 border-t border-[#003C43]/8 pt-4">

                                <div className="flex items-center gap-2 text-sm text-[#181c1d]/60 font-noto-sans">

                                    <Heart className="w-4 h-4 text-[#003C43]/55" />

                                    {post.likes}

                                </div>

                                <div className="flex items-center gap-2 text-sm text-[#181c1d]/60 font-noto-sans">

                                    <MessageCircle className="w-4 h-4 text-[#003C43]/55" />

                                    {post.comments}

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            </div>

        </main>
    );
}