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
import { investmentService } from "@/lib/services/investments"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "O nome deve ter pelo menos 2 caracteres.",
    }),
    type: z.enum(["cripto", "fii", "acoes", "renda_fixa", "outros"]),
    amount: z.number().positive({
        message: "O valor deve ser um número positivo.",
    }),
})

interface InvestmentFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData?: any | null
    onSuccess: () => void
}

export function InvestmentForm({ open, onOpenChange, initialData, onSuccess }: InvestmentFormProps) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: "acoes",
            amount: 0,
        },
    })

    useEffect(() => {
        if (open) {
            if (initialData) {
                form.reset({
                    name: initialData.name,
                    type: initialData.type,
                    amount: Number(initialData.amount),
                })
            } else {
                form.reset({
                    name: "",
                    type: "acoes",
                    amount: 0,
                })
            }
        }
    }, [open, initialData, form])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            if (initialData) {
                await investmentService.updateInvestment(initialData.id, values)
                toast.success("Investimento atualizado!")
            } else {
                await investmentService.createInvestment(values)
                toast.success("Investimento registrado!")
            }

            form.reset()
            onSuccess()
            onOpenChange(false)
        } catch (error) {
            toast.error("Erro ao salvar investimento")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Editar Investimento" : "Novo Investimento"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Atualize o saldo ou informações do seu ativo." : "Adicione um novo ativo à sua carteira de investimentos."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome do Ativo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: MXRF11, Bitcoin, Tesouro Direto..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

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
                                            <SelectItem value="acoes">Ações</SelectItem>
                                            <SelectItem value="fii">FIIs</SelectItem>
                                            <SelectItem value="cripto">Criptomoedas</SelectItem>
                                            <SelectItem value="renda_fixa">Renda Fixa</SelectItem>
                                            <SelectItem value="outros">Outros</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="amount" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor Atual (Saldo)</FormLabel>
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
                        </div>

                        <DialogFooter className="pt-2">
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? "Salvando..." : (initialData ? "Salvar Alterações" : "Registrar Investimento")}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
