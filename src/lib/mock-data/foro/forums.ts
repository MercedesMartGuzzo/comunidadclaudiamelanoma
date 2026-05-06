export interface Forum {
    id: string
    slug: string
    title: string
    description: string
    icon: string
    membersCount: number
    activeTopics: number
    lastActivity: string
    tags: string[]
}

export const mockForums: Forum[] = [
    {
        id: '1',
        slug: 'inmunologia',
        title: 'Inmunología',
        description: 'Conversaciones sobre los últimos avances en inmunoterapia, manejo de efectos secundarios y respuestas al tratamiento.',
        icon: 'biotech',
        membersCount: 1200,
        activeTopics: 42,
        lastActivity: '2024-12-10T14:00:00Z',
        tags: ['TEMAS ACTIVOS', 'MIEMBROS PARTICIPANDO'],
    },
    {
        id: '2',
        slug: 'nutricion',
        title: 'Nutrición',
        description: 'Guías y consejos sobre alimentación consciente y soporte nutricional durante el proceso terapéutico.',
        icon: 'nutrition',
        membersCount: 850,
        activeTopics: 28,
        lastActivity: '2024-12-09T20:00:00Z',
        tags: ['NUTRICIÓN', 'GUÍAS PRÁCTICAS'],
    },
    {
        id: '3',
        slug: 'bienestar',
        title: 'Bienestar',
        description: 'Espacio dedicado a la salud emocional, meditación y herramientas para el cuidado integral.',
        icon: 'favorite',
        membersCount: 2400,
        activeTopics: 61,
        lastActivity: '2024-12-10T09:00:00Z',
        tags: ['BIENESTAR', 'RECURSOS'],
    },
    {
        id: '4',
        slug: 'cuidado-del-cuidador',
        title: 'Cuidado del Cuidador',
        description: 'Porque el entorno también necesita sostén. Un foro exclusivo para familiares y acompañantes.',
        icon: 'family_restroom',
        membersCount: 1500,
        activeTopics: 33,
        lastActivity: '2024-12-08T11:00:00Z',
        tags: ['RECURSOS', 'APOYO'],
    },
    {
        id: '5',
        slug: 'dermatologia',
        title: 'Dermatología',
        description: 'Seguimiento de lesiones cutáneas, cuidados post-quirúrgicos y prevención secundaria con expertos.',
        icon: 'dermatology',
        membersCount: 1100,
        activeTopics: 19,
        lastActivity: '2024-12-07T16:00:00Z',
        tags: ['DERMATOLOGÍA', 'EXPERTOS'],
    },
    {
        id: '6',
        slug: 'actividad-fisica',
        title: 'Actividad Física',
        description: 'Programas de ejercicio adaptado para mejorar la tolerancia a los tratamientos y recuperar la vitalidad.',
        icon: 'fitness_center',
        membersCount: 620,
        activeTopics: 15,
        lastActivity: '2024-12-06T10:00:00Z',
        tags: ['EJERCICIO', 'BIENESTAR'],
    },
]