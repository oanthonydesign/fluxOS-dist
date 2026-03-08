import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { Shield, Lock, Server, BarChart3, RefreshCw, Wallet } from "lucide-react";

const items = [
    {
        title: "Privacidade Absoluta",
        description: "Seus dados nunca saem do seu servidor. 100% Offline.",
        icon: Lock,
        color: "from-[#0f172a] to-[#1e293b]",
        accent: "text-blue-400",
        border: "border-blue-500/30"
    },
    {
        title: "Gestão Pessoal & Jurídica",
        description: "Contas separadas, num único ambiente flexível.",
        icon: RefreshCw,
        color: "from-[#18181b] to-[#27272a]",
        accent: "text-emerald-400",
        border: "border-emerald-500/30"
    },
    {
        title: "Segurança Bancária",
        description: "Criptografia de ponta a ponta. Arquitetura blindada.",
        icon: Shield,
        color: "from-[#111827] to-[#27272a]",
        accent: "text-purple-400",
        border: "border-purple-500/30"
    },
    {
        title: "Controle Financeiro",
        description: "Dashboard intuitivo com métricas exatas do que importa.",
        icon: BarChart3,
        color: "from-[#0f172a] to-[#1e1b4b]",
        accent: "text-indigo-400",
        border: "border-indigo-500/30"
    },
    {
        title: "Soberania de Dados",
        description: "Você no controle total. Ninguém mais acessa seus números.",
        icon: Server,
        color: "from-[#171717] to-[#262626]",
        accent: "text-orange-400",
        border: "border-orange-500/30"
    }
];

export const Scene5Analytics: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Custom step-by-step easing function for pausing on each card
    // Total duration: 450 frames (approx 7.5 seconds)
    // 5 cards. Each transition takes 45 frames. Each pause takes 45 frames.
    const getProgress = (f: number) => {
        // Entry wait
        if (f < 45) return 0;

        // Transition 0 -> 1 (frames 45 to 90)
        if (f < 90) return Easing.inOut(Easing.cubic)((f - 45) / 45) * 1 + 0;

        // Pause on 1 (frames 90 to 140)
        if (f < 140) return 1;

        // Transition 1 -> 2 (frames 140 to 185)
        if (f < 185) return Easing.inOut(Easing.cubic)((f - 140) / 45) * 1 + 1;

        // Pause on 2 (frames 185 to 235)
        if (f < 235) return 2;

        // Transition 2 -> 3 (frames 235 to 280)
        if (f < 280) return Easing.inOut(Easing.cubic)((f - 235) / 45) * 1 + 2;

        // Pause on 3 (frames 280 to 330)
        if (f < 330) return 3;

        // Transition 3 -> 4 (frames 330 to 375)
        if (f < 375) return Easing.inOut(Easing.cubic)((f - 330) / 45) * 1 + 3;

        // Pause on 4
        return 4;
    };

    const rawProgress = getProgress(frame);

    // Background fade-in
    const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill className="bg-[#050508] overflow-hidden" style={{ opacity: bgOpacity }}>
            {/* Very faint background typography */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-[200px] font-black text-white/5 uppercase tracking-[0.1em] select-none">
                    FLUXOS
                </h1>
            </div>

            {/* Vertical Carousel */}
            <AbsoluteFill className="flex items-center justify-center">
                <div
                    className="relative flex items-center justify-center"
                    style={{
                        transform: `scale(${spring({
                            fps,
                            frame: frame - 10,
                            config: { damping: 14, stiffness: 80 },
                            from: 0.4,
                            to: 1,
                        })}) translateY(${spring({
                            fps,
                            frame: frame - 10,
                            config: { damping: 16, stiffness: 60 },
                            from: 300,
                            to: 0,
                        })}px)`,
                    }}
                >
                    {items.map((item, i) => {
                        const distance = i - rawProgress;

                        // Interpolations for 3D carousel effect
                        const y = interpolate(distance, [-3, -2, -1, 0, 1, 2, 3], [-700, -400, -220, 0, 220, 400, 700], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });

                        const scale = interpolate(distance, [-3, -2, -1, 0, 1, 2, 3], [0.5, 0.6, 0.8, 1, 0.8, 0.6, 0.5], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });

                        const opacity = interpolate(Math.abs(distance), [0, 1, 2, 3], [1, 0.4, 0, 0], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });

                        // Rotate X so they "tilt" away from the center
                        const rotateX = interpolate(distance, [-3, -2, -1, 0, 1, 2, 3], [40, 20, 10, 0, -10, -20, -40], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });

                        // The one closest to 0 has the highest zIndex
                        const zIndex = Math.round(100 - Math.abs(distance) * 10);

                        return (
                            <div
                                key={i}
                                className="absolute flex items-center justify-center"
                                style={{
                                    width: 500,
                                    height: 500,
                                    transform: `perspective(1000px) translateY(${y}px) scale(${scale}) rotateX(${rotateX}deg)`,
                                    opacity,
                                    zIndex,
                                }}
                            >
                                <div className={`w-full h-[400px] rounded-[40px] bg-gradient-to-br ${item.color} flex flex-col items-center justify-center text-center px-12 shadow-[0_30px_80px_rgba(0,0,0,0.8)] border ${item.border} backdrop-blur-md`}>
                                    <item.icon className={`w-24 h-24 mb-10 ${item.accent} filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`} strokeWidth={1.5} />
                                    <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-400 text-lg leading-relaxed max-w-[300px]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </AbsoluteFill >
        </AbsoluteFill >
    );
};
