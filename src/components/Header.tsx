'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Bell, CircleUserRound } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const shortTextRef = useRef<HTMLSpanElement>(null);
  const fullTextRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    gsap.to(shortTextRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to(fullTextRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(shortTextRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to(fullTextRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 w-full md:px-2 lg:px-2 bg-white/80 backdrop-blur-[100px] z-50 border-b border-transparent"
    >
      <div className="w-full flex justify-center">
        <nav className="max-w-[1200px] w-full mx-auto px-4 md:px-12 lg:px-0 py-3 flex items-center justify-between relative">

          {/* Animated Logo */}
          <div
            className="relative h-8 min-w-[280px] flex items-center overflow-hidden cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/"
              className="relative block text-[#003C43] font-inconsolata leading-none"
            >
              {/* Short Text */}
              <span
                ref={shortTextRef}
                className="block text-2xl font-bold tracking-[0.08em] leading-none"
              >
                CCM
              </span>

              {/* Full Text */}
              <span
                ref={fullTextRef}
                className="absolute left-0 top-[23%] -translate-y-1/2 text-sm md:text-base font-bold whitespace-nowrap leading-none opacity-0 font-inconsolata"
                style={{ transform: 'translateY(20px)' }}
              >
                Comunidad Claudia Melanoma
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {['Inicio', 'Muro', 'Foros', 'Acerca del Melanoma', 'Sobre Claudia'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link
                  href="#"
                  className="relative text-sm font-medium text-[#181c1d] hover:text-[#2f6f73] transition-colors duration-300 group pb-1"
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#5d9ca0] transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4">

            {/* Bell */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2"
            >
              <Bell className="w-5 h-5 text-[#4a5568] hover:text-[#2f6f73] transition-colors duration-300" />
            </motion.button>

            {/* User */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2"
            >
              <CircleUserRound className="w-5 h-5 text-[#003C43] hover:text-[#2f6f73] transition-colors duration-300" />
            </motion.button>

          </div>

          {/* Mobile Hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-7 h-7 text-[#003C43]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="fixed top-0 left-0 w-screen h-screen bg-white z-40 flex flex-col items-center justify-center gap-10 md:hidden"
              >
                {['Inicio', 'Muro', 'Foros', 'Acerca del Melanoma', 'Sobre Claudia'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      href="#"
                      onClick={() => setMenuOpen(false)}
                      className="text-lg font-medium text-[#181c1d]"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full flex items-center justify-center py-8 mb-8 border-b border-gray-200"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-3 px-6 py-3 bg-[#003C43] hover:bg-[#00252a] rounded-full transition-all duration-300"
                  >
                    <CircleUserRound className="w-6 h-6 text-white" />

                    <span className="text-white font-medium text-sm">
                      Ingresar / Registrarme
                    </span>
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