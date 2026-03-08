import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from "remotion";
import { CheckCircle2, Focus } from "lucide-react";

export const Scene6TheEffect: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill className="bg-[#0A0A0A] overflow-hidden">
            {/* Background elements flashing rhythmically */}
            <div className="absolute inset-0 flex items-center justify-around opacity-20 -rotate-12 scale-150">
                <BackgroundFlash frame={frame} offset={0} />
                <BackgroundFlash frame={frame} offset={10} />
                <BackgroundFlash frame={frame} offset={20} />
            </div>

            {/* Main Text */}
            <AbsoluteFill className="flex items-center justify-center">
                <PunchlineText frame={frame} />
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

const BackgroundFlash: React.FC<{ frame: number, offset: number }> = ({ frame, offset }) => {
    const localFrame = Math.max(0, frame - offset);
    // Flash every 30 frames
    const flash = interpolate(localFrame % 30, [0, 5, 30], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <div
            className="flex flex-col gap-4 p-8 bg-zinc-900 border border-white/5 rounded-2xl"
            style={{
                opacity: flash,
                transform: `scale(${interpolate(flash, [0, 1], [0.9, 1.1])})`
            }}
        >
            <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
                <span className="text-xl font-bold">Objetivo Atingido</span>
            </div>
            <div className="flex items-center gap-2 text-white">
                <Focus className="w-8 h-8 text-blue-500" />
                <span className="text-xl font-bold">Foco: 2h Completas</span>
            </div>
            <div className="w-64 h-2 bg-white/10 rounded-full mt-4">
                <div className="w-full h-full bg-blue-600 rounded-full" />
            </div>
        </div>
    );
}

const PunchlineText: React.FC<{ frame: number }> = ({ frame }) => {
    const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
    const scale = spring({
        fps: 60,
        frame,
        config: { damping: 10, stiffness: 200 },
        from: 0.5,
        to: 1
    });

    return (
        <div
            className="text-center bg-black/50 p-12 backdrop-blur-md rounded-3xl border border-white/10"
            style={{ opacity, transform: `scale(${scale})` }}
        >
            <h1 className="text-white font-black tracking-tighter text-8xl uppercase m-0 leading-none">
                ESSE É O
            </h1>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-800 font-black tracking-tighter text-9xl uppercase m-0 leading-none" style={{ textShadow: '0 10px 40px rgba(59, 130, 246, 0.5)' }}>
                EFEITO FLUX.
            </h1>
        </div>
    );
}
