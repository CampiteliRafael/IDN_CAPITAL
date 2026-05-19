# IDN CAPITAL APP

> Plataforma financeira inteligente para gestão de ativos, conciliação automatizada de pagamentos e análise de portfólios com IA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)

## 📋 Sobre o Projeto

O **IDN Capital App** é uma plataforma moderna e escalável desenvolvida com arquitetura de microservices, projetada para oferecer uma experiência completa no mercado financeiro. Além de visualização de ativos e gerenciamento de portfólios, a plataforma conta com um sistema inteligente de conciliação financeira que utiliza IA (LLM Vision) para validar comprovantes de pagamento, detectar fraudes e processar transações de forma assíncrona.

Este projeto resolve um problema real de negócio: empresas perdem tempo e dinheiro analisando comprovantes manualmente e lidando com fraudes. O sistema automatiza esse processo utilizando filas de mensagens, workers assíncronos e modelos de linguagem multimodais.

### 🎯 Objetivos

- Proporcionar visualização de dados financeiros em tempo real
- Oferecer ferramentas de análise técnica e fundamentalista
- Automatizar a conciliação e validação de comprovantes de pagamento com IA
- Detectar transações fraudulentas antes que causem impacto financeiro
- Facilitar o gerenciamento de portfólios diversificados
- Garantir segurança e confiabilidade nas operações

## ✨ Recursos Principais

### 🤖 Conciliação Inteligente com IA
- ✔ Upload de comprovantes de pagamento (PDF/Imagem) com drag-and-drop
- ✔ Extração automática de dados (valor, data, banco, CNPJ) via LLM Vision
- ✔ Detecção de fraudes com análise de autenticidade do comprovante
- ✔ Atualização de status em tempo real via WebSocket (`pending → processing → approved/fraud`)
- ✔ Histórico completo de transações analisadas com auditoria

### 📊 Análise e Visualização
- ✔ Análise de dados financeiros em tempo real
- ✔ Gráficos interativos para visualização de ativos financeiros
- ✔ Indicadores técnicos (médias móveis, RSI, MACD, Bollinger Bands)
- ✔ Candlesticks, linha, área e outros tipos de gráficos
- ✔ Dashboard financeiro com métricas: total faturado, fraudes detectadas, transações pendentes
- ✔ Dados em tempo real via WebSocket

### 💼 Gerenciamento
- ✔ Ferramentas de gerenciamento de portfólio e alertas personalizados
- ✔ Acompanhamento de múltiplas carteiras
- ✔ Cálculo automático de rentabilidade e performance
- ✔ Diversificação por classe de ativos
- ✔ Histórico completo de operações

### 🔐 Segurança e Experiência
- ✔ Autenticação JWT e autorização baseada em roles
- ✔ Segurança de dados e criptografia para proteção de informações financeiras
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
│         (Next.js + React + TypeScript + TailwindCSS)        │
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
│  Auth Service    │ │ Billing Service  │ │  Market Data     │
│  (Node.js)       │ │  (Node.js)       │ │  Service         │
│  Port: 3001      │ │  Port: 3002      │ │  (Node.js)       │
└──────────────────┘ └──────────────────┘ └──────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │  BullMQ Queues    │
                    │  (Redis)          │
                    └─────────┬─────────┘
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
    ┌──────────────────┐         ┌──────────────────┐
    │   AI Worker      │         │  Notification    │
    │  (LLM Vision)    │         │  Worker          │
    │  Gemini/GPT-4o   │         │  (Nodemailer)    │
    └──────────────────┘         └──────────────────┘
          │                   │                   │
          ▼                   ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  Portfolio       │ │  Analytics       │ │  Notification    │
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
          │   PostgreSQL     │ │   Redis          │
          │   (Dados         │ │   (Sessions,     │
          │   Relacionais)   │ │   Cache & Queues)│
          └──────────────────┘ └──────────────────┘
```

### Fluxo de Conciliação com IA

```
Upload do          Billing          BullMQ          AI Worker
Comprovante   →   Service     →    Queue      →   (LLM Vision)
(Frontend)        (salva +          Redis          Extrai dados +
                  enfileira)                       valida fraude
                                                        │
                                                        ▼
                  Frontend    ←   WebSocket   ←   Atualiza status
                  (tempo real)    (Socket.io)     no banco + notifica
