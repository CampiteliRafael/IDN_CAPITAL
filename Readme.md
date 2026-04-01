# IDN CAPITAL APP

> Plataforma completa para estudo, visualização, negociação e gerenciamento de ativos financeiros

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)

## 📋 Sobre o Projeto

O **IDN Capital App** é uma aplicação moderna e escalável desenvolvida com arquitetura de microservices, projetada para oferecer uma experiência completa no mercado financeiro. A plataforma permite que usuários estudem, visualizem dados em tempo real, realizem operações e gerenciem seus portfólios de investimentos de forma intuitiva e segura.

Este aplicativo permite que os usuários analisem dados financeiros, visualizem gráficos de ativos e realizem negociações em tempo real, facilitando a gestão e o acompanhamento de investimentos.

### 🎯 Objetivos

- Proporcionar visualização de dados financeiros em tempo real
- Oferecer ferramentas de análise técnica e fundamentalista
- Permitir simulação e backtesting de estratégias
- Facilitar o gerenciamento de portfólios diversificados
- Garantir segurança e confiabilidade nas operações

## ✨ Recursos Principais

### 📊 Análise e Visualização
- ✔ Análise de dados financeiros em tempo real
- ✔ Gráficos interativos para visualização de ativos financeiros
- ✔ Indicadores técnicos (médias móveis, RSI, MACD, Bollinger Bands)
- ✔ Candlesticks, linha, área e outros tipos de gráficos
- ✔ Dados em tempo real via WebSocket

### 💼 Gerenciamento
- ✔ Ferramentas de gerenciamento de portfólio e alertas personalizados
- ✔ Acompanhamento de múltiplas carteiras
- ✔ Cálculo automático de rentabilidade e performance
- ✔ Diversificação por classe de ativos
- ✔ Histórico completo de operações

### 🔐 Segurança e Experiência
- ✔ Segurança de dados e criptografia para proteção de informações financeiras
- ✔ Autenticação JWT e autorização baseada em roles
- ✔ Suporte a dispositivos móveis para acesso a qualquer hora e em qualquer lugar
- ✔ Opções de personalização de interface do usuário
- ✔ Documentação abrangente

### 📈 Trading e Simulação
- ✔ Simulador de operações (paper trading)
- ✔ Backtesting de estratégias
- ✔ Alertas de preço personalizados
- ✔ Order book em tempo real

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│              (React + TypeScript + TailwindCSS)             │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS/WSS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY                             │
│                  (NGINX / Kong / Traefik)                   │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  Auth Service    │ │ Market Data      │ │  Portfolio       │
│  (Node.js)       │ │  Service         │ │  Service         │
│  Port: 3001      │ │  (Node.js)       │ │  (Node.js)       │
└──────────────────┘ └──────────────────┘ └──────────────────┘
          │                   │                   │
          ▼                   ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  Trading         │ │  Analytics       │ │  Notification    │
│  Service         │ │  Service         │ │  Service         │
│  (Node.js)       │ │  (Python)        │ │  (Node.js)       │
└──────────────────┘ └──────────────────┘ └──────────────────┘
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
          ┌──────────────────┐ ┌──────────────────┐
          │   PostgreSQL     │ │   Redis Cache    │
          │   (Dados         │ │   (Sessions &    │
          │   Relacionais)   │ │   Real-time)     │
          └──────────────────┘ └──────────────────┘
                    │
                    ▼
          ┌──────────────────┐
          │   RabbitMQ       │
          │   (Message       │
          │   Broker)        │
          └──────────────────┘
