import Link from 'next/link';
import Image from 'next/image';
import Button from '../ui/Button';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-elevated/80 backdrop-blur-md border-b border-border-subtle">
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 transition-opacity">
          <Link href="/">
            <Image src="/idn_logoname.png" alt="Logo" height={60} width={250} priority />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="text-moss-dark hover:text-gold transition-colors">
            Recursos
          </Link>
          <Link href="#precos" className="text-moss-dark hover:text-gold transition-colors">
            Preços
          </Link>
          <Link href="#sobre" className="text-moss-dark hover:text-gold transition-colors">
            Sobre
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline" className="cursor-pointer">
              Entrar
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="secondary" className="cursor-pointer">
              Começar Grátis
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
