"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
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
import { toast } from "sonner"
import { categoryService } from "@/lib/services/categories"
import { useAccountType } from "@/hooks/use-account-type"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Nome deve ter pelo menos 2 caracteres.",
    }),
    color: z.string().optional(),
    icon: z.string().optional(),
})

interface CategoryFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
    initialData?: any
}

export function CategoryForm({ open, onOpenChange, onSuccess, initialData }: CategoryFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { isPersonal } = useAccountType()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            color: "#3b82f6",
            icon: "tag",
        },
    })

    useEffect(() => {
        if (initialData && open) {
            form.reset({
                name: initialData.name,
                color: initialData.color || "#3b82f6",
                icon: initialData.icon || "tag",
            })
        } else if (open) {
            form.reset({
                name: "",
                color: "#3b82f6",
                icon: "tag",
            })
        }
    }, [initialData, open, form])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            if (initialData) {
                await categoryService.updateCategory(initialData.id, {
                    name: values.name,
                    color: values.color,
                    icon: values.icon,
                })
                toast.success("Categoria atualizada com sucesso!")
            } else {
                await categoryService.createCategory({
                    ...values,
                    is_personal: isPersonal
                })
                toast.success("Categoria criada com sucesso!")
            }
            form.reset()
            onSuccess()
            onOpenChange(false)
        } catch (error) {
            toast.error(initialData ? "Erro ao atualizar categoria" : "Erro ao criar categoria")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
                    <DialogDescription>
                        {initialData ? "Atualize as informações da categoria." : "Crie categorias para organizar seus lançamentos de forma clara."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome da Categoria</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Alimentação, Software..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cor</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-2 items-center">
                                            <Input type="color" className="p-1 h-10 w-20" {...field} />
                                            <span className="text-xs text-gray-500 uppercase">{field.value}</span>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="pt-4">
                            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto font-bold">
                                {isLoading ? "Salvando..." : initialData ? "Atualizar Categoria" : "Salvar Categoria"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
