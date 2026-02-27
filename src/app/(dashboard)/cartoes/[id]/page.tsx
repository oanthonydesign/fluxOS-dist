"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { cardService } from "@/lib/services/cards"
import { transactionService } from "@/lib/services/transactions"
import { formatCurrency, formatDate, cn } from "@/lib/utils"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Trash2, Edit, Filter, Search, X, ChevronLeft } from "lucide-react"
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
import { TransactionForm } from "@/components/transactions/transaction-form"

interface CardData {
    id: string
    name: string
    last_digits: string
    color: string
    closing_day: number
    due_day: number
}

export default function CardTransactionsPage() {
    const params = useParams()
    const router = useRouter()
    const cardId = params?.id as string

    const [loading, setLoading] = useState(true)
    const [card, setCard] = useState<CardData | null>(null)
    const [transactions, setTransactions] = useState<any[]>([])

    // Filtros
    const [filterCategory, setFilterCategory] = useState<string>("all")
    const [search, setSearch] = useState("")

    // Estado para edição
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
    const [isEditOpen, setIsEditOpen] = useState(false)

    async function loadData() {
        if (!cardId) return
        setLoading(true)
        try {
            const [cardData, transData] = await Promise.all([
                cardService.getCard(cardId),
                cardService.getCardTransactions(cardId)
            ])
            setCard(cardData)
            setTransactions(transData || [])
        } catch (error) {
            console.error(error)
            toast.error("Erro ao carregar faturas")
            router.push("/cartoes")
        } finally {
            setLoading(false)
        }
    }

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

    useEffect(() => {
        loadData()
        window.addEventListener('transaction-created', loadData)
        return () => window.removeEventListener('transaction-created', loadData)
    }, [cardId])

    const filteredTransactions = transactions.filter(t => {
        const matchesCategory = filterCategory === "all" || t.category_id === filterCategory
        const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase())
        return matchesCategory && matchesSearch
    })

    // Extrair categorias únicas das transações para o filtro
    const uniqueCategories = Array.from(new Set(transactions.map(t => JSON.stringify(t.categories)))).map(s => JSON.parse(s)).filter(c => c)

    return (
        <div className="space-y-[46px]">
            <div className="space-y-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 -ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => router.back()}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Voltar para Cartões
                </Button>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        {loading ? (
                            <Skeleton className="h-8 w-48 mb-2" />
                        ) : (
                            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                                Fatura - {card?.name}
                                <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-md border border-border">
                                    Final {card?.last_digits}
                                </span>
                            </h1>
                        )}
                        <p className="text-muted-foreground text-sm">
                            Gerencie todas as transações associadas a este cartão.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Buscar descrição..."
                                className="pl-9 h-9 w-[180px] bg-card border-border text-xs font-medium focus-visible:ring-primary/20"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <Select value={filterCategory} onValueChange={setFilterCategory}>
                            <SelectTrigger className="w-[130px] h-9 text-xs font-medium border-border bg-card text-foreground">
                                <SelectValue placeholder="Categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas Cat.</SelectItem>
                                {uniqueCategories.map(c => (
                                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {(filterCategory !== "all" || search !== "") && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 px-2 text-muted-foreground hover:text-foreground"
                                onClick={() => {
                                    setFilterCategory("all")
                                    setSearch("")
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
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
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                [1, 2, 3, 4, 5].map((i) => (
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
                                            <p className="text-sm font-medium text-muted-foreground">Nenhuma transação encontrada neste cartão.</p>
                                            <Button variant="link" size="sm" onClick={() => { setFilterCategory("all"); setSearch("") }}>Limpar filtros</Button>
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
                                        <TableCell className="text-right font-black text-sm text-foreground">
                                            {formatCurrency(Number(transaction.amount))}
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
