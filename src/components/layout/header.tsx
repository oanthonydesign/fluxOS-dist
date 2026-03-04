"use client"

import { Button } from "@/components/ui/button"
import { useAccountType } from "@/hooks/use-account-type"
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    Menu
} from "lucide-react"
import { useState } from "react"
import { TransactionForm } from "@/components/transactions/transaction-form"
import { format, addMonths, subMonths } from "date-fns"
import { ptBR } from "date-fns/locale"

export function Header() {
    const { isPersonal, toggleAccountType, selectedMonth, setSelectedMonth } = useAccountType()
    const { toggle: toggleMobileSidebar } = useMobileSidebar()
    const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false)

    const handlePrevMonth = () => setSelectedMonth(subMonths(selectedMonth, 1))
    const handleNextMonth = () => setSelectedMonth(addMonths(selectedMonth, 1))

    return (
        <header className="h-20 bg-transparent sticky top-0 z-40">
            <div className="max-w-full mx-auto px-4 lg:pl-3 lg:pr-6 h-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="lg:hidden text-muted-foreground hover:bg-muted dark:hover:bg-muted" onClick={toggleMobileSidebar}>
                        <Menu className="h-5 w-5" />
                    </Button>

                    <div className="flex items-center bg-card rounded-lg p-1 border border-border shadow-sm">
                        <button
                            onClick={() => !isPersonal && toggleAccountType()}
                            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${isPersonal
                                ? "bg-muted text-foreground border border-border"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Pessoal
                        </button>
                        <button
                            onClick={() => isPersonal && toggleAccountType()}
                            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${!isPersonal
                                ? "bg-muted text-foreground border border-border"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Empresa
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2 lg:gap-4">
                    <div className="hidden md:flex items-center gap-2 bg-card px-3 py-1.5 rounded-full border border-border shadow-sm">
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full" onClick={handlePrevMonth}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-2 px-1 min-w-[120px] justify-center">
                            <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
                                {format(selectedMonth, "MMMM 'de' yyyy", { locale: ptBR })}
                            </span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full" onClick={handleNextMonth}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2 h-9 px-4 font-bold rounded-full ml-2"
                        onClick={() => setIsTransactionFormOpen(true)}
                    >
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Nova Transação</span>
                    </Button>
                </div>
            </div>

            <TransactionForm
                open={isTransactionFormOpen}
                onOpenChange={setIsTransactionFormOpen}
                onSuccess={() => window.dispatchEvent(new Event('transaction-created'))}
            />
        </header>
    )
}
