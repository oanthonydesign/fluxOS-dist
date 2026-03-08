import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene2TheConflict: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fast zoom out effect
    const scale = spring({
        fps,
        frame,
        config: {
            damping: 12,
            stiffness: 150,
            mass: 0.5,
        },
        from: 3,
        to: 1,
    });

    const lines = ["O CONTROLE CUSTA", "A SUA PRIVACIDADE."];

    return (
        <AbsoluteFill className="bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
            <div style={{ transform: `scale(${scale})` }} className="flex flex-col items-center justify-center gap-4">
                {lines.map((line, i) => {
                    const delay = i * 20; // staggering effect
                    return <ConflictLine key={line} text={line} delay={delay} />;
                })}
            </div>
        </AbsoluteFill>
    );
};

const ConflictLine: React.FC<{ text: string, delay: number }> = ({ text, delay }) => {
    const frame = useCurrentFrame();

    // The animation starts at `delay`
    const animationFrame = Math.max(0, frame - delay);

    // Quick pop in with slight rotation
    const y = interpolate(animationFrame, [0, 10], [50, 0], { extrapolateRight: "clamp" });
    const rotate = interpolate(animationFrame, [0, 10], [5, 0], { extrapolateRight: "clamp" });
    const opacity = interpolate(animationFrame, [0, 5], [0, 1], { extrapolateRight: "clamp" });

    // Ensure it's hidden before delay
    if (frame < delay) {
        return <div className="h-[96px]" />; // Spacer to keep layout from jumping (larger text)
    }

    return (
        <h1
            className="text-[#E2E8F0] font-extrabold tracking-tighter text-8xl uppercase leading-none m-0 text-center"
            style={{
                opacity,
                transform: `translateY(${y}px) rotate(${rotate}deg)`,
            }}
        >
            {text}
        </h1>
    );
};
