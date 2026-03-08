# Sistema Financeiro PF/PJ - Product Requirements Document

**Autor:** [Seu Nome]  
**Data:** 14 de Fevereiro de 2026  
**Status:** Approved  

---

## Overview

Sistema financeiro self-hosted para freelancers que permite separação total entre finanças pessoais (PF) e empresariais (PJ), com foco em privacidade de dados, interface visual atraente e baixa fricção de uso. O produto é distribuído como código-fonte + curso de implementação, onde o usuário instala em sua própria infraestrutura.

---

## Problem

### O que está acontecendo?

Freelancers de design e web design que faturam entre R$ 3k-10k/mês vivem no caos financeiro. Eles misturam completamente suas contas pessoais com as empresariais, não sabem quanto realmente entra vs sai, não têm previsibilidade de caixa, e sentem que trabalham muito mas não veem o resultado financeiro. As ferramentas disponíveis são ou muito complexas (planilhas) ou exigem confiar dados sensíveis a terceiros (apps SaaS).

### Quem é afetado?

**Persona Primária: Designer Caótico**
- Freelancer de design/web design
- 25-40 anos
- Fatura R$ 3k-10k/mês
- Mistura PF e PJ constantemente
- Aversão a planilhas complexas
- Valoriza estética e UX
- Toma decisões por impulso visual
- Ansiedade financeira constante

**Persona Secundária (futuro): Freelancer Tech**
- Copywriters, gestores de tráfego, estrategistas digitais
- Mesmo perfil de dor, mas diferentes áreas

### Qual o custo de não resolver?

- **Tempo perdido:** Horas tentando reconciliar gastos no fim do mês
- **Dinheiro:** Não conseguir precificar corretamente por falta de clareza de custos
- **Oportunidade:** Perder chances de investimento por não saber quanto realmente sobra
- **Saúde mental:** Ansiedade por não ter controle financeiro

### Como resolvem hoje?

1. **Planilhas do Google Sheets** - Caóticas, feias, trabalhosas de manter
2. **Apps SaaS (Mobills, Organizze, Granatum)** - Mensalidade + dados ficam com terceiros
3. **Notion customizado** - Precisa criar do zero, leva muito tempo
4. **Nenhum controle** - Maioria simplesmente não controla e vive no escuro

---

## Goals

O que significa sucesso para este projeto:

- **Goal 1:** Permitir separação clara PF/PJ em <2 minutos/dia → Métrica: Tempo médio de lançamento de transação <30 segundos
- **Goal 2:** Garantir 100% de privacidade dos dados do usuário → Métrica: Zero dados armazenados em servidores de terceiros
- **Goal 3:** Facilitar instalação para não-devs → Métrica: >70% conseguem instalar sozinhos com o curso
- **Goal 4:** Criar experiência visual que designers amem usar → Métrica: NPS >8
- **Goal 5:** Gerar receita sustentável → Métrica: 50+ vendas nos primeiros 90 dias

---

## Non-Goals

O que NÃO estamos tentando fazer nesta versão:

- ❌ Integração com Open Banking ou APIs de bancos
- ❌ Sistema de pagamento integrado (checkout é externo)
- ❌ Múltiplos usuários/compartilhamento com sócio ou contador
- ❌ Mobile app nativo (apenas web responsivo)
- ❌ Relatórios complexos ou export para contador
- ❌ Alertas automáticos por WhatsApp/Email
- ❌ Gamificação ou sistema de badges/recompensas

---

## User Stories

### Persona 1: Designer Caótico (Web Designer)

> João, 32 anos, freelancer de web design, fatura R$ 7k/mês. Mistura sua conta PF com PJ, usa múltiplos cartões, esquece de lançar gastos, e tem ansiedade de não saber se vai ter grana no fim do mês. Valoriza ferramentas bonitas e práticas.

- Como João, eu quero **separar visualmente minhas finanças PF das PJ** para ter clareza do que é empresa vs pessoal
- Como João, eu quero **lançar um gasto em menos de 30 segundos** para não perder tempo e não esquecer de registrar
- Como João, eu quero **ver meu saldo previsto do mês** para saber se posso fazer aquela compra sem culpa
- Como João, eu quero **controlar parcelamentos de cartões** para não perder de vista o que estou pagando todo mês
- Como João, eu quero **criar metas financeiras (ex: comprar MacBook)** para ter motivação de poupar
- Como João, eu quero **que meus dados fiquem apenas comigo** para ter paz de espírito de que ninguém mais tem acesso