```

## 🛠️ Stack Tecnológico

### Frontend
- **Framework:** Next.js 16 + React 19
- **Linguagem:** TypeScript 5+
- **Estilização:** TailwindCSS 4+
- **Gráficos:** Recharts / Tremor
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios + TanStack Query
- **WebSocket:** Socket.io-client
- **Forms/Validation:** Zod
- **Testing:** Jest + React Testing Library

### Backend (Microservices)
- **Runtime:** Node.js 20+
- **Framework:** Express 5
- **Linguagem:** TypeScript
- **Authentication:** JWT + Bcrypt
- **ORM:** Prisma + PostgreSQL
- **Validation:** Zod
- **File Upload:** Multer
- **Message Queue:** BullMQ (Redis)
- **WebSocket:** Socket.io
- **Email:** Nodemailer
- **API Documentation:** Swagger / OpenAPI
- **Testing:** Jest

### Inteligência Artificial
- **LLM Vision:** Google Gemini / OpenAI GPT-4o
- **Casos de uso:** Extração de dados de comprovantes, detecção de fraudes
- **Integração:** Workers assíncronos via BullMQ

### Infraestrutura
- **Containerização:** Docker + Docker Compose
- **API Gateway:** NGINX / Kong
- **Message Queue:** BullMQ com Redis
- **Cache & Sessions:** Redis
- **Banco de Dados:** PostgreSQL 15+
- **Monitoramento:** Prometheus + Grafana
- **Logs:** ELK Stack (Elasticsearch, Logstash, Kibana)

### DevOps
- **CI/CD:** GitHub Actions
- **Versionamento:** Git + Conventional Commits
- **Code Quality:** ESLint, Prettier
- **Containers:** Docker Hub / GHCR

## 📁 Estrutura do Projeto

```
idn_capital/
├── frontend/                       # Aplicação Next.js
│   ├── src/
│   │   ├── app/                   # App Router (Next.js)
│   │   │   ├── (auth)/            # Rotas de autenticação
│   │   │   ├── (dashboard)/       # Painel principal
│   │   │   └── components/        # Componentes reutilizáveis
│   │   ├── hooks/                 # Custom hooks
│   │   ├── lib/                   # Store, API client, tipos
│   │   ├── constants/             # Rotas e constantes
│   │   └── utils/                 # Funções utilitárias
│   ├── Dockerfile
│   └── package.json
│
├── Auth-service/                   # Autenticação e autorização
│   ├── src/
│   │   ├── domain/                # Entidades e interfaces
│   │   ├── application/           # Use cases e DTOs
│   │   ├── infrastructure/        # Prisma, Redis, config
│   │   └── presentation/          # Controllers e rotas Express
│   ├── prisma/
│   ├── Dockerfile
│   └── package.json
│
├── billing-service/                # Conciliação financeira com IA
│   ├── src/
│   │   ├── domain/                # Transaction, Fraud entities
│   │   ├── application/           # Use cases e DTOs
│   │   ├── infrastructure/        # Prisma, BullMQ queues, Multer
│   │   │   ├── queues/            # ai-processing, notifications queues
│   │   │   └── workers/           # AI worker, notification worker
│   │   └── presentation/          # Controllers, rotas, Socket.io
│   ├── prisma/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yaml             # Orquestração de containers
├── .env.example                    # Variáveis de ambiente exemplo
├── .gitignore
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
- Comunicação via REST APIs e BullMQ (Redis)
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
- **Adapter Pattern:** Integração com APIs de mercado e provedores de IA
- **Decorator Pattern:** Middlewares de autenticação e logging
- **Facade Pattern:** Simplificação de operações complexas

**Comportamentais:**
- **Observer Pattern:** Sistema de notificações e alertas em tempo real
- **Strategy Pattern:** Diferentes algoritmos de análise técnica e validação de fraudes
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

Cada microservice segue a **Clean Architecture**:

