# Sistema Financeiro PF/PJ - MVP Scope

**Data:** 14 de Fevereiro de 2026  
**Versão:** 1.0

---

## Visão do MVP

**Em uma frase, o que o MVP faz?**

> Um sistema financeiro self-hosted que permite freelancers separarem finanças pessoais de empresariais, controlarem gastos, cartões, metas e contas fixas, mantendo 100% de privacidade dos dados.

**Qual hipótese estamos testando?**

> Freelancers de design estão dispostos a pagar R$ 397-797 por uma licença vitalícia de um sistema financeiro que eles controlam totalmente, e conseguem instalá-lo com curso em vídeo.

**Como saberemos que funcionou?**

> 50+ vendas nos primeiros 90 dias + taxa de instalação bem-sucedida >70% + retenção de uso >60% após 30 dias.

---

## Escopo: O que ENTRA

### Must Have (P0) - Sem isso não lança

| Feature | Descrição | Critério de Done |
|---------|-----------|------------------|
| **Autenticação** | Login e cadastro via Supabase Auth (email + senha) | Usuário consegue criar conta, fazer login, recuperar senha |
| **Toggle PF/PJ** | Switch no header para alternar entre visão Pessoal e Empresarial | Ao clicar no toggle, todo o dashboard muda para mostrar dados PF ou PJ |
| **Dashboard Financeiro** | Tela principal com cards de: Saldo Atual, Total Entradas do Mês, Total Saídas do Mês, Saldo Previsto, Próximas Contas Fixas | Cards renderizam corretamente com valores calculados do banco |
| **Lançamentos (CRUD)** | Criar, editar, deletar transações (entradas/saídas) com: descrição, valor, data, categoria, cartão (opcional), parcelamento | Usuário consegue registrar gasto em <30s, editar e excluir |
| **Categorias Customizáveis** | CRUD completo de categorias (nome, ícone, cor, tipo PF/PJ) | Usuário cria categoria nova, ela aparece no select de lançamentos |
| **Contas Fixas/Recorrentes** | Cadastrar gastos/receitas que se repetem (ex: aluguel, Netflix) com dia do mês e frequência | Sistema lança automaticamente a conta no dia definido |
| **Gestão de Cartões** | CRUD de cartões (nome, últimos 4 dígitos, cor, dia fechamento, dia vencimento, tipo PF/PJ) | Usuário cadastra cartão e associa gastos a ele |
| **Fatura de Cartão** | Ver lista de gastos do cartão no mês atual | Ao clicar no cartão, mostra todos os gastos associados |
| **Parcelamentos** | Ao lançar gasto parcelado, sistema cria N transações futuras automaticamente | Gasto de R$ 1.200 em 12x cria 12 registros (um por mês) |
| **Metas Financeiras** | CRUD de metas (nome, valor alvo, tipo PF/PJ) com barra de progresso | Usuário cria meta, sistema calcula % baseado em saldo disponível |
| **Gráfico Entradas vs Saídas** | Gráfico de barras/linha mostrando evolução mensal | Gráfico renderiza com dados reais do usuário |
| **Lista de Próximas Contas** | Lista ordenada por data das contas a pagar/receber | Mostra próximos 5-10 lançamentos futuros |
| **Light Mode + Dark Mode** | Toggle de tema no header | Ao clicar, todo o sistema muda para tema escuro/claro |
| **Proteção de Licença** | Banner fixo no rodapé com: "Licenciado para: [Nome] ([Email]) - Licença #[ID]" | Banner visível em todas as páginas, não removível via UI |
| **Watermark no Código** | Comentário no topo de cada arquivo principal com dados da licença | Ao abrir qualquer arquivo .tsx/.ts, comentário está presente |

### Should Have (P1) - Importante, mas pode esperar v1.1

