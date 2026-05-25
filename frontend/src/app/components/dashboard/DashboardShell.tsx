import type { ReactNode } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row">
        <DashboardSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <DashboardTopbar />
          <section className="flex-1 px-6 py-8">{children}</section>
        </div>
      </div>
    </div>
  );
}
