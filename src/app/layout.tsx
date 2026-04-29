import type { Metadata } from "next";
import { Inconsolata, Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--ff-noto-sans",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--ff-inconsolata",
});

export const metadata: Metadata = {
  title: 'Comunidad Claudia Melanoma',
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
      </body>
    </html>
  );
}
