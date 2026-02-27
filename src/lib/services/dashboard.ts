import { createClient } from '@/lib/supabase/client'
import { startOfMonth, endOfMonth, format } from 'date-fns'

export const dashboardService = {
    async getDashboardStats(isPersonal: boolean, selectedMonth: Date) {
        const supabase = createClient()
        const start = format(startOfMonth(selectedMonth), 'yyyy-MM-dd')
        const end = format(endOfMonth(selectedMonth), 'yyyy-MM-dd')

        // Get monthly transactions
        const { data: monthlyData, error: monthlyError } = await supabase
            .from('transactions')
            .select('amount, type')
            .eq('is_personal', isPersonal)
            .gte('date', start)
            .lte('date', end)

        if (monthlyError) throw monthlyError

        // Get total balance (consolidated) up to end of month
        const { data: totalData, error: totalError } = await supabase
            .from('transactions')
            .select('amount, type')
            .eq('is_personal', isPersonal)
            .lte('date', end)

        if (totalError) throw totalError

        // Get active recurring transactions
        const { data: recurringData, error: recurringError } = await supabase
            .from('recurring_transactions')
            .select('amount, type, created_at')
            .eq('is_personal', isPersonal)
            .eq('is_active', true)

        if (recurringError) throw recurringError

        const stats = {
            balance: 0,
            monthlyIncome: 0,
            monthlyExpense: 0
        }

        monthlyData?.forEach((t: any) => {
            if (t.type === 'income') stats.monthlyIncome += Number(t.amount)
            if (t.type === 'expense') stats.monthlyExpense += Number(t.amount)
        })

        totalData?.forEach((t: any) => {
            if (t.type === 'income') stats.balance += Number(t.amount)
            if (t.type === 'expense') stats.balance -= Number(t.amount)
        })

        // Add recurring strictly for the selected month stats and calculate historical balance
        recurringData?.forEach((r: any) => {
            const createdAt = new Date(r.created_at)
            const selMonthStart = startOfMonth(selectedMonth)

            // Apply to monthly stats if valid
            if (startOfMonth(createdAt) <= selMonthStart) {
                if (r.type === 'income') stats.monthlyIncome += Number(r.amount)
                if (r.type === 'expense') stats.monthlyExpense += Number(r.amount)
            }

            // Simulate the impact on overall balance by projecting months passed
            const createdAtMonthStart = startOfMonth(createdAt)
            let months = 0
            if (createdAtMonthStart <= selMonthStart) {
                months = (selMonthStart.getFullYear() - createdAtMonthStart.getFullYear()) * 12 +
                    (selMonthStart.getMonth() - createdAtMonthStart.getMonth()) + 1
            }
            if (months > 0) {
                const totalRec = Number(r.amount) * months
                if (r.type === 'income') stats.balance += totalRec
                if (r.type === 'expense') stats.balance -= totalRec
            }
        })

        return stats
    },

    async getUpcomingBills(isPersonal: boolean, selectedMonth: Date) {
        const supabase = createClient()
        const start = format(startOfMonth(selectedMonth), 'yyyy-MM-dd')
        const end = format(endOfMonth(selectedMonth), 'yyyy-MM-dd')

        const { data: transactions, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('is_personal', isPersonal)
            .gte('date', start)
            .lte('date', end)

        if (error) throw error

        const { data: recurringData, error: recurringError } = await supabase
            .from('recurring_transactions')
            .select('*')
            .eq('is_personal', isPersonal)
            .eq('is_active', true)

        if (recurringError) throw recurringError

        let allBills = [...(transactions || [])]
        const year = selectedMonth.getFullYear()
        const month = selectedMonth.getMonth()

        recurringData?.forEach((r: any) => {
            const createdAt = new Date(r.created_at)
            if (startOfMonth(createdAt) <= startOfMonth(selectedMonth)) {
                allBills.push({
                    ...r,
                    id: 'rec-' + r.id,
                    date: format(new Date(year, month, r.day_of_month), 'yyyy-MM-dd')
                })
            }
        })

        allBills.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        return allBills.slice(0, 5)
    },

    async getCashFlowData(isPersonal: boolean, selectedMonth: Date) {
        const supabase = createClient()
        const start = format(startOfMonth(selectedMonth), 'yyyy-MM-dd')
        const end = format(endOfMonth(selectedMonth), 'yyyy-MM-dd')

        const { data, error } = await supabase
            .from('transactions')
            .select('date, amount, type')
            .eq('is_personal', isPersonal)
            .gte('date', start)
            .lte('date', end)

        if (error) throw error

        const { data: recurringData, error: recurringError } = await supabase
            .from('recurring_transactions')
            .select('amount, type, day_of_month, created_at')
            .eq('is_personal', isPersonal)
            .eq('is_active', true)

        if (recurringError) throw recurringError

        const dailyData: Record<string, { name: string, income: number, expense: number }> = {}

        data?.forEach((t: any) => {
            const day = format(new Date(t.date + 'T12:00:00'), 'dd/MM')
            if (!dailyData[day]) dailyData[day] = { name: day, income: 0, expense: 0 }
            if (t.type === 'income') dailyData[day].income += Number(t.amount)
            if (t.type === 'expense') dailyData[day].expense += Number(t.amount)
        })

        const year = selectedMonth.getFullYear()
        const month = selectedMonth.getMonth()

        recurringData?.forEach((r: any) => {
            const createdAt = new Date(r.created_at)
            if (startOfMonth(createdAt) <= startOfMonth(selectedMonth)) {
                // Determine day, handling months with fewer days safely edge case
                let d = r.day_of_month;
                const endDay = endOfMonth(selectedMonth).getDate();
                if (d > endDay) d = endDay;

                const dayObj = new Date(year, month, d)
                const dayStr = format(dayObj, 'dd/MM')

                if (!dailyData[dayStr]) dailyData[dayStr] = { name: dayStr, income: 0, expense: 0 }
                if (r.type === 'income') dailyData[dayStr].income += Number(r.amount)
                if (r.type === 'expense') dailyData[dayStr].expense += Number(r.amount)
            }
        })

        return Object.values(dailyData).sort((a, b) => a.name.localeCompare(b.name))
    },

    async getYearlyStats(isPersonal: boolean, year: number) {
        const supabase = createClient()
        const start = `${year}-01-01`
        const end = `${year}-12-31`

        const { data: transactions, error } = await supabase
            .from('transactions')
            .select('date, amount, type')
            .eq('is_personal', isPersonal)
            .gte('date', start)
            .lte('date', end)

        if (error) throw error

        const { data: recurringData, error: recurringError } = await supabase
            .from('recurring_transactions')
            .select('amount, type, created_at')
            .eq('is_personal', isPersonal)
            .eq('is_active', true)

        if (recurringError) throw recurringError

        // Initialize 12 months
        const monthlyStats = Array.from({ length: 12 }, (_, i) => ({
            name: format(new Date(year, i, 1), 'MMM'),
            monthIndex: i,
            income: 0,
            expense: 0
        }))

        let totalIncome = 0
        let totalExpense = 0

        transactions?.forEach((t: any) => {
            // Fix timezone discrepancy for date strings
            const month = parseInt(t.date.split('-')[1]) - 1
            const amt = Number(t.amount)

            if (t.type === 'income') {
                monthlyStats[month].income += amt
                totalIncome += amt
            } else if (t.type === 'expense') {
                monthlyStats[month].expense += amt
                totalExpense += amt
            }
        })

        recurringData?.forEach((r: any) => {
            const createdAt = new Date(r.created_at)
            const createdYear = createdAt.getFullYear()
            const createdMonth = createdAt.getMonth()

            for (let i = 0; i < 12; i++) {
                // If recurring was created in a past year, or in current year but on/before this month
                if (createdYear < year || (createdYear === year && createdMonth <= i)) {
                    if (r.type === 'income') {
                        monthlyStats[i].income += Number(r.amount)
                        totalIncome += Number(r.amount)
                    } else if (r.type === 'expense') {
                        monthlyStats[i].expense += Number(r.amount)
                        totalExpense += Number(r.amount)
                    }
                }
            }
        })

        return {
            totalIncome,
            totalExpense,
            netRevenue: totalIncome - totalExpense,
            monthlyStats
        }
    }
}
