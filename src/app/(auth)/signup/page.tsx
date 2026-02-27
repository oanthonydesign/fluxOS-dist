"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export default function SignupPage() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isCheckingRegistration, setIsCheckingRegistration] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    // Verifica se o registro está aberto (Single User Instance)
    useEffect(() => {
        async function checkRegistration() {
            try {
                const { data, error } = await supabase.rpc("is_registration_open")

                if (error) {
                    console.error("Erro ao verificar registro:", error)
                    setIsCheckingRegistration(false)
                    return
                }

                if (data === false) {
                    toast.info("Sistema já configurado", {
                        description: "Esta instância já possui um administrador. Faça login.",
                    })
                    router.replace("/login")
                    return
                }
            } catch (err) {
                console.error("Erro ao verificar registro:", err)
            } finally {
                setIsCheckingRegistration(false)
            }
        }

        checkRegistration()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            })

            if (error) {
                toast.error("Erro ao criar conta", {
                    description: error.message,
                })
                return
            }

            toast.success("Conta criada!", {
                description: "Verifique seu email para confirmar o cadastro.",
            })
            router.push("/login")
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
                            Comece a controlar<br />
                            suas finanças hoje.
                        </h1>
                        <p className="login-hero-subtitle">
                            Crie sua conta gratuitamente e tenha clareza do seu caixa pessoal e profissional em poucos minutos.
                        </p>
                    </div>
                </div>

                {/* Lado Direito — Formulário */}
                <div className="login-form-side">
                    {isCheckingRegistration ? (
                        <div className="login-form-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg className="login-spinner" viewBox="0 0 24 24" fill="none" style={{ width: 32, height: 32, color: "var(--primary)" }}>
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.42 31.42" />
                            </svg>
                        </div>
                    ) : (
                        <div className="login-form-wrapper">
                            <div className="login-form-header">
                                <h2 className="login-form-title">Crie sua conta</h2>
                                <p className="login-form-description">
                                    Preencha seus dados para começar.
                                </p>
                            </div>

                            <form onSubmit={handleSignup} className="login-form">
                                <div className="login-field">
                                    <label htmlFor="signup-name" className="login-label">
                                        Nome completo
                                    </label>
                                    <input
                                        id="signup-name"
                                        type="text"
                                        placeholder="Seu nome"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="login-input"
                                        autoComplete="name"
                                    />
                                </div>

                                <div className="login-field">
                                    <label htmlFor="signup-email" className="login-label">
                                        Email
                                    </label>
                                    <input
                                        id="signup-email"
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
                                    <label htmlFor="signup-password" className="login-label">
                                        Senha
                                    </label>
                                    <input
                                        id="signup-password"
                                        type="password"
                                        placeholder="Mínimo 6 caracteres"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        disabled={isLoading}
                                        className="login-input"
                                        autoComplete="new-password"
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
                                            Criando conta...
                                        </span>
                                    ) : (
                                        "Criar conta"
                                    )}
                                </button>

                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground">
                                        Já tem uma conta?{" "}
                                        <Link href="/login" className="text-primary font-medium hover:underline">
                                            Fazer login
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
