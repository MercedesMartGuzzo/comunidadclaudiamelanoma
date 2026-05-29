import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ForoPostPage from '@/components/ForoPostPage';

interface Props {
    params: Promise<{ 
        slug: string; 
        postId: string; 
    }>;
}

export default async function PostDetalle({ params }: Props) {
    const { slug, postId } = await params;
    const supabase = await createClient();

    // 1. Buscamos el foro
    const { data: forum } = await supabase
        .from('forums')
        .select('id, title')
        .eq('slug', slug)
        .maybeSingle();

    if (!forum) {
        notFound();
    }

    // 2. Obtenemos el post principal
    const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*, profiles(name, avatar_url)')
        .eq('id', postId)
        .eq('forum_id', forum.id)
        .maybeSingle();

    if (postError || !postData) {
        notFound();
    }

    // 3. Obtenemos el conteo REAL de likes filtrado por 'foro'
    // Esto asegura que al cargar, el número sea exacto y no se borre al refrescar
    const { count: likesCount } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', postId)
        .eq('target_type', 'foro');

    // 4. Creamos el objeto post enriquecido para pasarlo al componente
    const post = {
        ...postData,
        likes_count: likesCount || 0,
        forum_title: forum.title,
        forum_id: forum.id
    };

    // 5. Obtenemos los comentarios
    const { data: comments } = await supabase
        .from('comments') 
        .select('*, profiles(name, avatar_url)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

    return (
        <div className="bg-[#f6fafa] min-h-screen">
            <Header />
            <main>
                <ForoPostPage 
                    slug={slug} 
                    post={post} 
                    comments={comments || []} 
                />
            </main>
            <Footer />
        </div>
    );
}