"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { toast } from "sonner"
import { profileService } from "@/lib/services/profiles"
import { User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const profileSchema = z.object({
    full_name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
    email: z.string().email(),
})

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [profile, setProfile] = useState<any>(null)
    const router = useRouter()
    const supabase = createClient()

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            full_name: "",
            email: "",
        },
    })

    async function loadProfile() {
        setIsLoading(true)
        try {
            const data = await profileService.getProfile()
            const { data: { user } } = await supabase.auth.getUser()

            if (data) {
                setProfile(data)
                form.reset({
                    full_name: data.full_name || "",
                    email: user?.email || "",
                })
            }
        } catch (error) {
            toast.error("Erro ao carregar perfil")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadProfile()
    }, [])

    async function onSubmit(values: z.infer<typeof profileSchema>) {
        setIsSaving(true)
        try {
            await profileService.updateProfile({
                full_name: values.full_name,
            })
            toast.success("Perfil atualizado com sucesso!")
            loadProfile()
        } catch (error) {
            toast.error("Erro ao salvar alterações")
        } finally {
            setIsSaving(false)
        }
    }


    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="h-8 w-48 bg-muted animate-pulse rounded-md" />
                <Card className="border-border">
                    <div className="h-64 w-full bg-muted/50 animate-pulse" />
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-[46px]">
            <div>
                <h1 className="text-2xl font-black tracking-tight text-foreground">Configurações</h1>
                <p className="text-muted-foreground text-sm">Gerencie sua conta e preferências do sistema.</p>
            </div>

            <Card className="border-border rounded-xl max-w-2xl bg-card shadow-sm">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
                            <User className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold">Dados do Perfil</CardTitle>
                            <CardDescription className="text-sm">Informações básicas da sua conta.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="full_name"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1.5">
                                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nome Completo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Seu nome"
                                                    className="rounded-lg border-muted bg-background focus:ring-primary/20"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-[10px]" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1.5">
                                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">E-mail (Não editável)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    value={field.value}
                                                    disabled
                                                    className="rounded-lg border-muted bg-muted/30 opacity-70 cursor-not-allowed font-medium"
                                                />
                                            </FormControl>
                                            <FormDescription className="text-[10px] leading-tight italic">
                                                Para sua segurança, o e-mail não pode ser alterado diretamente.
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full sm:w-auto font-bold px-8 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {isSaving ? "Salvando..." : "Salvar Alterações"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