| Feature | Descrição | Por que não é P0 |
|---------|-----------|------------------|
| **Filtros Avançados** | Filtrar transações por data, categoria, cartão, tipo | Usuário consegue viver sem isso no início, pode buscar manualmente |
| **Exportar CSV** | Baixar relatório de transações em CSV | Não é crítico para validação inicial |
| **Relatórios PDF** | Gerar PDF com resumo financeiro do mês | Feature "nice to have", não bloqueia uso |
| **Notificações In-App** | Toast/notificação quando conta fixa é lançada automaticamente | Usuário vai ver no dashboard de qualquer forma |
| **Busca de Transações** | Campo de busca para encontrar lançamentos por descrição | Lista é pequena no início, dá pra scrollar |
| **Histórico de Alterações** | Log de quem editou/deletou transação (audit log) | Útil, mas usuário é único (no MVP), não é crítico |

### Could Have (P2) - Nice to have

| Feature | Descrição | Quando considerar |
|---------|-----------|-------------------|
| **Anexo de Comprovantes** | Upload de nota fiscal/recibo na transação | Depois de validar que pessoas usam o sistema |
| **Tags Customizadas** | Adicionar tags livres às transações | Categorias já resolvem 80% do uso |
| **Dashboard de Análise** | Gráficos avançados (pizza de gastos por categoria, etc) | Após MVP, quando tiver dados suficientes |
| **Modo Contador** | Exportar dados no formato que contador precisa | Futuro, quando tiver usuários pedindo |
| **Multi-moeda** | Suporte a USD, EUR | Público inicial é 100% Brasil |

---

## Escopo: O que NÃO ENTRA

### Explicitamente Fora do MVP

| Feature | Por que não entra | Quando reconsiderar |
|---------|-------------------|---------------------|
| **Integração Bancária (Open Banking)** | Complexidade alta, requer homologação, foge do escopo de "privacidade total" | V2.0, se usuários pedirem muito |
| **Múltiplos Usuários** | Adiciona complexidade de permissões, roles, compartilhamento | V1.1, quando tiver demanda de sócios compartilharem |
| **Mobile App Nativo** | Requer desenvolvimento iOS/Android, dobra o trabalho | Futuro, se web responsivo não for suficiente |
| **Sistema de Pagamento Integrado** | Checkout acontece fora (Hubla/Cakto), não há mensalidade | Nunca, não faz parte do modelo |
| **Alertas por WhatsApp/Email** | Requer integração com APIs externas, complexidade de infra | V1.2, após validar que pessoas querem |
| **Importação de CSV/Excel** | Edge cases complexos, dados bagunçados | V1.1, se houver demanda |
| **Reconciliação Bancária** | Matching automático de transações com extrato | V2.0, se integrar com Open Banking |
| **Fluxo de Caixa Projetado** | Previsão de 6+ meses à frente | V1.2, após ter dados suficientes |
| **Onboarding Interativo** | Tour guiado, tooltips, gamificação | Não essencial, curso em vídeo já ensina |
| **API Pública** | Permitir integrações externas | V2.0, se houver demanda |

### Tentações Comuns a Evitar

- [ ] Múltiplos tipos de usuário (foque em freelancer solo)
- [ ] Dashboard de admin elaborado (não há "admin", cada um usa o seu)
- [ ] Analytics avanços (Google Analytics básico já resolve)
- [ ] Múltiplas integrações (Supabase já resolve tudo)
- [ ] Multi-tenancy complexo (cada usuário tem seu próprio Supabase)
- [ ] Internacionalização (i18n) (público inicial é BR)
- [ ] Marketplace/plugins (over-engineering)
- [ ] Billing complexo (não há billing recorrente no sistema)

---

## Decisões de Simplificação

### Autenticação

- ✅ Email + senha via Supabase Auth
- ✅ Recuperação de senha
- ❌ OAuth (Google, GitHub) - pode adicionar depois
- ❌ 2FA - não crítico no MVP
- ❌ Magic link - email + senha já resolve

### Billing

- ✅ Não há billing no sistema (venda externa via Hubla/Cakto)
- ✅ Licença vitalícia (paga uma vez)
- ❌ Checkout integrado
- ❌ Assinaturas recorrentes
- ❌ Trial gratuito dentro do app

### UI/UX

