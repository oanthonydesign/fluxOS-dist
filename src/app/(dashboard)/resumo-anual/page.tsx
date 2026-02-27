"use client"

import { useAccountType } from "@/hooks/use-account-type"
import { useEffect, useState } from "react"
import { dashboardService } from "@/lib/services/dashboard"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts"
import { TrendingUp, TrendingDown, Calendar as CalendarIcon, AlertCircle, Wallet } from "lucide-react"

export default function ResumoAnualPage() {
    const { isPersonal } = useAccountType()
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState<{ totalIncome: number, totalExpense: number, netRevenue: number, monthlyStats: any[] }>({
        totalIncome: 0,
        totalExpense: 0,
        netRevenue: 0,
        monthlyStats: []
    })

    const year = new Date().getFullYear()

    useEffect(() => {
        async function loadData() {
            setLoading(true)
            try {
                const data = await dashboardService.getYearlyStats(isPersonal, year)
                setStats(data as any)
            } catch (error) {
                console.error("Erro ao carregar resumo anual:", error)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [isPersonal, year])

    return (
        <div className="space-y-[46px]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Resumo Anual {isPersonal ? "Pessoal" : "Empresarial"} ({year})
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Visão consolidada do fluxo financeiro ao longo do ano.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 xl:gap-8 mt-4">
                <div className="flex flex-col gap-4 col-span-1">
                    <Card className="border-border overflow-hidden transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 bg-muted/50">
                            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Faturamento Bruto
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent className="pt-4">
                            {loading ? (
                                <Skeleton className="h-10 w-full" />
                            ) : (
                                <div className="text-2xl font-bold text-foreground truncate">
                                    {formatCurrency(stats.totalIncome)}
                                </div>
                            )}
                            <p className="text-[10px] text-muted-foreground mt-1">
                                Soma total de entradas em {year}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border overflow-hidden transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 bg-muted/50">
                            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Saídas de Caixa
                            </CardTitle>
                            <TrendingDown className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent className="pt-4">
                            {loading ? (
                                <Skeleton className="h-10 w-full" />
                            ) : (
                                <div className="text-2xl font-bold text-foreground truncate">
                                    {formatCurrency(stats.totalExpense)}
                                </div>
                            )}
                            <p className="text-[10px] text-muted-foreground mt-1">
                                Soma total de saídas em {year}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border overflow-hidden transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 bg-muted/50">
                            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Faturamento Líquido
                            </CardTitle>
                            <Wallet className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent className="pt-4">
                            {loading ? (
                                <Skeleton className="h-10 w-full" />
                            ) : (
                                <div className={`text-2xl font-bold truncate ${stats.netRevenue >= 0 ? "text-foreground" : "text-red-500"}`}>
                                    {formatCurrency(stats.netRevenue)}
                                </div>
                            )}
                            <p className="text-[10px] text-muted-foreground mt-1">
                                Entradas menos Saídas em {year}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-border col-span-1 md:col-span-2 shadow-sm flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold">Fluxo por Mês</CardTitle>
                        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="flex-1 min-h-[300px] w-full mt-4">
                        {loading ? (
                            <Skeleton className="h-full w-full rounded-xl" />
                        ) : stats.monthlyStats.length === 0 ? (
                            <div className="h-full flex items-center justify-center border border-dashed rounded-lg">
                                <p className="text-muted-foreground">Sem dados para este ano ainda.</p>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.monthlyStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" strokeOpacity={0.2} />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#888888', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#888888', fontSize: 12 }}
                                        tickFormatter={(value) => `R$ ${Intl.NumberFormat('pt-BR', { notation: "compact", compactDisplay: "short" }).format(value)}`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#888888', opacity: 0.1 }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                const income = payload.find(p => p.dataKey === 'income')?.value || 0
                                                const expense = payload.find(p => p.dataKey === 'expense')?.value || 0
                                                return (
                                                    <div className="bg-background border border-border p-3 rounded-lg shadow-xl">
                                                        <p className="font-medium text-sm mb-2 pb-2 border-b border-border">{payload[0].payload.name}</p>
                                                        <div className="space-y-1">
                                                            <div className="flex justify-between gap-4">
                                                                <span className="text-muted-foreground text-xs">Entradas</span>
                                                                <span className="text-emerald-500 font-bold text-xs">{formatCurrency(Number(income))}</span>
                                                            </div>
                                                            <div className="flex justify-between gap-4">
                                                                <span className="text-muted-foreground text-xs">Saídas</span>
                                                                <span className="text-red-500 font-bold text-xs">{formatCurrency(Number(expense))}</span>
                                                            </div>
                                                            <div className="flex justify-between gap-4 pt-1 mt-1 border-t border-border">
                                                                <span className="text-muted-foreground text-xs">Líquido</span>
                                                                <span className="text-foreground font-bold text-xs">{formatCurrency(Number(income) - Number(expense))}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            return null
                                        }}
                                    />
                                    <Bar
                                        dataKey="income"
                                        name="Entradas"
                                        radius={[4, 4, 0, 0]}
                                        maxBarSize={40}
                                        fill="#10b981"
                                    />
                                    <Bar
                                        dataKey="expense"
                                        name="Saídas"
                                        radius={[4, 4, 0, 0]}
                                        maxBarSize={40}
                                        fill="#ef4444"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
