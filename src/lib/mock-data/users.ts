export interface User {
    id: string
    name: string
    avatar: string
    location: string
    diagnosis: string
    stage: string
    joinedAt: string
    bio: string
    postsCount: number
    forumsJoined: string[]
}

export const mockUsers: User[] = [
    {
        id: '1',
        name: 'Ana García',
        avatar: '/images/avatars/ana.jpg',
        location: 'Buenos Aires, Argentina',
        diagnosis: 'Melanoma',
        stage: 'Estadio III',
        joinedAt: '2023-04-12',
        bio: 'Mamá de dos, diagnosticada en 2022. Acá para compartir y aprender.',
        postsCount: 34,
        forumsJoined: ['inmunologia', 'nutricion', 'bienestar'],
    },
    {
        id: '2',
        name: 'Carlos Méndez',
        avatar: '/images/avatars/carlos.jpg',
        location: 'Madrid, España',
        diagnosis: 'Melanoma',
        stage: 'Estadio II',
        joinedAt: '2023-08-01',
        bio: 'Corredor amateur. El diagnóstico me cambió la perspectiva de todo.',
        postsCount: 18,
        forumsJoined: ['inmunologia', 'actividad-fisica'],
    },
    {
        id: '3',
        name: 'Laura Sosa',
        avatar: '/images/avatars/laura.jpg',
        location: 'Ciudad de México, México',
        diagnosis: 'Melanoma',
        stage: 'Estadio II',
        joinedAt: '2023-11-20',
        bio: 'Nutricionista y paciente. Comparto lo que sé y lo que aprendo.',
        postsCount: 52,
        forumsJoined: ['nutricion', 'bienestar', 'cuidado-del-cuidador'],
    },
    {
        id: '4',
        name: 'Marta Ruiz',
        avatar: '/images/avatars/marta.jpg',
        location: 'Barcelona, España',
        diagnosis: 'Melanoma',
        stage: 'Estadio IV',
        joinedAt: '2022-06-15',
        bio: 'Cuatro años en este camino. Hoy estoy estable y quiero dar esperanza.',
        postsCount: 97,
        forumsJoined: ['bienestar', 'inmunologia', 'dermatologia'],
    },
]