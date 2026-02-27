"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAccountType } from "@/hooks/use-account-type"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { accountService } from "@/lib/services/accounts"
import { BankType, BANK_OPTIONS, Account } from "@/types/account"
import { Building, Building2, CreditCard, Landmark, PiggyBank, Wallet } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Nome deve ter pelo menos 2 caracteres.",
    }),
    bank: z.string().min(1, { message: "Selecione um banco." }),
    color: z.string().optional()
})

interface AccountFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
    initialData?: Account
}

export function AccountForm({ open, onOpenChange, onSuccess, initialData }: AccountFormProps) {
    const { accountType } = useAccountType()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            bank: "",
            color: "#6B7280"
        },
    })

    useEffect(() => {
        if (initialData && open) {
            form.reset({
                name: initialData.name,
                bank: initialData.bank,
                color: initialData.color || "#6B7280"
            })
        } else if (open) {
            form.reset({
                name: "",
                bank: "",
                color: "#6B7280"
            })
        }
    }, [initialData, open, form])

    const watchBank = form.watch("bank")

    // Auto-preencher cor ao selecionar banco
    useEffect(() => {
        if (watchBank) {
            const selectedBank = BANK_OPTIONS.find(b => b.bank === watchBank)
            if (selectedBank && !initialData) {
                form.setValue("color", selectedBank.color)
            }
        }
    }, [watchBank, initialData, form])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const selectedBank = BANK_OPTIONS.find(b => b.bank === values.bank)
            const icon = selectedBank ? selectedBank.defaultIcon : 'Wallet'

            if (initialData) {
                await accountService.updateAccount(initialData.id, {
                    name: values.name,
                    bank: values.bank as BankType,
                    color: values.color || selectedBank?.color || '#6B7280',
                    icon: icon
                })
                toast.success("Conta atualizada!")
            } else {
                await accountService.createAccount({
                    name: values.name,
                    bank: values.bank as BankType,
                    color: values.color || selectedBank?.color || '#6B7280',
                    icon: icon,
                    type: accountType
                })
                toast.success("Conta criada!")
            }

            onSuccess()
            onOpenChange(false)
        } catch (error: any) {
            toast.error(error.message || "Erro ao salvar conta")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Editar Conta" : "Nova Conta"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Atualize as informações da sua conta bancária." : "Cadastre uma nova conta para vincular aos seus lançamentos."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome da Conta</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: Conta Nubank, Reserva de Emergência..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="bank" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Banco / Instituição</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o banco" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {BANK_OPTIONS.map((option) => (
                                            <SelectItem key={option.bank} value={option.bank}>
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: option.color }}
                                                    />
                                                    {option.bank}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <DialogFooter className="pt-4">
                            <Button type="submit" disabled={isLoading} className="w-full font-bold">
                                {isLoading ? "Salvando..." : initialData ? "Atualizar Conta" : "Cadastrar Conta"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
