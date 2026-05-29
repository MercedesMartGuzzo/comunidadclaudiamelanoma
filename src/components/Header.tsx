'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Bell, CircleUserRound } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Comunidad', href: '/muro', requiresAuth: true },
  { label: 'Grupos', href: '#foros' }, 
  { label: 'Información importante', href: '#melanoma' },
  { label: 'Sobre Nosotros', href: '/about-claudia' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const shortTextRef = useRef<HTMLSpanElement>(null);
  const fullTextRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleMouseEnter = () => {
    gsap.to(shortTextRef.current, { y: -20, opacity: 0, duration: 0.3, ease: 'power2.out' });
    gsap.to(fullTextRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(shortTextRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.to(fullTextRef.current, { y: 20, opacity: 0, duration: 0.3, ease: 'power2.out' });
  };

  const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    label: string,
    requiresAuth?: boolean
  ) => {
    setMenuOpen(false);
    const { data: { session } } = await supabase.auth.getSession();

    if (label === 'Grupos') {
      if (session) {
        e.preventDefault();
        router.push('/foros');
        return;
      }
    }

    if (requiresAuth) {
      e.preventDefault(); 
      if (!session) {
        router.push(`/auth?tab=login&redirectTo=${href}`);
        return;
      }
      router.push(href);
      return;
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      if (pathname !== '/') {
        router.push(`/${href}`);
      } else {
        scrollToSection(href);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== '/') {
      router.push('/#inicio');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 w-full bg-white/70 backdrop-blur-[1px] z-50 border-b border-transparent"
    >
      <div className="w-full flex justify-center">
        <nav className="max-w-[1200px] w-full mx-auto px-4 md:px-8 lg:px-4 py-2 flex items-center justify-between relative">
          <div
            className="relative h-8 min-w-[200px] lg:min-w-[280px] flex items-center overflow-hidden cursor-pointer"
            onClick={handleLogoClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/" className="relative block text-[#003C43] font-inconsolata leading-none">
              <span ref={shortTextRef} className="block text-sm font-bold tracking-[0.08em] pt-[2px] leading-none">RedMelanomaLatam</span>
              <span ref={fullTextRef} className="absolute left-0 top-[50%] -translate-y-1/2 text-sm tracking-[0.08em] font-bold whitespace-nowrap leading-none opacity-0 font-inconsolata">RedMelanomaLatam</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((item, index) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }}>
                <Link href={item.href} onClick={(e) => handleNavClick(e, item.href, item.label, item.requiresAuth)} className="relative text-sm font-medium text-[#181c1d] hover:text-[#2f6f73] transition-colors duration-300 group pb-1 whitespace-nowrap">
                  {item.label}
                  <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#5d9ca0] transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-0">
            <motion.button whileTap={{ scale: 0.95 }} className="p-2"><Bell className="w-5 h-5 text-[#4a5568] hover:text-[#2f6f73]" /></motion.button>
            <motion.button whileTap={{ scale: 0.95 }} className="p-2" onClick={() => router.push('/auth?tab=registro&redirectTo=/')}><CircleUserRound className="w-5 h-5 text-[#003C43] hover:text-[#2f6f73]" /></motion.button>
          </div>

          <motion.button whileTap={{ scale: 0.9 }} className="lg:hidden p-2 z-50" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-7 h-7 text-[#003C43]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4 }} className="fixed top-0 left-0 w-screen h-screen bg-white z-40 flex flex-col items-center justify-center gap-10 lg:hidden">
                {navLinks.map((item, index) => (
                  <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                    <Link href={item.href} onClick={(e) => handleNavClick(e, item.href, item.label, item.requiresAuth)} className="text-lg font-medium text-[#181c1d] hover:text-[#2f6f73]">
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="w-full flex flex-col items-center justify-center gap-8">
                  <motion.button onClick={() => { setMenuOpen(false); router.push('/auth?tab=login&redirectTo=/'); }} className="px-6 py-3 border border-[#003C43] text-[#003C43] rounded-full">
                    Iniciar sesión
                  </motion.button>
                  <motion.button onClick={() => { setMenuOpen(false); router.push('/auth?tab=registro&redirectTo=/'); }} className="flex items-center gap-2 px-6 py-3 bg-[#003C43] rounded-full">
                    <CircleUserRound className="w-5 h-5 text-white" />
                    <span className="text-white">Registrarme</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </motion.header>
  );
}