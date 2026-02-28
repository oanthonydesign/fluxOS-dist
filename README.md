# FluxOS — Sistema Financeiro Self-Hosted

FluxOS é um sistema financeiro completo, hospedado pelo próprio cliente usando **Supabase** (banco de dados + autenticação) e **Vercel** (deploy do frontend).

---

## ️ Banco de Dados

Para que o sistema funcione, você precisa configurar um projeto gratuito no Supabase seguindo estes passos:

1. **Passo 1 — Criar a conta e o projeto**: Acesse [supabase.com](https://supabase.com), crie sua conta e clique em **New Project**. Preencha o nome do seu projeto, defina uma senha para o banco de dados (guarde-a bem!) e selecione a região **South America (São Paulo)**. Aguarde alguns minutos até o projeto terminar de subir.
2. **Passo 2 — Pegar as chaves de API**: No menu lateral esquerdo, vá em **Project Settings** > **API**. Copie o endereço em **Project URL** (ele será usado como `NEXT_PUBLIC_SUPABASE_URL`) e a chave em **anon public** (ela será usada como `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
3. **Passo 3 — Rodar o SQL do banco**: No menu lateral, clique em **SQL Editor**. Clique em **New query**, abra o arquivo [`banco_de_dados.sql`](./banco_de_dados.sql) deste repositório, copie todo o conteúdo dele, cole no editor do Supabase e clique em **Run**. Confirme se aparece a mensagem de "Success".
4. **Passo 4 — Configurar autenticação**: Vá em **Authentication** > **URL Configuration**. No campo **Site URL**, coloque a URL que a Vercel te deu após o deploy. Em **Redirect URLs**, adicione `https://sua-url-da-vercel.vercel.app/**`.

> ⚠️ **Atenção**: O Passo 4 só pode ser concluído após você fazer o primeiro deploy na Vercel e ter a URL real do site. Sem isso, o login não funcionará.

---

## ⚙️ Variáveis de Ambiente

| Variável | Descrição | Onde encontrar |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase | Project Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anon/public do Supabase | Project Settings > API |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site após o deploy | Ex: `https://seu-app.vercel.app` |

> ⚠️ Você ainda não sabe essa URL antes do primeiro deploy. Deixe o valor como `https://seu-app.vercel.app` por enquanto. Após o deploy, a Vercel vai te mostrar a URL real do seu projeto — volte em Settings > Environment Variables, atualize o valor e clique em Redeploy.

Consulte o arquivo [`.env.example`](./.env.example) para referência completa.

---

## 🚀 Deploy Rápido

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foanthonydesign%2FfluxOS-dist&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_SITE_URL&envDescription=Vari%C3%A1veis%20necess%C3%A1rias%20para%20conectar%20ao%20Supabase&envLink=https%3A%2F%2Fgithub.com%2Foanthonydesign%2FfluxOS-dist%2Fblob%2Fmain%2F.env.example)

> Ao clicar no botão acima, a Vercel irá solicitar o preenchimento das variáveis de ambiente antes de iniciar o deploy.

---

## 🛠️ Stack

- **Frontend:** Next.js 16 + React 19 + TypeScript + Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth)
- **Deploy:** Vercel

---

## 📄 Licença

O FluxOS é distribuído sob a **Business Source License 1.1 (BSL 1.1)**.

Em linguagem simples:

| ✅ Permitido | ❌ Proibido sem autorização |
|---|---|
| Uso pessoal do sistema | Uso comercial (cobrar clientes, revender etc.) |
| Instalar e usar para si mesmo | Redistribuir o código ou o sistema para terceiros |
| Modificar para uso próprio | Oferecer como serviço (SaaS) para outros |

> **Após 4 anos** da primeira distribuição pública desta versão, o código será automaticamente relicenciado sob a licença **MIT** (open source).

Para solicitar autorização de uso comercial ou redistribuição, entre em contato: fluxosbr01@gmail.com

Consulte o arquivo [`LICENSE`](./LICENSE) para os termos completos.
