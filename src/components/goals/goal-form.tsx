"use client"

import { useState } from "react"
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
import { goalService } from "@/lib/services/goals"
import { useAccountType } from "@/hooks/use-account-type"

const formSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
    target_amount: z.number().positive("O valor deve ser maior que zero."),
    current_amount: z.number().min(0, "O valor deve ser positivo."),
})

interface GoalFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
}

export function GoalForm({ open, onOpenChange, onSuccess }: GoalFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { isPersonal } = useAccountType()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            target_amount: 0,
            current_amount: 0,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            await goalService.createGoal({
                name: values.name,
                target_amount: values.target_amount,
                current_amount: values.current_amount,
                is_personal: isPersonal
            })
            toast.success("Meta criada com sucesso!")
            form.reset()
            onSuccess()
            onOpenChange(false)
        } catch (error) {
            toast.error("Erro ao criar meta")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Nova Meta Financeira</DialogTitle>
                    <DialogDescription>
                        Defina um objetivo (Ex: MacBook Pro, Reserva de Emergência).
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome da Meta</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Viagem, Fundo de Reserva..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="target_amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor Alvo (Target)</FormLabel>
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
                            <FormField
                                control={form.control}
                                name="current_amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor já Guardado</FormLabel>
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

                        <DialogFooter className="pt-4">
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? "Salvando..." : "Criar Meta"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
