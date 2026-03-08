import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// ─── Financial Tab Card (the little cards that pop out of the folder) ────────
const FinancialTab: React.FC<{
    label: string;
    delay: number;
    x: number;
    y: number;
    rotate: number;
    frame: number;
    fps: number;
}> = ({ label, delay, x, y, rotate, frame, fps }) => {
    const tabFrame = frame - delay;

    const scale = spring({
        fps,
        frame: tabFrame,
        config: { damping: 12, stiffness: 100 },
        from: 0,
        to: 1,
    });

    const posX = spring({ fps, frame: tabFrame, config: { damping: 14, stiffness: 80 }, from: 0, to: x });
    const posY = spring({ fps, frame: tabFrame, config: { damping: 14, stiffness: 80 }, from: 60, to: y });
    const rot = spring({ fps, frame: tabFrame, config: { damping: 14, stiffness: 80 }, from: 0, to: rotate });
    const opacity = interpolate(tabFrame, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <div
            className="absolute"
            style={{
                left: '50%',
                top: '58%',
                opacity,
                transform: `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px)) scale(${scale}) rotate(${rot}deg)`,
                transformOrigin: 'center center',
                zIndex: 15,
            }}
        >
            {/* Tab ear */}
            <div className="w-14 h-4 bg-blue-600 rounded-t-lg ml-3" />
            {/* Card body */}
            <div className="w-40 h-24 bg-blue-600 rounded-lg rounded-tl-none flex items-center justify-center shadow-[0_8px_32px_rgba(59,130,246,0.4)]">
                <span className="text-white font-bold text-xs leading-tight text-center px-3 -rotate-3 whitespace-pre-line">
                    {label}
                </span>
            </div>
        </div>
    );
};