### Persona 2: Designer Gráfico Puro (futuro)

> Maria, 28 anos, designer gráfica, fatura R$ 4k/mês. Não entende nada de código ou hospedagem, mas está disposta a aprender se for simples e tiver suporte.

- Como Maria, eu quero **um curso passo-a-passo de instalação** para conseguir colocar o sistema no ar mesmo sem conhecimento técnico
- Como Maria, eu quero **poder pagar para alguém instalar pra mim** para ter o sistema funcionando rápido
- Como Maria, eu quero **suporte rápido via WhatsApp/Discord** para tirar dúvidas quando travar em algo
- Como Maria, eu quero **interface bonita e intuitiva** para não me sentir perdida usando o sistema

---

## Solution

### Visão Geral

Criamos um sistema financeiro completo em Next.js + Supabase que o usuário instala em sua própria infraestrutura. O produto é vendido como:

1. **Código-fonte completo** (via GitHub privado)
2. **Curso em vídeo de implementação** (passo-a-passo de instalação)
3. **Licença vitalícia** com atualizações e 1 ano de suporte
4. **Opção de setup assistido** para quem não quer instalar sozinho

O sistema possui interface visual moderna (estilo Linear/Resend/Vercel), modo claro (primário) e escuro, permite separação total entre PF e PJ, e mantém 100% dos dados na infraestrutura do próprio usuário (Supabase account dele).

### Features Principais

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Auth & Onboarding** | Login via Supabase Auth + tela inicial de configuração de licença | Must have |
| **Toggle PF/PJ** | Switch para alternar entre visão Pessoal e Empresarial | Must have |
| **Dashboard Financeiro** | Saldo, entradas, saídas, contas fixas, previsão de caixa | Must have |
| **Lançamentos** | Registrar entradas/saídas à vista ou parceladas | Must have |
| **Categorias Custom** | Criar, editar e excluir categorias de transação | Must have |
| **Contas Fixas** | Cadastrar gastos/receitas recorrentes que lançam automaticamente | Must have |
| **Gestão de Cartões** | Cadastrar cartões, ver faturas, acompanhar parcelamentos | Must have |
| **Metas** | Criar metas financeiras e acompanhar progresso | Must have |
| **Gráficos** | Visualizações de entradas vs saídas, evolução mensal | Must have |
| **Temas (Light/Dark)** | Light Mode como padrão com opção de alternar para Dark Mode | Must have |
| **Proteção de Licença** | Banner com dados do licenciado + watermark no código | Must have |
| **Relatórios PDF** | Exportar relatórios detalhados | Should have |
| **Multi-usuário** | Compartilhar acesso com sócio/contador | Should have |
| **Anexos** | Fazer upload de notas fiscais/recibos | Could have |

### User Flow

#### Fluxo 1: Primeira Instalação

1. Usuário compra licença (Hubla/Cakto)
2. Recebe acesso à área de membros
3. Assiste curso de instalação
4. Cria conta no Supabase
5. Clona repositório do GitHub
6. Configura variáveis de ambiente (.env)
7. Faz deploy na Vercel
8. Acessa sistema pela primeira vez
9. Faz login (email + senha)
10. Configura dados da licença (nome, email, ID)
11. Sistema está pronto para uso

#### Fluxo 2: Uso Diário - Lançar Gasto

1. Usuário acessa dashboard (PF ou PJ)
2. Clica em "+ Nova Transação"
3. Seleciona tipo (Entrada ou Saída)
4. Preenche: Descrição, Valor, Data, Categoria, Cartão (opcional)
5. Define se é parcelado (quantas vezes)
6. Salva
7. Dashboard atualiza automaticamente

#### Fluxo 3: Configurar Conta Fixa

1. Usuário vai em "Contas Fixas"
2. Clica em "+ Nova Conta Fixa"
3. Preenche: Nome (ex: Aluguel), Valor, Dia do vencimento, Tipo (PF ou PJ)
4. Define periodicidade (mensal, bimestral, anual)
5. Salva
6. Sistema lança automaticamente todo mês

