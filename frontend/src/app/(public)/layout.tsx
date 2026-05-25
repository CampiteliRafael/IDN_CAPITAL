import type { ReactNode } from 'react';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Header />
      <div className="flex min-h-full flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
