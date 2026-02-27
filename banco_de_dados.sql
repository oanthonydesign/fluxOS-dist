-- ============================================================
-- 📦 FluxOS - Script de Banco de Dados (Supabase)
-- ============================================================
-- Execute este script no SQL Editor do seu projeto Supabase
-- para criar toda a estrutura necessária do FluxOS.
--
-- ⚠️  IMPORTANTE: Execute APENAS UMA VEZ em um projeto NOVO.
-- ============================================================


-- ============================================================
-- 1. EXTENSÕES
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


-- ============================================================
-- 2. TABELAS
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 2.1 Profiles (vinculada ao auth.users)
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  license_name TEXT,
  license_email TEXT,
  license_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────────────────────
-- 2.2 Accounts (contas bancárias)
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  bank TEXT NOT NULL,
  color TEXT,
  icon TEXT,
  type TEXT NOT NULL DEFAULT 'personal',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────────────────────
-- 2.3 Categories (categorias de transações)
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT DEFAULT 'tag',
  color TEXT DEFAULT '#6b7280',
  is_personal BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────────────────────
-- 2.4 Cards (cartões de crédito)
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.cards (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  last_digits TEXT CHECK (char_length(last_digits) = 4),
  color TEXT DEFAULT '#111827',
  is_personal BOOLEAN DEFAULT true,
  closing_day INTEGER CHECK (closing_day >= 1 AND closing_day <= 31),
  due_day INTEGER CHECK (due_day >= 1 AND due_day <= 31),
  "limit" NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────────────────────
-- 2.5 Transactions (transações financeiras)
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  card_id UUID REFERENCES public.cards(id) ON DELETE SET NULL,
  account_id UUID REFERENCES public.accounts(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  date DATE NOT NULL,
  is_personal BOOLEAN DEFAULT true,
  installments INTEGER DEFAULT 1,
  installment_number INTEGER DEFAULT 1,
  parent_transaction_id UUID REFERENCES public.transactions(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────────────────────
-- 2.6 Recurring Transactions (contas fixas / recorrentes)
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.recurring_transactions (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  day_of_month INTEGER NOT NULL CHECK (day_of_month >= 1 AND day_of_month <= 31),
  frequency TEXT DEFAULT 'monthly' CHECK (frequency IN ('monthly', 'bimonthly', 'yearly')),
  is_personal BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  last_generated_at DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.recurring_transactions ENABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────────────────────
-- 2.7 Goals (metas financeiras)
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.goals (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_amount NUMERIC NOT NULL CHECK (target_amount > 0),
  current_amount NUMERIC DEFAULT 0,
  is_personal BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────────────────────
-- 2.8 Investments (investimentos)
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.investments (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('cripto', 'fii', 'acoes', 'renda_fixa', 'outros')),
  amount NUMERIC NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 3. ÍNDICES (Performance)
-- ============================================================
CREATE INDEX idx_categories_user ON public.categories (user_id);
CREATE INDEX idx_cards_user ON public.cards (user_id);
CREATE INDEX idx_transactions_user_date ON public.transactions (user_id, date DESC);
CREATE INDEX idx_transactions_user_personal ON public.transactions (user_id, is_personal);
CREATE INDEX idx_transactions_card ON public.transactions (card_id);
CREATE INDEX idx_transactions_parent ON public.transactions (parent_transaction_id);
CREATE INDEX idx_recurring_user ON public.recurring_transactions (user_id);
CREATE INDEX idx_goals_user ON public.goals (user_id);


-- ============================================================
-- 4. POLÍTICAS DE SEGURANÇA (Row Level Security)
-- ============================================================
-- Cada usuário só pode ver, criar, editar e excluir 
-- seus próprios dados. Isso garante 100% de isolamento.

-- ── Profiles ────────────────────────────────────────────────
CREATE POLICY "select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ── Accounts ────────────────────────────────────────────────
CREATE POLICY "select_own" ON public.accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON public.accounts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON public.accounts FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own" ON public.accounts FOR DELETE USING (auth.uid() = user_id);

-- ── Categories ──────────────────────────────────────────────
CREATE POLICY "select_own" ON public.categories FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON public.categories FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON public.categories FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own" ON public.categories FOR DELETE USING (auth.uid() = user_id);

-- ── Cards ───────────────────────────────────────────────────
CREATE POLICY "select_own" ON public.cards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON public.cards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON public.cards FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own" ON public.cards FOR DELETE USING (auth.uid() = user_id);

-- ── Transactions ────────────────────────────────────────────
CREATE POLICY "select_own" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON public.transactions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "delete_own" ON public.transactions FOR DELETE USING (auth.uid() = user_id);

-- ── Recurring Transactions ──────────────────────────────────
CREATE POLICY "select_own" ON public.recurring_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON public.recurring_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON public.recurring_transactions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "delete_own" ON public.recurring_transactions FOR DELETE USING (auth.uid() = user_id);

-- ── Goals ───────────────────────────────────────────────────
CREATE POLICY "select_own" ON public.goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON public.goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON public.goals FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own" ON public.goals FOR DELETE USING (auth.uid() = user_id);

-- ── Investments ─────────────────────────────────────────────
CREATE POLICY "Users can only see their own investments" ON public.investments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can only insert their own investments" ON public.investments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can only update their own investments" ON public.investments FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can only delete their own investments" ON public.investments FOR DELETE USING (auth.uid() = user_id);


-- ============================================================
-- 5. FUNÇÕES
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 5.1 handle_new_user()
-- Executada automaticamente quando um novo usuário se registra.
-- Cria o perfil e as categorias padrão para o usuário.
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
BEGIN
  -- Cria o perfil do usuário
  INSERT INTO public.profiles (id) VALUES (new.id);

  -- Cria as categorias padrão
  INSERT INTO public.categories (name, color, user_id, is_personal)
  VALUES 
    ('Alimentação', '#ef4444', new.id, true),
    ('Assinaturas e serviços', '#8b5cf6', new.id, true),
    ('Bares e restaurantes', '#f59e0b', new.id, true),
    ('Casa', '#3b82f6', new.id, true),
    ('Compras', '#ec4899', new.id, true),
    ('Cuidados pessoais', '#14b8a6', new.id, true),
    ('Dívidas e empréstimos', '#ef4444', new.id, true),
    ('Educação', '#6366f1', new.id, true),
    ('Família e filhos', '#10b981', new.id, true),
    ('Impostos e Taxas', '#64748b', new.id, true),
    ('Investimentos', '#22c55e', new.id, true),
    ('Lazer e hobbies', '#84cc16', new.id, true),
    ('Mercado', '#06b6d4', new.id, true),
    ('Outros', '#94a3b8', new.id, true),
    ('Pets', '#a855f7', new.id, true),
    ('Presentes e doações', '#d946ef', new.id, true),
    ('Roupas', '#8b5cf6', new.id, true),
    ('Saúde', '#ef4444', new.id, true),
    ('Trabalho', '#0ea5e9', new.id, true),
    ('Transporte', '#eab308', new.id, true),
    ('Viagem', '#06b6d4', new.id, true);

  RETURN new;
END;
$$;

-- ────────────────────────────────────────────────────────────
-- 5.2 generate_recurring_transactions()
-- Gera transações automáticas a partir das contas fixas.
-- Pode ser chamada via cron ou manualmente.
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.generate_recurring_transactions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
DECLARE
  rec RECORD;
  today DATE := CURRENT_DATE;
  gen_date DATE;
BEGIN
  FOR rec IN
    SELECT * FROM public.recurring_transactions
    WHERE is_active = TRUE
      AND (last_generated_at IS NULL OR last_generated_at < date_trunc('month', today))
  LOOP
    gen_date := make_date(
      EXTRACT(YEAR FROM today)::int,
      EXTRACT(MONTH FROM today)::int,
      LEAST(rec.day_of_month, (date_trunc('month', today) + INTERVAL '1 month - 1 day')::date - date_trunc('month', today)::date + 1)
    );

    IF gen_date <= today AND (rec.last_generated_at IS NULL OR gen_date > rec.last_generated_at) THEN
      INSERT INTO public.transactions (user_id, type, category_id, description, amount, date, is_personal)
      VALUES (rec.user_id, rec.type, rec.category_id, rec.description, rec.amount, gen_date, rec.is_personal);

      UPDATE public.recurring_transactions SET last_generated_at = gen_date WHERE id = rec.id;
    END IF;
  END LOOP;
END;
$$;


-- ============================================================
-- 6. SINGLE USER INSTANCE (Self-Hosted)
-- ============================================================
-- Impede a criação de mais de um usuário por instância.
-- Após o primeiro cadastro, novos registros são bloqueados.

-- ── Trigger Function: bloqueia INSERT se já existe usuário ──
CREATE OR REPLACE FUNCTION public.prevent_multiple_users()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
BEGIN
  IF (SELECT COUNT(*) FROM auth.users) > 0 THEN
    RAISE EXCEPTION 'Registro bloqueado: esta instância já possui um usuário cadastrado.';
  END IF;
  RETURN NEW;
END;
$$;

-- ── RPC Function: verifica se o registro está aberto ────────
CREATE OR REPLACE FUNCTION public.is_registration_open()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $$
BEGIN
  RETURN (SELECT COUNT(*) FROM auth.users) = 0;
END;
$$;

-- Permite acesso anônimo à função is_registration_open
GRANT EXECUTE ON FUNCTION public.is_registration_open() TO anon;
GRANT EXECUTE ON FUNCTION public.is_registration_open() TO authenticated;


-- ============================================================
-- 7. TRIGGERS
-- ============================================================

-- Trigger: quando um novo usuário se cadastra no auth,
-- cria automaticamente o perfil e as categorias padrão.
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Trigger: bloqueia criação de múltiplos usuários.
CREATE TRIGGER prevent_multiple_users_trigger
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_multiple_users();


-- ============================================================
-- ✅ Script finalizado!
-- Seu banco de dados está pronto para uso.
-- ============================================================
