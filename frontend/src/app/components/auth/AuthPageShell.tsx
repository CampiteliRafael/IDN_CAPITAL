import Image from 'next/image';
import type { ReactNode } from 'react';

interface AuthPageShellProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function AuthPageShell({ title, description, children }: AuthPageShellProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 pb-10 pt-30">
      <Image
        src="/herosection1.png"
        alt="background"
        fill
        className="object-cover"
        priority
        quality={75}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 to-black/50"
      />

      <div className="relative z-20 w-full max-w-md">
        <div className="rounded-lg border border-gold-light/20 bg-moss-light/80 p-8 shadow-xl backdrop-blur-sm">
          <header className="mb-8 text-center">
            <h1 id="auth-page-title" className="mb-2 text-3xl font-bold text-gold-light">
              {title}
            </h1>
            <p id="auth-page-description" className="text-sm text-white/80">
              {description}
            </p>
          </header>

          {children}
        </div>
      </div>
    </section>
  );
}
