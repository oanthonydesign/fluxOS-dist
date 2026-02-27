import { createClient } from '@/lib/supabase/client'

export const profileService = {
    async getProfile() {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return null

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (error) throw error
        return data
    },

    async updateProfile(payload: { full_name: string }) {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) throw new Error('User not found')

        const { data, error } = await supabase
            .from('profiles')
            .update({
                ...payload,
                updated_at: new Date().toISOString()
            })
            .eq('id', user.id)
            .select()
            .single()

        if (error) throw error
        return data
    }
}
