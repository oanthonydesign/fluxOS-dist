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

const formSchema = z.object({
    amount: z.number().positive("Valor deve ser maior que zero."),
})

interface GoalProgressFormProps {
    goal: any
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
}

export function GoalProgressForm({ goal, open, onOpenChange, onSuccess }: GoalProgressFormProps) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 0,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!goal) return
        setIsLoading(true)
        try {
            const newTotal = Number(goal.current_amount) + values.amount
            await goalService.updateGoalProgress(goal.id, newTotal)
            toast.success("Progresso atualizado! Parabéns! 🚀")
            form.reset()
            onSuccess()
            onOpenChange(false)
        } catch (error) {
            toast.error("Erro ao atualizar progresso")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Atualizar Progresso: {goal?.name}</DialogTitle>
                    <DialogDescription>
                        Quanto você economizou hoje para este objetivo?
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor a Somar</FormLabel>
                                    <FormControl>
                                        <MoneyInput
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            placeholder="R$ 0,00"
                                            autoFocus
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="pt-4">
                            <Button type="submit" disabled={isLoading} className="w-full font-bold">
                                {isLoading ? "Salvando..." : "Confirmar Depósito"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
