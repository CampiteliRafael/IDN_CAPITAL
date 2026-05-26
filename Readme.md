# IDN CAPITAL APP

> Plataforma financeira para gestão de ativos, visualização de mercado em tempo real e análise de portfólios.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)

## Sobre o Projeto

O **IDN Capital App** é uma plataforma moderna e escalável, pensada para entregar uma experiência completa no acompanhamento de investimentos. A proposta do sistema é evoluir para um ecossistema com autenticação, dashboard financeiro, visualização de ativos em tempo real, gestão de carteiras, alertas e ferramentas de análise.

Hoje, parte da fundação técnica já está em desenvolvimento, especialmente a camada de autenticação, a estrutura frontend com Next.js e a separação entre áreas públicas e privadas da aplicação. A documentação abaixo descreve a **intenção futura do sistema**, enquanto o código atual representa uma implementação ainda em evolução.

## Objetivos

- Proporcionar visualização de dados financeiros em tempo real
- Oferecer ferramentas de análise técnica e acompanhamento de ativos
- Facilitar o gerenciamento de portfólios e carteiras diversificadas
- Permitir a construção de dashboards privados orientados a métricas e performance
- Garantir segurança, escalabilidade e boa experiência de uso

## Recursos Principais

### Análise e Visualização
- Gráficos interativos para visualização de ativos financeiros
- Indicadores técnicos como médias móveis, RSI, MACD e Bollinger Bands
- Candlesticks, linha, área e outros formatos de gráfico
- Dashboard com métricas de patrimônio, rentabilidade e evolução da carteira
- Dados em tempo real via integrações de mercado

### Gestão de Portfólio
- Acompanhamento de múltiplas carteiras
- Consolidação de posições por ativo
- Cálculo de rentabilidade e performance
- Diversificação por classe de ativos
- Histórico de operações e movimentações

### Alertas e Monitoramento
- Watchlists personalizadas
- Alertas de preço e variação
- Acompanhamento de benchmarks
- Notificações sobre eventos relevantes do mercado

### Segurança e Experiência
- Autenticação JWT com sessão baseada em cookie
- Controle de acesso entre áreas públicas e privadas
- Layouts separados para experiência pública e dashboard autenticado
- Estrutura preparada para evolução incremental do produto

### Trading e Simulação
- Simulador de operações (paper trading)
- Backtesting de estratégias
- Monitoramento de ordens e execução simulada
- Ferramentas de apoio para tomada de decisão

## Arquitetura

```text
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                            │
│        (Next.js + React + TypeScript + TailwindCSS)        │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS / WSS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       API GATEWAY                           │
│                  (NGINX / Kong / Traefik)                   │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
      ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
      │ Auth Service   │ │ Portfolio      │ │ Market Data    │
      │ (Node.js)      │ │ Service        │ │ Service        │
      │ Port: 3001     │ │ (Node.js)      │ │ (Node.js)      │
      └────────────────┘ └────────────────┘ └────────────────┘
                │             │             │
                └───────┬─────┴─────┬──────┘
                        │           │
                        ▼           ▼
                 ┌───────────┐ ┌───────────┐
                 │PostgreSQL │ │   Redis   │
                 │Relacional │ │Cache/RT   │
                 └───────────┘ └───────────┘
```

## Stack Tecnológico

### Frontend
- **Framework:** Next.js 16 + React 19
- **Linguagem:** TypeScript 5+
- **Estilização:** TailwindCSS 4+
- **Gráficos:** Recharts / Tremor
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios
- **Forms/Validation:** Zod
- **Testing:** Jest + React Testing Library

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express 5
- **Linguagem:** TypeScript
- **Authentication:** JWT + Bcrypt
- **ORM:** Prisma + PostgreSQL
- **Validation:** Zod
- **Cache e suporte a tempo real:** Redis
- **API Documentation:** Swagger / OpenAPI
- **Testing:** Jest

### Infraestrutura
- **Containerização:** Docker + Docker Compose
- **Banco de Dados:** PostgreSQL 15+
- **Cache:** Redis
- **Monitoramento:** Prometheus + Grafana
- **Logs:** ELK Stack

### DevOps
- **CI/CD:** GitHub Actions
- **Versionamento:** Git + Conventional Commits
- **Code Quality:** ESLint + Prettier

## Estrutura do Projeto

