"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    CreditCard,
    Activity,
    Users,
    DollarSign,
    ArrowUpRight,
    Check,
    X,
    AlertCircle,
    Bell,
    Settings,
    Mail
} from "lucide-react"

export default function StyleGuidePage() {
    const { setTheme } = useTheme()

    return (
        <div className="space-y-[46px]">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Style Guide</h1>
                <p className="text-muted-foreground mt-2">
                    Design System e diretrizes visuais do Sistema Financeiro.
                    Baseado em <span className="font-mono text-xs bg-muted px-1 py-0.5 rounded">tailwindcss</span> e <span className="font-mono text-xs bg-muted px-1 py-0.5 rounded">shadcn/ui</span>.
                </p>
            </div>

            <Tabs defaultValue="colors" className="space-y-8">
                <TabsList className="bg-muted p-1 rounded-xl">
                    <TabsTrigger value="colors" className="rounded-lg">Cores</TabsTrigger>
                    <TabsTrigger value="typography" className="rounded-lg">Tipografia</TabsTrigger>
                    <TabsTrigger value="components" className="rounded-lg">Componentes</TabsTrigger>
                    <TabsTrigger value="cards" className="rounded-lg">Cards & Shadows</TabsTrigger>
                </TabsList>

                {/* --- CORES --- */}
                <TabsContent value="colors" className="space-y-8">
                    <section>
                        <h2 className="text-xl font-bold mb-4">Brand Colors</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            <ColorCard name="Primary" variable="bg-primary" />
                            <ColorCard name="Primary Foreground" variable="bg-primary-foreground" border />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4 text-foreground">Semantic Colors</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            <ColorCard name="Success" variable="bg-success" />
                            <ColorCard name="Warning" variable="bg-warning" />
                            <ColorCard name="Danger" variable="bg-destructive" />
                            <ColorCard name="Info" variable="bg-info" />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4">Neutrals</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            <ColorCard name="Background" variable="bg-background" border />
                            <ColorCard name="Foreground" variable="bg-foreground" />
                            <ColorCard name="Muted" variable="bg-muted" />
                            <ColorCard name="Muted Foreground" variable="bg-muted-foreground" />
                            <ColorCard name="Card" variable="bg-card" border />
                            <ColorCard name="Border" variable="bg-border" />
                        </div>
                    </section>
                </TabsContent>

                {/* --- TIPOGRAFIA --- */}
                <TabsContent value="typography" className="space-y-12">
                    <section className="space-y-8">
                        <div className="border-l-4 border-primary pl-6 space-y-2">
                            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">Heading 1</h1>
                            <p className="text-sm text-muted-foreground font-mono">text-4xl font-extrabold tracking-tight lg:text-5xl</p>
                        </div>

                        <div className="border-l-4 border-border pl-6 space-y-2">
                            <h2 className="text-3xl font-semibold tracking-tight text-foreground">Heading 2</h2>
                            <p className="text-sm text-muted-foreground font-mono">text-3xl font-semibold tracking-tight</p>
                        </div>

                        <div className="border-l-4 border-border pl-6 space-y-2">
                            <h3 className="text-2xl font-semibold tracking-tight text-foreground">Heading 3</h3>
                            <p className="text-sm text-muted-foreground font-mono">text-2xl font-semibold tracking-tight</p>
                        </div>

                        <div className="border-l-4 border-border pl-6 space-y-2">
                            <h4 className="text-xl font-semibold tracking-tight text-foreground">Heading 4</h4>
                            <p className="text-sm text-muted-foreground font-mono">text-xl font-semibold tracking-tight</p>
                        </div>

                        <Separator />

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h3 className="font-bold text-foreground">Body Text</h3>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-foreground">
                                    O sistema utiliza a fonte <span className="font-bold">Inter</span> para textos gerais.
                                    A legibilidade é prioridade, com um line-height confortável (leading-7) para leituras mais longas.
                                    Cores suaves como <span className="bg-muted px-1 rounded text-muted-foreground">text-muted-foreground</span> são usadas para textos secundários.
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Este é um texto silenciado (muted), usado para legendas ou informações menos críticas.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold">Listas</h3>
                                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                                    <li>Primeiro nível de simplicidade</li>
                                    <li>Segundo nível de consistência</li>
                                    <li>Terceiro nível de performance</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </TabsContent>

                {/* --- COMPONENTES --- */}
                <TabsContent value="components" className="space-y-12">
                    <section className="space-y-6">
                        <h3 className="text-xl font-bold border-b pb-2">Botões</h3>
                        <div className="flex flex-wrap gap-4 items-center">
                            <Button>Default</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="destructive">Destructive</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="link">Link</Button>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center">
                            <Button size="lg">Large Size</Button>
                            <Button>Default Size</Button>
                            <Button size="sm">Small Size</Button>
                            <Button size="icon"><Mail className="h-4 w-4" /></Button>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center">
                            <Button disabled>Disabled</Button>
                            <Button variant="outline" disabled>Disabled Outline</Button>
                            <Button>
                                <Mail className="mr-2 h-4 w-4" /> Com Ícone
                            </Button>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h3 className="text-xl font-bold border-b pb-2">Badges</h3>
                        <div className="flex flex-wrap gap-4">
                            <Badge>Default</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="destructive">Destructive</Badge>
                            <Badge className="bg-success text-success-foreground hover:bg-success/90">Custom Success</Badge>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h3 className="text-xl font-bold border-b pb-2">Formulários</h3>
                        <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
                            <div className="space-y-4">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" placeholder="Email" />
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="disabled">Disabled Input</Label>
                                    <Input disabled type="email" id="disabled" placeholder="Não editável" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Switch id="airplane-mode" />
                                    <Label htmlFor="airplane-mode">Airplane Mode</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="dark-mode" checked />
                                    <Label htmlFor="dark-mode">Ativado por padrão</Label>
                                </div>
                            </div>
                        </div>
                    </section>
                </TabsContent>

                {/* --- CARDS & SHADOWS --- */}
                <TabsContent value="cards" className="space-y-12">

                    <div className="grid md:grid-cols-2 gap-8">
                        <section className="space-y-4">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-foreground">Standard Card (Flat)</h3>
                                <p className="text-muted-foreground text-sm">Padrão para dashboards e listas. Sem sombra, apenas borda.</p>
                            </div>

                            <Card className="border-border shadow-none">
                                <CardHeader>
                                    <CardTitle className="text-foreground">Card Título</CardTitle>
                                    <CardDescription className="text-muted-foreground">Descrição do card padrão.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Conteúdo principal do card. Limpo e direto.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">Ação</Button>
                                </CardFooter>
                            </Card>
                        </section>

                        <section className="space-y-4">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-foreground">Floating Card</h3>
                                <p className="text-muted-foreground text-sm">Usado para elementos destacados (ex: cartões de crédito).</p>
                            </div>

                            <Card className="border-none shadow-lg hover:-translate-y-1 transition-all duration-300 bg-sidebar/50 backdrop-blur-sm border border-border">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-foreground">Visa Infinite</CardTitle>
                                        <CreditCard className="text-muted-foreground" />
                                    </div>
                                    <CardDescription className="text-muted-foreground">Banco XP</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-mono tracking-wider text-foreground">•••• •••• •••• 4242</p>
                                </CardContent>
                                <CardFooter className="justify-between text-sm text-muted-foreground">
                                    <span>Anthony V</span>
                                    <span>12/29</span>
                                </CardFooter>
                            </Card>
                        </section>
                    </div>

                    <Separator />

                    <section>
                        <h3 className="text-xl font-bold mb-6">Stats Cards Examples</h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="shadow-none border-border">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-foreground">
                                        Total Revenue
                                    </CardTitle>
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">$45,231.89</div>
                                    <p className="text-xs text-muted-foreground">
                                        +20.1% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-none border-border">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-foreground">
                                        Subscriptions
                                    </CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+2350</div>
                                    <p className="text-xs text-muted-foreground">
                                        +180.1% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-none border-border">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-foreground">Sales</CardTitle>
                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+12,234</div>
                                    <p className="text-xs text-muted-foreground">
                                        +19% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="shadow-none border-border">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-foreground">
                                        Active Now
                                    </CardTitle>
                                    <Activity className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+573</div>
                                    <p className="text-xs text-muted-foreground">
                                        +201 since last hour
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                </TabsContent>
            </Tabs>
        </div>
    )
}

function ColorCard({ name, variable, border = false }: { name: string, variable: string, border?: boolean }) {
    return (
        <div className="space-y-2 group cursor-pointer">
            <div className={`
        h-24 w-full rounded-xl shadow-sm transition-all group-hover:scale-105 group-hover:shadow-md
        ${variable} 
        ${border ? 'border border-border' : ''}
      `} />
            <div>
                <h4 className="font-semibold text-sm text-foreground">{name}</h4>
                <p className="text-xs text-muted-foreground font-mono">{variable}</p>
            </div>
        </div>
    )
}
