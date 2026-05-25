'use client';

import Button from '@/app/components/ui/Button';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function DashboardTopbar() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push(ROUTES.HOME);
    } catch (_error) {}
  };

  return (
    <header className="flex flex-col gap-4 border-b border-border-subtle bg-bg px-6 py-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-text-subtle">Área autenticada</p>
        <h1 className="text-2xl font-bold text-moss">Olá{user?.name ? `, ${user.name}` : ''}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-full bg-bg-elevated px-4 py-2 text-sm text-text-muted">
          {user?.email ?? 'Usuário autenticado'}
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={handleLogout}
          className="cursor-pointer"
        >
          Sair
        </Button>
      </div>
    </header>
  );
}
