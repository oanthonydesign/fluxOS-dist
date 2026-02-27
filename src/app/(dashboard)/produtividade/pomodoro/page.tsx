"use client"

import { useState, useEffect } from "react"
import { useTimer } from "react-timer-hook"
import { Play, Pause, SkipForward, RotateCcw, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
// Importação dos sons
import { playClickSound, playAlarmSound } from "@/lib/sounds"

type Phase = "work" | "shortBreak" | "longBreak"

interface TimerConfig {
    work: number
    shortBreak: number
    longBreak: number
}

const PHASES = {
    work: { label: "Foco", color: "text-primary", ringColor: "stroke-primary" },
    shortBreak: { label: "Pausa Curta", color: "text-blue-500", ringColor: "stroke-blue-500" },
    longBreak: { label: "Pausa Longa", color: "text-indigo-500", ringColor: "stroke-indigo-500" },
}

export default function PomodoroPage() {
    const [phase, setPhase] = useState<Phase>("work")
    const [cycles, setCycles] = useState(0)
    const [config, setConfig] = useState<TimerConfig>({
        work: 25,
        shortBreak: 5,
        longBreak: 15,
    })

    // Configura o tempo inicial
    const time = new Date();
    time.setSeconds(time.getSeconds() + config[phase] * 60);

    const {
        seconds,
        minutes,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp: time,
        autoStart: false,
        onExpire: () => {
            playAlarmSound()
            handleNextPhase()
        }
    })

    // Carregar configurações salvas e atualizar o timer
    useEffect(() => {
        const savedConfig = localStorage.getItem("pomodoro-config")
        if (savedConfig) {
            try {
                const parsed = JSON.parse(savedConfig)
                setConfig(parsed)

                // Reinicia o timer com a configuração carregada para evitar desincronia visual
                const newTime = new Date()
                newTime.setSeconds(newTime.getSeconds() + parsed[phase] * 60)
                restart(newTime, false)
            } catch (error) {
                console.error("Erro ao carregar configurações do pomodoro", error)
            }
        }
    }, [])

    // Calcula porcentagem para o anel de progresso (Sentido horário, esvaziando)
    const totalSeconds = config[phase] * 60
    const remainingSeconds = minutes * 60 + seconds
    // Proporção do tempo restante (1 = cheio, 0 = vazio)
    const remainingRatio = totalSeconds > 0 ? remainingSeconds / totalSeconds : 1

    // Raio e circunferência para o círculo SVG
    const radius = 120
    const circumference = 2 * Math.PI * radius
    // Offset: começa em 0 (anel cheio) e vai até circumference (anel vazio)
    const strokeDashoffset = circumference * (1 - remainingRatio)

    function handleNextPhase() {
        let next: Phase = "work"

        if (phase === "work") {
            const newCycles = cycles + 1
            setCycles(newCycles)
            // Se completou 4 ciclos de foco (0, 1, 2, 3), o próximo break é longo
            // O usuário pediu: 5 focos e 4 pausas curtas. Na 5ª pausa -> longa.
            // Foco 1 -> Short
            // Foco 2 -> Short
            // Foco 3 -> Short
            // Foco 4 -> Short
            // Foco 5 -> Long
            if (newCycles >= 5) {
                next = "longBreak"
            } else {
                next = "shortBreak"
            }
        } else if (phase === "shortBreak") {
            next = "work"
        } else if (phase === "longBreak") {
            setCycles(0)
            next = "work"
        }

        switchPhase(next)
    }

    function switchPhase(newPhase: Phase) {
        setPhase(newPhase)
        const time = new Date()
        time.setSeconds(time.getSeconds() + config[newPhase] * 60)
        restart(time, false)
    }

    function handleSaveConfig(newConfig: TimerConfig) {
        setConfig(newConfig)
        localStorage.setItem("pomodoro-config", JSON.stringify(newConfig))

        // Se estivermos editando a fase atual, reinicia o timer com o novo valor
        const time = new Date()
        time.setSeconds(time.getSeconds() + newConfig[phase] * 60)
        restart(time, false)
    }

    return (
        <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center gap-6 w-full max-w-md">

                {/* Seletor de Fase */}
                <div className="flex bg-muted/50 p-1 rounded-full space-x-1">
                    {(["shortBreak", "work", "longBreak"] as Phase[]).map((p) => (
                        <button
                            key={p}
                            onClick={() => {
                                setCycles(0) // Resetar ciclos ao mudar manualmente
                                switchPhase(p)
                            }}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                phase === p
                                    ? "bg-background shadow-sm text-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                            )}
                        >
                            {PHASES[p].label}
                        </button>
                    ))}
                </div>


                {/* Relógio Analógico e Digital */}
                <div className="relative flex items-center justify-center">
                    {/* SVG Circular Progress */}
                    <svg className="transform -rotate-90 w-80 h-80">
                        {/* Círculo de fundo */}
                        <circle
                            cx="160"
                            cy="160"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-muted/20"
                        />
                        {/* Círculo de progresso */}
                        <circle
                            cx="160"
                            cy="160"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className={cn("transition-all duration-500 ease-in-out", PHASES[phase].ringColor)}
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Conteúdo Central (Digital) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={cn("text-6xl font-bold font-mono tracking-tighter", PHASES[phase].color)}>
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </span>
                        <span className="text-muted-foreground mt-2 font-medium uppercase tracking-widest text-sm">
                            {isRunning ? "EM EXECUÇÃO" : "PAUSADO"}
                        </span>
                    </div>
                </div>

                {/* Controles */}
                <div className="flex items-center justify-center gap-6">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-14 w-14 rounded-full border-2 transition-all hover:scale-105 hover:bg-muted"
                        onClick={() => {
                            playClickSound()
                            const t = new Date()
                            t.setSeconds(t.getSeconds() + config[phase] * 60)
                            restart(t, false)
                        }}
                    >
                        <RotateCcw className="h-5 w-5" />
                    </Button>

                    <Button
                        size="lg"
                        className={cn(
                            "h-14 min-w-[140px] px-8 rounded-full text-lg gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105",
                            isRunning ? "bg-amber-500 hover:bg-amber-600" : ""
                        )}
                        onClick={() => {
                            playClickSound()
                            isRunning ? pause() : resume()
                        }}
                    >
                        {isRunning ? (
                            <>
                                <Pause className="h-5 w-5" /> Pausar
                            </>
                        ) : (
                            <>
                                <Play className="h-5 w-5 ml-1" /> Iniciar
                            </>
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-14 w-14 rounded-full border-2 transition-all hover:scale-105 hover:bg-muted"
                        onClick={() => {
                            playClickSound()
                            handleNextPhase()
                        }}
                    >
                        <SkipForward className="h-5 w-5" />
                    </Button>
                </div>

                {/* Configurações */}
                <ConfigDialog config={config} onSave={handleSaveConfig} />
            </div>
        </div>
    )
}

function ConfigDialog({ config, onSave }: { config: TimerConfig, onSave: (c: TimerConfig) => void }) {
    const [localConfig, setLocalConfig] = useState(config)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <Settings2 className="h-4 w-4" />
                    Configurar tempos
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Configurações do Timer</DialogTitle>
                    <DialogDescription>
                        Ajuste a duração de cada etapa do Pomodoro.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Foco (minutos)</Label>
                        <Input
                            type="number"
                            value={localConfig.work}
                            onChange={(e) => setLocalConfig({ ...localConfig, work: Number(e.target.value) })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Pausa Curta (minutos)</Label>
                        <Input
                            type="number"
                            value={localConfig.shortBreak}
                            onChange={(e) => setLocalConfig({ ...localConfig, shortBreak: Number(e.target.value) })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Pausa Longa (minutos)</Label>
                        <Input
                            type="number"
                            value={localConfig.longBreak}
                            onChange={(e) => setLocalConfig({ ...localConfig, longBreak: Number(e.target.value) })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={() => onSave(localConfig)}>Salvar alterações</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
