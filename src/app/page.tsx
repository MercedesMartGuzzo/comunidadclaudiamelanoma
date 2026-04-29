
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ForumSectionThematic from '@/components/ForumSectionThematic';
import ResourcesSection from '@/components/ResourcesSection';
import AboutClaudiaSection from '@/components/AboutClaudiaSection';
import Footer from '@/components/Footer';
import FAQSectionCCM from '@/components/FAQSectionCCM';

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <HeroSection />
        <ForumSectionThematic />
        <ResourcesSection />
        <AboutClaudiaSection />
        <FAQSectionCCM />
      </main>
      <Footer />
    </div>
  );
}
