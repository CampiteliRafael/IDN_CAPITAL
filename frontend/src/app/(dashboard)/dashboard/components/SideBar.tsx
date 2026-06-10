export default function Sidebar() {
  return (
    <aside className="w-64 rounded-xl border border-border-subtle bg-bg p-6 shadow-sm">
      <h2 className="text-xl font-bold text-moss">Navegação</h2>
      <nav className="mt-4 space-y-3">
        <a
          href="#"
          className="block rounded-lg border border-border-subtle bg-bg-elevated px-4 py-3 text-sm text-text-muted"
        >
          Visão geral
        </a>
        <a
          href="#"
          className="block rounded-lg border border-border-subtle bg-bg-elevated px-4 py-3 text-sm text-text-muted"
        >
          Relatórios
        </a>
        <a
          href="#"
          className="block rounded-lg border border-border-subtle bg-bg-elevated px-4 py-3 text-sm text-text-muted"
        >
          Configurações
        </a>
      </nav>
    </aside>
  );
}
