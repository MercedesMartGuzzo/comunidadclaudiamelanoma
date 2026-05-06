export interface FeedComment {
    id: string;
    postId: string;
    authorName: string;
    content: string;
    createdAt: string;
}

export interface FeedPost {
    id: string;
    userId: string;
    content: string;
    image?: string;
    tags?: string[];
    likesCount: number;
    commentsCount: number;
    createdAt: string;
}

export const feedComments: FeedComment[] = [
    {
        id: '1',
        postId: '1',
        authorName: 'Ana García',
        content: '¡Qué inspirador! Yo también empecé a caminar después de mi segunda sesión.',
        createdAt: '2024-12-10T11:00:00Z',
    },
    {
        id: '2',
        postId: '1',
        authorName: 'Laura Sosa',
        content: 'Cada paso cuenta. Estamos con vos.',
        createdAt: '2024-12-10T12:00:00Z',
    },
    {
        id: '3',
        postId: '2',
        authorName: 'Marta Ruiz',
        content: 'Me alegra mucho que te estés sintiendo mejor. ¿Qué cambios hiciste en la alimentación?',
        createdAt: '2024-12-09T19:00:00Z',
    },
]

export const feedPosts: FeedPost[] = [
    {
        id: '1',
        userId: '4',
        content: 'Un pequeño paso hoy, un gran respiro mañana. Hoy completé mi primer paseo largo después de la última sesión.',
        image: '/images/posts/post1.jpg',
        tags: ['actividad física', 'bienestar'],
        likesCount: 24,
        commentsCount: 2,
        createdAt: '2024-12-10T10:00:00Z',
    },
    {
        id: '2',
        userId: '2',
        content: 'Gracias a todos por las recomendaciones de nutrición. Me siento con mucha más energía esta semana.',
        tags: ['nutrición'],
        likesCount: 12,
        commentsCount: 1,
        createdAt: '2024-12-09T18:00:00Z',
    },
]