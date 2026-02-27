import { createClient } from '@/lib/supabase/client'
import { TransactionPayload } from '@/types/models'

export const transactionService = {
    async getTransactions(isPersonal: boolean) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('transactions')
            .select('*, categories(*), accounts(*)')
            .eq('is_personal', isPersonal)
            .order('date', { ascending: false })

        if (error) throw error
        return data
    },

    async getTransactionsByDate(isPersonal: boolean, start: string, end: string) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('transactions')
            .select('*, categories(*), accounts(*)')
            .eq('is_personal', isPersonal)
            .gte('date', start)
            .lte('date', end)
            .order('date', { ascending: false })

        if (error) throw error
        return data
    },

    async createTransaction(payload: TransactionPayload) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('transactions')
            .insert([payload])
            .select()
            .single()

        if (error) throw error
        return data
    },

    async createTransfer(payload: { amount: number, date: string, sourceAccountId: string, targetAccountId: string, description: string, category_id: string, is_personal: boolean }) {
        const supabase = createClient()

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Usuário não autenticado")

        const expense = {
            user_id: user.id,
            description: payload.description || 'Transferência enviada',
            amount: payload.amount,
            date: payload.date,
            type: 'expense',
            category_id: payload.category_id,
            account_id: payload.sourceAccountId,
            is_personal: payload.is_personal,
            installments: 1,
            installment_number: 1
        }

        const income = {
            user_id: user.id,
            description: payload.description || 'Transferência recebida',
            amount: payload.amount,
            date: payload.date,
            type: 'income',
            category_id: payload.category_id,
            account_id: payload.targetAccountId,
            is_personal: payload.is_personal,
            installments: 1,
            installment_number: 1
        }

        const { data, error } = await supabase
            .from('transactions')
            .insert([expense, income])
            .select()

        if (error) throw error
        return data
    },

    async updateTransaction(id: string, payload: Partial<TransactionPayload>) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('transactions')
            .update(payload)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    async deleteTransaction(id: string) {
        const supabase = createClient()
        const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
