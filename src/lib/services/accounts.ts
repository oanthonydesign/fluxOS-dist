import { createClient } from '@/lib/supabase/client'
import type { Account } from '@/types/account'

export const accountService = {
    async getAccounts(type?: 'personal' | 'business') {
        const supabase = createClient()
        // Obter o usuário atual
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Usuário não autenticado")

        let query = supabase
            .from('accounts')
            .select('*')
            .eq('user_id', user.id)

        if (type) {
            query = query.eq('type', type)
        }

        const { data, error } = await query.order('created_at', { ascending: false })

        if (error) throw error
        return data as Account[]
    },

    async createAccount(payload: Omit<Account, 'id' | 'created_at' | 'user_id'>) {
        const supabase = createClient()

        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) throw new Error("Usuário não autenticado")

        const { data, error } = await supabase
            .from('accounts')
            .insert([{ ...payload, user_id: user.id }])
            .select()
            .single()

        if (error) throw error
        return data as Account
    },

    async updateAccount(id: string, payload: Partial<Account>) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('accounts')
            .update(payload)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data as Account
    },

    async deleteAccount(id: string) {
        const supabase = createClient()

        // Verifica se tem transações antes de deletar
        const { count, error: countError } = await supabase
            .from('transactions')
            .select('*', { count: 'exact', head: true })
            .eq('account_id', id)

        if (countError) throw countError

        if (count && count > 0) {
            throw new Error("Não é possível excluir uma conta que possui lançamentos vinculados.")
        }

        const { error } = await supabase
            .from('accounts')
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
