"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoneyInput } from "@/components/ui/money-input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { transactionService } from "@/lib/services/transactions"
import { categoryService } from "@/lib/services/categories"
import { cardService } from "@/lib/services/cards"
import { accountService } from "@/lib/services/accounts"
import { useAccountType } from "@/hooks/use-account-type"
import { createClient } from "@/lib/supabase/client"
import { addMonths } from "date-fns"

const formSchema = z.object({
    type: z.enum(["income", "expense", "transfer"]),
    description: z.string().min(2, {
        message: "Descrição deve ter pelo menos 2 caracteres.",
    }),
    amount: z.number().positive({
        message: "O valor deve ser um número positivo.",
    }),
    date: z.string(),
    account_id: z.string().min(1, { message: "Selecione uma conta" }),
    target_account_id: z.string().optional(),
    category_id: z.string().optional(),
    card_id: z.string().optional(),
    is_installment: z.boolean(),
    installments_count: z.string().optional(),
}).refine(data => {
    if (data.type === 'transfer' && (!data.target_account_id || data.target_account_id === 'none')) {
        return false;
    }
    return true;
}, {
    message: "Selecione a conta de destino para a transferência.",
    path: ["target_account_id"]
}).refine(data => {
    if (data.type === 'transfer' && data.account_id === data.target_account_id) {
        return false;
    }
    return true;
}, {
    message: "A conta de destino não pode ser igual à de origem.",
    path: ["target_account_id"]
})

interface TransactionFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
    initialData?: any // Para edição
}

