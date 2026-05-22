import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const productLinks = [
  { href: `${ROUTES.HOME}#features`, label: 'Funcionalidades' },
  { href: `${ROUTES.HOME}#how-it-works`, label: 'Como funciona' },
  { href: ROUTES.REGISTER, label: 'Criar conta' },
];

const companyLinks = [
  { href: ROUTES.HOME, label: 'Início' },
  { href: ROUTES.LOGIN, label: 'Entrar' },
  { href: ROUTES.REGISTER, label: 'Cadastro' },
];

export default function Footer() {
  return (
    <footer className="container">
      <div className="mb-8 mt-10 grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <Image src="/idn_logoname.png" alt="IDN Capital" height={60} width={250} />
          <p className="text-sm text-gray-400">
            Plataforma completa para gestão inteligente de investimentos
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Produto</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {productLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Empresa</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Redes sociais</h4>
          <p className="text-sm text-gray-400">Perfis oficiais em publicação.</p>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
        <p>© 2026 IDN Capital. Todos os direitos reservados. | MIT License</p>
      </div>
    </footer>
  );
}
