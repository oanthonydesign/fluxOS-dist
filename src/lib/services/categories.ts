import { createClient } from '@/lib/supabase/client'
import { DEFAULT_CATEGORIES } from '@/lib/constants/default-categories'

export const categoryService = {
    async getCategories(isPersonal: boolean) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('is_personal', isPersonal)
            .order('name', { ascending: true })

        if (error) throw error

        // Se o usuário não tem categorias, injeta as padrões automaticamente (apenas PF)
        if (data && data.length === 0 && isPersonal) {
            await this.seedDefaults(isPersonal)
            const { data: newData, error: newError } = await supabase
                .from('categories')
                .select('*')
                .eq('is_personal', isPersonal)
                .order('name', { ascending: true })

            if (newError) throw newError
            return newData
        }

        return data
    },

    async seedDefaults(isPersonal: boolean) {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const categoriesToInsert = DEFAULT_CATEGORIES.map(cat => ({
            ...cat,
            user_id: user.id,
            is_personal: isPersonal
        }))

        const { error } = await supabase
            .from('categories')
            .insert(categoriesToInsert)

        if (error) throw error
    },

    async createCategory(payload: { name: string, icon?: string, color?: string, is_personal: boolean }) {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Usuário não autenticado")

        const { data, error } = await supabase
            .from('categories')
            .insert([{ ...payload, user_id: user.id }])
            .select()
            .single()

        if (error) throw error
        return data
    },

    async updateCategory(id: string, payload: { name: string, icon?: string, color?: string }) {
        const supabase = createClient()
        const { error } = await supabase
            .from('categories')
            .update(payload)
            .eq('id', id)

        if (error) throw error
    },

    async deleteCategory(id: string) {
        const supabase = createClient()
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
