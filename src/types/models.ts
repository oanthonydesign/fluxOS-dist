export interface TransactionPayload {
    type: 'income' | 'expense' | 'transfer';
    amount: number;
    date: string;
    description: string;
    category_id?: string | null;
    account_id: string;
    card_id?: string | null;
    installments?: number;
    installment_number?: number;
    user_id?: string;
    is_personal?: boolean;
}

export interface CardPayload {
    name: string;
    last_digits: string;
    brand?: string;
    limit: number;
    closing_day: number;
    due_day: number;
    color?: string;
    is_personal?: boolean;
    user_id?: string;
}

export interface GoalPayload {
    name: string;
    target_amount: number;
    current_amount?: number;
    target_date?: string | null;
    color?: string;
    icon?: string;
    is_personal?: boolean;
    user_id?: string;
}

export interface InvestmentPayload {
    name: string;
    type: string;
    amount: number;
    yield_rate?: number;
    maturity_date?: string | null;
    broker?: string;
    is_personal?: boolean;
    user_id?: string;
}

export interface RecurringPayload {
    description: string;
    amount: number;
    type: 'income' | 'expense';
    day_of_month: number;
    category_id?: string | null;
    account_id?: string | null;
    card_id?: string | null;
    is_active?: boolean;
    is_personal?: boolean;
    user_id?: string;
}
