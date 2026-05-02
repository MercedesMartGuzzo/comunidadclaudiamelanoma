import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ForoPostPage from '@/components/ForoPostPage';

interface Props {
  params: Promise<{ slug: string; postId: string }>;
}

export default async function PostDetalle({ params }: Props) {
  const { slug, postId } = await params;

  return (
    <div className="bg-[#f6fafa]">
      <Header />
      <main>
        <ForoPostPage slug={slug} postId={postId} />
      </main>
      <Footer />
    </div>
  );
}