# Sistema Financeiro PF/PJ - Design Guidelines

**Data:** 14 de Fevereiro de 2026  
**Versão:** 2.0 (com Design Tokens)

---

## Visão Geral

Este documento define as diretrizes visuais e de design para o Sistema Financeiro PF/PJ. O objetivo é criar uma interface moderna, clean e que designers amem usar, seguindo o estilo de produtos como Linear, Resend e Vercel.

O sistema utiliza **Design Tokens** para garantir consistência, escalabilidade e facilitar a manutenção do tema (incluindo dark mode).

---

## Princípios de Design

### 1. Clareza Acima de Tudo
- Cada elemento tem um propósito claro
- Hierarquia visual óbvia
- Sem elementos decorativos desnecessários

### 2. Espaçamento Generoso
- Respiração entre elementos
- Padding e margin consistentes
- Whitespace é feature, não bug

### 3. Minimalista mas Funcional
- Menos é mais, mas não esconda funcionalidades
- Cada tela deve ter um foco principal
- Ações secundárias discretas, mas acessíveis

### 4. Consistência Visual
- Componentes se comportam igual em toda a aplicação
- Mesmos padrões de interação
- Design system bem definido

### 5. Performance Visual
- Animações sutis e rápidas (<300ms)
- Loading states claros
- Feedback imediato de ações

---

## Design Tokens

### O que são Design Tokens?

Design Tokens são **variáveis que armazenam valores de design** (cores, espaçamentos, tipografia, etc) de forma centralizada e reutilizável. Eles garantem consistência e facilitam mudanças globais no design.

### Estrutura de Tokens
```css
/* globals.css ou tokens.css */

:root {
  /* ============================================
     COLORS - Light Mode
     ============================================ */
  
  /* Brand Colors (From Inspiration) */
  --color-brand-500: #2563eb;
  --color-brand-600: #1d4ed8;

  /* Primary */
  --color-primary: var(--color-brand-500);
  --color-primary-hover: var(--color-brand-600);
  --color-primary-foreground: #ffffff;
  
  /* Background */
  --color-background: #f9fafb; /* gray-50 */
  --color-foreground: #111827; /* gray-900 */
  
  /* Surface (Cards, sidebar) */
  --color-surface: #ffffff;
  --color-surface-hover: #f9fafb;
  
  /* Border */
  --color-border: #e5e7eb; /* gray-200 */
  --color-border-hover: #d1d5db; /* gray-300 */
  
  /* Text (From Inspiration) */
  --color-text-primary: #111827; /* gray-900 */
  --color-text-secondary: #6b7280; /* gray-500 */
  --color-text-tertiary: #9ca3af; /* gray-400 */
  
  /* Semantic Colors */
  --color-success: #10b981;
  --color-success-bg: #d1fae5;
  --color-success-foreground: #065f46;
  
  --color-danger: #ef4444;
  --color-danger-bg: #fee2e2;
  --color-danger-foreground: #991b1b;
  
  --color-warning: #f59e0b;
  --color-warning-bg: #fef3c7;
  --color-warning-foreground: #92400e;
  
  --color-info: #3b82f6;
  --color-info-bg: #dbeafe;
  --color-info-foreground: #1e40af;
  
  /* Muted */
  --color-muted: #f3f4f6;
  --color-muted-foreground: #6b7280;
  
  /* Accent */
  --color-accent: #f3f4f6;
  --color-accent-foreground: #111827;
  
  /* ============================================
     SPACING
     ============================================ */
  
  --spacing-0: 0;
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.25rem;   /* 20px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
  --spacing-20: 5rem;     /* 80px */
  --spacing-24: 6rem;     /* 96px */
  
  /* ============================================
     TYPOGRAPHY
     ============================================ */
  
  /* Font Family */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;
  
  /* Font Sizes */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  
  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;
  
  /* ============================================
     BORDER RADIUS
     ============================================ */
  
  --radius-none: 0;
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.375rem;  /* 6px */
  --radius-lg: 0.5rem;    /* 8px */
  --radius-xl: 0.75rem;   /* 12px */
  --radius-2xl: 1rem;     /* 16px */
  --radius-full: 9999px;
  
  /* ============================================
     SHADOWS
     ============================================ */
  
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  /* ============================================
     TRANSITIONS
     ============================================ */
  
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* ============================================
   DARK MODE
   ============================================ */

.dark {
  /* Primary */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-foreground: #ffffff;
  
  /* Background */
  --color-background: #0a0a0a;
  --color-foreground: #fafafa;
  
  /* Surface */
  --color-surface: #171717;
  --color-surface-hover: #262626;
  
  /* Border */
  --color-border: #262626;
  --color-border-hover: #404040;
  
  /* Text */
  --color-text-primary: #fafafa;
  --color-text-secondary: #a3a3a3;
  --color-text-tertiary: #737373;
  
  /* Semantic Colors (mesmas cores, backgrounds diferentes) */
  --color-success: #10b981;
  --color-success-bg: rgba(16, 185, 129, 0.1);
  --color-success-foreground: #d1fae5;
  
  --color-danger: #ef4444;
  --color-danger-bg: rgba(239, 68, 68, 0.1);
  --color-danger-foreground: #fee2e2;
  
  --color-warning: #f59e0b;
  --color-warning-bg: rgba(245, 158, 11, 0.1);
  --color-warning-foreground: #fef3c7;
  
  --color-info: #3b82f6;
  --color-info-bg: rgba(59, 130, 246, 0.1);
  --color-info-foreground: #dbeafe;
  
  /* Muted */
  --color-muted: #262626;
  --color-muted-foreground: #a3a3a3;
  
  /* Accent */
  --color-accent: #262626;
  --color-accent-foreground: #fafafa;
  
  /* Shadows (mais sutis no dark mode) */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.5);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5);
}
```

