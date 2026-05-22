import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/constants/routes';
import { getButtonClassName } from '../ui/Button';

const navLinks = [
  { href: `${ROUTES.HOME}#features`, label: 'Recursos' },
  { href: `${ROUTES.HOME}#how-it-works`, label: 'Como funciona' },
  { href: `${ROUTES.HOME}#cta`, label: 'Começar' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-bg-elevated/80 backdrop-blur-md">
      <nav
        aria-label="Navegação principal"
        className="container mx-auto flex h-20 items-center justify-between px-6"
      >
        <div className="flex items-center gap-2 transition-opacity">
          <Link href={ROUTES.HOME}>
            <Image src="/idn_logoname.png" alt="IDN Capital" height={60} width={250} priority />
          </Link>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-moss-dark transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={ROUTES.LOGIN}
            className={getButtonClassName({ variant: 'outline', className: 'cursor-pointer' })}
          >
            Entrar
          </Link>
          <Link
            href={ROUTES.REGISTER}
            className={getButtonClassName({ variant: 'secondary', className: 'cursor-pointer' })}
          >
            Começar Grátis
          </Link>
        </div>
      </nav>
    </header>
  );
}
