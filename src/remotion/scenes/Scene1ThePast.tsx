import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from "remotion";

export const Scene1ThePast: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const words = ["Planilhas", "Dados Vazados", "PF ou PJ?", "Bancos"];
    const wordDuration = 30; // 0.5s per word at 60fps

    // Global scale effect (subtle zoom out to create tension)
    const scale = interpolate(frame, [0, 180], [1.1, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill className="bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
            <AbsoluteFill style={{ transform: `scale(${scale})` }} className="flex items-center justify-center">

                {/* Noise overlay for Tech-Noir feel */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />

                {words.map((word, i) => {
                    const startFrame = i * wordDuration;
                    const isLastWord = i === words.length - 1;

                    return (
                        <Sequence
                            key={word}
                            from={startFrame}
                            durationInFrames={isLastWord ? 180 - startFrame : wordDuration}
                        >
                            <GlitchWord word={word} />
                        </Sequence>
                    );
                })}

            </AbsoluteFill>
        </AbsoluteFill>
    );
};

const GlitchWord: React.FC<{ word: string }> = ({ word }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Quick flash in
    const opacity = interpolate(frame, [0, 5], [0, 1], { extrapolateRight: "clamp" });

    // Slight random offset for "glitch" effect on specific frames
    const isGlitchFrame = frame % 7 === 0 || frame % 11 === 0;
    const xOffset = isGlitchFrame ? (Math.random() - 0.5) * 20 : 0;
    const yOffset = isGlitchFrame ? (Math.random() - 0.5) * 10 : 0;

    // Blur out as the word ends
    const blur = interpolate(frame, [20, 30], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <AbsoluteFill className="flex items-center justify-center">
            <h1
                className="text-white font-extrabold tracking-tighter text-8xl uppercase"
                style={{
                    opacity,
                    transform: `translate(${xOffset}px, ${yOffset}px)`,
                    filter: `blur(${blur}px)`,
                    textShadow: isGlitchFrame ? '2px 2px 0px rgba(124, 58, 237, 0.5), -2px -2px 0px rgba(255, 255, 255, 0.5)' : 'none'
                }}
            >
                {word}
            </h1>
        </AbsoluteFill>
    );
};
