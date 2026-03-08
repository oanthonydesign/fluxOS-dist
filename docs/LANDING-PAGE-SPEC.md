# Sistema Financeiro PF/PJ - Landing Page Specification

**Data:** 14 de Fevereiro de 2026  
**Versão:** 1.0

---

## Objetivo da Landing Page

Converter visitantes (freelancers de design) em compradores da licença, comunicando claramente:

1. **Privacidade de dados** como diferencial principal
2. **Clareza financeira PF/PJ** como benefício imediato
3. **Licença vitalícia** como vantagem competitiva
4. **Facilidade de instalação** para reduzir fricção

---

## Estrutura Completa

### Ordem das Seções

1. **Header/Nav**
2. **Hero**
3. **Problem**
4. **Solution**
5. **Features**
6. **How it Works**
7. **Pricing**
8. **Testimonials** (se houver)
9. **FAQ**
10. **CTA Final**
11. **Footer**

---

## 1. HEADER/NAV

### Objetivo
Navegação limpa sem distrair do CTA principal.

### Elementos

**Esquerda:**
- Logo + Nome do produto

**Direita:**
- Links: "Features" | "Como Funciona" | "Preços" | "FAQ"
- Botão primário: "Garantir Licença" (destaque visual)

### Diretrizes de Layout

- Nav sticky ao scrollar
- Transparente no hero, fundo sólido após scroll
- Mobile: Menu hamburguer
- Max 4-5 links (não sobrecarregar)

### Estilo

- Minimalista, sem mega menus
- Logo pequeno e discreto
- CTA com background colorido (ex: bg-blue-600)
- Altura do header: 64px

---

## 2. HERO

### Objetivo
Capturar atenção e comunicar valor em 5 segundos.

### Elementos Obrigatórios

**Headline (H1):**
> "Seus dados financeiros são SEUS. Sem terceiros, sem mensalidades escondidas, sem ninguém vendendo seus dados."

**Subheadline (H3):**
> "Separe sua vida Pessoal da Profissional e tenha clareza do caixa em menos de 2 minutos por dia."

**CTA Primário:**
- Texto: "Garantir Minha Licença Vitalícia"
- Ação: Scroll suave para seção de Pricing

**CTA Secundário (opcional):**
- Texto: "Ver Como Funciona"
- Ação: Scroll para seção "How it Works"

**Visual:**
- Screenshot do dashboard (light mode)
- Ou: Animação sutil mostrando toggle PF/PJ
- Ou: Video demo curto (15-30s)

**Badge/Trust Indicator (opcional):**
- "Licença Vitalícia - Pague uma vez, use para sempre"
- "Dados 100% seus - Zero terceiros"

### Diretrizes de Layout

- Full viewport height (min-h-screen)
- Grid 2 colunas (desktop): Texto esquerda, Visual direita
- Mobile: Stack vertical (texto em cima, visual embaixo)
- Headline: Large (text-5xl), bold, destaque
- Subheadline: Medium (text-xl), cor muted
- CTA: Grande, impossível de perder
- Visual: Screenshot com sombra sutil ou border radius

### Estilo

- Background: Gradiente sutil (ex: de white para gray-50)
- Headline: Cor primária ou texto escuro
- Spacing generoso entre elementos
- Animação de entrada sutil (fade-in)

---

## 3. PROBLEM

### Objetivo
Gerar identificação - "isso sou eu!"

### Elementos

**Headline:**
> "Se você é freelancer e sente isso, você não está sozinho:"

**Problemas (3-4 cards):**

1. **Caos Financeiro**
   - Descrição: "Você mistura sua conta pessoal com a da empresa e não sabe o que é seu vs do negócio."
   - Ícone: Icon de confusion/chaos

2. **Ansiedade Constante**
   - Descrição: "Trabalha muito mas não sabe se vai ter grana no fim do mês. Vive no escuro."
   - Ícone: Icon de stress/anxiety

3. **Planilhas Caóticas**
   - Descrição: "Tentou usar Excel mas virou uma bagunça impossível de manter. Ou simplesmente desistiu."
   - Ícone: Icon de spreadsheet/mess

