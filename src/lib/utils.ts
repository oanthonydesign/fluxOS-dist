import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

export function formatDate(date: string | Date) {
    let d = new Date(date)
    // Se for uma string (como do banco de dados), fixamos para o meio-dia local
    // para que a formatação nunca reduza ou avance um dia devido ao fuso horário
    if (typeof date === "string" && date.length >= 10) {
        const justDate = date.split("T")[0]
        d = new Date(`${justDate}T12:00:00`)
    }
    return new Intl.DateTimeFormat("pt-BR").format(d)
}