- ✅ Light mode + Dark mode
- ✅ Desktop-first, mas responsivo para mobile
- ✅ shadcn/ui default styling (sem customização pesada)
- ❌ Onboarding elaborado (curso em vídeo já ensina)
- ❌ Animações complexas (só microinterações sutis)

### Features

- ✅ CRUD básico primeiro (criar, ler, editar, deletar)
- ✅ Parcelamentos (automático)
- ✅ Contas fixas (lançamento automático)
- ❌ Bulk actions (selecionar múltiplos e deletar de uma vez)
- ❌ Export/import
- ❌ Histórico/versioning
- ❌ Real-time (polling a cada 5s é suficiente)

---

## Personas no MVP

### Persona Principal (foco total)

**Nome:** João - Web Designer Caótico

**Quem é:** Freelancer de web design, 32 anos, fatura R$ 7k/mês, usa múltiplos cartões, mistura PF e PJ, esquece de lançar gastos, ansiedade financeira.

**Job to be Done:** Ter clareza de quanto realmente sobra no fim do mês, sem depender de planilhas caóticas.

**Por que ele vai amar:** Interface bonita, rápido de usar, dados só dele, paga uma vez.

### Personas FORA do MVP

| Persona | Por que não agora |
|---------|-------------------|
| **Designer Gráfico Puro** | Barreira técnica muito alta (não manja de hospedagem). Entra na V1.1 com setup assistido mais robusto. |
| **Freelancer de outras áreas** | Focar em design primeiro para validar, depois expandir para copywriters, gestores, etc. |
| **Agência com sócios** | Multi-usuário não entra no MVP. |
| **Empresas médias/grandes** | Fora do escopo, produto é para freelancers solo. |

---

## Fluxos Críticos

### Fluxo 1: Primeira Instalação e Configuração

```
1. Usuário compra licença (Hubla/Cakto)
2. Recebe email com acesso à área de membros
3. Assiste curso: "Como criar conta no Supabase"
4. Cria projeto no Supabase, copia credenciais
5. Assiste curso: "Como clonar o repositório"
6. Clona repo do GitHub privado
7. Assiste curso: "Como configurar variáveis de ambiente"
8. Cria arquivo .env.local com credenciais Supabase
9. Assiste curso: "Como fazer deploy na Vercel"
10. Conecta Vercel ao repo, deploy automático
11. Acessa URL do Vercel pela primeira vez
12. Cria conta (email + senha)
13. Sistema pede: Nome do licenciado, Email, ID da licença
14. Salva, banner de licença aparece no rodapé
15. Dashboard vazio é exibido
16. [Sistema pronto para uso]
```

### Fluxo 2: Lançar Gasto Simples

```
1. Usuário está no Dashboard (PF ou PJ selecionado via toggle)
2. Clica em botão "+ Nova Transação" (fixo no canto)
3. Modal abre com formulário
4. Seleciona: Tipo = Saída
5. Preenche: Descrição = "Supermercado"
6. Preenche: Valor = 150.00
7. Preenche: Data = hoje
8. Seleciona: Categoria = Alimentação
9. [Opcional] Seleciona: Cartão = Nubank
10. Deixa "Parcelado?" = Não
11. Clica em "Salvar"
12. Modal fecha
13. Dashboard atualiza: Total Saídas aumenta, Saldo Atual diminui
14. [Transação salva em <30 segundos]
```

### Fluxo 3: Lançar Gasto Parcelado

```
1. Usuário clica "+ Nova Transação"
2. Seleciona: Tipo = Saída
3. Descrição = "MacBook Pro"
4. Valor = 12.000
5. Data = hoje
6. Categoria = Equipamentos
7. Cartão = Itaú Empresarial (PJ)
8. Marca "Parcelado?" = Sim
9. Quantidade de parcelas = 12
10. Clica "Salvar"
11. Sistema cria 12 transações:
    - Parcela 1/12: hoje, R$ 1.000
    - Parcela 2/12: +1 mês, R$ 1.000
    - ...
    - Parcela 12/12: +11 meses, R$ 1.000
12. Todas linkadas à transação original (parent_transaction_id)
13. Dashboard mostra: próximas parcelas na lista de "Contas a Pagar"
14. [Parcelamento configurado]
```

