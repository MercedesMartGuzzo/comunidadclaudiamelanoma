import Link from 'next/link';
import { Clover, Flower, Flower2, Leaf, LeafyGreen, Rose, Sprout, Wheat } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="bg-[#f0f4f4] border-t border-[#E3FEF7] py-10 pb-2">
      <div className="w-full flex justify-center px-6">
        <div className="max-w-[1000px] w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo */}
            <div>
              <h4 className="text-2xl font-bold text-[#003C43] mb-1 font-inconsolata flex items-start">RML</h4>
              <p className="text-sm text-[#181c1d] font-noto-sans">
                Red Melanoma Latam
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-[#003C43] mb-3 mt-2 font-noto-sans text-sm">Plataforma</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Inicio</Link></li>
                <li><Link href="#claudia" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Sobre Nosotros</Link></li>
                <li><Link href="#melanoma" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Información Importamte</Link></li>
                <li><Link href="#faq" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">FAQ</Link></li>
                <li><Link href="#contacto" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Contacto</Link></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="font-semibold text-[#003C43] mb-3 mt-2 font-noto-sans text-sm">Comunidad</h4>
              <ul className="space-y-2">
                <li><Link href="./muro" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Comunidad</Link></li>
                <li><Link href="./foros" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Grupos</Link></li>
              
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-[#003C43] mb-3 mt-2 font-noto-sans text-sm">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Privacidad</Link></li>
                <li><Link href="#" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Términos</Link></li>
                {/* <li><Link href="#" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Contacto</Link></li> */}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#E3FEF7] pt-2">
            <div className="flex flex-col sm:flex-row justify-between items-center px-0 py-2">

              <div className="flex gap-4 mt-2 sm:mt-0 px-0 py-2 pr-8 md:pr-14">
                <Leaf className="w-4 h-4 text-[#003C43]" />
                <Clover className="w-4 h-4 text-[#003C43]" />
                <LeafyGreen className="w-4 h-4 text-[#003C43]" />
                <Sprout className="w-4 h-4 text-[#003C43]" />
                <Rose className="w-4 h-4 text-[#003C43]" />
                <Flower2 className="w-4 h-4 text-[#003C43]" />
                <Wheat className="w-4 h-4 text-[#003C43]" />
                <Flower className="w-4 h-4 text-[#003C43]" />
              </div>
              <p className="text-xs text-[#181c1d]/60 font-noto-sans">
                © 2026 Red Melanoma Latam. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
