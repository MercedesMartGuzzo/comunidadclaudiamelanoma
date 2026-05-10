import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MiembrosPage from '@/components/muro/MiembrosPage';

export default function Miembros() {
    return (
        <div className="bg-[#f6fafa]">
            <Header />
            <main>
                <MiembrosPage />
            </main>
            <Footer />
        </div>
    );
}