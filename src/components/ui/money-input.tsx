"use client"

import * as React from "react"
import { Input } from "./input"
import { cn } from "@/lib/utils"

interface MoneyInputProps extends Omit<React.ComponentProps<typeof Input>, 'onChange' | 'value'> {
    value?: string | number
    onValueChange?: (value: number) => void
}

export const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
    ({ value, onValueChange, className, ...props }, ref) => {
        const [displayValue, setDisplayValue] = React.useState("")

        const format = (val: string | number) => {
            let numericValue = 0
            if (typeof val === "number") {
                numericValue = val
            } else if (typeof val === "string") {
                // If it's a string from the input, it might have separators, so we clean it
                const cleanVal = val.replace(/\D/g, "")
                numericValue = cleanVal ? parseFloat(cleanVal) / 100 : 0
            }

            if (isNaN(numericValue)) return ""

            return new Intl.NumberFormat("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(numericValue)
        }

        React.useEffect(() => {
            // Avoid re-formatting while typing if possible, but keep in sync with external value
            const formatted = format(value ?? 0)
            if (formatted !== displayValue) {
                setDisplayValue(formatted)
            }
        }, [value])

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawValue = e.target.value.replace(/\D/g, "")
            const numericValue = rawValue ? parseFloat(rawValue) / 100 : 0

            // Update display immediately for better feels
            setDisplayValue(format(numericValue))

            if (onValueChange) {
                onValueChange(numericValue)
            }
        }

        return (
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium pointer-events-none">
                    R$
                </span>
                <Input
                    {...props}
                    ref={ref}
                    type="text"
                    className={cn("pl-9 font-medium", className)}
                    value={displayValue}
                    onChange={handleChange}
                />
            </div>
        )
    }
)

MoneyInput.displayName = "MoneyInput"
