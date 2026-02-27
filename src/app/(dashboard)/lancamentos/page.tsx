"use client"

import { useEffect, useState } from "react"
import { useAccountType } from "@/hooks/use-account-type"
import { transactionService } from "@/lib/services/transactions"
import { categoryService } from "@/lib/services/categories"
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
import { Trash2, Edit, Filter, Search, X, Download } from "lucide-react"
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
import { startOfMonth, endOfMonth, format } from "date-fns"
import { TransactionForm } from "@/components/transactions/transaction-form"
import { downloadCSV } from "@/lib/export-utils"

export default function TransactionsPage() {
    const { isPersonal, selectedMonth } = useAccountType()
    const [loading, setLoading] = useState(true)
    const [transactions, setTransactions] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])

    const [filterType, setFilterType] = useState<string>("all")
    const [filterCategory, setFilterCategory] = useState<string>("all")
    const [search, setSearch] = useState("")

    // Estado para edição
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
    const [isEditOpen, setIsEditOpen] = useState(false)

    async function loadData() {
        setLoading(true)
        try {
            const start = startOfMonth(selectedMonth).toISOString()
            const end = endOfMonth(selectedMonth).toISOString()

            const [transData, catsData] = await Promise.all([
                transactionService.getTransactionsByDate(isPersonal, start, end),
                categoryService.getCategories(isPersonal)
            ])
            setTransactions(transData || [])
            setCategories(catsData || [])
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
    }, [isPersonal, selectedMonth])

    async function handleDelete(id: string) {
        if (!confirm("Tem certeza que deseja excluir esta transação?")) return
        try {
            await transactionService.deleteTransaction(id)
            toast.success("Transação excluída")
            loadData()
        } catch (error) {
            toast.error("Erro ao excluir")
        }
    }

    function handleExport() {
        if (transactions.length === 0) {
            toast.error("Nenhum dado para exportar")
            return
        }

        const exportData = transactions.map(t => ({
            Data: t.date,
            Descrição: t.description,
            Conta: t.accounts?.name || '---',
            Valor: t.amount,
            Tipo: t.type === 'income' ? 'Entrada' : 'Saída',
            Categoria: t.categories?.name || '---',
            Parcela: t.installments > 1 ? `${t.installment_number}/${t.installments}` : '1/1'
        }))

        const fileName = `lancamentos-${isPersonal ? 'pessoal' : 'empresa'}-${format(selectedMonth, 'yyyy-MM')}`
        downloadCSV(exportData, fileName)
        toast.success("CSV exportado com sucesso!")
    }

    const filteredTransactions = transactions.filter(t => {
        const matchesType = filterType === "all" || t.type === filterType
        const matchesCategory = filterCategory === "all" || t.category_id === filterCategory
        const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase())
        return matchesType && matchesCategory && matchesSearch
    })

    return (
        <div className="space-y-[46px]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Lançamentos {isPersonal ? "Pessoais" : "Empresariais"}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Exibindo registros de {selectedMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9 gap-2 text-xs font-bold border-border" onClick={handleExport}>
                        <Download className="h-3.5 w-3.5" />
                        Exportar CSV
                    </Button>

                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Buscar descrição..."
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

                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger className="w-[130px] h-9 text-xs font-medium border-border bg-card text-foreground">
                            <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas Cat.</SelectItem>
                            {categories.map(c => (
                                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {(filterType !== "all" || filterCategory !== "all" || search !== "") && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 px-2 text-muted-foreground hover:text-foreground"
                            onClick={() => {
                                setFilterType("all")
                                setFilterCategory("all")
                                setSearch("")
                            }}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            <Card className="border-border overflow-hidden bg-card">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow className="hover:bg-transparent border-border">
                                <TableHead className="w-[120px] text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Data</TableHead>
                                <TableHead className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Descrição</TableHead>
                                <TableHead className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Conta</TableHead>
                                <TableHead className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Categoria</TableHead>
                                <TableHead className="text-right text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Valor</TableHead>
                                <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                [1, 2, 3, 4, 5].map((i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                ))
                            ) : filteredTransactions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-40 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2 opacity-50">
                                            <Filter className="h-8 w-8 text-muted-foreground" />
                                            <p className="text-sm font-medium text-muted-foreground">Nenhum lançamento encontrado neste mês.</p>
                                            <Button variant="link" size="sm" onClick={() => { setFilterType("all"); setFilterCategory("all"); setSearch("") }}>Limpar filtros</Button>
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
                                            {transaction.accounts ? (
                                                <Badge
                                                    variant="outline"
                                                    className="font-bold text-[10px] tracking-tighter"
                                                    style={{
                                                        borderColor: `${transaction.accounts.color}40`,
                                                        color: transaction.accounts.color,
                                                    }}
                                                >
                                                    {transaction.accounts.name}
                                                </Badge>
                                            ) : (
                                                <span className="text-muted-foreground text-[10px] tracking-tight">Sem conta</span>
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
                                            transaction.type === 'income' ? "text-green-600 dark:text-green-400" : "text-foreground"
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

            <TransactionForm
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                onSuccess={loadData}
                initialData={selectedTransaction}
            />
        </div>
    )
}
