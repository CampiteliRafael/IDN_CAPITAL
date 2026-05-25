import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReduxProvider } from '@/lib/store/ReduxProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'IDN Capital - Invista com Inteligência',
  description: 'Plataforma completa para gestão de investimentos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ReduxProvider>
          <a href="#main-content" className="skip-link">
            Pular para o conteúdo principal
          </a>
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
