
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
        <section id="inicio"><HeroSection /> </section>
     {/*    <section id="muro">   <ForumSectionThematic /> </section> */}
        <section id="foros">   <ForumSectionThematic /></section>
        <section id="melanoma"> <ResourcesSection /> </section>
        <section id="claudia"> <AboutClaudiaSection /> </section>
        <section id="faq">     <FAQSectionCCM /> </section>
      </main>
      <Footer />
    </div>
  );
}
