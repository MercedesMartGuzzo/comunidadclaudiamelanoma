'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer'
import ContactoPage from '@/components/ContactoPage';



export default function AboutClaudia() {
    return (
        <div className="bg-[#f6fafa]">
            <Header />
            <main>
                <ContactoPage />
            </main>
            <Footer />
        </div>
    );
}