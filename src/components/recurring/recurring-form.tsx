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
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { recurringService } from "@/lib/services/recurring"
import { categoryService } from "@/lib/services/categories"
import { useAccountType } from "@/hooks/use-account-type"
import { createClient } from "@/lib/supabase/client"

const formSchema = z.object({
    type: z.enum(["income", "expense"]),
    description: z.string().min(2, {
        message: "Descrição deve ter pelo menos 2 caracteres.",
    }),
    amount: z.number().positive({
        message: "O valor deve ser um número positivo.",
    }),
    day_of_month: z.string().refine((val) => {
        const n = Number(val)
        return n >= 1 && n <= 31
    }, "Dia deve ser entre 1 e 31"),
    category_id: z.string().optional(),
})

interface RecurringFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData?: any | null
    onSuccess: () => void
}

export function RecurringForm({ open, onOpenChange, initialData, onSuccess }: RecurringFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState<any[]>([])
    const { isPersonal } = useAccountType()
    const supabase = createClient()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "expense",
            description: "",
            amount: 0,
            day_of_month: "1",
            category_id: "none",
        },
    })

    useEffect(() => {
        if (open) {
            async function loadCategories() {
                try {
                    const data = await categoryService.getCategories(isPersonal)
                    setCategories(data || [])
                } catch (error) {
                    console.error(error)
                }
            }
            loadCategories()

            if (initialData) {
                form.reset({
                    type: initialData.type,
                    description: initialData.description,
                    amount: Number(initialData.amount),
                    day_of_month: initialData.day_of_month.toString(),
                    category_id: initialData.category_id || "none",
                })
            } else {
                form.reset({
                    type: "expense",
                    description: "",
                    amount: 0,
                    day_of_month: "1",
                    category_id: "none",
                })
            }
        }
    }, [open, initialData, isPersonal, form])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()

            const payload = {
                user_id: user?.id,
                type: values.type,
                description: values.description,
                amount: values.amount,
                day_of_month: Number(values.day_of_month),
                category_id: values.category_id === "none" ? null : values.category_id,
                is_personal: isPersonal
            }

            if (initialData) {
                await recurringService.updateRecurring(initialData.id, payload)
                toast.success("Conta fixa atualizada com sucesso!")
            } else {
                await recurringService.createRecurring(payload)
                toast.success("Conta fixa criada com sucesso!")
            }

            form.reset()
            onSuccess()
            onOpenChange(false)
        } catch (error) {
            toast.error("Erro ao salvar conta fixa")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Editar Conta Fixa" : "Nova Conta Fixa"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Edite as configurações da sua conta recorrente." : "Cadastre um lançamento que se repete mensalmente."}
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
                                            <SelectItem value="income" className="text-green-600">Entrada</SelectItem>
                                            <SelectItem value="expense" className="text-red-600">Saída</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="day_of_month" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dia do Mês</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={1} max={31} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: Aluguel, Internet..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="amount" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor</FormLabel>
                                    <FormControl>
                                        <MoneyInput
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            placeholder="0,00"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="category_id" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoria</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
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
                        </div>

                        <DialogFooter className="pt-2">
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? "Salvando..." : (initialData ? "Salvar Alterações" : "Salvar Conta Fixa")}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