```text
idn_capital/
├── frontend/                      # Aplicação Next.js
│   ├── src/
│   │   ├── app/                  # App Router
│   │   │   ├── (public)/         # Área pública
│   │   │   ├── (dashboard)/      # Área privada
│   │   │   └── components/       # Componentes reutilizáveis
│   │   ├── hooks/                # Custom hooks
│   │   ├── lib/                  # Store, API client, tipos
│   │   ├── constants/            # Rotas e constantes
│   │   └── utils/                # Utilitários
│   ├── Dockerfile
│   └── package.json
│
├── Auth-service/                 # Autenticação e autorização
│   ├── src/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── presentation/
│   ├── prisma/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yaml
├── .env.example
├── .gitignore
└── README.md
```

## Estado Atual do Projeto

Atualmente, os blocos mais avançados do sistema são:

- Estrutura base do frontend com Next.js
- Autenticação com cookies, JWT e Redux Toolkit
- Separação entre rotas públicas e privadas
- Layout privado inicial para o dashboard
- Base arquitetural para expansão futura dos módulos financeiros

Ainda não estão implementados por completo:

- Serviço de mercado em tempo real
- Modelagem completa de portfólio e posições
- Integração com provedores de dados de mercado
- Gráficos financeiros conectados a dados reais
- Alertas, watchlists e analytics avançados

## Princípios e Boas Práticas

Este projeto segue princípios modernos de engenharia de software:

### SOLID
- **SRP:** cada módulo com responsabilidade clara
- **OCP:** extensível sem exigir reescrita frequente
- **LSP:** abstrações substituíveis com contratos bem definidos
- **ISP:** interfaces pequenas e específicas
- **DIP:** dependência de abstrações e uso de injeção de dependências

### Arquitetura
- Clean Architecture por serviço
- Separação entre domínio, aplicação, infraestrutura e apresentação
- Evolução orientada a serviços
- Preparação para integrações externas e tempo real

### Qualidade
- TypeScript em modo estrito
- ESLint + Prettier
- Testes unitários e de integração
- Histórico semântico com Conventional Commits

## Começando

### Pré-requisitos

- **Node.js** 20+ e npm
- **Docker** e Docker Compose
- **Git**

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/campitelirafael/idn_capital.git
cd idn_capital
```

2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

3. Inicie os serviços com Docker Compose

```bash
docker-compose up -d
```

4. Ou execute localmente

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Auth Service:

```bash
cd Auth-service
npm install
npm run dev
```

### Acessando a Aplicação

- **Frontend:** http://localhost:3000
- **Auth Service:** http://localhost:3001

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
POSTGRES_USER=idn_user
POSTGRES_PASSWORD=idn_password
POSTGRES_DB=idn_capital

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d

# URLs
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

O frontend também pode precisar de um `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Testes

### Frontend

```bash
cd frontend
npm run test
```

### Auth Service

```bash
cd Auth-service
npm run test
```

## Build e Deploy

### Build para produção

Frontend:

```bash
cd frontend
npm run build
npm run start
```

Docker:

```bash
docker-compose up --build -d
```

## Roadmap

### Fase 1 - Fundação
- [x] Estrutura base com Docker Compose
- [x] Auth Service com Clean Architecture
- [x] Frontend com Next.js, autenticação e proteção de rotas
- [x] Testes iniciais e organização do estado global
- [x] Separação entre layouts públicos e privados

### Fase 2 - Dashboard e Mercado
- [ ] Dashboard financeiro com widgets reutilizáveis
- [ ] Integração com APIs de mercado em tempo real
- [ ] Modelagem de ativos, posições e transações
- [ ] Gráficos financeiros conectados a dados reais
- [ ] Watchlists e alertas personalizados

### Fase 3 - Portfólio e Simulação
- [ ] Consolidação de carteiras
- [ ] Rentabilidade por período e benchmark
- [ ] Paper trading
- [ ] Backtesting de estratégias

### Fase 4 - Escala
- [ ] Analytics Service
- [ ] Suporte a múltiplas corretoras e fontes de dados
- [ ] Notificações em tempo real
- [ ] Aplicação mobile

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commits seguindo Conventional Commits
4. Envie sua branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Siga o ESLint e Prettier configurados
- Use Conventional Commits
- Mantenha a cobertura de testes sempre que possível
- Preserve a separação em camadas e a organização arquitetural existente