```

## 🛠️ Stack Tecnológico

### Frontend
- **Framework:** React 18+ com Next.js 14
- **Linguagem:** TypeScript 5+
- **Estilização:** TailwindCSS 3+
- **Gráficos:** TradingView Lightweight Charts / Recharts
- **State Management:** Zustand / Redux Toolkit
- **HTTP Client:** Axios
- **WebSocket:** Socket.io-client
- **Forms:** React Hook Form + Zod
- **Testing:** Jest + React Testing Library + Cypress

### Backend (Microservices)
- **Runtime:** Node.js 20+ / Python 3.11+
- **Framework:** Express.js / Fastify / FastAPI
- **Linguagem:** TypeScript / Python
- **Authentication:** JWT + Passport.js
- **ORM:** Prisma / TypeORM / SQLAlchemy
- **Validation:** Zod / Joi / Pydantic
- **API Documentation:** Swagger / OpenAPI
- **Testing:** Jest / Vitest / Pytest

### Infraestrutura
- **Containerização:** Docker + Docker Compose
- **API Gateway:** NGINX / Kong
- **Message Broker:** RabbitMQ / Apache Kafka
- **Cache:** Redis
- **Banco de Dados:** PostgreSQL 15+
- **Monitoramento:** Prometheus + Grafana
- **Logs:** ELK Stack (Elasticsearch, Logstash, Kibana)

### DevOps
- **CI/CD:** GitHub Actions / GitLab CI
- **Versionamento:** Git + Conventional Commits
- **Code Quality:** ESLint, Prettier, SonarQube
- **Containers:** Docker Hub / GHCR

## 📁 Estrutura do Projeto

```
idn_capital/
├── Frontend/                    # Aplicação React/Next.js
│   ├── src/
│   │   ├── components/         # Componentes reutilizáveis
│   │   ├── pages/              # Páginas da aplicação
│   │   ├── hooks/              # Custom hooks
│   │   ├── services/           # Serviços e APIs
│   │   ├── store/              # Estado global
│   │   ├── utils/              # Funções utilitárias
│   │   └── types/              # Tipos TypeScript
│   ├── public/                 # Arquivos estáticos
│   ├── tests/                  # Testes E2E e unitários
│   └── package.json
│
├── Microservices/              # Backend em microservices
│   ├── auth-service/           # Autenticação e autorização
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── market-data-service/    # Dados de mercado em tempo real
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── portfolio-service/      # Gerenciamento de carteiras
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── trading-service/        # Execução de ordens
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── analytics-service/      # Análises e relatórios
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   └── notification-service/   # Alertas e notificações
│       ├── src/
│       ├── tests/
│       ├── Dockerfile
│       └── package.json
│
├── docker-compose.yml          # Orquestração de containers
├── .env.example                # Variáveis de ambiente exemplo
├── .gitignore
├── LICENSE
└── README.md
```

## 🎓 Princípios e Boas Práticas de Desenvolvimento

Este projeto foi desenvolvido seguindo os princípios fundamentais de engenharia de software moderna:

### SOLID Principles

#### Single Responsibility Principle (SRP)
- Cada microservice tem uma única responsabilidade bem definida
- Classes e módulos focados em uma única funcionalidade
- Separação clara entre camadas (Controller, Service, Repository)

#### Open/Closed Principle (OCP)
- Código aberto para extensão, fechado para modificação
- Uso de interfaces e abstrações para permitir novos comportamentos
- Strategy pattern para algoritmos de trading e análise

#### Liskov Substitution Principle (LSP)
- Implementações podem ser substituídas por suas abstrações
- Interfaces bem definidas entre serviços
- Contratos claros via TypeScript e Zod schemas

#### Interface Segregation Principle (ISP)
- Interfaces específicas e enxutas
- Clientes não dependem de métodos que não utilizam
- DTOs (Data Transfer Objects) específicos por caso de uso

#### Dependency Inversion Principle (DIP)
- Dependências de abstrações, não de implementações concretas
- Inversão de controle via Dependency Injection
- Facilita testes unitários com mocks

### Arquitetura e Design Patterns

#### Microservices Architecture
```
- Separação por domínio de negócio
- Comunicação via REST APIs e Message Broker
- Banco de dados por serviço (Database per Service)
- Circuit Breaker para resiliência
- Service Discovery e API Gateway
```

#### Design Patterns Implementados

**Criacionais:**
- **Factory Pattern:** Criação de estratégias de trading
- **Builder Pattern:** Construção de queries complexas e relatórios
- **Singleton Pattern:** Conexões de banco de dados e cache

**Estruturais:**
- **Adapter Pattern:** Integração com diferentes APIs de mercado
- **Decorator Pattern:** Middlewares de autenticação e logging
- **Facade Pattern:** Simplificação de operações complexas

**Comportamentais:**
- **Observer Pattern:** Sistema de notificações e alertas
- **Strategy Pattern:** Diferentes algoritmos de análise técnica
- **Chain of Responsibility:** Pipeline de validações
- **Command Pattern:** Sistema de ordens de trading

#### Dependency Injection (DI)

Cada microservice utiliza DI manual para:
- Desacoplar dependências entre módulos
- Facilitar testes unitários e de integração
- Melhorar manutenibilidade do código
- Permitir substituição de implementações
- Manter controle total sobre instanciação de dependências

### Arquitetura em Camadas

Cada microservice segue a **Clean Architecture / Hexagonal Architecture**:

```
src/
├── domain/                 # Camada de Domínio (Entities, Value Objects)
│   ├── entities/          # Entidades de negócio
│   ├── repositories/      # Interfaces de repositórios
│   └── services/          # Lógica de negócio pura
│
├── application/           # Camada de Aplicação (Use Cases)
│   ├── dtos/             # Data Transfer Objects
│   ├── use-cases/        # Casos de uso da aplicação
│   └── services/         # Serviços de aplicação
│
├── infrastructure/        # Camada de Infraestrutura
│   ├── database/         # Configuração e migrations
│   ├── repositories/     # Implementação dos repositórios
│   ├── external/         # Integrações externas
│   └── messaging/        # RabbitMQ, eventos
│
└── presentation/          # Camada de Apresentação
    ├── controllers/      # Controllers HTTP
    ├── middlewares/      # Middlewares Express
    ├── routes/           # Definição de rotas
    └── validators/       # Validações de entrada