4. **Dados nas Mãos de Terceiros**
   - Descrição: "Apps que pedem todos os seus dados financeiros. Onde eles vão parar? Ninguém sabe."
   - Ícone: Icon de lock/security

### Diretrizes de Layout

- Grid 2x2 ou 4 colunas (desktop)
- Mobile: Stack vertical
- Cada card: Ícone no topo, título, descrição curta
- Cards com border sutil, padding generoso
- Hover: Leve elevação (shadow)

### Estilo

- Background: Branco ou gray-50
- Cards: Fundo branco, border gray-200
- Ícones: Cor primária ou muted
- Texto: Direto ao ponto, linguagem do usuário

---

## 4. SOLUTION

### Objetivo
Apresentar a solução como resposta direta aos problemas.

### Elementos

**Headline:**
> "A solução: Um sistema financeiro que é 100% seu."

**Descrição:**
> "Imagine ter um sistema completo de controle financeiro instalado na sua própria estrutura. Seus dados ficam apenas com você. Sem mensalidades escondidas. Sem empresas espionando suas finanças. Você no controle total."

**Visual:**
- Screenshot grande do dashboard
- Ou: Animação mostrando separação PF/PJ
- Ou: Diagrama mostrando "Seus dados → Seu servidor → Zero terceiros"

**CTA (opcional):**
- "Quero Ter Meu Sistema"

### Diretrizes de Layout

- Grid 2 colunas: Texto esquerda, Visual direita (ou vice-versa)
- Mobile: Stack vertical
- Visual deve ser grande e impactante
- Espaço em branco generoso

### Estilo

- Background: Gradiente sutil ou cor sólida diferente do Problem
- Headline: Bold, grande
- Screenshot: Sombra suave, border radius
- Texto: Parágrafo curto, legível

---

## 5. FEATURES

### Objetivo
Detalhar o que o produto faz, focando em benefícios.

### Elementos

**Headline:**
> "Tudo o que você precisa para ter clareza financeira total."

**Features (6-8 principais):**

1. **Separação PF / PJ**
   - Descrição: "Toggle simples para alternar entre visão Pessoal e Empresarial. Nunca mais misture."
   - Ícone: Toggle switch
   - Visual: Screenshot do toggle

2. **Lançamentos em Segundos**
   - Descrição: "Registre entradas e saídas em menos de 30 segundos. À vista ou parcelado."
   - Ícone: Zap/lightning
   - Visual: GIF do modal de lançamento

3. **Gestão de Cartões**
   - Descrição: "Cadastre todos os seus cartões (PF e PJ), acompanhe faturas e parcelamentos."
   - Ícone: Credit card
   - Visual: Screenshot da lista de cartões

4. **Contas Fixas Automáticas**
   - Descrição: "Configure aluguel, Netflix, contador uma vez. Sistema lança automaticamente todo mês."
   - Ícone: Repeat/refresh
   - Visual: Screenshot de contas fixas

5. **Metas Financeiras**
   - Descrição: "Defina metas (ex: comprar MacBook) e acompanhe progresso em tempo real."
   - Ícone: Target
   - Visual: Screenshot da barra de progresso

6. **Gráficos Claros**
   - Descrição: "Visualize entradas vs saídas, evolução mensal, previsão de caixa."
   - Ícone: Chart/graph
   - Visual: Screenshot dos gráficos

7. **Dark Mode**
   - Descrição: "Interface linda em modo claro ou escuro. Você escolhe."
   - Ícone: Moon/sun
   - Visual: Screenshot do dark mode

8. **100% Privado**
   - Descrição: "Seus dados ficam no SEU servidor (Supabase). Ninguém mais tem acesso."
   - Ícone: Lock/shield
   - Visual: Diagrama ou ícone grande

### Diretrizes de Layout

**Opção 1: Alternating (recomendado)**
- Feature 1: Texto esquerda, Visual direita
- Feature 2: Visual esquerda, Texto direita
- Feature 3: Texto esquerda, Visual direita
- E assim por diante...

**Opção 2: Grid de Cards**
- Grid 2x4 ou 3x3
- Cada card: Ícone, Título, Descrição curta
- Sem screenshots (só ícones)

