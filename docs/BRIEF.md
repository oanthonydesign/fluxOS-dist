# Sistema Financeiro PF/PJ - Brief

**Data:** 14 de Fevereiro de 2026  
**Autor:** [Seu Nome]  
**Status:** Building

---

## 💡 Problema

**Em uma frase:**
> Freelancers de design misturam totalmente suas finanças pessoais e empresariais, não sabem quanto realmente entra e sai, e vivem com ansiedade financeira constante.

**Contexto:**
Freelancers que faturam entre R$ 3k-10k/mês têm dinheiro girando, mas zero controle. Eles misturam conta PF com PJ, não sabem se vão ter grana no próximo mês, não têm clareza de metas de faturamento, e usam planilhas caóticas ou simplesmente não controlam nada. O resultado é trabalhar muito e não ver a cor do dinheiro.

---

## ✅ Solução

**Em uma frase:**
> Um sistema financeiro completo que você instala na sua própria infraestrutura, mantendo 100% de controle e privacidade dos seus dados, separando PF de PJ em menos de 2 minutos por dia.

**Como funciona:**
O usuário compra uma licença vitalícia, recebe acesso ao código completo + curso de implementação, instala em sua própria hospedagem (usando Supabase + Vercel), e passa a ter um sistema financeiro bonito, prático e totalmente seu. Sem mensalidades, sem terceiros acessando seus dados, sem dependência de ninguém.

---

## 👤 Público-Alvo

**Persona principal:**
> Designer ou Web Designer freelancer, 25-40 anos, fatura R$ 3k-10k/mês, caótico com finanças, valoriza estética e UX, usa muito o celular, toma decisões por impulso visual, sofre de ansiedade financeira e aversão a planilhas complexas.

**Early adopters:**
> Web Designers que já manjam de hospedagem e GitHub (menor fricção técnica). Posteriormente expandir para copywriters, gestores de tráfego, estrategistas e outros freelancers.

---

## 🎯 Proposta de Valor

**Por que escolher você?**
> O único sistema financeiro onde você é 100% dono dos seus dados. Sem mensalidades ocultas, sem compartilhar informações com terceiros. Você no comando da sua estrutura.

**Alternativas atuais:**
- Planilhas do Google (caóticas, feias, trabalhosas)
- Apps como Mobills/Organizze (mensalidade + seus dados ficam com eles)
- Notion customizado (precisa criar tudo do zero, leva tempo)
- Não controlar nada (maioria atual)

**Seu diferencial:**
- **Visual-First:** Interface bonita, dark mode, gráficos que designers gostam
- **Privacidade Total:** Você entrega o cofre e a chave; ninguém mais tem acesso
- **Fricção Zero:** Input rápido, linguagem prática ("Grana Livre" vs "Ativo/Passivo")
- **Licença Vitalícia:** Paga uma vez, usa para sempre
- **Autonomia Total:** Código aberto para você, customize o quanto quiser

---

## 💰 Modelo de Negócio

**Monetização:**
> Licença vitalícia de uso do código + curso de implementação + atualizações vitalícias + 1 ano de suporte.

**Pricing inicial:**

| Plano | Preço | Target |
|-------|-------|--------|
| **DIY (Faça Você Mesmo)** | R$ 397 (12x R$ 33,08) | Web designers que manjam de hospedagem |
| **Setup Assistido** | R$ 597 (12x R$ 49,75) | Designers que querem facilidade |
| **White Glove** | R$ 797 (12x R$ 66,42) | Quem quer onboarding personalizado |

---

## 📊 Métricas de Sucesso

**North Star Metric:**
> Número de licenças ativas em uso contínuo (medido por atividade no Discord + pesquisas de follow-up)

**Metas iniciais (primeiros 90 dias):**
- [ ] 50+ vendas realizadas
- [ ] Taxa de sucesso de instalação >70%
- [ ] Retenção de uso >60% após 30 dias
- [ ] NPS >8 entre os primeiros usuários

---

## 🚀 MVP Scope

**O que entra:**
- Separação PF / PJ com toggle
- Dashboard financeiro (saldo, entradas, saídas, previsão, contas fixas)
- Lançamentos (entradas/saídas à vista ou parceladas)
- Categorias customizáveis
- Contas fixas/recorrentes
- Gestão de cartões (PF e PJ)
- Metas financeiras
- Gráficos de entradas vs saídas
- Light mode + Dark mode
- Proteção de licença (banner + watermark)

**O que NÃO entra:**
- Relatórios em PDF
- Múltiplos usuários/compartilhamento
- Integração bancária (Open Banking)
- Anexo de notas fiscais
- Sistema de pagamento integrado
- Alertas automáticos por WhatsApp/Email

---

## 🛠 Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 14 + shadcn/ui |
| Backend | Supabase (Auth + DB + Storage) |
| Database | PostgreSQL (via Supabase) |
| Styling | Tailwind CSS |
| Theme | next-themes (light/dark) |
| Charts | Recharts |
| Deploy | Vercel |
| Pagamentos | Hubla ou Cakto (externo) |

---

## ⏱ Timeline

| Marco | Prazo |
|-------|-------|
| MVP pronto | A definir |
| Beta fechado (10 usuários) | A definir |
| Lançamento público | A definir |
| Primeiras 50 vendas | A definir |

---

## ❓ Hipóteses a Validar

1. [ ] Freelancers de design realmente sofrem com falta de clareza PF/PJ (validar por taxa de conversão >3%)
2. [ ] O argumento de "Soberania de Dados" ressoa com o público (validar por tempo na página >2min)
3. [ ] Designers conseguem instalar o sistema sozinhos com o curso (validar por taxa de sucesso >70%)
4. [ ] Estão dispostos a pagar R$ 397-797 por licença vitalícia (validar por vendas efetivas)
5. [ ] Continuam usando após 30 dias (validar por pesquisa + Discord)

---

## 🔗 Links

- Repo: [Link do GitHub privado]
- Docs: [Link da documentação]
- Landing Page: [Link da LP]
- Área de Membros: [Link pós-compra]
- Discord: [Link da comunidade]

---

## 📝 Notas

- O sistema NÃO tem checkout integrado. Venda acontece externamente (Hubla/Cakto)
- Cada usuário instala em sua própria infraestrutura (Supabase + Vercel)
- Modelo é vitalício (não há renovação), mas suporte é de 1 ano
- Proteção contra pirataria: banner na UI + watermark no código + comunidade exclusiva
- Foco inicial em web designers (menor fricção técnica), depois expandir para outros freelancers
