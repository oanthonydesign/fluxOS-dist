"use client"

import { useState, useEffect } from "react"
import { goalService } from "@/lib/services/goals"
import { useAccountType } from "@/hooks/use-account-type"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoneyInput } from "@/components/ui/money-input"
import { formatCurrency } from "@/lib/utils"
import { Target, TrendingUp, AlertCircle, Edit2, Check } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

interface RevenueGoalProps {
    currentRevenue: number
}

const GOAL_NAME = "Meta de Faturamento Mensal"

export function RevenueGoal({ currentRevenue }: RevenueGoalProps) {
    const { isPersonal } = useAccountType()
    const [goal, setGoal] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [editAmount, setEditAmount] = useState<number>(0)
    const supabase = createClient()

    useEffect(() => {
        loadGoal()
    }, [isPersonal])

    async function loadGoal() {
        setLoading(true)
        try {
            const data = await goalService.getGoals(isPersonal)
            const faturamentoGoal = data?.find((g: any) => g.name === GOAL_NAME)
            if (faturamentoGoal) {
                setGoal(faturamentoGoal)
                setEditAmount(Number(faturamentoGoal.target_amount))
            } else {
                setGoal(null)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleSaveGoal() {
        try {
            if (editAmount <= 0) return toast.error("A meta deve ser maior que zero")

            const { data: { user } } = await supabase.auth.getUser()

            if (goal) {
                await goalService.updateGoal(goal.id, { target_amount: editAmount })
                toast.success("Meta atualizada!")
            } else {
                await goalService.createGoal({
                    user_id: user?.id,
                    name: GOAL_NAME,
                    target_amount: editAmount,
                    current_amount: 0,
                    is_personal: isPersonal
                })
                toast.success("Meta criada!")
            }
            setIsEditing(false)
            loadGoal()
        } catch (error) {
            toast.error("Erro ao salvar a meta")
        }
    }

    if (loading) {
        return <div className="animate-pulse h-32 bg-muted/50 rounded-xl w-full"></div>
    }

    if (!goal || isEditing) {
        return (
            <Card className="border-border overflow-hidden transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 bg-muted/50">
                    <div>
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Definir Meta de Faturamento Mensal
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="flex items-center gap-2">
                        <MoneyInput
                            value={editAmount}
                            onValueChange={setEditAmount}
                            placeholder="R$ 10.000,00"
                        />
                        <Button size="icon" onClick={handleSaveGoal} className="shrink-0">
                            <Check className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    const target = Number(goal.target_amount)
    const percentage = target > 0 ? (currentRevenue / target) * 100 : 0
    const overGoal = percentage > 100
    // O termômetro visualmente pode ficar completo (100%)
    const barWidth = Math.min(percentage, 100)

    return (
        <Card className="border-border overflow-hidden transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2 bg-muted/50">
                <CardTitle className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    Meta
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-muted" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="pt-3">
                <div className="flex flex-col gap-2">
                    {/* Valor da Meta */}
                    <div className="text-lg font-bold text-foreground">
                        {formatCurrency(target)}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-1000 rounded-full"
                            style={{ width: `${barWidth}%` }}
                        />
                    </div>

                    {/* Porcentagem */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary">
                            {percentage.toFixed(0)}%
                        </span>
                    </div>

                    {/* Status Phrase */}
                    <div className="text-[10px] text-muted-foreground font-medium leading-tight">
                        {overGoal ? (
                            <p className="text-emerald-500 font-bold">
                                Superada em {formatCurrency(currentRevenue - target)} 🚀
                            </p>
                        ) : (
                            <p>
                                Falta {formatCurrency(target - currentRevenue)}
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
