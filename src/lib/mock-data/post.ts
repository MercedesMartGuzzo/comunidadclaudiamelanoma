// mock-posts.ts

export interface Post {
    id: string
    forumSlug: string
    userId: string
    authorName: string
    authorAvatar: string
    authorLocation: string
    title: string
    content: string
    likesCount: number
    commentsCount: number
    repliesCount: number
    createdAt: string
    tags: string[]
    isPinned: boolean
}

export const mockPosts: Post[] = [
    {
        id: '1',
        forumSlug: 'inmunologia',
        userId: '2',
        authorName: 'Carlos Méndez',
        authorAvatar: '/images/avatars/carlos.jpg',
        authorLocation: 'Madrid, España',
        title: 'Control de 6 meses: todo estable',
        content: 'Hoy tuve mi control de los 6 meses. Todo estable. A veces solo quería escribirlo para que alguien más lo supiera.',
        likesCount: 42,
        commentsCount: 15,
        repliesCount: 15,
        createdAt: '2024-12-09T08:15:00Z',
        tags: ['buenas noticias'],
        isPinned: false,
    },
    {
        id: '2',
        forumSlug: 'inmunologia',
        userId: '1',
        authorName: 'Ana García',
        authorAvatar: '/images/avatars/ana.jpg',
        authorLocation: 'Buenos Aires, Argentina',
        title: '¿Efectos secundarios con pembrolizumab?',
        content: '¿Alguien más tuvo efectos secundarios con pembrolizumab en las primeras semanas? Estoy con mucho cansancio y no sé si es normal.',
        likesCount: 14,
        commentsCount: 7,
        repliesCount: 7,
        createdAt: '2024-12-10T10:30:00Z',
        tags: ['inmunoterapia', 'efectos secundarios'],
        isPinned: true,
    },
    {
        id: '3',
        forumSlug: 'actividad-fisica',
        userId: '4',
        authorName: 'Marta Ruiz',
        authorAvatar: '/images/avatars/marta.jpg',
        authorLocation: 'Barcelona, España',
        title: 'Volví a correr después de meses',
        content: 'Cuatro años desde el diagnóstico etapa IV. Hoy fui a correr por primera vez en meses. Pequeños grandes pasos.',
        likesCount: 103,
        commentsCount: 28,
        repliesCount: 28,
        createdAt: '2024-12-08T07:45:00Z',
        tags: ['esperanza', 'actividad física'],
        isPinned: false,
    },
    {
        id: '4',
        forumSlug: 'nutricion',
        userId: '3',
        authorName: 'Laura Sosa',
        authorAvatar: '/images/avatars/laura.jpg',
        authorLocation: 'Ciudad de México, México',
        title: 'Guía de alimentos antiinflamatorios',
        content: 'Comparto una guía rápida de alimentos antiinflamatorios que armé con mi nutricionista. Espero que les sirva tanto como a mí.',
        likesCount: 67,
        commentsCount: 19,
        repliesCount: 19,
        createdAt: '2024-12-07T12:00:00Z',
        tags: ['nutrición', 'recursos'],
        isPinned: false,
    },
]