'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer'
import ClaudiaPage from '@/components/ClaudiaPage';



export default function AboutClaudia() {
    return (
        <div className="bg-[#f6fafa]">
            <Header />
            <main>
                <ClaudiaPage />
            </main>
            <Footer />
        </div>
    );
}