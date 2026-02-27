"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { AccountTypeProvider } from "@/hooks/use-account-type"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <AccountTypeProvider>
            {/* Fundo Geral da Aplicação - Cinza/Bege suave no light, Dark no dark */}
            {/* min-h-screen para permitir scroll da página inteira */}
            <div className="min-h-screen bg-muted dark:bg-background">

                {/* Sidebar transparente fixa na esquerda */}
                <Sidebar />

                {/* Área Principal - Padding esquerdo para compensar sidebar fixa */}
                <div className="lg:pl-64 flex flex-col min-h-screen transition-all duration-300">

                    {/* Header Transparente Fixo */}
                    {/* Adicionado backdrop-blur sutil para quando o conteúdo passar por baixo */}
                    <div className="sticky top-0 z-40 bg-muted/80 dark:bg-background/80 backdrop-blur-sm">
                        <Header />
                    </div>

                    {/* Main Container */}
                    <main className="flex-1 px-4 pb-4 lg:pl-3 lg:pr-6 lg:pb-6 pt-0">

                        {/* O Container Branco (Card) onde o conteúdo vive */}
                        {/* Cresce com o conteúdo (sem h-full fixo), largura total disponível */}
                        <div className="bg-card rounded-[2rem] border border-border min-h-[calc(100vh-7rem)] flex flex-col relative w-full">

                            {/* Conteúdo Interno */}
                            <div
                                key={pathname}
                                className="p-6 lg:p-10 flex flex-col flex-1"
                            >
                                {children}


                            </div>

                        </div>

                        <footer className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground font-medium w-full">
                            <div className="flex gap-4">
                                <span>Licenciado para Usuário Pro</span>
                                <span className="text-muted-foreground/20">|</span>
                                <span>ID: #906DE34D</span>
                            </div>
                            <div className="hidden sm:block">
                                Financeiro v2.0 • 2026
                            </div>
                        </footer>
                    </main>
                </div>
            </div>
        </AccountTypeProvider>
    )
}