---

## Configuração do Tailwind com Tokens

Integre os Design Tokens com o Tailwind CSS:
```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)",
        input: "var(--color-border)",
        ring: "var(--color-primary)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-foreground)",
        },
        destructive: {
          DEFAULT: "var(--color-danger)",
          foreground: "var(--color-danger-foreground)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          foreground: "var(--color-success-foreground)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          foreground: "var(--color-warning-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-foreground)",
        },
        card: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-foreground)",
        },
      },
      spacing: {
        '0': 'var(--spacing-0)',
        '1': 'var(--spacing-1)',
        '2': 'var(--spacing-2)',
        '3': 'var(--spacing-3)',
        '4': 'var(--spacing-4)',
        '5': 'var(--spacing-5)',
        '6': 'var(--spacing-6)',
        '8': 'var(--spacing-8)',
        '10': 'var(--spacing-10)',
        '12': 'var(--spacing-12)',
        '16': 'var(--spacing-16)',
        '20': 'var(--spacing-20)',
        '24': 'var(--spacing-24)',
      },
      borderRadius: {
        'none': 'var(--radius-none)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        'full': 'var(--radius-full)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

## Como Usar os Tokens

### Usando CSS Variables Diretamente
```css
/* Em seu CSS custom */
.my-component {
  background: var(--color-surface);
  color: var(--color-text-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: var(--transition-base);
}

.my-component:hover {
  background: var(--color-surface-hover);
  box-shadow: var(--shadow-lg);
}
```

### Usando com Tailwind (Recomendado)
```tsx
// Card usando tokens via Tailwind
<div className="bg-card text-card-foreground p-6 rounded-lg shadow-md hover:shadow-lg transition-base">
  <h3 className="text-2xl font-semibold text-foreground">
    Título do Card
  </h3>
  <p className="text-muted-foreground mt-2">
    Descrição do card
  </p>
</div>

// Botão usando tokens
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-fast">
  Salvar
</button>

// Input usando tokens
<input 
  type="text"
  className="bg-background border-border text-foreground px-3 py-2 rounded-md focus:ring-2 focus:ring-primary"
  placeholder="Digite algo..."
/>
```

### Acessando Tokens no JavaScript/TypeScript
```typescript
// Lendo um token
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary');

// Alterando um token dinamicamente (não recomendado, use dark mode)
document.documentElement.style.setProperty('--color-primary', '#ff0000');
```

---

## Paleta de Cores (Referência Visual)

### Light Mode

| Token | Valor | Preview | Uso |
|-------|-------|---------|-----|
| `--color-primary` | `#2563eb` | 🟦 Blue 600 | CTAs, links, elementos interativos |
| `--color-background` | `#ffffff` | ⬜ White | Fundo principal |
| `--color-surface` | `#f9fafb` | 🔲 Gray 50 | Cards, modais |
| `--color-border` | `#e5e7eb` | ➖ Gray 200 | Bordas, separadores |
| `--color-text-primary` | `#111827` | ⬛ Gray 900 | Títulos, texto principal |
| `--color-text-secondary` | `#6b7280` | 🔘 Gray 500 | Subtítulos, descrições |
| `--color-success` | `#10b981` | 🟩 Green 500 | Entradas, sucesso |
| `--color-danger` | `#ef4444` | 🟥 Red 500 | Saídas, erros |
| `--color-warning` | `#f59e0b` | 🟨 Amber 500 | Alertas |

### Dark Mode

| Token | Valor | Preview | Uso |
|-------|-------|---------|-----|
| `--color-primary` | `#3b82f6` | 🔵 Blue 500 | CTAs, links |
| `--color-background` | `#0a0a0a` | ⬛ Almost Black | Fundo principal |
| `--color-surface` | `#171717` | ⬛ Neutral 900 | Cards, modais |
| `--color-border` | `#262626` | ➖ Neutral 800 | Bordas, separadores |
| `--color-text-primary` | `#fafafa` | ⬜ Gray 50 | Títulos, texto principal |
| `--color-text-secondary` | `#a3a3a3` | 🔘 Gray 400 | Subtítulos, descrições |

---

## Tipografia com Tokens

### Escala de Tamanhos
```tsx
// Heading 1
<h1 className="text-4xl font-bold text-foreground">
  Dashboard Financeiro
</h1>

// Heading 2
<h2 className="text-3xl font-semibold text-foreground">
  Transações Recentes
</h2>

// Heading 3
<h3 className="text-2xl font-semibold text-foreground">
  Saldo Atual
</h3>

// Body
<p className="text-base text-muted-foreground">
  Descrição ou texto de parágrafo
</p>

// Small
<span className="text-sm text-muted-foreground">
  Texto secundário
</span>

// Caption
<span className="text-xs font-medium text-muted-foreground">
  Timestamp ou nota
</span>
```

### Usando Tokens CSS Diretamente
```css
.heading-1 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
}

.body-text {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
}
```

---

## Espaçamento com Tokens

### Padding de Componentes
```tsx
// Card com padding responsivo
<div className="p-4 lg:p-6">
  {/* Conteúdo */}
</div>

// Seção com padding vertical
<section className="py-12 lg:py-16">
  {/* Conteúdo */}
</section>
```

### Gap entre Elementos
```tsx
// Stack vertical com gap
<div className="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Grid com gap
<div className="grid grid-cols-3 gap-6">
  <Card />
  <Card />
  <Card />
</div>
```

### Usando Tokens CSS
```css
.container {
  padding: var(--spacing-6);
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-8);
}

@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-8);
    gap: var(--spacing-6);
  }
}
```

---

## Componentes Base (shadcn/ui)

### Componentes Utilizados

Todos os componentes vêm do shadcn/ui com customizações usando tokens:

1. **Button** - Botões primários, secundários, ghost
2. **Card** - Cards de dashboard, listas
3. **Dialog** - Modais para criar/editar
4. **Input** - Campos de texto
5. **Select** - Dropdowns
6. **Switch** - Toggle PF/PJ, Dark mode
7. **Tabs** - Navegação entre seções
8. **Badge** - Tags de status, categorias
9. **Separator** - Linhas divisórias
10. **Skeleton** - Loading states
11. **Toast** - Notificações
12. **Dropdown Menu** - Menus contextuais
13. **Popover** - Tooltips, confirmações
14. **Calendar** - Seleção de data
15. **Date Picker** - Input de data

### Exemplos de Uso

#### Button
```tsx
// Primário
<Button variant="default" size="default">
  Salvar
</Button>

// Secundário
<Button variant="outline" size="default">
  Cancelar
</Button>

// Ghost
<Button variant="ghost" size="sm">
  Editar
</Button>

// Destructive
<Button variant="destructive" size="default">
  Excluir
</Button>

// Com ícone
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Nova Transação
</Button>
```

#### Card
```tsx
<Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle>Saldo Atual</CardTitle>
    <CardDescription>Sua posição financeira</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold text-foreground">R$ 5.247,83</p>
    <p className="text-sm text-success mt-2">
      +12% em relação ao mês passado
    </p>
  </CardContent>
</Card>
```

#### Input
```tsx
<div className="space-y-2">
  <Label htmlFor="description">Descrição</Label>
  <Input 
    id="description"
    placeholder="Ex: Supermercado"
    className="w-full"
  />
</div>
```

---

## Iconografia

### Biblioteca: Lucide React
```bash
npm install lucide-react
```

### Tamanhos Padrão
```tsx
import { Home, TrendingUp, CreditCard } from "lucide-react"

// Small
<Home className="h-4 w-4" />

// Default
<TrendingUp className="h-5 w-5" />

// Medium
<CreditCard className="h-6 w-6" />

// Large
<Target className="h-8 w-8" />
```

### Ícones Principais
```tsx
import { 
  Home,           // Dashboard
  TrendingUp,     // Entradas
  TrendingDown,   // Saídas
  CreditCard,     // Cartões
  Repeat,         // Contas fixas
  Target,         // Metas
  Calendar,       // Data
  Search,         // Busca
  Plus,           // Adicionar
  Edit,           // Editar
  Trash2,         // Excluir
  Check,          // Confirmar
  X,              // Fechar/Cancelar
  Moon,           // Dark mode
  Sun,            // Light mode
  Settings,       // Configurações
  Lock,           // Privacidade
} from "lucide-react"
```

### Usando com Tokens de Cor
```tsx
// Ícone com cor do token
<TrendingUp className="h-6 w-6" style={{ color: 'var(--color-success)' }} />

// Ícone com Tailwind (recomendado)
<TrendingUp className="h-6 w-6 text-success" />

// Ícone em card
<div className="flex items-center gap-3">
  <div className="p-2 bg-primary/10 rounded-lg">
    <CreditCard className="h-5 w-5 text-primary" />
  </div>
  <div>
    <p className="font-medium text-foreground">Cartões</p>
    <p className="text-sm text-muted-foreground">4 cadastrados</p>
  </div>
</div>
```

---

## Layout e Grid

### Container Principal (Container App Layout)

O layout da aplicação segue o padrão **Container App**, onde o conteúdo principal reside em um card branco flutuante sobre um fundo cinza suave.

```tsx
// Estrutura Base
<div className="min-h-screen bg-[#F4F5F7]">
  <Sidebar />
  <div className="lg:pl-64">
    <Header />
    <main className="px-4 pb-4 lg:px-6 lg:pb-6 pt-0">
      <div className="bg-white rounded-[2rem] border border-gray-200 min-h-[calc(100vh-7rem)]">
        {/* Conteúdo da Página */}
      </div>
    </main>
  </div>
</div>
```

### Grid Responsivo
```tsx
// 3 colunas desktop, 1 mobile
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

---

## Bordas e Sombras com Tokens

### Border Radius
```tsx
// Pequeno
<div className="rounded-md">...</div>

// Médio (padrão)
<div className="rounded-lg">...</div>

// Grande
<div className="rounded-xl">...</div>

// Circular
<div className="rounded-full">...</div>
```

### Sombras (Flat Design)

O sistema adota um **Design Flat** por padrão. Cards internos e elementos de interface não devem ter sombras, exceto em casos específicos de destaque ou elementos flutuantes.

```tsx
// Padrão (Sem sombra)
<Card className="border-gray-100 shadow-none">...</Card>

// Float / Destacado (Ex: Página de Cartões)
<Card className="shadow-lg hover:-translate-y-1 transition-all">...</Card>

// Dialogs e Dropdowns (Mantêm sombra para profundidade)
<DialogContent className="shadow-xl">...</DialogContent>
```

### Usando CSS Variables
```css
.my-card {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.my-card:hover {
  box-shadow: var(--shadow-lg);
}
```

---

## Animações e Transições com Tokens

### Transições Padrão
```tsx
// Hover em botões
<Button className="transition-all duration-fast hover:scale-105">
  Salvar
</Button>

// Hover em cards
<Card className="transition-shadow duration-base hover:shadow-lg">
  {/* Conteúdo */}
</Card>

// Toggle com animação
<Switch className="transition-all duration-slow" />
```

### Usando CSS Variables
```css
.button {
  transition: all var(--transition-fast);
}

.button:hover {
  transform: scale(1.05);
}

.card {
  transition: box-shadow var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}
```

---

## Estados de UI

### Loading States
```tsx
// Skeleton usando tokens
<Card className="bg-card">
  <CardHeader>
    <div className="h-4 w-[200px] bg-muted rounded animate-pulse" />
  </CardHeader>
  <CardContent>
    <div className="h-8 w-[150px] bg-muted rounded animate-pulse" />
  </CardContent>
</Card>

// Spinner em botão
<Button disabled className="opacity-50">
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Salvando...
</Button>
```

### Empty States
```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <div className="p-4 bg-muted rounded-full mb-4">
    <Inbox className="h-8 w-8 text-muted-foreground" />
  </div>
  <h3 className="text-lg font-semibold text-foreground mb-2">
    Nenhuma transação ainda
  </h3>
  <p className="text-sm text-muted-foreground mb-4">
    Comece adicionando sua primeira transação
  </p>
  <Button>
    <Plus className="mr-2 h-4 w-4" />
    Nova Transação
  </Button>
</div>
```

### Success States
```tsx
// Toast de sucesso usando tokens
toast({
  title: "Transação salva!",
  description: "Sua transação foi registrada com sucesso.",
  className: "bg-success-bg text-success-foreground",
})
```

---

## Padrões de Componentes Específicos

### Dashboard Card
```tsx
<Card className="bg-card border-border hover:shadow-md transition-shadow">
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-sm font-medium text-muted-foreground">
      Saldo Atual
    </CardTitle>
    <DollarSign className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold text-foreground">R$ 5.247,83</div>
    <p className="text-xs text-success mt-1">
      +12% em relação ao mês passado
    </p>
  </CardContent>
</Card>
```

### Lista de Transações
```tsx
<Card className="bg-card">
  <CardHeader>
    <CardTitle className="text-foreground">Transações Recentes</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div key={tx.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              tx.type === 'income' 
                ? "bg-success/10" 
                : "bg-destructive/10"
            )}>
              {tx.type === 'income' ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
            </div>
            <div>
              <p className="font-medium text-foreground">{tx.description}</p>
              <p className="text-sm text-muted-foreground">{tx.category}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={cn(
              "font-semibold",
              tx.type === 'income' ? "text-success" : "text-destructive"
            )}>
              {tx.type === 'income' ? '+' : '-'} R$ {tx.amount}
            </p>
            <p className="text-xs text-muted-foreground">{tx.date}</p>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>
```

### Toggle PF/PJ
```tsx
<div className="flex items-center gap-2">
  <span className={cn(
    "text-sm font-medium transition-colors",
    !isPJ ? "text-primary" : "text-muted-foreground"
  )}>
    Pessoal
  </span>
  <Switch
    checked={isPJ}
    onCheckedChange={setIsPJ}
  />
  <span className={cn(
    "text-sm font-medium transition-colors",
    isPJ ? "text-primary" : "text-muted-foreground"
  )}>
    Empresarial
  </span>
</div>
```

---

## Responsividade

### Breakpoints (Tailwind)
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Mobile-First
```tsx
// ✅ Correto (mobile-first)
<div className="block lg:flex">
<h1 className="text-3xl lg:text-4xl">
<div className="px-4 lg:px-8">
```

---

## Acessibilidade

### Contraste de Cores

Todos os tokens de cor foram definidos com contraste adequado:
- Mínimo de **4.5:1** para texto normal
- Mínimo de **3:1** para texto grande (>18px)

### Semântica HTML
```tsx
<main>, <nav>, <header>, <footer>, <article>, <section>
<h1> → <h2> → <h3> (não pule níveis)
```

### ARIA Labels
```tsx
// Botões só com ícone
<Button aria-label="Editar transação">
  <Edit className="h-4 w-4" />
</Button>

// Inputs sempre com label
<Label htmlFor="amount">Valor</Label>
<Input id="amount" />
```

---

## Checklist de Implementação

### Setup Inicial

- [ ] Criar arquivo `globals.css` com todos os tokens
- [ ] Configurar `tailwind.config.js` para usar tokens
- [ ] Instalar `next-themes` para dark mode
- [ ] Configurar ThemeProvider no root layout
- [ ] Testar troca de tema (light/dark)

### Para Cada Componente

- [ ] Usa tokens em vez de valores hardcoded
- [ ] Funciona em light e dark mode
- [ ] Responsivo (mobile-first)
- [ ] Acessível (ARIA labels, keyboard navigation)
- [ ] Loading states implementados
- [ ] Error states implementados
- [ ] Hover/focus states visíveis

---

## Exemplo Completo de Uso
```tsx
// app/globals.css
@import './tokens.css';

// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

// components/dashboard-card.tsx
export function DashboardCard({ title, value, change }) {
  return (
    <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-base">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-success mt-1">{change}</p>
      </CardContent>
    </Card>
  )
}
```

---

## Referências

### Sites para Inspiração

1. **Linear** (https://linear.app) - Dashboard clean
2. **Resend** (https://resend.com) - Minimalista
3. **Vercel** (https://vercel.com) - Estética moderna e clean
4. **Clerk** (https://clerk.com) - Light mode friendly
5. **Raycast** (https://raycast.com) - Animações bem feitas

### Ferramentas

- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Tailwind Docs:** https://tailwindcss.com/docs/
- **Lucide Icons:** https://lucide.dev/icons/
- **shadcn/ui:** https://ui.shadcn.com/

---

## Notas Finais

Este design system com Design Tokens foi criado para ser:

1. **Centralizado** - Todos os valores em um só lugar
2. **Escalável** - Fácil adicionar novos tokens
3. **Consistente** - Mesmos valores em toda a aplicação
4. **Manutenível** - Mudanças globais com uma linha
5. **Type-safe** - Integração com TypeScript/Tailwind
6. **Performático** - CSS Variables são nativas do browser

**Regra de Ouro:** Use tokens. Sempre. Nunca hardcode valores de cor, espaçamento ou tipografia.