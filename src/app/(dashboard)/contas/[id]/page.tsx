"use client"

import { useEffect, useState } from "react"
import { useAccountType } from "@/hooks/use-account-type"
import { accountService } from "@/lib/services/accounts"
import { transactionService } from "@/lib/services/transactions"
import { Account } from "@/types/account"
import { formatCurrency, formatDate, cn } from "@/lib/utils"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Trash2, Edit, Filter, Search, Wallet, Building, Building2, Landmark, CreditCard, PiggyBank, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { toast } from "sonner"
import { startOfMonth, endOfMonth } from "date-fns"
import { TransactionForm } from "@/components/transactions/transaction-form"
import { useRouter, useParams } from "next/navigation"

const iconMap: Record<string, any> = {
    Wallet, Building, Building2, Landmark, CreditCard, PiggyBank
}

export default function AccountDetailsPage() {
    const { id } = useParams<{ id: string }>()
    const { isPersonal, selectedMonth } = useAccountType()
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [account, setAccount] = useState<Account | null>(null)
    const [transactions, setTransactions] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])

    const [filterType, setFilterType] = useState<string>("all")
    const [search, setSearch] = useState("")

    // Estado para edição
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
    const [isEditOpen, setIsEditOpen] = useState(false)

    async function loadData() {
        setLoading(true)
        try {
            const start = startOfMonth(selectedMonth).toISOString()
            const end = endOfMonth(selectedMonth).toISOString()

            const [accs, transData] = await Promise.all([
                accountService.getAccounts(),
                transactionService.getTransactionsByDate(isPersonal, start, end),
            ])

            const acc = accs.find(a => a.id === id)
            if (!acc) {
                toast.error("Conta não encontrada.")
                router.push("/contas")
                return
            }
            setAccount(acc)

            // Filter transactions only for this account
            const accountTrans = transData.filter((t: any) => t.account_id === id)
            setTransactions(accountTrans)

            // Extract unique categories from these transactions for the filter
            const cats = Array.from(new Set(accountTrans.filter((t: any) => t.categories).map((t: any) => t.categories.id)))
                .map(catId => accountTrans.find((t: any) => t.categories?.id === catId).categories)
            setCategories(cats)

        } catch (error) {
            console.error(error)
            toast.error("Erro ao carregar dados")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
        window.addEventListener('transaction-created', loadData)
        return () => window.removeEventListener('transaction-created', loadData)
    }, [isPersonal, selectedMonth, id])

    async function handleDelete(transId: string) {
        if (!confirm("Tem certeza que deseja excluir esta transação?")) return
        try {
            await transactionService.deleteTransaction(transId)
            toast.success("Transação excluída")
            loadData()
        } catch (error) {
            toast.error("Erro ao excluir")
        }
    }

    const filteredTransactions = transactions.filter(t => {
        const matchesType = filterType === "all" || t.type === filterType
        const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase())
        return matchesType && matchesSearch
    })

    const IconComponent = account ? (iconMap[account.icon] || Wallet) : Wallet

    return (
        <div className="space-y-[46px]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => router.push('/contas')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        {loading || !account ? (
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-48" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                                    style={{ backgroundColor: `${account.color}20`, color: account.color }}
                                >
                                    <IconComponent className="h-5 w-5" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                        {account.name}
                                    </h1>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        {account.bank} • Exibindo registros de {selectedMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Buscar lançamento..."
                            className="pl-9 h-9 w-[180px] bg-card border-border text-xs font-medium focus-visible:ring-primary/20"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-[110px] h-9 text-xs font-medium border-border bg-card text-foreground">
                            <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos Tipos</SelectItem>
                            <SelectItem value="income">Entradas</SelectItem>
                            <SelectItem value="expense">Saídas</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card className="border-border overflow-hidden bg-card">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow className="hover:bg-transparent border-border">
                                <TableHead className="w-[120px] text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Data</TableHead>
                                <TableHead className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Descrição</TableHead>
                                <TableHead className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Categoria</TableHead>
                                <TableHead className="text-right text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Valor</TableHead>
                                <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                [1, 2, 3, 4].map((i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                ))
                            ) : filteredTransactions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-40 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2 opacity-50">
                                            <Filter className="h-8 w-8 text-muted-foreground" />
                                            <p className="text-sm font-medium text-muted-foreground">Nenhum lançamento encontrado nesta conta para este mês.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredTransactions.map((transaction) => (
                                    <TableRow key={transaction.id} className="group border-border hover:bg-muted/30 transition-colors">
                                        <TableCell className="text-muted-foreground font-medium whitespace-nowrap text-xs">
                                            {formatDate(transaction.date)}
                                        </TableCell>
                                        <TableCell className="font-semibold text-foreground text-sm">
                                            {transaction.description}
                                            {transaction.installments > 1 && (
                                                <span className="ml-2 text-[10px] text-muted-foreground font-normal">
                                                    ({transaction.installment_number}/{transaction.installments})
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {transaction.categories ? (
                                                <Badge
                                                    variant="secondary"
                                                    className="font-bold text-[10px] uppercase tracking-tighter"
                                                    style={{
                                                        backgroundColor: `${transaction.categories.color}15`,
                                                        color: transaction.categories.color,
                                                        borderColor: `${transaction.categories.color}20`
                                                    }}
                                                >
                                                    {transaction.categories.name}
                                                </Badge>
                                            ) : (
                                                <span className="text-muted-foreground">—</span>
                                            )}
                                        </TableCell>
                                        <TableCell className={cn(
                                            "text-right font-black text-sm",
                                            transaction.type === 'income' ? "text-success" : "text-foreground"
                                        )}>
                                            {transaction.type === 'expense' && "- "}{formatCurrency(Number(transaction.amount))}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                    onClick={() => {
                                                        setSelectedTransaction(transaction)
                                                        setIsEditOpen(true)
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                                                    onClick={() => handleDelete(transaction.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {isEditOpen && selectedTransaction && (
                <TransactionForm
                    open={isEditOpen}
                    onOpenChange={setIsEditOpen}
                    onSuccess={loadData}
                    initialData={selectedTransaction}
                />
            )}
        </div>
    )
}
