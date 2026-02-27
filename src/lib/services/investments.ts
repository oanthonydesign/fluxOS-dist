import { createClient } from '@/lib/supabase/client'
import { InvestmentPayload } from '@/types/models'

export const investmentService = {
    async getInvestments() {
        // RLS prevents fetching other users data, and the context limits it implicitly if needed.
        // Wait, should we filter by isPersonal? The table doesn't have an `is_personal` column because investments are uniquely for personal, per PRD design.
        const supabase = createClient()
        const { data, error } = await supabase
            .from('investments')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    },

    async createInvestment(payload: InvestmentPayload) {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Usuário não autenticado")

        const { data, error } = await supabase
            .from('investments')
            .insert([{ ...payload, user_id: user.id }])
            .select()
            .single()

        if (error) throw error
        return data
    },

    async updateInvestment(id: string, payload: Partial<InvestmentPayload>) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('investments')
            .update(payload)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    async deleteInvestment(id: string) {
        const supabase = createClient()
        const { error } = await supabase
            .from('investments')
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
