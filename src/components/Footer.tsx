import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#f0f4f4] border-t border-[#E3FEF7] py-10 pb-2">
      <div className="w-full flex justify-center px-6">
        <div className="max-w-[1000px] w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo */}
            <div>
              <h3 className="text-2xl font-bold text-[#003C43] mb-2 font-inconsolata">CCM</h3>
              <p className="text-sm text-[#181c1d] font-noto-sans">
                Comunidad Claudia Melanoma
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-[#003C43] mb-3 font-noto-sans text-sm">Plataforma</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Inicio</Link></li>
                <li><Link href="#" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Foros</Link></li>
                <li><Link href="#" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Recursos</Link></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="font-semibold text-[#003C43] mb-3 font-noto-sans text-sm">Comunidad</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Muro</Link></li>
                <li><Link href="#" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Sobre Claudia</Link></li>
                <li><Link href="#" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Contacto</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-[#003C43] mb-3 font-noto-sans text-sm">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Privacidad</Link></li>
                <li><Link href="#" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Términos</Link></li>
                <li><Link href="#" className="text-sm text-[#181c1d] hover:text-[#003C43] transition font-noto-sans">Contacto</Link></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#E3FEF7] pt-2">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-xs text-[#181c1d]/60 font-noto-sans">
                © 2026 Comunidad Claudia Melanoma. Todos los derechos reservados.
              </p>
              {/*  <div className="flex gap-4 mt-2 sm:mt-0">
              <button className="p-2 hover:bg-[#E3FEF7] rounded-full transition">
                <svg className="w-4 h-4 text-[#003C43]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="p-2 hover:bg-[#E3FEF7] rounded-full transition">
                <svg className="w-4 h-4 text-[#003C43]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7"/>
                </svg>
              </button>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