### Estilo

- Background: Alterna entre branco e gray-50 (para cada feature)
- Ícones: Tamanho médio (24-32px), cor primária
- Headlines de feature: text-2xl, bold
- Descrições: text-base, muted
- Screenshots: Sombra sutil, border radius

---

## 6. HOW IT WORKS

### Objetivo
Mostrar que é simples de usar, reduzir fricção.

### Elementos

**Headline:**
> "Como funciona? Simples em 3 passos."

**Steps:**

**Step 1: Compre a Licença**
- Descrição: "Escolha seu plano (DIY, Setup Assistido ou White Glove) e finalize o pagamento."
- Ícone: Shopping cart
- Visual: Ícone ou número "1"

**Step 2: Instale em Minutos**
- Descrição: "Assista o curso passo-a-passo e instale o sistema na sua própria estrutura (Supabase + Vercel). Ou deixa com a gente!"
- Ícone: Rocket/deploy
- Visual: Ícone ou número "2"

**Step 3: Tenha Controle Total**
- Descrição: "Comece a lançar transações, separar PF/PJ e ter clareza financeira. Para sempre."
- Ícone: Check/success
- Visual: Ícone ou número "3"

### Diretrizes de Layout

- Horizontal (3 colunas) desktop
- Vertical (stack) mobile
- Cards numerados (1, 2, 3)
- Setas entre os steps (opcional)

### Estilo

- Background: Cor de destaque (ex: blue-50 ou gray-100)
- Cards: Fundo branco, sombra leve
- Números: Grande, bold, cor primária
- Texto: Conciso, direto

---

## 7. PRICING

### Objetivo
Mostrar valor e converter.

### Elementos

**Headline:**
> "Escolha seu plano. Pague uma vez, use para sempre."

**Subheadline:**
> "Sem mensalidades. Sem renovações. Sem pegadinhas."

**Planos (3 cards):**

**Plano 1: DIY (Faça Você Mesmo)**
- Preço: R$ 397
- Ou 12x de R$ 33,08
- Badge: Nenhum
- Inclui:
  - ✅ Código completo (GitHub privado)
  - ✅ Curso de instalação em vídeo
  - ✅ Atualizações vitalícias
  - ✅ 1 ano de suporte
  - ✅ Acesso ao Discord VIP
- CTA: "Começar Agora"

**Plano 2: Setup Assistido** ⭐ RECOMENDADO
- Preço: R$ 597
- Ou 12x de R$ 49,75
- Badge: "Mais Popular"
- Inclui:
  - ✅ Tudo do DIY
  - ✅ A gente instala pra você
  - ✅ Reunião de 30min para setup
- CTA: "Quero Ajuda na Instalação"

**Plano 3: White Glove**
- Preço: R$ 797
- Ou 12x de R$ 66,42
- Badge: Nenhum
- Inclui:
  - ✅ Tudo do Setup Assistido
  - ✅ 1 hora de onboarding personalizado
  - ✅ Suporte prioritário
- CTA: "Quero VIP"

**Nota embaixo:**
- "💳 Parcelamento em até 12x sem juros"
- "🔒 Compra 100% segura via [Hubla/Cakto]"
- "✉️ Dúvidas? Fale conosco"

### Diretrizes de Layout

- 3 colunas desktop, stack mobile
- Plano recomendado: Maior, destacado, badge no topo
- Cards: Padding generoso, border radius
- Lista de features: Checkmarks verdes
- CTA: Um por card, cor diferente para o recomendado

### Estilo

- Background: Branco ou gray-50
- Cards: Fundo branco, border sutil
- Plano recomendado: Border azul, leve shadow, badge azul
- Preços: Grande (text-4xl), bold
- CTAs: Full width nos cards

---

## 8. TESTIMONIALS

### Objetivo
Prova social (se houver depoimentos de beta testers).

### Elementos

**Headline:**
> "O que dizem os primeiros usuários:"

**Depoimentos (2-3):**

Cada depoimento contém:
- Quote (1-2 frases)
- Nome
- Cargo/Área (ex: "Web Designer Freelancer")
- Foto (opcional, mas recomendado)

