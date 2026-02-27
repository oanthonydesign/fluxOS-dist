import { createClient } from '@/lib/supabase/client'
import { RecurringPayload } from '@/types/models'

export const recurringService = {
    async getRecurring(isPersonal: boolean) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('recurring_transactions')
            .select('*, categories(*)')
            .eq('is_personal', isPersonal)
            .order('day_of_month', { ascending: true })

        if (error) throw error
        return data
    },

    async createRecurring(payload: RecurringPayload) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('recurring_transactions')
            .insert([payload])
            .select()
            .single()

        if (error) throw error
        return data
    },

    async updateRecurring(id: string, payload: Partial<RecurringPayload>) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('recurring_transactions')
            .update(payload)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    async deleteRecurring(id: string) {
        const supabase = createClient()
        const { error } = await supabase
            .from('recurring_transactions')
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