#### Fluxo 4: Criar Meta

1. Usuário vai em "Metas" (PF ou PJ)
2. Clica em "+ Nova Meta"
3. Preenche: Nome (ex: MacBook Pro), Valor alvo, Tipo (PF ou PJ)
4. Salva
5. Dashboard mostra progresso (% atingido baseado em saldo disponível)

---

## Technical Approach

### Stack

- **Frontend:** Next.js 14 (App Router), React Server Components
- **Styling:** Tailwind CSS + shadcn/ui
- **Tema:** next-themes (Light Mode como padrão, suporte a Dark Mode)
- **Backend:** Supabase (Auth, Database, Storage, Row Level Security)
- **Database:** PostgreSQL (via Supabase)
- **Charts:** Recharts
- **Icons:** Lucide React
- **Infra:** Vercel (frontend), Supabase (backend)

### Arquitetura

```
[Browser]
   ↓
[Next.js App (Vercel)]
   ↓
[Supabase Client SDK]
   ↓
[Supabase (Auth + Postgres + RLS)]
   ↓
[User's Supabase Account]
```

**Fluxo de Dados:**
- Usuário faz ação no frontend (ex: lançar transação)
- Next.js envia request via Supabase Client
- Supabase valida auth + aplica Row Level Security
- Dados são salvos no Postgres do Supabase
- Frontend recebe confirmação e atualiza UI

**Importante:** Cada usuário usa sua própria conta Supabase. Não há servidor central nosso. Zero lock-in.

### Integrações

- ✅ Supabase Auth (email/senha + recuperação)
- ✅ Supabase Database (Postgres + RLS)
- ✅ Supabase Storage (futuro: para anexos)
- ❌ Open Banking (futuro)
- ❌ WhatsApp API (futuro: alertas)

### Constraints

- **Client-side first:** Minimizar lógica server-side
- **Self-hosted:** Usuário controla 100% da infraestrutura
- **Zero lock-in:** Se usuário não renovar suporte, sistema continua funcionando
- **Mobile-web only:** Não haverá app nativo no MVP
- **Sem pagamentos integrados:** Checkout acontece fora do sistema

---

## Database Schema (Supabase Postgres)

### Tabelas Principais

#### `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  license_name TEXT,
  license_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `transactions`
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('income', 'expense')),
  category_id UUID REFERENCES categories(id),
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  is_personal BOOLEAN DEFAULT true,
  card_id UUID REFERENCES cards(id),
  installments INT,
  installment_number INT,
  parent_transaction_id UUID REFERENCES transactions(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `categories`
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  is_personal BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `cards`
```sql
CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  last_digits TEXT,
  color TEXT,
  is_personal BOOLEAN DEFAULT true,
  closing_day INT CHECK (closing_day >= 1 AND closing_day <= 31),
  due_day INT CHECK (due_day >= 1 AND due_day <= 31),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `recurring_transactions`
```sql
CREATE TABLE recurring_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('income', 'expense')),
  category_id UUID REFERENCES categories(id),
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  day_of_month INT CHECK (day_of_month >= 1 AND day_of_month <= 31),
  frequency TEXT CHECK (frequency IN ('monthly', 'bimonthly', 'yearly')),
  is_personal BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `goals`
```sql
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_amount DECIMAL(10,2) NOT NULL,
  current_amount DECIMAL(10,2) DEFAULT 0,
  is_personal BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

### Row Level Security (RLS)

Todas as tabelas terão políticas RLS que garantem:

```sql
-- Exemplo para transactions
CREATE POLICY "Users can only see their own transactions"
ON transactions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own transactions"
ON transactions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only update their own transactions"
ON transactions FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can only delete their own transactions"
ON transactions FOR DELETE
USING (auth.uid() = user_id);
```

---

## Design Guidelines

### Estilo Visual

**Referências:** Linear, Resend, Vercel, Clerk, Raycast

**Princípios:**
- Clean e moderno
- Minimalista mas funcional
- Espaçamento generoso
- Microinterações sutis
- Tipografia clara e legível

### Cores

#### Light Mode
- **Primary:** `#2563eb` (blue-600)
- **Background:** `#ffffff`
- **Surface:** `#f9fafb` (gray-50)
- **Border:** `#e5e7eb` (gray-200)
- **Text Primary:** `#111827` (gray-900)
- **Text Secondary:** `#6b7280` (gray-500)
- **Success:** `#10b981` (green-500)
- **Danger:** `#ef4444` (red-500)
- **Warning:** `#f59e0b` (amber-500)

