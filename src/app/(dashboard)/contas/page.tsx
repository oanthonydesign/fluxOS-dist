"use client"

import { useEffect, useState } from "react"
import { useAccountType } from "@/hooks/use-account-type"
import { accountService } from "@/lib/services/accounts"
import { transactionService } from "@/lib/services/transactions"
import { Account } from "@/types/account"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Building, Building2, CreditCard, Landmark, PiggyBank, Wallet, Trash2, Edit, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { toast } from "sonner"
import { AccountForm } from "@/components/accounts/account-form"
import { startOfMonth, endOfMonth } from "date-fns"
import { useRouter } from "next/navigation"

const iconMap: Record<string, any> = {
    Wallet, Building, Building2, Landmark, CreditCard, PiggyBank
}

export default function AccountsPage() {
    const { isPersonal, selectedMonth } = useAccountType()
    const [loading, setLoading] = useState(true)
    const [accounts, setAccounts] = useState<Account[]>([])
    const [transactions, setTransactions] = useState<any[]>([])

    // For calculating total balance without period filter, we need ALL transactions.
    const [allTransactions, setAllTransactions] = useState<any[]>([])

    // States for account form
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(undefined)

    const router = useRouter()

    async function loadData() {
        setLoading(true)
        try {
            const start = startOfMonth(selectedMonth).toISOString()
            const end = endOfMonth(selectedMonth).toISOString()

            const [accs, periodTrans, allTrans] = await Promise.all([
                accountService.getAccounts(isPersonal ? 'personal' : 'business'),
                transactionService.getTransactionsByDate(isPersonal, start, end),
                transactionService.getTransactions(isPersonal)
            ])

            setAccounts(accs || [])
            setTransactions(periodTrans || [])
            setAllTransactions(allTrans || [])
        } catch (error) {
            console.error(error)
            toast.error("Erro ao carregar dados")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [isPersonal, selectedMonth])

    async function handleDelete(id: string, e: React.MouseEvent) {
        e.stopPropagation()
        if (!confirm("Tem certeza que deseja excluir esta conta?")) return
        try {
            await accountService.deleteAccount(id)
            toast.success("Conta excluída")
            loadData()
        } catch (error: any) {
            toast.error(error.message || "Erro ao excluir conta")
        }
    }

    function handleEdit(acc: Account, e: React.MouseEvent) {
        e.stopPropagation()
        setSelectedAccount(acc)
        setIsFormOpen(true)
    }

    function openNewAccount() {
        setSelectedAccount(undefined)
        setIsFormOpen(true)
    }

    const accountStats = accounts.map(acc => {
        // Saldo total = Sem filtro de data
        const accAllTrans = allTransactions.filter(t => t.account_id === acc.id)
        const totalIncome = accAllTrans.filter(t => t.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0)
        const totalExpense = accAllTrans.filter(t => t.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0)
        const currentBalance = totalIncome - totalExpense

        // Totais do período
        const accPeriodTrans = transactions.filter(t => t.account_id === acc.id)
        const periodIncome = accPeriodTrans.filter(t => t.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0)
        const periodExpense = accPeriodTrans.filter(t => t.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0)

        return {
            ...acc,
            currentBalance,
            periodIncome,
            periodExpense
        }
    })

    return (
        <div className="space-y-[46px]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Minhas Contas
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Gerencie suas contas bancárias e veja o saldo de cada uma.
                    </p>
                </div>
                <Button onClick={openNewAccount} className="font-bold gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Conta
                </Button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <Card key={i} className="border-border">
                            <CardContent className="p-6 space-y-4">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-8 w-1/2" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : accounts.length === 0 ? (
                <Card className="border-border border-dashed bg-transparent shadow-none">
                    <CardContent className="flex flex-col items-center justify-center text-center space-y-4 py-16">
                        <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center">
                            <Wallet className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold text-lg text-foreground">Nenhuma conta encontrada</h3>
                            <p className="text-sm text-muted-foreground max-w-md mx-auto">
                                Você ainda não possui contas cadastradas. Cadastre sua primeira conta para começar a organizar seus lançamentos.
                            </p>
                        </div>
                        <Button onClick={openNewAccount} variant="outline" className="font-bold">
                            Cadastrar Primeira Conta
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {accountStats.map(acc => {
                        const IconComponent = iconMap[acc.icon] || Wallet
                        return (
                            <Card
                                key={acc.id}
                                className="border-border border-l-4 hover:border-border transition-colors cursor-pointer group bg-card overflow-hidden shadow-none"
                                style={{ borderLeftColor: acc.color }}
                                onClick={() => router.push(`/contas/${acc.id}`)}
                            >
                                <CardHeader className="p-6 pb-2">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                                style={{ backgroundColor: `${acc.color}20`, color: acc.color }}
                                            >
                                                <IconComponent className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base">{acc.name}</CardTitle>
                                                <CardDescription className="text-xs font-medium">{acc.bank}</CardDescription>
                                            </div>
                                        </div>

                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                onClick={(e) => handleEdit(acc, e)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                onClick={(e) => handleDelete(acc.id, e)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 pt-4 space-y-6">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Saldo Atual</p>
                                        <h3 className="text-3xl font-bold text-foreground">
                                            {formatCurrency(acc.currentBalance)}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1">
                                                <ArrowUpRight className="h-3 w-3 text-green-500" />
                                                Receitas Mês
                                            </p>
                                            <p className="text-sm font-bold text-success">
                                                {formatCurrency(acc.periodIncome)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1">
                                                <ArrowDownRight className="h-3 w-3 text-red-500" />
                                                Despesas Mês
                                            </p>
                                            <p className="text-sm font-bold text-destructive">
                                                {formatCurrency(acc.periodExpense)}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}

            <AccountForm
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
                onSuccess={loadData}
                initialData={selectedAccount}
            />
        </div>
    )
}
