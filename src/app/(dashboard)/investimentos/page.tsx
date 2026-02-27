"use client"

import { useEffect, useState } from "react"
import { useAccountType } from "@/hooks/use-account-type"
import { investmentService } from "@/lib/services/investments"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Trash2, ShieldAlert, Briefcase, TrendingUp, Bitcoin, Building2, Landmark, Wallet, Pencil } from "lucide-react"
import { toast } from "sonner"
import { InvestmentForm } from "@/components/investments/investment-form"

const TYPE_ICONS: Record<string, any> = {
    'cripto': Bitcoin,
    'fii': Building2,
    'acoes': TrendingUp,
    'renda_fixa': Landmark,
    'outros': Wallet
}

const TYPE_LABELS: Record<string, string> = {
    'cripto': 'Criptomoedas',
    'fii': 'Fundos Imobiliários',
    'acoes': 'Ações',
    'renda_fixa': 'Renda Fixa',
    'outros': 'Outros'
}

export default function InvestmentsPage() {
    const { isPersonal } = useAccountType()
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState<any[]>([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<any | null>(null)

    async function loadData() {
        setLoading(true)
        try {
            const data = await investmentService.getInvestments()
            setItems(data || [])
        } catch (error) {
            console.error(error)
            toast.error("Erro ao carregar investimentos")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [isPersonal])

    async function handleDelete(id: string) {
        if (!confirm("Deseja remover este investimento do seu patrimônio?")) return
        try {
            await investmentService.deleteInvestment(id)
            toast.success("Investimento removido")
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

    const totalInvested = items.reduce((acc, curr) => acc + Number(curr.amount), 0)

    // Agrupamento por tipo
    const typeDistribution = items.reduce((acc, curr) => {
        acc[curr.type] = (acc[curr.type] || 0) + Number(curr.amount)
        return acc
    }, {} as Record<string, number>)

    return (
        <div className="space-y-[46px]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Investimentos {isPersonal ? "Pessoais" : "Empresariais"}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Gerencie seus ativos alocados.
                    </p>
                </div>
                <Button size="sm" className="gap-2" onClick={handleOpenNew}>
                    <Plus className="h-4 w-4" />
                    Novo Ativo
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-border overflow-hidden transition-all duration-300 col-span-1 md:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 bg-muted/50">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Patrimônio Total
                        </CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="pt-4">
                        {loading ? (
                            <Skeleton className="h-10 w-full" />
                        ) : (
                            <div className="text-2xl font-bold text-foreground truncate">
                                {formatCurrency(totalInvested)}
                            </div>
                        )}
                        <p className="text-[10px] text-muted-foreground mt-1">
                            Soma do saldo de todos ativos
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-border col-span-1 md:col-span-2 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between py-3">
                        <CardTitle className="text-lg font-semibold">Distribuição da Carteira</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="h-[40px] w-full mt-4" />
                        ) : items.length === 0 ? (
                            <p className="text-sm text-muted-foreground mt-4">Nenhum ativo cadastrado para mostrar a distribuição.</p>
                        ) : (
                            <div className="mt-4 space-y-4">
                                <div className="flex h-3 w-full rounded-full overflow-hidden">
                                    {Object.entries(typeDistribution).map(([type, amount]: [string, any], index) => {
                                        const pct = totalInvested > 0 ? (amount / totalInvested) * 100 : 0
                                        const colors = ['bg-primary', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-slate-500']
                                        return (
                                            <div key={type} style={{ width: `${pct}%` }} className={`h-full ${colors[index % colors.length]}`} />
                                        )
                                    })}
                                </div>
                                <div className="flex flex-wrap gap-4 text-xs font-medium text-muted-foreground">
                                    {Object.entries(typeDistribution).map(([type, amount]: [string, any], index) => {
                                        const pct = totalInvested > 0 ? (amount / totalInvested) * 100 : 0
                                        const colorsText = ['text-primary', 'text-blue-500', 'text-emerald-500', 'text-amber-500', 'text-slate-500']
                                        return (
                                            <div key={type} className="flex items-center gap-1.5">
                                                <div className={`w-2 h-2 rounded-full ${colorsText[index % colorsText.length].replace('text-', 'bg-')}`} />
                                                <span className="capitalize">{TYPE_LABELS[type]}</span>
                                                <span className="text-foreground">{pct.toFixed(1)}%</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Lista de Ativos</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        [1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full" />)
                    ) : items.length === 0 ? (
                        <div className="col-span-full py-12 text-center border border-dashed border-border rounded-xl bg-muted/20">
                            <Wallet className="h-10 w-10 mx-auto mb-2 text-muted-foreground opacity-50" />
                            <p className="text-sm text-muted-foreground">Não há investimentos na sua carteira.</p>
                            <Button variant="link" onClick={handleOpenNew} className="mt-2 text-primary">Adicionar o primeiro ativo</Button>
                        </div>
                    ) : (
                        items.map((item) => {
                            const Icon = TYPE_ICONS[item.type] || Wallet
                            return (
                                <Card key={item.id} className="border-border group transition-all hover:bg-muted/10">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    <Pencil className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <CardTitle className="text-base font-bold mt-2">{item.name}</CardTitle>
                                        <CardDescription className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                            {TYPE_LABELS[item.type]}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-xl font-bold text-foreground">
                                            {formatCurrency(Number(item.amount))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })
                    )}
                </div>
            </div>

            <InvestmentForm
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
                initialData={editingItem}
                onSuccess={loadData}
            />
        </div>
    )
}