```
src/
├── domain/                 # Camada de Domínio (Entities, Value Objects)
│   ├── entities/          # Entidades de negócio
│   ├── repositories/      # Interfaces de repositórios
│   └── errors/            # Erros de domínio customizados
│
├── application/           # Camada de Aplicação (Use Cases)
│   ├── dtos/             # Data Transfer Objects
│   ├── use-cases/        # Casos de uso da aplicação
│   └── services/         # Interfaces de serviços externos
│
├── infrastructure/        # Camada de Infraestrutura
│   ├── database/         # Prisma client
│   ├── repositories/     # Implementação dos repositórios
│   ├── queues/           # BullMQ producers e consumers
│   └── config/           # Injeção de dependências
│
└── presentation/          # Camada de Apresentação
    ├── controllers/      # Controllers HTTP
    ├── middlewares/      # Middlewares Express
    └── routes/           # Definição de rotas
```

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
class FraudDetectedError extends DomainError {}

// Middleware global de error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }
  // ...
});
```

### Qualidade de Código

- **Linting:** ESLint + Prettier
- **Type Safety:** TypeScript strict mode
- **Testing:** Testes unitários e de integração com Jest
- **CI/CD:** GitHub Actions rodando lint + testes a cada Push
- **Conventional Commits:** Histórico de git semântico e legível

## 🚀 Começando

### Pré-requisitos

- **Node.js** 20+ e npm
- **Docker** e Docker Compose
- **Git**

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/campitelirafael/idn_capital.git
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

Billing Service:
```bash
cd billing-service
npm install
npm run dev
```

### Acessando a Aplicação

- **Frontend:** http://localhost:3000
- **Auth Service:** http://localhost:3001
- **Billing Service:** http://localhost:3002

## 🔧 Variáveis de Ambiente

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

# AI Provider (escolha um)
GEMINI_API_KEY=your-gemini-api-key
OPENAI_API_KEY=your-openai-api-key

# Email (Notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# URLs
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## 🧪 Testes

### Frontend
```bash
cd frontend
npm run test              # Testes unitários
npm run test:coverage     # Coverage report
```

### Auth Service
```bash
cd Auth-service
npm run test              # Testes unitários
npm run test:coverage     # Coverage report
```

### Billing Service
```bash
cd billing-service
npm run test              # Testes unitários
npm run test:coverage     # Coverage report
```

## 📦 Build e Deploy

### Build para Produção

Frontend:
```bash
cd frontend
npm run build
npm run start
```

Docker (todos os serviços):
```bash
docker-compose up --build -d
```

### CI/CD

O projeto está configurado com GitHub Actions:
- A cada Push → ESLint + testes automatizados em todos os serviços
- Push para `main` → Build e validação de qualidade

## 🗺️ Roadmap

### Fase 1 - Fundação (Q1 2026) ✅
- [x] Estrutura de microservices com Docker Compose
- [x] Auth Service com Clean Architecture (JWT + Bcrypt + Prisma)
- [x] Frontend com Next.js, autenticação e middleware de rotas
- [x] Testes unitários e de integração
- [x] Configuração de ESLint, Prettier e TypeScript strict

### Fase 2 - Conciliação com IA (Q2 2026)
- [ ] Billing Service com upload de comprovantes
- [ ] Integração BullMQ + Redis para filas assíncronas
- [ ] AI Worker com Google Gemini / GPT-4o Vision
- [ ] Detecção de fraudes automatizada
- [ ] WebSocket para status em tempo real
- [ ] Dashboard financeiro com Recharts
- [ ] Notification Worker com Nodemailer
- [ ] GitHub Actions CI/CD

### Fase 3 - Mercado e Portfólio (Q3 2026)
- [ ] Integração com APIs de mercado real
- [ ] Sistema de trading (paper trading)
- [ ] Gerenciamento de portfólio e carteiras
- [ ] Indicadores técnicos e gráficos avançados
- [ ] Alertas de preço personalizados

### Fase 4 - Escala (Q4 2026)
- [ ] Backtesting de estratégias
- [ ] Analytics Service
- [ ] Suporte a múltiplas exchanges
- [ ] Mobile App (React Native)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças seguindo Conventional Commits
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Siga o ESLint e Prettier configurados
- Use Conventional Commits
- Mantenha cobertura de testes adequada
- Replique a arquitetura em camadas existente nos novos serviços
