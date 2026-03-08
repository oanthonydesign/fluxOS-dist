import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, OffthreadVideo, staticFile, Loop } from "remotion";
import { DashboardMock } from "../components/DashboardMock";

// ─── MacBook Pro Mockup Component ───────────────────────────────────────────
const MacBookMockup: React.FC<{
    children: React.ReactNode;
    frame: number;
    fps: number;
}> = ({ children, frame, fps }) => {
    // Entrance animation
    const enterProgress = spring({
        fps,
        frame: frame - 5,
        config: { damping: 16, stiffness: 60 },
        from: 0,
        to: 1,
    });

    const scale = interpolate(enterProgress, [0, 1], [0.6, 0.82]);
    const yOffset = interpolate(enterProgress, [0, 1], [400, 180]);
    const rotateX = interpolate(enterProgress, [0, 1], [30, 4]);

    // Subtle float
    const floatY = interpolate(Math.sin(frame / 40), [-1, 1], [-4, 4]);

    return (
        <div
            className="flex flex-col items-center"
            style={{
                transform: `perspective(2000px) scale(${scale}) translateY(${yOffset + floatY}px) rotateX(${rotateX}deg)`,
                transformStyle: 'preserve-3d',
                zIndex: 10,
            }}
        >
            {/* ─── Screen ─── */}
            <div className="relative">
                {/* Outer bezel */}
                <div
                    className="rounded-[20px] p-[10px] relative"
                    style={{
                        background: 'linear-gradient(180deg, #3a3a3c 0%, #1c1c1e 100%)',
                        boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05) inset',
                    }}
                >
                    {/* Notch */}
                    <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[180px] h-[28px] bg-[#1c1c1e] rounded-b-2xl z-20 flex items-center justify-center">
                        <div className="w-[8px] h-[8px] rounded-full bg-[#2a2a2e] border border-[#3a3a3c]" />
                    </div>

                    {/* Inner screen area */}
                    <div
                        className="w-[1100px] h-[700px] rounded-[12px] overflow-hidden relative"
                        style={{
                            background: '#000',
                        }}
                    >
                        {/* Screen reflection */}
                        <div
                            className="absolute inset-0 z-30 pointer-events-none"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)',
                            }}
                        />
                        {/* Content */}
                        {children}
                    </div>
                </div>
            </div>

            {/* ─── Bottom Hinge ─── */}
            <div
                className="relative flex justify-center"
                style={{ marginTop: '-2px' }}
            >
                {/* Hinge strip */}
                <div
                    className="w-[1140px] h-[14px] rounded-b-xl"
                    style={{
                        background: 'linear-gradient(180deg, #4a4a4c 0%, #2c2c2e 40%, #1c1c1e 100%)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    }}
                />
            </div>

            {/* ─── Base / Keyboard deck ─── */}
            <div
                className="relative flex justify-center"
                style={{
                    marginTop: '-1px',
                    transform: 'perspective(800px) rotateX(6deg)',
                    transformOrigin: 'top center',
                }}
            >
                <div
                    className="w-[1260px] h-[16px] rounded-b-[20px]"
                    style={{
                        background: 'linear-gradient(180deg, #3a3a3c 0%, #28282a 100%)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                    }}
                >
                    {/* Front lip indent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[4px] bg-[#4a4a4c] rounded-b-lg" />
                </div>
            </div>
        </div>
    );
};

// ─── Main Scene ─────────────────────────────────────────────────────────────
export const Scene4MasterFeature: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const switchFrame = 140;
    const isPersonal = frame < switchFrame;

    const dashboardOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill className="flex items-center justify-center overflow-hidden">
            {/* Background Looping Video */}
            <AbsoluteFill>
                <Loop durationInFrames={300}>
                    <OffthreadVideo
                        src={staticFile("loop_bg.mp4")}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        muted
                    />
                </Loop>
            </AbsoluteFill>

            {/* MacBook */}
            <MacBookMockup frame={frame} fps={fps}>
                <div className="w-full h-full flex flex-col" style={{ opacity: dashboardOpacity }}>
                    {/* Browser header */}
                    <div className="h-9 border-b border-white/10 flex items-center px-4 gap-2 bg-black/90 shrink-0">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>

                        {/* Toggle PF / PJ */}
                        <div className="mx-auto flex items-center bg-zinc-900 p-1 rounded-full border border-white/5">
                            <div className={`px-4 py-0.5 text-sm rounded-full transition-colors duration-300 ${isPersonal ? 'bg-white text-black font-medium' : 'text-gray-500'}`}>
                                PF
                            </div>
                            <div className={`px-4 py-0.5 text-sm rounded-full transition-colors duration-300 ${!isPersonal ? 'bg-blue-600 text-white font-medium' : 'text-gray-500'}`}>
                                PJ
                            </div>
                        </div>
                    </div>

                    {/* Dashboard */}
                    <div className="flex-1 bg-zinc-950 overflow-hidden">
                        <DashboardMock isPersonal={isPersonal} animationProgress={frame} />
                    </div>
                </div>
            </MacBookMockup>

            {/* Text overlays */}
            <TitleOverlay frame={frame} />
        </AbsoluteFill>
    );
};

// ─── Title Overlay (behind the notebook) ────────────────────────────────────
const TitleOverlay: React.FC<{ frame: number }> = ({ frame }) => {
    const textOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const textY = interpolate(frame, [10, 30], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <div
            className="absolute inset-x-0 top-[8%] flex flex-col items-center justify-center pointer-events-none text-center px-10"
            style={{ zIndex: 5, opacity: textOpacity, transform: `translateY(${textY}px)` }}
        >
            <h1
                className="text-white font-black tracking-tighter leading-[0.95]"
                style={{ fontSize: '120px' }}
            >
                Para freelancers que
            </h1>
            <h1
                className="text-white font-black tracking-tighter leading-[0.95]"
                style={{ fontSize: '120px' }}
            >
                misturam PF e PJ.
            </h1>
        </div>
    );
};
