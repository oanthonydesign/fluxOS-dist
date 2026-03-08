import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const steps = [
    {
        num: "01",
        title: "Escolha seu plano",
        desc: "Do DIY ao White Glove. Se não quiser tocar em código, a gente instala tudo pra você.",
    },
    {
        num: "02",
        title: "Setup com videoaulas",
        desc: "Acesso às aulas diretas ao ponto. Sem enrolação, direto ao clique — mesmo sem saber programar.",
    },
    {
        num: "03",
        title: "Domine suas finanças",
        desc: "Comece a lançar, separe seu PF/PJ e sinta a paz de um caixa 100% organizado.",
    }
];

export const Scene6HowItWorks: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animate Header
    const headerTitleOpacity = spring({
        fps,
        frame: frame - 10,
        config: { damping: 16, stiffness: 60 },
        from: 0,
        to: 1,
    });

    const headerTitleY = interpolate(
        spring({ fps, frame: frame - 10, config: { damping: 16, stiffness: 60 }, from: 0, to: 1 }),
        [0, 1],
        [40, 0]
    );

    return (
        <AbsoluteFill className="bg-[#050508] flex items-center justify-center">
            <div className="max-w-[1240px] w-full px-8 flex flex-col gap-16">

                {/* Header Section */}
                <div
                    className="flex flex-col gap-2"
                    style={{
                        opacity: headerTitleOpacity,
                        transform: `translateY(${headerTitleY}px)`
                    }}
                >
                    <span className="text-white/40 text-sm font-semibold tracking-widest uppercase mb-2 block">
                        Como funciona
                    </span>
                    <h2 className="text-5xl font-bold text-white tracking-tight mb-2">
                        Do código ao dashboard em 3 passos simples.
                    </h2>
                    <p className="text-xl text-white/50">
                        Sistema rodando em menos de 1 hora após a compra.
                    </p>
                </div>

                {/* Steps Container */}
                <div
                    className="grid grid-cols-3 border border-white/10 rounded-[32px] bg-white/[0.01] backdrop-blur-sm overflow-hidden"
                >
                    {steps.map((step, i) => {
                        // Staggered entrance for each card
                        const cardProgress = spring({
                            fps,
                            frame: frame - (30 + i * 15),
                            config: { damping: 14, stiffness: 80 },
                            from: 0,
                            to: 1,
                        });

                        const cardOpacity = cardProgress;
                        const cardY = interpolate(cardProgress, [0, 1], [40, 0]);

                        return (
                            <div
                                key={step.num}
                                className={`p-12 flex flex-col ${i < 2 ? 'border-r border-white/10' : ''}`}
                            >
                                <div
                                    style={{
                                        opacity: cardOpacity,
                                        transform: `translateY(${cardY}px)`
                                    }}
                                >
                                    <span className="text-[80px] font-black text-white/[0.04] leading-none mb-8 block font-mono">
                                        {step.num}
                                    </span>
                                    <h3 className="text-2xl font-semibold text-white mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-white/50 leading-relaxed text-lg font-medium pr-4">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </AbsoluteFill>
    );
};
