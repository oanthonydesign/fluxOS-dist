"use client"

import { createContext, useContext, useState } from "react"

interface MobileSidebarContextType {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
}

const MobileSidebarContext = createContext<MobileSidebarContextType>({
    isOpen: false,
    open: () => { },
    close: () => { },
    toggle: () => { },
})

export function MobileSidebarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <MobileSidebarContext.Provider
            value={{
                isOpen,
                open: () => setIsOpen(true),
                close: () => setIsOpen(false),
                toggle: () => setIsOpen((prev) => !prev),
            }}
        >
            {children}
        </MobileSidebarContext.Provider>
    )
}

export function useMobileSidebar() {
    return useContext(MobileSidebarContext)
}
