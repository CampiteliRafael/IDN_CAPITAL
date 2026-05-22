'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constants/routes';
import Card from '../ui/Card';
import { getButtonClassName } from '../ui/Button';

const features = [
  {
    id: 1,
    title: 'Análise de Portfólio',
    description:
      'Avalie o desempenho do seu portfólio com métricas avançadas e gráficos interativos.',
    actionText: 'Saiba Mais',
  },
  {
    id: 2,
    title: 'Gráficos Interativos Profissionais',
    description: 'Crie gráficos personalizados com dezenas de indicadores técnicos',
    actionText: 'Saiba Mais',
  },
  {
    id: 3,
    title: 'Backtesting de Estratégias',
    description: 'Teste suas estratégias de investimento com dados históricos e simulações realistas.',
    actionText: 'Saiba Mais',
  },
  {
    id: 4,
    title: 'Simulador de Investimentos',
    description: 'Simule diferentes cenários de investimento para tomar decisões mais informadas.',
    actionText: 'Saiba Mais',
  },
  {
    id: 5,
    title: 'Gestão de Portfólio Inteligente',
    description:
      'Acompanhe rentabilidade, diversificação e performance de todas as suas carteiras em um só lugar',
    actionText: 'Saiba Mais',
  },
  {
    id: 6,
    title: 'Alertas de Preço Personalizados',
    description:
      'Configure alertas para monitorar os preços dos ativos e receber notificações em tempo real.',
    actionText: 'Saiba Mais',
  },
  {
    id: 7,
    title: 'Insights & Relatórios',
    description:
      'Gere relatórios completos de performance, lucros e perdas para análise e imposto de renda',
    actionText: 'Saiba Mais',
  },
  {
    id: 8,
    title: 'Análises e Recomendações',
    description: 'Acesse insights automáticos sobre seu portfólio e oportunidades de mercado',
    actionText: 'Saiba Mais',
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="bg-bg-elevated py-16 scroll-mt-28"
    >
      <div className="container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 id="features-title" className="mb-5 text-center font-bold text-moss">
            Tudo que você precisa para investir com inteligência
          </h2>
          <p className="mx-auto max-w-2xl text-center text-lg text-moss-light">
            Ferramentas profissionais de análise e gestão ao seu alcance
          </p>
        </motion.div>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <li key={feature.id}>
              <Card className="mt-12 rounded-lg bg-moss-light p-6 shadow-md">
                <Card.Header className="mb-4">
                  <h3 className="font-semibold text-gold-light">{feature.title}</h3>
                </Card.Header>
                <Card.Body>
                  <p className="text-white">{feature.description}</p>
                </Card.Body>
                <Card.Footer className="mt-4">
                  <Link
                    href={`${ROUTES.HOME}#how-it-works`}
                    className={getButtonClassName({
                      variant: 'secondary',
                      size: 'sm',
                      className: 'cursor-pointer',
                    })}
                  >
                    {feature.actionText}
                  </Link>
                </Card.Footer>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