**Exemplo:**
> "Finalmente consigo separar minha conta PF da PJ sem planilhas caóticas. Valeu cada centavo!"
> — João Silva, Web Designer

### Diretrizes de Layout

- Grid 2-3 colunas desktop
- Cards com quote, nome, cargo, foto
- Foto circular no topo ou ao lado

### Estilo

- Background: Branco ou gray-50
- Cards: Fundo branco, border sutil
- Quote: Itálico, aspas grandes
- Fotos: Circular, 64px

**Se não tiver depoimentos ainda:** Pule esta seção ou substitua por "Logos de ferramentas usadas" (Supabase, Vercel, Next.js).

---

## 9. FAQ

### Objetivo
Eliminar objeções e dúvidas finais.

### Elementos

**Headline:**
> "Perguntas frequentes"

**Perguntas (6-8):**

1. **Preciso saber programar para usar?**
   - "Não! O curso ensina passo-a-passo como instalar. E se preferir, temos o plano Setup Assistido onde fazemos isso pra você."

2. **Meus dados ficam onde?**
   - "No SEU servidor Supabase. Você cria a conta, você controla. Nós não temos acesso a nada."

3. **Tem mensalidade?**
   - "Não! É licença vitalícia. Paga uma vez, usa para sempre. Atualizações são gratuitas. Suporte é de 1 ano."

4. **Funciona no celular?**
   - "Sim! É responsivo e funciona no navegador do celular. Não é app nativo, mas funciona perfeitamente."

5. **Posso personalizar o sistema?**
   - "Sim! Você tem o código completo. Pode personalizar o quanto quiser."

6. **E se eu não conseguir instalar?**
   - "Temos suporte via Discord e WhatsApp. E você pode escolher o plano Setup Assistido onde instalamos pra você."

7. **Tem reembolso?**
   - "[Defina sua política - ex: 7 dias de garantia]"

8. **Funciona para outros países além do Brasil?**
   - "No MVP é focado em R$ (Brasil), mas você pode adaptar para outras moedas."

### Diretrizes de Layout

- Accordion (expandir/colapsar)
- Ou: Grid 2 colunas de perguntas
- Mobile: Stack vertical

### Estilo

- Background: Branco ou gray-50
- Perguntas: Bold, clicável
- Respostas: Texto normal, padding interno
- Ícone de +/- para accordion

---

## 10. CTA FINAL

### Objetivo
Última chance de converter.

### Elementos

**Headline:**
> "Pronto para ter controle total das suas finanças?"

**Subheadline:**
> "Junte-se aos freelancers que já pararam de viver no caos financeiro."

**CTA Primário:**
- "Garantir Minha Licença Agora"

**CTA Secundário (opcional):**
- "Falar com Suporte"

**Nota:**
- "💳 Parcelamento em até 12x"
- "🔒 Compra segura"
- "✅ Sem mensalidades"

### Diretrizes de Layout

- Full width section
- Centralizado
- Background colorido (ex: blue-600) ou gradiente
- Texto branco

### Estilo

- Padding vertical generoso (py-20)
- Headline: Grande, branca, bold
- CTA: Grande, fundo branco, texto da cor primária (inversão)

---

## 11. FOOTER

### Objetivo
Links úteis e informações legais.

### Elementos

**Coluna 1: Produto**
- Logo
- Tagline curto

**Coluna 2: Links Úteis**
- Documentação
- Como Funciona
- FAQ
- Suporte

**Coluna 3: Legal**
- Termos de Uso
- Política de Privacidade
- Licença de Uso

**Coluna 4: Contato**
- Email: suporte@[seudominio]
- Discord: [link]

**Rodapé:**
- "© 2026 [Nome do Produto]. Todos os direitos reservados."

### Diretrizes de Layout

- 4 colunas desktop, stack mobile
- Links: text-sm, muted
- Espaçamento vertical generoso

### Estilo

- Background: gray-900 (dark) ou gray-50 (light)
- Texto: Muted (gray-400 se dark, gray-600 se light)
- Links: Hover underline

---

## Princípios de Design

### Visual

