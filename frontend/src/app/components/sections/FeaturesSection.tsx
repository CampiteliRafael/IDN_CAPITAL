'use client';
import Card from '../ui/Card';
import { motion } from 'framer-motion';

export default function FeaturesSection() {
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
      description:
        'Teste suas estratégias de investimento com dados históricos e simulações realistas.',
      actionText: 'Saiba Mais',
    },
    {
      id: 4,
      title: 'Simulador de Investimentos',
      description:
        'Simule diferentes cenários de investimento para tomar decisões mais informadas.',
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

  return (
    <section id="features" className="py-16 bg-bg-elevated">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-moss font-bold text-center mb-5">
            Tudo que você precisa para investir com inteligência
          </h2>
          <p className="text-moss-light text-lg text-center max-w-2xl mx-auto">
            Ferramentas profissionais de análise e gestão ao seu alcance
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.id} className="mt-12 p-6 bg-moss-light rounded-lg shadow-md">
              <Card.Header className="mb-4">
                <h3 className="text-gold-light font-semibold">{feature.title}</h3>
              </Card.Header>
              <Card.Body>
                <p className="text-white">{feature.description}</p>
              </Card.Body>
              <Card.Footer className="mt-4">
                <button className="cursor-pointer px-4 py-2 bg-gold-light text-moss rounded-lg hover:bg-gold hover:text-white transition-colors">
                  {feature.actionText}
                </button>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