```

### Programação Orientada a Objetos (POO)

**Encapsulamento:**
- Propriedades privadas e públicas bem definidas
- Getters/Setters quando necessário
- Imutabilidade onde apropriado

**Herança:**
- Classes base para comportamentos comuns
- Abstract classes para contratos
- Preferência por composição sobre herança

**Polimorfismo:**
- Interfaces para diferentes implementações
- Method overriding quando necessário
- Duck typing com TypeScript

**Abstração:**
- Interfaces bem definidas
- Ocultar complexidade de implementação
- Expor apenas o necessário

### Outros Princípios

**DRY (Don't Repeat Yourself):**
- Utilitários compartilhados
- Componentes reutilizáveis
- Helpers e funções genéricas

**KISS (Keep It Simple, Stupid):**
- Soluções simples e diretas
- Evitar over-engineering
- Código legível e manutenível

**YAGNI (You Aren't Gonna Need It):**
- Implementar apenas o necessário
- Evitar código especulativo
- Refatorar quando necessário

**Separation of Concerns:**
- Cada camada com responsabilidade específica
- Módulos independentes
- Baixo acoplamento, alta coesão

### Qualidade de Código

- **Code Reviews:** Obrigatórios em PRs
- **Linting:** ESLint + Prettier
- **Type Safety:** TypeScript strict mode
- **Testing:** Cobertura mínima de 80%
- **Documentation:** JSDoc/TSDoc para funções públicas
- **CI/CD:** Pipelines automatizados
- **Static Analysis:** SonarQube para detecção de code smells

### Tratamento de Erros

```typescript
// Hierarquia de exceções customizadas
class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidationError extends DomainError {}
class NotFoundError extends DomainError {}
class UnauthorizedError extends DomainError {}

// Middleware global de error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }
  // ...
});
```

### Logging e Observabilidade

- **Structured Logging:** Winston com formato JSON
- **Correlation IDs:** Rastreamento entre microservices
- **Metrics:** Prometheus para métricas de negócio
- **Tracing:** Distributed tracing com Jaeger
- **Health Checks:** Endpoints de health em todos os serviços

## 🚀 Começando

### Pré-requisitos

- **Node.js** 20+ e npm/yarn/pnpm
- **Docker** e Docker Compose
- **Git**
- **Python** 3.11+ (para analytics-service)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/idn_capital.git
cd idn_capital
```

2. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

3. **Inicie os serviços com Docker Compose**
```bash
docker-compose up -d
```

4. **Ou execute localmente (desenvolvimento)**

Frontend:
```bash
cd Frontend
npm install
npm run dev
```

Backend (cada microservice):
```bash
cd Microservices/auth-service
npm install
npm run dev
```

### Acessando a Aplicação

- **Frontend:** http://localhost:3000
- **API Gateway:** http://localhost:8080
- **Swagger Docs:** http://localhost:8080/api/docs

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/idn_capital
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d

# API Keys (Market Data)
ALPHA_VANTAGE_API_KEY=your-api-key
POLYGON_API_KEY=your-api-key

# RabbitMQ
RABBITMQ_URL=amqp://guest:guest@localhost:5672

# Email (Notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password

# Environment
NODE_ENV=development
PORT=3000
```

## 🧪 Testes

### Frontend
```bash
cd Frontend
npm run test              # Testes unitários
npm run test:e2e          # Testes E2E com Cypress
npm run test:coverage     # Coverage report
```

### Backend
```bash
cd Microservices/auth-service
npm run test              # Testes unitários
npm run test:integration  # Testes de integração
npm run test:coverage     # Coverage report
```

## 📦 Build e Deploy

### Build para Produção

Frontend:
```bash
cd Frontend
npm run build
npm run start
```

Docker:
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

### Deploy

O projeto está configurado para CI/CD automático via GitHub Actions:
- Push para `develop` → Deploy em ambiente de staging
- Push para `main` → Deploy em produção

## 🗺️ Roadmap

### Fase 1 - MVP (Q1 2026) ✅
- [x] Estrutura inicial do projeto
- [ ] Setup dos microservices básicos
- [ ] Interface de visualização de mercado
- [ ] Sistema de autenticação
- [ ] Gerenciamento básico de portfólio

### Fase 2 - Core Features (Q2 2026)
- [ ] Integração com APIs de mercado real
- [ ] Sistema de trading (paper trading)
- [ ] Notificações e alertas
- [ ] Dashboard analítico
- [ ] Testes automatizados completos

### Fase 3 - Advanced Features (Q3 2026)
- [ ] Backtesting de estratégias
- [ ] Machine Learning para predições
- [ ] Mobile App (React Native)
- [ ] Social trading features
- [ ] API pública para desenvolvedores

### Fase 4 - Scale (Q4 2026)
- [ ] Suporte a múltiplas exchanges
- [ ] Trading algorítmico
- [ ] Copy trading
- [ ] Marketplace de estratégias
- [ ] Programa de afiliados

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Siga o ESLint e Prettier configurados
- Use Conventional Commits
- Mantenha cobertura de testes acima de 80%
- Documente funções complexas


