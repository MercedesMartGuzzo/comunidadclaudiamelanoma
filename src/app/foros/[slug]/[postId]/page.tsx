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

    const { data: forum } = await supabase
        .from('forums')
        .select('id, title')
        .eq('slug', slug)
        .maybeSingle();

    if (!forum) {
        notFound();
    }

    // CORRECCIÓN: Agregamos avatar_url al select de perfiles
    const { data: post, error: postError } = await supabase
        .from('posts')
        .select('*, profiles(name, avatar_url)')
        .eq('id', postId)
        .eq('forum_id', forum.id)
        .maybeSingle();

    if (postError || !post) {
        notFound();
    }

    // CORRECCIÓN: Agregamos avatar_url al select de perfiles
    const { data: comments } = await supabase
        .from('comments') 
        .select('*, profiles(name, avatar_url)')
        .eq('post_id', post.id)
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