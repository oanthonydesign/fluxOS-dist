"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                toast.error("Erro ao entrar", {
                    description: error.message,
                })
                return
            }

            router.push("/")
            router.refresh()
        } catch {
            toast.error("Erro inesperado")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="login-page" data-theme="light">
            <div className="login-container">
                {/* Lado Esquerdo — Imagem Hero + Branding */}
                <div className="login-hero">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/login-hero.png"
                        alt=""
                        className="login-hero-image"
                    />
                    <div className="login-hero-overlay" />

                    {/* Logo */}
                    <div className="login-hero-logo">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/fluxos-logo-dark.svg"
                            alt="FluxOS Logo"
                            className="h-10 w-auto object-contain"
                        />
                    </div>

                    {/* Headline + Subtítulo */}
                    <div className="login-hero-content">
                        <h1 className="login-hero-title">
                            Suas finanças.<br />
                            Seu controle total.
                        </h1>
                        <p className="login-hero-subtitle">
                            O único sistema financeiro onde você é 100% dono dos seus dados. Separe sua vida Pessoal da Profissional e tenha clareza do caixa em menos de 2 minutos por dia.
                        </p>
                    </div>
                </div>

                {/* Lado Direito — Formulário */}
                <div className="login-form-side">
                    <div className="login-form-wrapper">
                        <div className="login-form-header">
                            <h2 className="login-form-title">Acessar conta</h2>
                            <p className="login-form-description">
                                Bem-vindo de volta! Entre com seus dados abaixo.
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="login-form">
                            <div className="login-field">
                                <label htmlFor="login-email" className="login-label">
                                    Email
                                </label>
                                <input
                                    id="login-email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="login-input"
                                    autoComplete="email"
                                />
                            </div>

                            <div className="login-field">
                                <label htmlFor="login-password" className="login-label">
                                    Senha
                                </label>
                                <input
                                    id="login-password"
                                    type="password"
                                    placeholder="Sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="login-input"
                                    autoComplete="current-password"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="login-button"
                            >
                                {isLoading ? (
                                    <span className="login-button-loading">
                                        <svg className="login-spinner" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.42 31.42" />
                                        </svg>
                                        Entrando...
                                    </span>
                                ) : (
                                    "Entrar"
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link
                                href="/signup"
                                className="text-sm text-gray-500 hover:text-slate-900 transition-colors duration-200"
                            >
                                Crie sua conta agora
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
