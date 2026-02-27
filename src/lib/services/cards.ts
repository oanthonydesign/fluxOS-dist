import { createClient } from '@/lib/supabase/client'
import { CardPayload } from '@/types/models'

export const cardService = {
    async getCards(isPersonal: boolean) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('cards')
            .select('*')
            .eq('is_personal', isPersonal)
            .order('name', { ascending: true })

        if (error) throw error
        return data
    },

    async getCardInvoice(cardId: string, month: string) {
        const supabase = createClient()
        // month no formato YYYY-MM
        const start = `${month}-01`
        const end = new Date(new Date(start).getFullYear(), new Date(start).getMonth() + 1, 0).toISOString().split('T')[0]

        const { data, error } = await supabase
            .from('transactions')
            .select('*, categories(*)')
            .eq('card_id', cardId)
            .gte('date', start)
            .lte('date', end)
            .order('date', { ascending: false })

        if (error) throw error
        return data
    },

    async createCard(payload: CardPayload) {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Usuário não autenticado")

        const { data, error } = await supabase
            .from('cards')
            .insert([{ ...payload, user_id: user.id }])
            .select()
            .single()

        if (error) throw error
        return data
    },

    async updateCard(id: string, payload: Partial<CardPayload>) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('cards')
            .update(payload)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    async deleteCard(id: string) {
        const supabase = createClient()
        const { error } = await supabase
            .from('cards')
            .delete()
            .eq('id', id)

        if (error) throw error
    },

    async getCard(id: string) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('cards')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    },

    async getCardTransactions(cardId: string) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('transactions')
            .select('*, categories(*)')
            .eq('card_id', cardId)
            .order('date', { ascending: false })

        if (error) throw error
        return data
    }
}