1. **Espaçamento Generoso:** Não comprima elementos. Use py-20, py-16 entre seções.
2. **Hierarquia Clara:** H1 > H2 > H3 > Body. Tamanhos bem diferenciados.
3. **Screenshots Reais:** Use imagens do produto real, não mockups genéricos.
4. **Consistência:** Mesmos border-radius, sombras, cores em toda a página.
5. **Microinterações:** Hover states sutis, transições suaves (transition-all duration-300).

### Copywriting

1. **Clareza > Criatividade:** Usuário deve entender em 5 segundos.
2. **Benefícios > Features:** "Separe PF de PJ" em vez de "Toggle switch".
3. **Linguagem do Usuário:** "Grana livre" em vez de "Ativo disponível".
4. **Urgência Genuína:** Não use "últimas vagas" se não for verdade.
5. **Remover Fricção:** "Sem cartão de crédito" > "Não se preocupe".

### Performance

1. **Imagens Otimizadas:** WebP, lazy loading, tamanhos responsivos.
2. **Load Time < 3s:** Lighthouse score >90.
3. **Mobile-First:** 60%+ do tráfego será mobile.
4. **Scroll Suave:** `scroll-behavior: smooth` nos links âncora.

---

## Checklist Pré-Lançamento

### Conteúdo

- [ ] Headline clara e benefit-focused?
- [ ] Proposta de valor em 5 segundos?
- [ ] CTAs óbvios e repetidos?
- [ ] Social proof incluído (ou logos de ferramentas)?
- [ ] FAQ responde objeções principais?
- [ ] Precificação transparente?

### Design

- [ ] Mobile responsive?
- [ ] Hierarquia visual clara?
- [ ] Espaçamento consistente?
- [ ] Screenshots do produto real?
- [ ] Dark mode (opcional, mas recomendado)?

### Técnico

- [ ] Meta tags (title, description)?
- [ ] Open Graph images?
- [ ] Analytics configurado (Google Analytics, Plausible)?
- [ ] Favicon?
- [ ] Load time < 3s?
- [ ] Imagens otimizadas?

### Conversão

- [ ] CTA above the fold?
- [ ] Checkout externo funcionando (Hubla/Cakto)?
- [ ] Pixel de conversão instalado?
- [ ] Email de confirmação pós-compra configurado?
- [ ] Área de membros pronta para dar acesso?

---

## Fluxo Pós-Compra

1. Usuário clica em "Garantir Licença"
2. Redirecionado para Hubla/Cakto
3. Finaliza pagamento
4. Recebe email com:
   - Link para área de membros
   - Credenciais de acesso (se necessário)
   - Próximos passos
5. Acessa área de membros
6. Vê curso de instalação
7. Recebe convite para GitHub privado (automatizado via Zapier/Make)
8. Recebe convite para Discord VIP

---

## Métricas de Sucesso da LP

| Métrica | Target |
|---------|--------|
| **Taxa de Conversão** | >3% |
| **Tempo na Página** | >2 minutos |
| **Bounce Rate** | <50% |
| **Scroll Depth** | >70% chegam no pricing |
| **CTA Clicks** | >10% clicam no CTA principal |

---

## Testes A/B Sugeridos

### Teste 1: Headline
- **Variante A:** "Seus dados financeiros são SEUS..." (foco privacidade)
- **Variante B:** "Separe PF e PJ em 2 minutos por dia" (foco clareza)
- **Métrica:** Taxa de conversão

### Teste 2: CTA
- **Variante A:** "Garantir Minha Licença"
- **Variante B:** "Quero Ter Controle Total"
- **Métrica:** Click-through rate

### Teste 3: Pricing
- **Variante A:** Mostrar 3 planos
- **Variante B:** Mostrar 1 plano + upsells no checkout
- **Métrica:** Taxa de conversão

---

## Referências Visuais

Use como inspiração:

- **Linear:** https://linear.app (hero clean, screenshots grandes)
- **Resend:** https://resend.com (minimalista, código em destaque)
- **Vercel:** https://vercel.com (gradientes sutis, dark mode)
- **Supabase:** https://supabase.com (hero com animação, developer-focused)
- **Clerk:** https://clerk.com (light mode, friendly, claro)
