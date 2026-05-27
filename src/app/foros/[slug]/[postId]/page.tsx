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
    // 1. Resolvemos los parámetros dinámicos de la URL (Next.js 15)
    const { slug, postId } = await params;
    const supabase = await createClient();

    // 2. Buscamos primero el foro para asegurarnos de que el slug sea válido
    const { data: forum } = await supabase
        .from('forums')
        .select('id, title')
        .eq('slug', slug)
        .maybeSingle();

    if (!forum) {
        notFound();
    }

    // 3. Buscamos el post específico por su ID y verificamos que pertenezca a este foro
    const { data: post, error: postError } = await supabase
        .from('posts')
        .select('*, profiles(name)')
        .eq('id', postId)
        .eq('forum_id', forum.id)
        .maybeSingle();

    // Si el post no existe o no coincide con el foro, mandamos 404
    if (postError || !post) {
        notFound();
    }

    // 4. Traemos todos los comentarios/respuestas asociados a este post específico
    // (Asumiendo que tu tabla de comentarios se llama 'comments' o 'replies')
    const { data: comments } = await supabase
        .from('comments') 
        .select('*, profiles(name)')
        .eq('post_id', post.id)
        .order('created_at', { ascending: true }); // Las respuestas se leen de más vieja a más nueva

    return (
        <div className="bg-[#f6fafa] min-h-screen">
            <Header />
            
            <main>
                {/* Le pasamos al componente de presentación el slug, el post real con su autor 
                  y el listado de comentarios reales de la base de datos 
                */}
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