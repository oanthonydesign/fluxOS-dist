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
import { toast } from "sonner"
import { cardService } from "@/lib/services/cards"
import { useAccountType } from "@/hooks/use-account-type"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Nome do cartão deve ter pelo menos 2 caracteres.",
    }),
    last_digits: z.string().length(4, {
        message: "Informe os 4 últimos dígitos.",
    }).regex(/^\d+$/, "Apenas números."),
    limit: z.number().min(0, {
        message: "O limite deve ser um número positivo.",
    }),
    color: z.string().min(1),
    closing_day: z.string().refine(val => Number(val) >= 1 && Number(val) <= 31, "Dia inválido."),
    due_day: z.string().refine(val => Number(val) >= 1 && Number(val) <= 31, "Dia inválido."),
})

interface CardFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
    initialData?: any
}

export function CardForm({ open, onOpenChange, onSuccess, initialData }: CardFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { isPersonal } = useAccountType()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            last_digits: "",
            limit: 0,
            color: "#111827",
            closing_day: "5",
            due_day: "15",
        },
    })

    useEffect(() => {
        if (initialData && open) {
            form.reset({
                name: initialData.name,
                last_digits: initialData.last_digits,
                limit: initialData.limit || 0,
                color: initialData.color,
                closing_day: String(initialData.closing_day),
                due_day: String(initialData.due_day),
            })
        } else if (open) {
            form.reset({
                name: "",
                last_digits: "",
                limit: 0,
                color: "#111827",
                closing_day: "5",
                due_day: "15",
            })
        }
    }, [initialData, open, form])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            if (initialData) {
                await cardService.updateCard(initialData.id, {
                    ...values,
                    closing_day: Number(values.closing_day),
                    due_day: Number(values.due_day),
                })
                toast.success("Cartão atualizado com sucesso!")
            } else {
                await cardService.createCard({
                    ...values,
                    closing_day: Number(values.closing_day),
                    due_day: Number(values.due_day),
                    is_personal: isPersonal
                })
                toast.success("Cartão cadastrado com sucesso!")
            }
            onSuccess()
            onOpenChange(false)
        } catch (error) {
            toast.error("Erro ao salvar cartão")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Editar Cartão" : "Novo Cartão"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Atualize as informações do seu cartão." : "Adicione um cartão de crédito para gerenciar suas faturas."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome do Cartão</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Nubank, Inter..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="last_digits"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Últimos 4 dígitos</FormLabel>
                                        <FormControl>
                                            <Input placeholder="0000" maxLength={4} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="limit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Limite Total</FormLabel>
                                        <FormControl>
                                            <MoneyInput
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                placeholder="0,00"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cor do Cartão</FormLabel>
                                    <FormControl>
                                        <Input type="color" className="p-1 h-10 w-full" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="closing_day"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dia do Fechamento</FormLabel>
                                        <FormControl>
                                            <Input type="number" min={1} max={31} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="due_day"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dia do Vencimento</FormLabel>
                                        <FormControl>
                                            <Input type="number" min={1} max={31} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="pt-4">
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? "Salvando..." : initialData ? "Atualizar Cartão" : "Salvar Cartão"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
