# Prompt para Aura.build — Página de Obrigado (White Glove)

> Copie todo o conteúdo abaixo (incluindo as tags `frontend_aesthetics`) e cole no Aura.build.

---

Crie uma página de "Obrigado" (Thank You Page) para um produto de software financeiro chamado **FluxOS**, destinado a freelancers de design que acabaram de comprar o plano premium **White Glove** (R$ 797 — instalação feita totalmente pela equipe). A página deve focar na conversão principal: levar o cliente a clicar no botão para agendar o serviço pelo WhatsApp.

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and standard Inter usage; opt instead for distinctive choices that elevate the frontend's aesthetics (e.g., modern grotesks, geometric sans-serifs, or elegant serif pairings for premium feels). 

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration. This is a PREMIUM plan ("White Glove"), make it feel exclusive and high-end.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic of a premium dashboard.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>

### 🎨 INSPIRAÇÃO DO PROJETO E ANIMAÇÃO OBRIGATÓRIA

Apesar da liberdade criativa no design guiada pela tag acima, utilize como **base e inspiração estrutural** um design clean de sistema financeiro dashboard-like (menus organizados, divisões claras, uso de sombras precisas e cards flutuantes). 

**OBRIGATÓRIO: Animação de Confetes**
- Como a página é uma comemoração (compra do plano mais caro), você **DEVE** incluir um script em CSS puro ou Canvas API que dispare uma animação de confetes caindo dos dois lados superiores da tela quando ela iniciar. 
- A chuva de confetes deve ter cores que ornem com o seu tema principal (com toques dourados para simbolizar o plano "White Glove"). Tem que fluir suavemente e parar após certa de 3 a 5 segundos. Não dependa de pacotes npm externos para isso; escreva o código direto na página.

---

### 📄 CONTEÚDO (COPY E TEXTOS DA PÁGINA)

Gere a UI que englobe os seguintes textos (você tem total liberdade de compor a hierarquia e as marcações HTML, mas o texto não deve mudar):

**[Topo da página]**
Logo: FluxOS

**[Área Principal de Destaque / Hero]**
*(Pense em um hero elegante com um ícone visual de impacto - check ou estrela de sucesso)*
- Etiqueta opcional acima do título: "COMPRA CONFIRMADA"
- **Headline (H1):** Parabéns! Sua jornada rumo à soberania financeira começa agora.
- **Subheadline:** Você acaba de garantir a licença vitalícia do FluxOS no plano **White Glove**. Isso significa que você não precisa se preocupar com GitHub, Supabase ou Vercel — nossa equipe fará toda a implementação na sua infraestrutura para que você foque apenas no que importa: seu lucro.

**[CTA / Chamada de Ação Principal]**
- **Botão Maior e Destacado:** AGENDAR MINHA IMPLEMENTAÇÃO NO WHATSAPP
- **Subtexto do botão (menor e próximo):** *Toque aqui para falar com nosso time e marcar seu setup.*

**[Próximos Passos]**
- **Título da seção:** Seu sistema estará pronto em 3 passos simples:
*(Pense em exibir isso como cards verticais/horizontais caprichados, steps interconectados ou um timeline charmoso)*
- **Passo 01 — Agendamento:** Após clicar no botão acima, você será direcionado ao nosso WhatsApp exclusivo para clientes White Glove.
- **Passo 02 — Preparação:** Vamos solicitar as informações básicas da sua hospedagem para realizarmos a instalação segura e privada.
- **Passo 03 — Onboarding:** Com tudo instalado, faremos um tour guiado para você aprender a separar seu PF do PJ em menos de 2 minutos.

**[Rodapé / Garantia]**
- **Faixa de Segurança:** *(Traga um ícone de Shield/Cadeado)*
- **Título de Segurança:** Seus dados, seu cofre, sua chave.
- **Descrição de Segurança:** Reafirmamos nosso compromisso: como o FluxOS será instalado na sua própria estrutura, nós nunca teremos acesso aos seus números após o setup. Você tem 100% de privacidade e controle total, para sempre.
- **Link secundário final:** ← Voltar para o site principal

---

**Nota Final para a IA Geradora:** Preste máxima atenção ao polimento estético (glassmorphism inteligente se couber, grids modernos, grid lines no fundo etc). Gere código imediatamente executável (HTML/Tailwind ou React/Tailwind).