#### Dark Mode
- **Primary:** `#3b82f6` (blue-500)
- **Background:** `#0a0a0a`
- **Surface:** `#171717` (gray-900)
- **Border:** `#262626` (gray-800)
- **Text Primary:** `#fafafa` (gray-50)
- **Text Secondary:** `#a3a3a3` (gray-400)
- **Success:** `#10b981` (green-500)
- **Danger:** `#ef4444` (red-500)
- **Warning:** `#f59e0b` (amber-500)

### Tipografia

- **Font:** Inter (do Google Fonts) ou Geist (se quiser estilo Vercel)
- **Heading 1:** 32px, font-bold
- **Heading 2:** 24px, font-semibold
- **Heading 3:** 20px, font-semibold
- **Body:** 16px, font-normal
- **Small:** 14px, font-normal
- **Tiny:** 12px, font-medium

### Componentes Base (shadcn/ui)

- Button
- Card
- Dialog
- Input
- Select
- Switch
- Tabs
- Badge
- Separator
- Skeleton
- Toast
- Dropdown Menu
- Popover
- Calendar
- Date Picker

---

## Success Metrics

| Métrica | Baseline | Target | Como medir |
|---------|----------|--------|------------|
| **Vendas** | 0 | 50+ | Dashboard Hubla/Cakto |
| **Taxa de Instalação** | 0% | >70% | Pesquisa pós-instalação via Discord |
| **Tempo de Setup** | N/A | <60min | Pesquisa pós-instalação |
| **NPS** | 0 | >8 | Pesquisa após 30 dias de uso |
| **Retenção 30d** | 0% | >60% | Pesquisa + atividade Discord |
| **Tempo de Lançamento** | N/A | <30s | Analytics interno (opcional) |

---

## Risks & Assumptions

### Assumptions

- Freelancers de design realmente se importam com privacidade de dados
- Usuários conseguem instalar o sistema com curso em vídeo
- O argumento de "licença vitalícia" é mais atraente que "mensalidade baixa"
- Designers estão dispostos a pagar R$ 397-797 por uma ferramenta financeira
- Supabase free tier é suficiente para uso individual

### Risks

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Barreira técnica muito alta** | Média | Alto | Curso detalhado + Setup assistido disponível |
| **Argumento de privacidade não ressoa** | Média | Médio | Teste A/B na LP + Pivot para "Clareza Financeira" |
| **Pirataria do código** | Alta | Baixo | Banner na UI + Comunidade exclusiva + Aceitar perda de 5-10% |
| **Suporte não escala** | Média | Médio | Discord comunitário + FAQ robusta |
| **Concorrência de apps gratuitos** | Média | Médio | Foco no diferencial de soberania + estética |

---

## Open Questions

- [ ] Qual a melhor plataforma para hospedar o curso? (Hotmart? Próprio site?)
- [ ] Como automatizar o convite para o GitHub privado após compra?
- [ ] Qual ferramenta usar para comunidade? (Discord? Telegram? Circle?)
- [ ] Como rastrear ativação de licenças sem ferir a privacidade?
- [ ] Devemos oferecer "consultoria de precificação" como upsell?

---

## Appendix

### Referências

- [Linear](https://linear.app) - Dashboard design
- [Resend](https://resend.com) - Clean aesthetics
- [Vercel](https://vercel.com) - Modern aesthetics inspiration (focus on Light Mode)
- [Supabase Docs](https://supabase.com/docs) - Auth + DB setup

### Pesquisas/Entrevistas

- Conversas com designers confirmaram dor de misturar PF/PJ
- Maioria usa planilhas ou não controla nada
- Aversão a apps complexos como Granatum

### Competitors

- **Mobills:** Mensalidade R$ 20/mês, dados ficam com eles, UI datada
- **Organizze:** Mensalidade R$ 15/mês, foco em PF (não separa PJ bem)
- **Granatum:** Muito complexo, voltado para empresas maiores
- **Notion:** Flexível mas precisa criar do zero (leva tempo)