### Fluxo 4: Configurar Conta Fixa

```
1. Usuário vai em menu lateral: "Contas Fixas"
2. Vê lista (vazia inicialmente)
3. Clica "+ Nova Conta Fixa"
4. Preenche:
   - Nome: Aluguel
   - Valor: 1.500
   - Dia do mês: 10
   - Tipo: Saída
   - Categoria: Moradia
   - Frequência: Mensal
   - PF ou PJ: Pessoal
5. Salva
6. Sistema agenda: todo dia 10, criar transação de R$ 1.500
7. [Primeira execução: no dia 10 do mês atual, transação é criada automaticamente]
8. Usuário vê no dashboard: Aluguel aparece em "Próximas Contas"
9. [Conta fixa configurada]
```

### Fluxo 5: Criar Meta

```
1. Usuário vai em "Metas" (PF ou PJ)
2. Clica "+ Nova Meta"
3. Preenche:
   - Nome: Comprar Carro
   - Valor alvo: 50.000
   - Tipo: Pessoal
4. Salva
5. Sistema calcula progresso:
   - Saldo disponível PF: R$ 8.000
   - Progresso: 16% (8.000 / 50.000)
6. Card da meta mostra:
   - Nome: Comprar Carro
   - Barra de progresso: 16%
   - Faltam: R$ 42.000
7. [Meta criada, visível no dashboard]
```

---

## Stack do MVP

### Escolhas Definitivas

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| **Frontend** | Next.js 14 (App Router) | Performance, SEO, Server Components, DX |
| **Styling** | Tailwind CSS | Velocidade de desenvolvimento, consistência |
| **Componentes** | shadcn/ui | Componentes prontos, customizáveis, estilo moderno |
| **Tema** | next-themes | Dark mode fácil e performático |
| **Backend** | Supabase | Auth + DB + Storage + RLS em um só lugar |
| **Database** | PostgreSQL (via Supabase) | Relacional, robusto, free tier generoso |
| **Auth** | Supabase Auth | Email/senha + recuperação, zero config |
| **Charts** | Recharts | Leve, responsivo, fácil de usar |
| **Icons** | Lucide React | Ícones modernos, consistentes |
| **Deploy** | Vercel | Zero config, preview automático, Edge |
| **Pagamentos** | Hubla ou Cakto | Checkout externo (fora do sistema) |

### O que NÃO usar (complexidade desnecessária)

- ❌ GraphQL (REST via Supabase já resolve)
- ❌ State management complexo (Zustand/Redux) - React state + Server Components ok
- ❌ Micro-frontends (over-engineering)
- ❌ Kubernetes (Vercel resolve tudo)
- ❌ Multiple databases (Postgres resolve)
- ❌ Message queues (RabbitMQ, Kafka) - não há processamento assíncrono pesado
- ❌ Microservices (monolito modular já resolve)

---

## Definition of Done (MVP)

O MVP está pronto quando:

- [x] Todas as features P0 funcionando (ver tabela "Must Have")
- [x] Fluxos críticos testados (1 a 5 acima)
- [x] Deploy em produção (Vercel) funcionando
- [x] Supabase configurado com RLS em todas as tabelas
- [x] Light mode + Dark mode funcionando
- [x] Responsivo (desktop + mobile web)
- [x] Banner de licença visível e não removível
- [x] Watermark no código presente
- [x] Pelo menos 1 usuário real usando (beta tester)
- [x] Curso de instalação gravado e disponível
- [x] Landing page no ar com checkout funcionando
- [x] Métricas de sucesso rastreáveis (analytics básico)

---

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Scope creep** | Alta | Alto | Revisar este doc semanalmente, recusar features "nice to have" |
| **Barreira técnica de instalação** | Média | Alto | Curso detalhado + Setup assistido disponível por + R$ 200 |
| **Tech debt** | Média | Médio | Aceitar para MVP, documentar no código o que precisa refatorar depois |
| **Supabase free tier estourar** | Baixa | Baixo | Cada usuário usa seu próprio Supabase, problema é dele não nosso |
| **Pirataria do código** | Alta | Baixo | Banner + Watermark + Comunidade exclusiva. Aceitar 5-10% de perda. |
| **Usuário não consegue instalar sozinho** | Média | Médio | Oferecer Setup Assistido. Gravar curso muito detalhado. |

