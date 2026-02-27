"use client"

import { useEffect, useState } from "react"
import { useAccountType } from "@/hooks/use-account-type"
import { cardService } from "@/lib/services/cards"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, CreditCard, Trash2, ChevronRight, Pencil } from "lucide-react"
import { toast } from "sonner"
import { CardForm } from "@/components/cards/card-form"
import Link from "next/link"

export default function CardsPage() {
    const { isPersonal } = useAccountType()
    const [loading, setLoading] = useState(true)
    const [cards, setCards] = useState<any[]>([])
    const [editingCard, setEditingCard] = useState<any>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)

    async function loadCards() {
        setLoading(true)
        try {
            const data = await cardService.getCards(isPersonal)
            setCards(data || [])
        } catch (error) {
            console.error(error)
            toast.error("Erro ao carregar cartões")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCards()
    }, [isPersonal])

    async function handleDelete(id: string) {
        if (!confirm("Tem certeza que deseja excluir este cartão?")) return
        try {
            await cardService.deleteCard(id)
            toast.success("Cartão removido")
            loadCards()
        } catch (error) {
            toast.error("Erro ao remover")
        }
    }

    return (
        <div className="space-y-[46px]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Meus Cartões {isPersonal ? "Pessoais" : "Empresariais"}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Gerencie seus cartões de crédito e visualize faturas.
                    </p>
                </div>
                <Button size="sm" onClick={() => setIsFormOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Cartão
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    [1, 2, 3].map(i => <Skeleton key={i} className="h-48 w-full rounded-xl" />)
                ) : cards.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed border-border rounded-xl">
                        <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-20" />
                        <p className="text-sm">Nenhum cartão cadastrado.</p>
                    </div>
                ) : (
                    cards.map((card) => (
                        <div key={card.id} className="group relative">
                            <Card
                                className="h-48 rounded-xl overflow-hidden border-none shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                style={{ backgroundColor: card.color || '#111827' }}
                            >
                                <CardContent className="h-full p-6 flex flex-col justify-between text-white">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-widest opacity-70 font-bold">Nome do Cartão</p>
                                            <h3 className="text-lg font-bold truncate max-w-[150px]">{card.name}</h3>
                                        </div>
                                        <CreditCard className="h-6 w-6 opacity-40" />
                                    </div>

                                    <div className="mt-auto flex justify-between items-end">
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-widest opacity-70 font-bold">Limite Total</p>
                                            <p className="text-lg font-bold">{formatCurrency(card.limit || 0)}</p>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="text-right">
                                                <p className="text-[10px] uppercase tracking-widest opacity-70 font-bold">Final</p>
                                                <p className="font-mono font-bold">•••• {card.last_digits}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] uppercase tracking-widest opacity-70 font-bold">Vence Dia</p>
                                                <p className="font-bold">{card.due_day}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setEditingCard(card)
                                        setIsFormOpen(true)
                                    }}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleDelete(card.id)
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <Link
                                href={`/cartoes/${card.id}`}
                                className="mt-3 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors px-2"
                            >
                                Ver Fatura
                                <ChevronRight className="h-3 w-3" />
                            </Link>
                        </div>
                    ))
                )}
            </div>

            <CardForm
                open={isFormOpen}
                initialData={editingCard}
                onOpenChange={(open) => {
                    setIsFormOpen(open)
                    if (!open) setEditingCard(null)
                }}
                onSuccess={loadCards}
            />
        </div>
    )
}
