import { createClient } from '@/lib/supabase/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ForoDetallePage from '@/components/ForoDetallePage';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function RutaDetalleForo({ params }: PageProps) {
    const { slug } = await params;
    const supabase = await createClient();

    // 1. Traemos el foro, contando miembros y verificando si el usuario es miembro
    const { data: forumData, error: forumError } = await supabase
        .from('forums')
        .select(`
            id, slug, title, description, icon,
            forum_members(count)
        `)
        .eq('slug', slug)
        .maybeSingle();

    if (forumError || !forumData) {
        notFound();
    }

    const { data: { user } } = await supabase.auth.getUser();
    let isMember = false;

    if (user) {
        await supabase
            .from('forum_members')
            .upsert(
                { user_id: user.id, forum_id: forumData.id },
                { onConflict: 'user_id,forum_id' }
            );
        isMember = true;
    }

    // 2. Traemos los posts
    const { data: postsData } = await supabase
        .from('posts')
        .select(`
            id, title, content, created_at,
            profiles ( name, avatar_url ),
            comments ( count )
        `)
        .eq('forum_id', forumData.id)
        .order('created_at', { ascending: false });

    // Adaptamos el objeto forum con los nuevos campos
    const forum = {
        id: forumData.id,
        slug: forumData.slug,
        title: forumData.title,
        description: forumData.description,
        icon: forumData.icon || undefined,
        member_count: Array.isArray(forumData.forum_members) ? forumData.forum_members[0].count : 0,
        is_member: isMember
    };

    const posts = (postsData || []).map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        created_at: post.created_at,
        profiles: Array.isArray(post.profiles) ? post.profiles[0] || null : post.profiles || null,
        comments: post.comments || null
    }));

    return (
        <div className="bg-[#f6fafa] min-h-screen">
            <Header />
            <main>
                <ForoDetallePage slug={slug} forum={forum} posts={posts} />
            </main>
            <Footer />
        </div>
    );
}