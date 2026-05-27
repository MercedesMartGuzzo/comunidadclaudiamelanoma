import { createClient } from '@/lib/supabase/server';
import ForosPage from '@/components/ForosPage';
import Header from '@/components/Header'; // <-- Importamos el Header
import Footer from '@/components/Footer'; // <-- Importamos el Footer

// Definimos la interfaz exacta de lo que devuelve Supabase con las relaciones de agregación
interface SupabaseForumResponse {
    id: string;
    slug: string;
    title: string;
    description: string;
    icon: string | null;
    posts: { count: number }[] | { count: number } | null;
    forum_members: { count: number }[] | { count: number } | null;
}

export default async function Page() {
    const supabase = await createClient();

    // 1. Traemos los foros sumando el conteo de temas (posts) y miembros (forum_members)
    const { data } = await supabase
        .from('forums')
        .select(`
            id,
            slug,
            title,
            description,
            icon,
            posts (count),
            forum_members (count)
        `);
    
    // Forzamos el tipado seguro de la respuesta de Supabase
    const forums = data as unknown as SupabaseForumResponse[] | null;
    
    // 2. Traemos el usuario y verificamos a qué grupos está unido actualmente
    const { data: { user } } = await supabase.auth.getUser();
    
    let memberIds: string[] = [];
    if (user) {
        const { data: memberData } = await supabase
            .from('forum_members')
            .select('forum_id')
            .eq('user_id', user.id);
        memberIds = memberData?.map(m => m.forum_id) || [];
    }

    // 3. Mapeamos los datos reales inyectando los contadores sin usar "any"
    const finalForums = (forums || []).map(f => {
        
        // Procesamos el conteo de posts de forma segura
        let activeTopicsCount = 0;
        if (f.posts) {
            if (Array.isArray(f.posts)) {
                activeTopicsCount = f.posts[0]?.count || 0;
            } else {
                activeTopicsCount = f.posts.count || 0;
            }
        }

        // Procesamos el conteo de miembros de forma segura
        let membersCountTotal = 0;
        if (f.forum_members) {
            if (Array.isArray(f.forum_members)) {
                membersCountTotal = f.forum_members[0]?.count || 0;
            } else {
                membersCountTotal = f.forum_members.count || 0;
            }
        }

        return {
            id: f.id,
            slug: f.slug,
            title: f.title,
            description: f.description,
            icon: f.icon || f.slug,
            activeTopics: activeTopicsCount,
            membersCount: membersCountTotal,
            isMember: memberIds.includes(f.id)
        };
    });

    // 4. Retornamos la estructura completa envolviendo el componente con la estructura global
    return (
        <div className="bg-[#f6fafa] min-h-screen">
            <Header />
            <main>
                <ForosPage forums={finalForums} />
            </main>
            <Footer />
        </div>
    );
}