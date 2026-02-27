"use client"

import { useEffect, useState } from "react"
import { useAccountType } from "@/hooks/use-account-type"
import { categoryService } from "@/lib/services/categories"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Trash2, Tag, Pencil } from "lucide-react"
import { toast } from "sonner"
import { CategoryForm } from "@/components/categories/category-form"
import { DEFAULT_CATEGORIES } from "@/lib/constants/default-categories"

export default function CategoriesPage() {
    const { isPersonal } = useAccountType()
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState<any[]>([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<any>(null)

    async function loadData() {
        setLoading(true)
        try {
            const data = await categoryService.getCategories(isPersonal)
            setCategories(data || [])
        } catch (error) {
            console.error(error)
            toast.error("Erro ao carregar categorias")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [isPersonal])

    function handleEdit(category: any) {
        setEditingCategory(category)
        setIsFormOpen(true)
    }

    function handleCreate() {
        setEditingCategory(null)
        setIsFormOpen(true)
    }

    async function handleDelete(id: string) {
        if (!confirm("Tem certeza que deseja excluir esta categoria? Isso pode afetar transações existentes.")) return
        try {
            await categoryService.deleteCategory(id)
            toast.success("Categoria removida")
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
                        Minhas Categorias {isPersonal ? "Pessoais" : "Empresariais"}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Organize seus lançamentos por tipo de gasto ou ganho.
                    </p>
                </div>
                <Button size="sm" onClick={handleCreate} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Categoria
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {loading ? (
                    [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)
                ) : categories.length === 0 ? (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center text-muted-foreground border border-dashed border-border rounded-xl bg-card/50">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                            <Tag className="h-8 w-8 opacity-40" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">Nenhuma categoria encontrada</h3>
                        <p className="text-sm max-w-sm mb-6">
                            Clique em "Nova Categoria" para começar.
                        </p>
                    </div>
                ) : (
                    categories.map((cat) => (
                        <Card key={cat.id} className="border-border group transition-all">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm"
                                        style={{ backgroundColor: cat.color || '#94a3b8' }}
                                    >
                                        <Tag className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground">{cat.name}</p>
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">Personalizada</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5"
                                        onClick={() => handleEdit(cat)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                                        onClick={() => handleDelete(cat.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <CategoryForm
                open={isFormOpen}
                onOpenChange={(open) => {
                    setIsFormOpen(open)
                    if (!open) setEditingCategory(null)
                }}
                onSuccess={loadData}
                initialData={editingCategory}
            />
        </div>
    )
}
