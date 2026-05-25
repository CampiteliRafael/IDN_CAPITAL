'use client';

const summaryCards = [
  {
    title: 'Patrimônio consolidado',
    value: 'R$ 128.450,90',
    description: 'Atualize este card com o valor total investido do usuário.',
  },
  {
    title: 'Rentabilidade do mês',
    value: '+4,82%',
    description: 'Espaço ideal para evolução mensal do portfólio.',
  },
  {
    title: 'Alertas ativos',
    value: '12',
    description: 'Use este bloco para resumir alertas e notificações importantes.',
  },
];

const nextSteps = [
  'Criar widgets reutilizáveis para indicadores financeiros.',
  'Conectar os cards ao estado global ou às APIs do dashboard.',
  'Adicionar navegação lateral com novas áreas privadas.',
];

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <article
            key={card.title}
            className="rounded-xl border border-border-subtle bg-bg-elevated p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-text-subtle">{card.title}</p>
            <p className="mt-3 text-3xl font-bold text-moss">{card.value}</p>
            <p className="mt-3 text-sm text-text-muted">{card.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <article className="rounded-xl border border-border-subtle bg-bg p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-moss">Área principal do dashboard</h2>
              <p className="mt-2 text-sm text-text-muted">
                Este espaço já fica preparado para receber gráficos, tabelas, carteira, posições
                ou componentes de conciliação.
              </p>
            </div>
            <span className="rounded-full bg-gold-light/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-moss">
              Em construção
            </span>
          </div>

          <div className="mt-6 flex min-h-80 items-center justify-center rounded-xl border border-dashed border-border bg-bg-elevated p-6 text-center text-text-muted">
            Seu próximo componente principal pode entrar aqui.
          </div>
        </article>

        <aside className="rounded-xl border border-border-subtle bg-bg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-moss">Próximos passos</h2>
          <ul className="mt-4 space-y-3">
            {nextSteps.map((step) => (
              <li
                key={step}
                className="rounded-lg border border-border-subtle bg-bg-elevated px-4 py-3 text-sm text-text-muted"
              >
                {step}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}
