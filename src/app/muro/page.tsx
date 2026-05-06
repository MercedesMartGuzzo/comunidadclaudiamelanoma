import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MuroPage from '@/components/muro/MuroPage';


export default function Muro() {
    return (
        <div className="bg-[#f6fafa]">
            <Header />

            <MuroPage />

            <Footer />
        </div>
    );
}