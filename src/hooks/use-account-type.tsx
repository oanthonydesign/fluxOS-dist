"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { startOfMonth } from "date-fns"

type AccountType = "personal" | "business"

interface AccountTypeContextType {
    accountType: AccountType
    isPersonal: boolean
    setAccountType: (type: AccountType) => void
    toggleAccountType: () => void
    selectedMonth: Date
    setSelectedMonth: (date: Date) => void
}

const AccountTypeContext = createContext<AccountTypeContextType | undefined>(undefined)

export function AccountTypeProvider({ children }: { children: React.ReactNode }) {
    const [accountType, setAccountTypeState] = useState<AccountType>("personal")
    const [selectedMonth, setSelectedMonth] = useState<Date>(startOfMonth(new Date()))

    useEffect(() => {
        const saved = localStorage.getItem("account-type") as AccountType
        if (saved && (saved === "personal" || saved === "business")) {
            setAccountTypeState(saved)
        }
    }, [])

    const setAccountType = (type: AccountType) => {
        setAccountTypeState(type)
        localStorage.setItem("account-type", type)
    }

    const toggleAccountType = () => {
        const newType = accountType === "personal" ? "business" : "personal"
        setAccountType(newType)
    }

    return (
        <AccountTypeContext.Provider
            value={{
                accountType,
                isPersonal: accountType === "personal",
                setAccountType,
                toggleAccountType,
                selectedMonth,
                setSelectedMonth
            }}
        >
            {children}
        </AccountTypeContext.Provider>
    )
}

export function useAccountType() {
    const context = useContext(AccountTypeContext)
    if (context === undefined) {
        throw new Error("useAccountType must be used within an AccountTypeProvider")
    }
    return context
}
