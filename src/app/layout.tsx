import type { Metadata } from "next";
import { Inconsolata, Noto_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner"; // <-- 1. Importamos el Toaster

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--ff-noto-sans",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--ff-inconsolata",
});

export const metadata: Metadata = {
  title: 'Red Melanoma Latinoamérica',
  description: 'Comunidad, información y apoyo frente al melanoma.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${notoSans.variable} ${inconsolata.variable} antialiased`}
      >
        {children}
        

    <Toaster 
  position="top-right" 
  closeButton 
  toastOptions={{
    style: {
      background:  '#003C43', 
      color: '#ffffff',   
      border: '1px solid #d7e7e5',
      fontSize: '.7rem',
      fontFamily: 'var(--ff-inconsolata), monospace',
    },
  }}
/>
      </body>
    </html>
  );
}