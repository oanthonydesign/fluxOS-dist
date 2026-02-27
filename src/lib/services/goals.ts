import { createClient } from '@/lib/supabase/client'
import { GoalPayload } from '@/types/models'

export const goalService = {
    async getGoals(isPersonal: boolean) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('goals')
            .select('*')
            .eq('is_personal', isPersonal)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    },

    async createGoal(payload: GoalPayload) {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Usuário não autenticado")

        const { data, error } = await supabase
            .from('goals')
            .insert([{ ...payload, user_id: user.id }])
            .select()
            .single()

        if (error) throw error
        return data
    },

    async updateGoalProgress(id: string, currentAmount: number) {
        const supabase = createClient()
        const { error } = await supabase
            .from('goals')
            .update({ current_amount: currentAmount })
            .eq('id', id)

        if (error) throw error
    },

    async updateGoal(id: string, payload: Partial<GoalPayload>) {
        const supabase = createClient()
        const { error } = await supabase
            .from('goals')
            .update(payload)
            .eq('id', id)

        if (error) throw error
    },

    async deleteGoal(id: string) {
        const supabase = createClient()
        const { error } = await supabase
            .from('goals')
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
