// forum-posts.ts

export interface ForumPost {
    id: string
    forumId: string
    forumSlug: string
    title: string
    content: string
    authorName: string
    authorAvatar: string
    createdAt: string
    repliesCount: number
    likesCount: number
    isPinned: boolean
    tags: string[]
}

export const mockForumPosts: ForumPost[] = [
    {
        id: '1',
        forumId: '1',
        forumSlug: 'inmunologia',
        title: '¿Alguien con experiencia en pembrolizumab en etapa III?',
        content: 'Acabo de empezar el tratamiento y tengo muchas dudas sobre los efectos secundarios en las primeras semanas. ¿Cómo fue su experiencia?',
        authorName: 'Ana García',
        authorAvatar: '/images/avatars/ana.jpg',
        createdAt: '2024-12-10T10:30:00Z',
        repliesCount: 14,
        likesCount: 22,
        isPinned: true,
        tags: ['pembrolizumab', 'efectos secundarios'],
    },
    {
        id: '2',
        forumId: '1',
        forumSlug: 'inmunologia',
        title: 'Resultados del estudio KEYNOTE-716 — análisis en lenguaje simple',
        content: 'Intenté leer el paper completo y me perdí. ¿Alguien lo puede explicar en palabras más accesibles?',
        authorName: 'Carlos Méndez',
        authorAvatar: '/images/avatars/carlos.jpg',
        createdAt: '2024-12-09T08:15:00Z',
        repliesCount: 8,
        likesCount: 31,
        isPinned: false,
        tags: ['investigación', 'keynote'],
    },
    {
        id: '3',
        forumId: '2',
        forumSlug: 'nutricion',
        title: 'Dieta antiinflamatoria durante inmunoterapia',
        content: '¿Qué alimentos ayudan a reducir la inflamación sin interferir con el tratamiento?',
        authorName: 'Laura Sosa',
        authorAvatar: '/images/avatars/laura.jpg',
        createdAt: '2024-12-08T14:00:00Z',
        repliesCount: 21,
        likesCount: 45,
        isPinned: true,
        tags: ['dieta', 'antiinflamatorio'],
    },
    {
        id: '4',
        forumId: '3',
        forumSlug: 'bienestar',
        title: 'Técnicas de mindfulness para días difíciles',
        content: 'Comparto lo que me funcionó durante los peores momentos del diagnóstico.',
        authorName: 'Marta Ruiz',
        authorAvatar: '/images/avatars/marta.jpg',
        createdAt: '2024-12-07T09:00:00Z',
        repliesCount: 37,
        likesCount: 89,
        isPinned: false,
        tags: ['mindfulness', 'salud emocional'],
    },
    {
        id: '5',
        forumId: '4',
        forumSlug: 'cuidado-del-cuidador',
        title: 'Cómo acompañar sin agotarse emocionalmente',
        content: 'Ser cuidador también implica desgaste. ¿Qué herramientas les ayudan a sostenerse?',
        authorName: 'Sofía Herrera',
        authorAvatar: '/images/avatars/sofia.jpg',
        createdAt: '2024-12-06T11:00:00Z',
        repliesCount: 18,
        likesCount: 40,
        isPinned: false,
        tags: ['cuidador', 'apoyo emocional'],
    },
    {
        id: '6',
        forumId: '5',
        forumSlug: 'dermatologia',
        title: 'Seguimiento dermatológico post cirugía',
        content: '¿Cada cuánto recomiendan controles después de una resección completa?',
        authorName: 'Federico López',
        authorAvatar: '/images/avatars/federico.jpg',
        createdAt: '2024-12-05T16:00:00Z',
        repliesCount: 11,
        likesCount: 26,
        isPinned: false,
        tags: ['dermatología', 'seguimiento'],
    },
    {
        id: '7',
        forumId: '6',
        forumSlug: 'actividad-fisica',
        title: 'Ejercicio adaptado durante tratamiento',
        content: '¿Qué rutinas suaves les ayudaron a recuperar energía sin sobreexigirse?',
        authorName: 'Marta Ruiz',
        authorAvatar: '/images/avatars/marta.jpg',
        createdAt: '2024-12-04T13:00:00Z',
        repliesCount: 16,
        likesCount: 34,
        isPinned: false,
        tags: ['ejercicio', 'bienestar'],
    },
]