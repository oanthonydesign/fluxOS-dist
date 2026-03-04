"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Settings,
    LogOut,
    ChevronRight,
    Timer,
    Wallet,
    ArrowRightLeft,
    Target,
    X,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"

const navigationGroups = [
    {
        title: "Principal",
        items: [
            { name: "Visão Geral", href: "/", icon: LayoutDashboard },
        ]
    },
    {
        title: "Financeiro",
        items: [
            {
                name: "Movimentações",
                icon: ArrowRightLeft,
                subItems: [
                    { name: "Lançamentos", href: "/lancamentos" },
                    { name: "Categorias", href: "/categorias" },
                ]
            },
            {
                name: "Carteira",
                icon: Wallet,
                subItems: [
                    { name: "Contas", href: "/contas" },
                    { name: "Cartões", href: "/cartoes" },
                    { name: "Investimentos", href: "/investimentos" },
                ]
            },
            {
                name: "Planejamento",
                icon: Target,
                subItems: [
                    { name: "Contas Fixas", href: "/contas-fixas" },
                    { name: "Objetivos", href: "/objetivos" },
                    { name: "Resumo Anual", href: "/resumo-anual" },
                ]
            },
        ]
    },
    {
        title: "Produtividade",
        items: [
            { name: "Pomodoro", href: "/produtividade/pomodoro", icon: Timer },
        ]
    }
]

function SidebarItem({ item, pathname, onNavigate }: { item: any, pathname: string, onNavigate?: () => void }) {
    const isChildActive = item.subItems ? item.subItems.some((sub: any) => pathname === sub.href) : false
    const [isOpen, setIsOpen] = useState(true)

    if (!item.subItems) {
        const isActive = pathname === item.href
        return (
            <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
            >
                <item.icon className={cn(
                    "mr-3 h-5 w-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )} />
                {item.name}
            </Link>
        )
    }

    return (
        <div className="flex flex-col space-y-1">
            <div className="flex items-center w-full group/header relative">
                <Link
                    href={item.subItems[0].href}
                    onClick={() => { setIsOpen(true); onNavigate?.() }}
                    className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 w-full text-left",
                        isChildActive
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                >
                    <item.icon className={cn(
                        "mr-3 h-5 w-5 transition-colors",
                        isChildActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )} />
                    {item.name}
                </Link>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setIsOpen(!isOpen)
                    }}
                    className="absolute right-2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ChevronRight className={cn("h-4 w-4 transition-transform duration-200", isOpen ? "rotate-90" : "")} />
                </button>
            </div>

            <div className={cn("overflow-hidden transition-all duration-200", isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0")}>
                <div className="flex flex-col relative space-y-1 mt-1 pb-1">
                    {item.subItems.length > 1 && (
                        <div className="absolute left-[21px] top-0 bottom-[18px] w-px bg-border/60 pointer-events-none" />
                    )}

                    {item.subItems.map((subItem: any, idx: number) => {
                        const isSubActive = pathname === subItem.href
                        const isLast = idx === item.subItems.length - 1

                        return (
                            <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={onNavigate}
                                className={cn(
                                    "relative flex items-center py-2 pr-3 pl-[42px] text-sm font-medium rounded-lg transition-all duration-200",
                                    isSubActive
                                        ? "text-primary bg-primary/10"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                            >
                                <div className={cn(
                                    "absolute left-[21px] w-4 border-b border-border/60 pointer-events-none",
                                    isLast ? "top-0 h-1/2 border-l rounded-bl-xl" : "top-1/2 h-px"
                                )} />
                                {subItem.name}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function SidebarContent({ pathname, onNavigate }: { pathname: string, onNavigate?: () => void }) {
    const router = useRouter()
    const supabase = createClient()

    async function handleLogout() {
        await supabase.auth.signOut()
        router.refresh()
        router.push("/login")
    }

    return (
        <div className="flex flex-col h-full">
            <div className="pl-6 pr-3 pt-6 pb-4 flex-shrink-0">
                <div className="flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/fluxos-logo-light.svg"
                        alt="FluxOS Logo"
                        className="h-8 w-auto object-contain dark:hidden block"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/fluxos-logo-dark.svg"
                        alt="FluxOS Logo"
                        className="h-8 w-auto object-contain dark:block hidden"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden pl-6 pr-3 py-2 space-y-6 scrollbar-hide">
                {navigationGroups.map((group) => (
                    <div key={group.title}>
                        <h3 className="px-3 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/60 mb-2">
                            {group.title}
                        </h3>
                        <nav className="space-y-1">
                            {group.items.map((item) => (
                                <SidebarItem key={item.name} item={item} pathname={pathname} onNavigate={onNavigate} />
                            ))}
                        </nav>
                    </div>
                ))}
            </div>

            <div className="mt-auto px-4 py-4 flex items-center justify-between text-muted-foreground border-t border-border/40 bg-muted/5">
                <Link
                    href="/configuracoes"
                    onClick={onNavigate}
                    className={cn(
                        "flex items-center gap-1.5 transition-all text-[11px] font-semibold uppercase tracking-tight hover:text-foreground",
                        pathname === "/configuracoes" && "text-primary"
                    )}
                >
                    <Settings className="h-4 w-4" />
                    Config.
                </Link>

                <div className="w-px h-3 bg-border/60" />

                <ThemeToggle />

                <div className="w-px h-3 bg-border/60" />

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 transition-all text-[11px] font-semibold uppercase tracking-tight hover:text-destructive"
                >
                    <LogOut className="h-4 w-4" />
                    Sair
                </button>
            </div>
        </div>
    )
}

export function Sidebar() {
    const pathname = usePathname()
    const { isOpen, close } = useMobileSidebar()

    // Fecha o sidebar ao mudar de rota (mobile)
    useEffect(() => {
        close()
    }, [pathname])

    return (
        <>
            {/* ── Desktop: sidebar fixa ── */}
            <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-50">
                <SidebarContent pathname={pathname} />
            </aside>

            {/* ── Mobile: overlay + drawer deslizante ── */}
            {/* Overlay escuro */}
            <div
                className={cn(
                    "lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={close}
                aria-hidden="true"
            />

            {/* Drawer */}
            <aside
                className={cn(
                    "lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Botão fechar */}
                <button
                    onClick={close}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Fechar menu"
                >
                    <X className="h-5 w-5" />
                </button>

                <SidebarContent pathname={pathname} onNavigate={close} />
            </aside>
        </>
    )
}