// ─── The Folder Component (realistic like the reference) ────────────────────
const FolderComponent: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    // Folder slides UP from below
    const folderY = spring({
        fps,
        frame: frame - 5,
        config: { damping: 14, stiffness: 60 },
        from: 600,
        to: 0,
    });

    const folderScale = spring({
        fps,
        frame: frame - 5,
        config: { damping: 14, stiffness: 60 },
        from: 0.6,
        to: 1,
    });

    return (
        <div
            className="absolute left-1/2"
            style={{
                bottom: '-10%',
                transform: `translateX(-50%) translateY(${folderY}px) scale(${folderScale})`,
                zIndex: 10,
            }}
        >
            {/* Folder Shape */}
            <div className="relative">
                {/* Folder Tab (the little ear on top) */}
                <div className="absolute -top-[28px] left-[30px]">
                    <div className="w-[130px] h-[32px] bg-[#2a2a2e] rounded-t-2xl" />
                </div>
                {/* Folder Body */}
                <div className="w-[640px] h-[420px] bg-[#1e1e22] rounded-3xl border border-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex flex-col items-center justify-end pb-10 relative overflow-visible">
                    {/* Inner shadow / depth */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                    {/* Star decoration like the reference */}
                    <div className="absolute bottom-6 left-6">
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5L12 2Z" fill="rgba(59,130,246,0.8)" />
                        </svg>
                    </div>

                    {/* Folder label */}
                    <div className="text-right w-full pr-8">
                        <div className="text-white/40 text-sm italic">sistema:</div>
                        <div className="text-white/70 text-lg font-semibold italic">Caos Financeiro</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Main Scene ─────────────────────────────────────────────────────────────
export const Scene3TheResolution: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const backgroundOpacity = interpolate(frame, [0, 5], [0, 1], { extrapolateRight: "clamp" });

    // Text at top — appears last
    const textOpacity = interpolate(frame, [75, 95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const textY = interpolate(frame, [75, 95], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const textScale = spring({
        fps,
        frame: frame - 75,
        config: { damping: 14, stiffness: 150 },
        from: 0.85,
        to: 1,
    });

    // Logo
    const logoOpacity = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // Financial tabs data — y values are NEGATIVE (go UP from folder center)
    // Spread them between the text and the folder
    const tabs = [
        { label: "Receitas\n& Despesas", delay: 30, x: -220, y: -80, rotate: -12 },
        { label: "Fluxo\nde Caixa", delay: 38, x: 10, y: -140, rotate: 3 },
        { label: "Contas\na Pagar", delay: 46, x: 230, y: -70, rotate: 10 },
        { label: "Investimentos\nPessoais", delay: 54, x: -110, y: -200, rotate: -6 },
        { label: "Relatórios\nFiscais", delay: 60, x: 140, y: -190, rotate: 8 },
    ];

    return (
        <AbsoluteFill className="bg-[#f5f5f5]" style={{ opacity: backgroundOpacity }}>
            {/* Background subtle radial glow */}
            <AbsoluteFill
                style={{
                    background: 'radial-gradient(circle at center 70%, rgba(59, 130, 246, 0.06) 0%, transparent 50%)',
                }}
            />

            {/* ─── TOP: Text Block (highest z-index, always on top) ─── */}
            <div
                className="absolute top-[5%] left-0 right-0 flex flex-col items-center text-center px-10"
                style={{
                    opacity: textOpacity,
                    transform: `translateY(${textY}px) scale(${textScale})`,
                    zIndex: 30,
                }}
            >
                <h1 className="text-[#111] font-black tracking-tighter text-[76px] leading-[0.95] m-0">
                    O FluxOS nasceu
                </h1>
                <h1 className="text-[#111] font-black tracking-tighter text-[76px] leading-[0.95] m-0">
                    exatamente para isso.
                </h1>
                <h2 className="text-[#111]/50 font-medium tracking-tight text-3xl mt-5 m-0">
                    Organizar o seu caos financeiro.
                </h2>
            </div>

            {/* ─── CENTER: Financial Tabs flying out of the folder ─── */}
            {tabs.map((tab) => (
                <FinancialTab
                    key={tab.label}
                    label={tab.label}
                    delay={tab.delay}
                    x={tab.x}
                    y={tab.y}
                    rotate={tab.rotate}
                    frame={frame}
                    fps={fps}
                />
            ))}

            {/* ─── BOTTOM: The Folder ─── */}
            <FolderComponent frame={frame} fps={fps} />

            {/* ─── Logo watermark bottom right ─── */}
            <div
                className="absolute bottom-8 right-10 flex items-center justify-center opacity-40"
                style={{ opacity: logoOpacity, zIndex: 5 }}
            >
                <svg className="h-8 w-auto" viewBox="0 0 198 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M46.0232 0H13.6826C6.1259 0 0 6.1259 0 13.6826V46.0232C0 53.5799 6.1259 59.7058 13.6826 59.7058H46.0232C53.5799 59.7058 59.7058 53.5799 59.7058 46.0232V13.6826C59.7058 6.1259 53.5799 0 46.0232 0Z" fill="#1F1F1F" />
                    <path d="M17.4142 14.9264H42.2916C44.3564 14.9264 46.0232 16.5932 46.0232 18.658C46.0232 20.7229 44.3564 22.3897 42.2916 22.3897H17.4142C15.3494 22.3897 13.6826 20.7229 13.6826 18.658C13.6826 16.5932 15.3494 14.9264 17.4142 14.9264Z" fill="white" />
                    <path d="M17.4142 26.1213H32.3406C34.4055 26.1213 36.0723 27.7881 36.0723 29.8529C36.0723 31.9177 34.4055 33.5845 32.3406 33.5845H17.4142C15.3494 33.5845 13.6826 31.9177 13.6826 29.8529C13.6826 27.7881 15.3494 26.1213 17.4142 26.1213Z" fill="white" />
                    <path d="M17.4142 37.3161H23.6336C25.6984 37.3161 27.3652 38.9829 27.3652 41.0477C27.3652 43.1126 25.6984 44.7793 23.6336 44.7793H17.4142C15.3494 44.7793 13.6826 43.1126 13.6826 41.0477C13.6826 38.9829 15.3494 37.3161 17.4142 37.3161Z" fill="white" />
                    <path d="M13.6826 0.5H46.0234C53.3039 0.500122 59.2061 6.40216 59.2061 13.6826V46.0234C59.2059 53.3038 53.3038 59.2059 46.0234 59.2061H13.6826C6.40216 59.2061 0.500122 53.3039 0.5 46.0234V13.6826C0.5 6.40208 6.40208 0.5 13.6826 0.5ZM26.8652 41.0479C26.8652 42.8364 25.4223 44.2792 23.6338 44.2793H17.4141C15.6255 44.2792 14.1827 42.8364 14.1826 41.0479C14.1826 39.2592 15.6254 37.8165 17.4141 37.8164H23.6338C25.4224 37.8165 26.8652 39.2592 26.8652 41.0479ZM35.5723 29.8525C35.5723 31.6412 34.1294 33.0849 32.3408 33.085H17.4141C15.6254 33.0849 14.1826 31.6412 14.1826 29.8525C14.1828 28.0641 15.6256 26.6212 17.4141 26.6211H32.3408C34.1293 26.6212 35.5721 28.0641 35.5723 29.8525ZM45.5234 18.6582C45.5234 20.4467 44.0804 21.8894 42.292 21.8896H17.4141C15.6255 21.8896 14.1827 20.4468 14.1826 18.6582C14.1826 16.8696 15.6254 15.4268 17.4141 15.4268H42.292C44.0805 15.427 45.5234 16.8696 45.5234 18.6582ZM27.8652 41.0479C27.8652 38.707 25.9746 36.8165 23.6338 36.8164H17.4141C15.0732 36.8165 13.1826 38.7069 13.1826 41.0479C13.1827 43.3887 15.0732 45.2792 17.4141 45.2793H23.6338C25.9746 45.2792 27.8652 43.3887 27.8652 41.0479ZM36.5723 29.8525C36.5721 27.5118 34.6816 25.6212 32.3408 25.6211H17.4141C15.0733 25.6212 13.1828 27.5118 13.1826 29.8525C13.1826 32.1935 15.0732 34.0849 17.4141 34.085H32.3408C34.6817 34.0849 36.5723 32.1934 36.5723 29.8525ZM46.5234 18.6582C46.5234 16.3174 44.6328 14.427 42.292 14.4268H17.4141C15.0732 14.4268 13.1826 16.3173 13.1826 18.6582C13.1827 20.9991 15.0732 22.8896 17.4141 22.8896H42.292C44.6327 22.8894 46.5234 20.999 46.5234 18.6582Z" stroke="#363636" />
                    <path d="M97.379 21.69H84.8115V27.455H95.8144V31.8086H84.8115V42.3183H79.6077V17.2854H97.379V21.69Z" fill="white" />
                    <path d="M100.61 17.2514H105.457V42.3183H100.61V17.2514Z" fill="white" />
                    <path d="M122.089 39.6994C122.043 39.7561 121.93 39.9261 121.749 40.2096C121.567 40.493 121.352 40.7424 121.102 40.9578C120.343 41.6381 119.606 42.1029 118.892 42.3523C118.189 42.6018 117.361 42.7265 116.409 42.7265C113.665 42.7265 111.817 41.7401 110.865 39.7674C110.332 38.679 110.065 37.0748 110.065 34.9547V23.7817H115.031V34.9547C115.031 36.0091 115.156 36.8027 115.405 37.3356C115.848 38.2766 116.715 38.7471 118.007 38.7471C119.663 38.7471 120.796 38.0781 121.409 36.7403C121.726 36.0147 121.885 35.0567 121.885 33.8663V23.7817H126.799V42.3183H122.089V39.6994Z" fill="white" />
                    <path d="M148.006 42.3183H141.969L138.772 36.7573L135.558 42.3183H129.673L136 32.931L129.946 23.8157H135.881L138.976 29.1897L142.003 23.8157H147.768L141.68 32.846L148.006 42.3183Z" fill="white" />
                    <path d="M161.987 16.6562C166.397 16.6562 169.662 18.0734 171.782 20.9077C173.437 23.1185 174.265 25.9472 174.265 29.3937C174.265 33.1237 173.318 36.2245 171.425 38.696C169.203 41.5984 166.034 43.0496 161.919 43.0496C158.075 43.0496 155.054 41.7798 152.854 39.2402C150.893 36.7914 149.912 33.6963 149.912 29.9549C149.912 26.5764 150.751 23.6854 152.429 21.2818C154.583 18.1981 157.769 16.6562 161.987 16.6562ZM162.327 40.0225C165.309 40.0225 167.463 38.9568 168.789 36.8254C170.127 34.6826 170.796 32.2224 170.796 29.4447C170.796 26.5084 170.025 24.1445 168.483 22.3532C166.952 20.5619 164.855 19.6663 162.191 19.6663C159.606 19.6663 157.497 20.5563 155.864 22.3362C154.232 24.1049 153.416 26.7181 153.416 30.176C153.416 32.9423 154.113 35.2778 155.507 37.1825C156.913 39.0758 159.186 40.0225 162.327 40.0225Z" fill="#8D8D8D" />
                    <path d="M180.523 34.2575C180.603 35.6746 180.937 36.8254 181.527 37.7097C182.649 39.3649 184.627 40.1926 187.462 40.1926C188.731 40.1926 189.888 40.0112 190.931 39.6484C192.949 38.9455 193.958 37.687 193.958 35.873C193.958 34.5125 193.533 33.5432 192.683 32.965C191.821 32.3981 190.472 31.905 188.635 31.4855L185.251 30.7202C183.04 30.2214 181.476 29.6715 180.557 29.0706C178.97 28.0276 178.176 26.4687 178.176 24.394C178.176 22.1492 178.953 20.3068 180.506 18.867C182.059 17.4271 184.259 16.7072 187.105 16.7072C189.724 16.7072 191.946 17.3421 193.771 18.6119C195.608 19.8703 196.526 21.8884 196.526 24.666H193.346C193.176 23.3282 192.813 22.3022 192.257 21.588C191.226 20.2842 189.474 19.6323 187.003 19.6323C185.007 19.6323 183.573 20.0517 182.7 20.8907C181.827 21.7297 181.391 22.7047 181.391 23.8157C181.391 25.0402 181.901 25.9358 182.921 26.5027C183.59 26.8655 185.104 27.319 187.462 27.8632L190.965 28.6625C192.654 29.0479 193.958 29.5751 194.876 30.244C196.464 31.4118 197.257 33.1067 197.257 35.3288C197.257 38.0952 196.248 40.0735 194.23 41.2639C192.223 42.4544 189.888 43.0496 187.224 43.0496C184.117 43.0496 181.685 42.256 179.928 40.6687C178.171 39.0928 177.309 36.9557 177.343 34.2575H180.523Z" fill="#8D8D8D" />
                </svg>
            </div>
        </AbsoluteFill>
    );
};
