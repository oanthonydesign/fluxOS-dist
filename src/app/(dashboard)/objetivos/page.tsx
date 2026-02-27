"use client"

import { useEffect, useState } from "react"
import { useAccountType } from "@/hooks/use-account-type"
import { goalService } from "@/lib/services/goals"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Plus, Target, Trash2, TrendingUp, HandCoins } from "lucide-react"
import { toast } from "sonner"
import { GoalForm } from "@/components/goals/goal-form"
import { GoalProgressForm } from "@/components/goals/goal-progress-form"

export default function GoalsPage() {
    const { isPersonal } = useAccountType()
    const [loading, setLoading] = useState(true)
    const [goals, setGoals] = useState<any[]>([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [selectedGoal, setSelectedGoal] = useState<any>(null)
    const [isProgressOpen, setIsProgressOpen] = useState(false)

    async function loadData() {
        setLoading(true)
        try {
            const data = await goalService.getGoals(isPersonal)
            // Filter out internal revenue goal
            const filtered = (data || []).filter((g: any) => g.name !== "Meta de Faturamento Mensal")
            setGoals(filtered)
        } catch (error) {
            console.error(error)
            toast.error("Erro ao carregar objetivos")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [isPersonal])

    async function handleDelete(id: string) {
        if (!confirm("Remover esta meta?")) return
        try {
            await goalService.deleteGoal(id)
            toast.success("Meta removida")
            loadData()
        } catch (error) {
            toast.error("Erro ao remover")
        }
    }

    return (
        <div className="space-y-[46px]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Meus Objetivos {isPersonal ? "Pessoais" : "Empresariais"}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Defina e acompanhe seus objetivos financeiros de médio e longo prazo.
                    </p>
                </div>
                <Button size="sm" onClick={() => setIsFormOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Objetivo
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    [1, 2, 3].map(i => <Skeleton key={i} className="h-48 w-full rounded-xl" />)
                ) : goals.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-muted-foreground border border-dashed border-border rounded-xl">
                        <Target className="h-12 w-12 mx-auto mb-3 opacity-20" />
                        <p className="text-sm font-medium">Bora economizar? Crie seu primeiro objetivo!</p>
                    </div>
                ) : (
                    goals.map((goal) => {
                        const percentage = Math.min(Math.round((Number(goal.current_amount) / Number(goal.target_amount)) * 100), 100)
                        return (
                            <Card key={goal.id} className="border-border overflow-hidden group">
                                <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                                    <div className="space-y-1">
                                        <CardTitle className="text-base font-bold text-foreground">{goal.name}</CardTitle>
                                        <p className="text-[10px] uppercase font-bold tracking-wider text-primary/70">{isPersonal ? 'Objetivo Pessoal' : 'Investimento Empresa'}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5"
                                            onClick={() => {
                                                setSelectedGoal(goal)
                                                setIsProgressOpen(true)
                                            }}
                                        >
                                            <HandCoins className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                                            onClick={() => handleDelete(goal.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-xs text-muted-foreground font-medium">Faltam {formatCurrency(Number(goal.target_amount) - Number(goal.current_amount))}</p>
                                            <div className="text-2xl font-black text-foreground mt-0.5">
                                                {percentage}%
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">Total Alvo</p>
                                            <p className="text-xs font-bold text-foreground">{formatCurrency(Number(goal.target_amount))}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 pt-1">
                                        <Progress value={percentage} className="h-2.5 bg-muted" />
                                        <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                                            <span>Economizado</span>
                                            <span className="text-primary">{formatCurrency(Number(goal.current_amount))}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })
                )}
            </div>

            <GoalForm
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
                onSuccess={loadData}
            />

            <GoalProgressForm
                goal={selectedGoal}
                open={isProgressOpen}
                onOpenChange={setIsProgressOpen}
                onSuccess={loadData}
            />
        </div>
    )
}
