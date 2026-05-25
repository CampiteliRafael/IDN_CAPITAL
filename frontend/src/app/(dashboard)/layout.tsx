'use client';

import type { ReactNode } from 'react';
import DashboardShell from '@/app/components/dashboard/DashboardShell';
import { useProtectedRoute } from '@/hooks/useAuth';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, authResolved } = useProtectedRoute();

  if (!authResolved) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-6">
        <p className="text-sm text-text-muted">Carregando sua sessão...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <DashboardShell>{children}</DashboardShell>;
}