export function TransactionForm({ open, onOpenChange, onSuccess, initialData }: TransactionFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState<any[]>([])
    const [cards, setCards] = useState<any[]>([])
    const [accounts, setAccounts] = useState<any[]>([])
    const { isPersonal, accountType } = useAccountType()
    const supabase = createClient()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "expense",
            description: "",
            amount: 0,
            date: new Date().toISOString().split('T')[0],
            account_id: "",
            target_account_id: "none",
            category_id: "none",
            card_id: "none",
            is_installment: false,
            installments_count: "2",
        },
    })

    // Popula o formulário se for edição
    useEffect(() => {
        if (initialData && open) {
            form.reset({
                type: initialData.type,
                description: initialData.description,
                amount: initialData.amount,
                date: initialData.date,
                account_id: initialData.account_id || "",
                target_account_id: "none",
                category_id: initialData.category_id || "none",
                card_id: initialData.card_id || "none",
                is_installment: false, // Edição geralmente não altera parcelamento antigo
                installments_count: String(initialData.installments || 2)
            })
        } else if (open) {
            form.reset({
                type: "expense",
                description: "",
                amount: 0,
                date: new Date().toISOString().split('T')[0],
                account_id: accounts.length > 0 ? accounts[0].id : "",
                target_account_id: "none",
                category_id: "none",
                card_id: "none",
                is_installment: false,
                installments_count: "2",
            })
        }
    }, [initialData, open, form, accounts])

    useEffect(() => {
        async function loadData() {
            try {
                const [cats, crds, accs] = await Promise.all([
                    categoryService.getCategories(isPersonal),
                    cardService.getCards(isPersonal),
                    accountService.getAccounts(accountType)
                ])
                setCategories(cats || [])
                setCards(crds || [])
                setAccounts(accs || [])

                // Set default account if not editing
                if (!initialData && accs && accs.length > 0) {
                    form.setValue('account_id', accs[0].id)
                }
            } catch (error) {
                console.error("Erro ao carregar dados:", error)
            }
        }
        if (open) {
            loadData()
        }
    }, [isPersonal, accountType, open])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            const baseAmount = values.amount
            const card_id = values.card_id === "none" ? null : values.card_id
            let category_id = values.category_id === "none" ? null : values.category_id

            if (values.type === 'transfer') {
                // Find or use a category for transfer
                const transferCat = categories.find(c => c.name.toLowerCase().includes('transferência') || c.name.toLowerCase().includes('transferencia'))
                category_id = transferCat ? transferCat.id : null
            }

            if (initialData) {
                // MODO EDIÇÃO
                await transactionService.updateTransaction(initialData.id, {
                    type: values.type,
                    description: values.description,
                    amount: baseAmount,
                    date: values.date,
                    category_id,
                    card_id,
                    account_id: values.account_id,
                })
                toast.success("Lançamento atualizado!")
            } else {
                // MODO CRIAÇÃO
                if (values.type === 'transfer') {
                    await transactionService.createTransfer({
                        amount: baseAmount,
                        date: values.date,
                        sourceAccountId: values.account_id,
                        targetAccountId: values.target_account_id!,
                        description: values.description,
                        category_id: category_id!,
                        is_personal: isPersonal
                    })
                    toast.success("Transferência realizada!")
                } else if (values.is_installment && values.type === 'expense') {
                    const count = Number(values.installments_count)
                    const installmentAmount = baseAmount / count
                    const startDate = new Date(values.date)

                    const transactionsToCreate = []
                    for (let i = 0; i < count; i++) {
                        transactionsToCreate.push({
                            user_id: user?.id,
                            type: values.type,
                            description: `${values.description} (${i + 1}/${count})`,
                            amount: installmentAmount,
                            date: addMonths(startDate, i).toISOString().split('T')[0],
                            category_id,
                            card_id,
                            account_id: values.account_id,
                            is_personal: isPersonal,
                            installments: count,
                            installment_number: i + 1,
                        })
                    }
                    const { error } = await supabase.from('transactions').insert(transactionsToCreate)
                    if (error) throw error
                    toast.success("Parcelamento criado!")
                } else {
                    await transactionService.createTransaction({
                        user_id: user?.id,
                        type: values.type,
                        description: values.description,
                        amount: baseAmount,
                        date: values.date,
                        category_id,
                        card_id,
                        account_id: values.account_id,
                        is_personal: isPersonal
                    })
                    toast.success("Transação salva!")
                }
            }

            onSuccess()
            onOpenChange(false)
        } catch (error) {
            toast.error("Erro ao salvar")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const isInstallment = form.watch("is_installment")
    const type = form.watch("type")

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Editar Lançamento" : "Nova Transação"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Atualize as informações deste lançamento." : `Registre uma movimentação na conta ${isPersonal ? "Pessoal" : "Empresarial"}.`}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="type" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="income" className="text-green-600 font-medium">Entrada</SelectItem>
                                            <SelectItem value="expense" className="text-red-600 font-medium">Saída</SelectItem>
                                            {!initialData && <SelectItem value="transfer" className="text-blue-600 font-medium">Transferência</SelectItem>}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="date" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        </div>

                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: Assinatura Adobe, Freela..." {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <div className={type === 'transfer' ? "grid grid-cols-2 gap-4" : ""}>
                            <FormField control={form.control} name="account_id" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{type === 'transfer' ? 'Conta de Origem' : 'Conta'}</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione a conta" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {accounts.map((acc) => (
                                                <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
                                            ))}
                                            {accounts.length === 0 && (
                                                <SelectItem value="none" disabled>Nenhuma conta cadastrada</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            {type === 'transfer' && (
                                <FormField control={form.control} name="target_account_id" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Conta de Destino</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione a conta" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {accounts.map((acc) => (
                                                    <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            )}
                        </div>

                        <div className={type === 'transfer' ? "" : "grid grid-cols-2 gap-4"}>
                            <FormField control={form.control} name="amount" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor Total</FormLabel>
                                    <FormControl>
                                        <MoneyInput
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            placeholder="0,00"
                                            className="font-bold"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            {type !== 'transfer' && (
                                <FormField control={form.control} name="category_id" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Categoria</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="none">Nenhuma</SelectItem>
                                                {categories.map((c) => (
                                                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )} />
                            )}
                        </div>

                        {type !== 'transfer' && (
                            <FormField control={form.control} name="card_id" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cartão (Opcional)</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Nenhum" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="none">Nenhum (Dinheiro/Pix)</SelectItem>
                                            {cards.map((card) => (
                                                <SelectItem key={card.id} value={card.id}>{card.name} (•••• {card.last_digits})</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />
                        )}

                        {!initialData && type === 'expense' && (
                            <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-4">
                                <FormField control={form.control} name="is_installment" render={({ field }) => (
                                    <FormItem className="flex items-center justify-between space-y-0">
                                        <div>
                                            <FormLabel className="text-sm font-bold">Parcelar lançamento?</FormLabel>
                                            <FormDescription className="text-[10px]">Dividir o valor em vários meses</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )} />

                                {isInstallment && (
                                    <FormField control={form.control} name="installments_count" render={({ field }) => (
                                        <FormItem className="flex items-center justify-between space-y-0 border-t border-border pt-3">
                                            <FormLabel className="text-xs">Número de parcelas</FormLabel>
                                            <FormControl>
                                                <Input type="number" min={2} max={72} className="w-20 h-8 text-right font-bold" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )} />
                                )}
                            </div>
                        )}

                        <DialogFooter className="pt-2">
                            <Button type="submit" disabled={isLoading} className="w-full shadow-lg font-bold">
                                {isLoading ? "Salvando..." : initialData ? "Atualizar Lançamento" : "Confirmar Lançamento"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
