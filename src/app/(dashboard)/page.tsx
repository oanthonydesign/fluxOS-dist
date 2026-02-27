"use client"

import { useAccountType } from "@/hooks/use-account-type"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    TrendingUp,
    TrendingDown,
    Wallet,
    Calendar,
    ArrowUpRight,
    Target
} from "lucide-react"
import { useEffect, useState } from "react"
import { dashboardService } from "@/lib/services/dashboard"
import { goalService } from "@/lib/services/goals"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { formatCurrency } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { CashFlowChart } from "@/components/dashboard/cashflow-chart"
import { Progress } from "@/components/ui/progress"
import { RevenueGoal } from "@/components/dashboard/revenue-goal"

export default function DashboardPage() {
    const { isPersonal, selectedMonth } = useAccountType()
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        balance: 0,
        monthlyIncome: 0,
        monthlyExpense: 0
    })
    const [upcoming, setUpcoming] = useState<any[]>([])
    const [chartData, setChartData] = useState<any[]>([])
    const [goals, setGoals] = useState<any[]>([])

    const currentMonthName = format(selectedMonth, "MMMM", { locale: ptBR })
    const capitalizedMonth = currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1)

    async function loadData() {
        setLoading(true)
        try {
            const [statsData, upcomingData, flowData, goalsData] = await Promise.all([
                dashboardService.getDashboardStats(isPersonal, selectedMonth),
                dashboardService.getUpcomingBills(isPersonal, selectedMonth),
                dashboardService.getCashFlowData(isPersonal, selectedMonth),
                goalService.getGoals(isPersonal)
            ])
            setStats(statsData)
            setUpcoming(upcomingData)
            setChartData(flowData)

            // Filter out internal revenue goal from general objectives
            const filteredGoals = (goalsData || []).filter((g: any) => g.name !== "Meta de Faturamento Mensal")
            setGoals(filteredGoals)
        } catch (error) {
            console.error("Erro ao carregar dados do dashboard:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()

        window.addEventListener('transaction-created', loadData)
        return () => window.removeEventListener('transaction-created', loadData)
    }, [isPersonal, selectedMonth])

    return (
        <div>
            {/* Cabeçalho da página com espaçamento de 46px para o conteúdo */}
            <div className="mb-[46px]">
                <h1 className="text-2xl font-bold tracking-tight text-foreground transition-all duration-500">
                    Visão Geral {isPersonal ? "Pessoal" : "Empresarial"}
                </h1>
                <p className="text-muted-foreground text-sm">
                    Acompanhe seu fluxo de caixa e metas financeiras.
                </p>
            </div>

            {/* Container principal dos cards com espaçamento vertical de 16px padronizado */}
            <div className="flex flex-col gap-4">

                {/* Grid Superior: Stats - Gap 16px */}
                <div className={`grid gap-4 grid-cols-1 ${isPersonal ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
                    <Card className="border-border overflow-hidden transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 bg-muted/50">
                            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Saldo Consolidado</CardTitle>
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="pt-4">
                            {loading ? (
                                <Skeleton className="h-8 w-3/4" />
                            ) : (
                                <div className="text-2xl font-bold">{formatCurrency(stats.balance)}</div>
                            )}
                            <p className="text-[10px] text-muted-foreground font-medium mt-1">
                                Até o fim deste mês
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border overflow-hidden transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 bg-green-50/30 dark:bg-green-900/10">
                            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">Entradas {capitalizedMonth}</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent className="pt-4">
                            {loading ? (
                                <Skeleton className="h-8 w-3/4" />
                            ) : (
                                <div className="text-2xl font-bold">{formatCurrency(stats.monthlyIncome)}</div>
                            )}
                            <p className="text-[10px] text-muted-foreground mt-1">
                                Total recebido neste período
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border overflow-hidden transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 bg-red-50/30 dark:bg-red-900/10">
                            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">Saídas {capitalizedMonth}</CardTitle>
                            <TrendingDown className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent className="pt-4">
                            {loading ? (
                                <Skeleton className="h-8 w-3/4" />
                            ) : (
                                <div className="text-2xl font-bold">{formatCurrency(stats.monthlyExpense)}</div>
                            )}
                            <p className="text-[10px] text-muted-foreground mt-1">
                                Total gasto neste período
                            </p>
                        </CardContent>
                    </Card>

                    {!isPersonal && (
                        <RevenueGoal currentRevenue={stats.monthlyIncome} />
                    )}
                </div>

                {/* Grid Inferior: Gráficos e Listas - Gap 16px */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="md:col-span-4 border-border">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Fluxo de Caixa</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            {loading ? (
                                <Skeleton className="h-full w-full" />
                            ) : (
                                <CashFlowChart data={chartData} />
                            )}
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-3 border-border">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-semibold">Lançamentos de {capitalizedMonth}</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                                </div>
                            ) : upcoming.length === 0 ? (
                                <div className="py-8 text-center border border-dashed border-border rounded-lg">
                                    <p className="text-sm text-muted-foreground">Nenhum lançamento para este mês.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {upcoming.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between group cursor-pointer transition-all duration-200 hover:translate-x-1">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                                                    <ArrowUpRight className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-foreground truncate max-w-[120px]">{item.description}</p>
                                                    <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString('pt-BR')}</p>
                                                </div>
                                            </div>
                                            <div className="text-sm font-semibold text-foreground whitespace-nowrap">
                                                {formatCurrency(Number(item.amount))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-7 border-border overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between py-3">
                            <div>
                                <CardTitle className="text-lg font-semibold">Resumo de Objetivos</CardTitle>
                                <p className="text-xs text-muted-foreground">Seus objetivos financeiros atuais</p>
                            </div>
                            <Target className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="grid gap-6 md:grid-cols-3">
                                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}
                                </div>
                            ) : goals.length === 0 ? (
                                <div className="py-6 text-center border border-dashed border-border rounded-lg">
                                    <p className="text-sm text-muted-foreground">Nenhum objetivo ativo cadastrado.</p>
                                </div>
                            ) : (
                                <div className="grid gap-8 md:grid-cols-3">
                                    {goals.slice(0, 3).map((goal) => {
                                        const pct = Math.min(Math.round((Number(goal.current_amount) / Number(goal.target_amount)) * 100), 100)
                                        return (
                                            <div key={goal.id} className="space-y-3">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-sm font-bold text-foreground">{goal.name}</span>
                                                    <span className="text-xs font-black text-primary">{pct}%</span>
                                                </div>
                                                <Progress value={pct} className="h-2 bg-muted" />
                                                <div className="flex justify-between text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                                                    <span>Faltam {formatCurrency(Number(goal.target_amount) - Number(goal.current_amount))}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
