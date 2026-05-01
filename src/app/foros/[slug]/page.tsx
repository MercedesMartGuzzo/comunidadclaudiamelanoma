// src/app/foros/[slug]/page.tsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ForoDetallePage from '@/components/ForoDetallePage';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ForoSlug({ params }: Props) {
    const { slug } = await params;

    return (
        <div className="bg-[#f6fafa] min-h-screen">
            <Header />

            <main>
                <ForoDetallePage slug={slug} />
            </main>

            <Footer />
        </div>
    );
}