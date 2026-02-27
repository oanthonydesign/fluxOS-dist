export type BankType =
    | 'Nubank'
    | 'Banco do Brasil'
    | 'Itaú'
    | 'Inter'
    | 'C6 Bank'
    | 'Bradesco'
    | 'Santander'
    | 'Outro'

export interface Account {
    id: string
    user_id: string
    name: string
    bank: BankType
    color: string
    icon: string
    type: 'personal' | 'business'
    created_at: string
}

export const BANK_OPTIONS: { bank: BankType, color: string, defaultIcon: string }[] = [
    { bank: 'Nubank', color: '#8A05BE', defaultIcon: 'Wallet' },
    { bank: 'Banco do Brasil', color: '#FCE700', defaultIcon: 'Building' },
    { bank: 'Itaú', color: '#EC7000', defaultIcon: 'Building2' },
    { bank: 'Inter', color: '#FF7A00', defaultIcon: 'Landmark' },
    { bank: 'C6 Bank', color: '#242424', defaultIcon: 'CreditCard' },
    { bank: 'Bradesco', color: '#CC092F', defaultIcon: 'Building2' },
    { bank: 'Santander', color: '#EC0000', defaultIcon: 'Landmark' },
    { bank: 'Outro', color: '#6B7280', defaultIcon: 'PiggyBank' },
]
