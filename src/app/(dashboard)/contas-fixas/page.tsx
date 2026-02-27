"use client"

import { useEffect, useState } from "react"
import { useAccountType } from "@/hooks/use-account-type"
import { recurringService } from "@/lib/services/recurring"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Trash2, CalendarClock, AlertCircle, Pencil } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { RecurringForm } from "@/components/recurring/recurring-form"

export default function RecurringPage() {
    const { isPersonal } = useAccountType()
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState<any[]>([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<any | null>(null)

    async function loadData() {
        setLoading(true)
        try {
            const data = await recurringService.getRecurring(isPersonal)
            setItems(data || [])
        } catch (error) {
            console.error(error)
            toast.error("Erro ao carregar contas fixas")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [isPersonal])

    async function handleDelete(id: string) {
        if (!confirm("Deseja remover esta conta fixa? Ela não gerará mais contas no seu fluxo de caixa mensal além do que já foi lançado reais.")) return
        try {
            await recurringService.deleteRecurring(id)
            toast.success("Conta fixa removida")
            loadData()
        } catch (error) {
            toast.error("Erro ao remover")
        }
    }

    function handleEdit(item: any) {
        setEditingItem(item)
        setIsFormOpen(true)
    }

    function handleOpenNew() {
        setEditingItem(null)
        setIsFormOpen(true)
    }

    return (
        <div className="space-y-[46px]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Contas Fixas {isPersonal ? "Pessoais" : "Empresariais"}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Gastos ou ganhos que se repetem todo mês.
                    </p>
                </div>
                <Button size="sm" className="gap-2" onClick={handleOpenNew}>
                    <Plus className="h-4 w-4" />
                    Nova Conta Fixa
                </Button>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-3 text-blue-600 dark:text-blue-400">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-xs font-medium">
                    As transações de contas fixas influenciam diretamente seu Saldo e Resumo do Mês como projeções automáticas. Se o valor mudar com frequência, o ideal é lançá-las à mão nas transações normais.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    [1, 2, 3].map(i => <Skeleton key={i} className="h-40 w-full" />)
                ) : items.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed border-border rounded-xl">
                        <CalendarClock className="h-10 w-10 mx-auto mb-2 opacity-20" />
                        <p className="text-sm">Nenhuma conta fixa cadastrada.</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <Card key={item.id} className="border-border transition-all">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-tighter">
                                        Todo dia {item.day_of_month}
                                    </Badge>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10"
                                            onClick={() => handleEdit(item)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardTitle className="text-base font-bold mt-2">{item.description}</CardTitle>
                                <CardDescription className="text-xs">
                                    {item.categories?.name || "Sem categoria"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-end justify-between mt-2">
                                    <div className={`text-xl font-bold ${item.type === 'income' ? 'text-green-600 dark:text-green-500' : 'text-foreground'}`}>
                                        {formatCurrency(Number(item.amount))}
                                    </div>
                                    <CalendarClock className="h-5 w-5 text-muted-foreground" />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <RecurringForm
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
                initialData={editingItem}
                onSuccess={loadData}
            />
        </div>
    )
}
