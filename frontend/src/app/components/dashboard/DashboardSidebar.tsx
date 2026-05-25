import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const navigationItems = [
  {
    href: ROUTES.DASHBOARD,
    label: 'Visão geral',
    description: 'Resumo da conta e métricas principais',
  },
];

export default function DashboardSidebar() {
  return (
    <aside className="w-full border-b border-border-subtle bg-bg-elevated px-6 py-6 lg:min-h-[calc(100vh-5rem)] lg:w-72 lg:border-b-0 lg:border-r">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-subtle">
          Painel privado
        </p>
        <h2 className="mt-2 text-2xl font-bold text-moss">Dashboard</h2>
        <p className="mt-2 text-sm text-text-muted">
          Estruture aqui os blocos que vão compor a experiência do usuário autenticado.
        </p>
      </div>

      <nav aria-label="Navegação do dashboard">
        <ul className="space-y-3">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-lg border border-border-subtle bg-bg px-4 py-3 transition-colors hover:border-gold hover:bg-bg-elevated"
              >
                <span className="block font-semibold text-moss">{item.label}</span>
                <span className="mt-1 block text-sm text-text-muted">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
