import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ForosPage from '@/components/ForosPage';

export default function Foros() {
  return (
    <div className="bg-[#f6fafa]">
      <Header />
      <main>
        <ForosPage />
      </main>
      <Footer />
    </div>
  );
}