---

## Hipóteses a Validar

| Hipótese | Como validar | Sucesso = |
|----------|--------------|-----------|
| **Pessoas têm esse problema** | Taxa de conversão da LP | >3% de visitantes compram |
| **Nossa solução resolve** | Retenção de uso | >60% ainda usam após 30 dias |
| **Pagariam por isso** | Vendas efetivas | 50+ vendas nos primeiros 90 dias |
| **Conseguem instalar** | Pesquisa pós-setup | >70% conseguem sozinhos |
| **Argumento de privacidade ressoa** | Tempo na LP + Heatmap | >2min de tempo médio na página |

---

## Próximos Passos Pós-MVP

Depois de validar o MVP (50+ vendas, 60%+ retenção), considerar:

### V1.1 (Primeiros 3 meses pós-lançamento)

1. [ ] Filtros avançados de transações
2. [ ] Exportar CSV
3. [ ] Busca de transações
4. [ ] Notificações in-app
5. [ ] Relatórios PDF básicos

### V1.2 (3-6 meses pós-lançamento)

1. [ ] Anexo de comprovantes (upload de arquivos)
2. [ ] Dashboard de análise (gráficos avançados)
3. [ ] Tags customizadas
4. [ ] Alertas por email (opcional)

### V2.0 (6-12 meses pós-lançamento)

1. [ ] Múltiplos usuários (compartilhar com sócio/contador)
2. [ ] Integração com Open Banking (se houver demanda)
3. [ ] Mobile app nativo
4. [ ] Fluxo de caixa projetado
5. [ ] API pública

---

## Regra de Ouro

Quando em dúvida se algo entra no MVP, pergunte:

> **"Posso validar minha hipótese principal SEM essa feature?"**

Se sim → Não entra no MVP. Vai para V1.1.

---

## Checklist Pré-Lançamento

### Funcionalidades

- [ ] Auth funcionando (login, cadastro, recuperação)
- [ ] Toggle PF/PJ mudando todo o dashboard
- [ ] Dashboard mostrando dados reais do usuário
- [ ] CRUD de transações funcionando
- [ ] CRUD de categorias funcionando
- [ ] CRUD de cartões funcionando
- [ ] CRUD de contas fixas funcionando
- [ ] CRUD de metas funcionando
- [ ] Parcelamentos criando transações futuras
- [ ] Contas fixas lançando automaticamente (testar com cron job)
- [ ] Gráficos renderizando
- [ ] Lista de próximas contas ordenada por data
- [ ] Dark mode funcionando
- [ ] Banner de licença visível e persistente

### Técnico

- [ ] RLS configurado em todas as tabelas
- [ ] .env.example documentado
- [ ] README.md com instruções de instalação
- [ ] Deploy na Vercel funcionando
- [ ] Supabase migrations documentadas
- [ ] Sem dados hardcoded (tudo vem do banco)
- [ ] Tratamento de erros básico (try/catch, toast de erro)

### Curso de Instalação

- [ ] Vídeo 1: Criar conta no Supabase
- [ ] Vídeo 2: Clonar repositório do GitHub
- [ ] Vídeo 3: Configurar .env.local
- [ ] Vídeo 4: Rodar migrations no Supabase
- [ ] Vídeo 5: Deploy na Vercel
- [ ] Vídeo 6: Configurar licença no sistema
- [ ] Vídeo 7: Tour pelo sistema (opcional)

### Landing Page

- [ ] Headline clara
- [ ] CTA visível
- [ ] Precificação transparente
- [ ] FAQ respondendo objeções
- [ ] Checkout externo funcionando (Hubla/Cakto)
- [ ] Área de membros configurada

### Suporte

- [ ] Discord criado
- [ ] Canal de #suporte
- [ ] Canal de #instalacao
- [ ] FAQ básica documentada
- [ ] Email de suporte configurado
