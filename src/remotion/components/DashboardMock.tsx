import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import { ArrowDownRight, ArrowUpRight, CalendarDays, DollarSign, Wallet, TrendingUp, TrendingDown, Calendar, Target } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
};

interface DashboardMockProps {
    isPersonal: boolean;
    animationProgress: number;
}

export const DashboardMock: React.FC<DashboardMockProps> = ({ isPersonal, animationProgress }) => {
    const { fps } = useVideoConfig();
    const frame = animationProgress;

    // Animations specifically timed from DashboardMockContainer sequence start.
    // Frame 0 of this component = frame 240 of absolute video.

    // Cards pop up staggered
    const card1 = spring({ frame: frame - 30, fps });
    const card2 = spring({ frame: frame - 40, fps });
    const card3 = spring({ frame: frame - 50, fps });

    const chartAnimation = spring({ frame: frame - 60, fps, config: { damping: 12 } });
    const statsInterpolation = interpolate(frame, [0, 180], [0, 1], { extrapolateRight: "clamp" });

    const balance = statsInterpolation * 34250.70;
    const income = statsInterpolation * 45100.00;
    const expense = statsInterpolation * 12450.30;

    return (
        <div className="flex flex-col gap-6 w-[1200px] h-[780px] bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 overflow-hidden absolute">
            {/* Header */}
            <div className="mb-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Visão Geral
                </h1>
                <p className="text-slate-500 text-lg">
                    Acompanhe seu fluxo de caixa e metas financeiras.
                </p>
            </div>

            {/* Grid Superior: Stats */}
            <div className="grid gap-6 grid-cols-3">
                {/* Card 1 */}
                <div style={{ transform: `scale(${card1})`, opacity: card1 }} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="flex flex-row items-center justify-between py-3 px-5 bg-slate-50 border-b border-slate-100">
                        <h3 className="text-sm font-semibold uppercase text-slate-500">Saldo Consolidado</h3>
                        <Wallet className="h-5 w-5 text-slate-500" />
                    </div>
                    <div className="p-5">
                        <div className="text-3xl font-bold text-slate-900">{formatCurrency(balance)}</div>
                        <p className="text-xs text-slate-500 font-medium mt-1">Até o fim deste mês</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div style={{ transform: `scale(${card2})`, opacity: card2 }} className="border border-green-100 rounded-xl overflow-hidden shadow-sm">
                    <div className="flex flex-row items-center justify-between py-3 px-5 bg-green-50/50 border-b border-green-100">
                        <h3 className="text-sm font-semibold uppercase text-green-700">Entradas</h3>
                        <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="p-5">
                        <div className="text-3xl font-bold text-slate-900">{formatCurrency(income)}</div>
                        <p className="text-xs text-slate-500 font-medium mt-1">Total recebido neste período</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div style={{ transform: `scale(${card3})`, opacity: card3 }} className="border border-red-100 rounded-xl overflow-hidden shadow-sm">
                    <div className="flex flex-row items-center justify-between py-3 px-5 bg-red-50/50 border-b border-red-100">
                        <h3 className="text-sm font-semibold uppercase text-red-700">Saídas</h3>
                        <TrendingDown className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="p-5">
                        <div className="text-3xl font-bold text-slate-900">{formatCurrency(expense)}</div>
                        <p className="text-xs text-slate-500 font-medium mt-1">Total gasto neste período</p>
                    </div>
                </div>
            </div>

            {/* Grid Inferior */}
            <div className="flex gap-6 flex-1 mt-4">
                {/* Fluxo de Caixa (Grafico Fake) */}
                <div className="flex-[4] border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                    <h3 className="text-xl font-semibold mb-6 text-slate-900">Fluxo de Caixa</h3>
                    <div className="flex-1 flex items-end justify-between px-4 pb-4 border-b border-slate-200 relative gap-8">
                        {/* Barras do grafico animadas */}
                        {[0.4, 0.7, 0.3, 0.9, 0.6, 1.0].map((h, i) => {
                            const barSpring = spring({ frame: frame - 150 - (i * 10), fps });
                            return (
                                <div key={i} className="flex-1 flex gap-2 items-end justify-center h-full relative group">
                                    <div style={{ height: `${h * 100 * barSpring}%` }} className="w-full bg-green-500 rounded-t-sm" />
                                    <div style={{ height: `${(h * 0.4) * 100 * barSpring}%` }} className="w-full bg-red-500 rounded-t-sm" />
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-between px-4 pt-4 text-sm text-slate-500">
                        <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
                    </div>
                </div>

                {/* Lançamentos */}
                <div className="flex-[3] border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-slate-900">Lançamentos</h3>
                        <Calendar className="h-5 w-5 text-slate-400" />
                    </div>

                    <div className="flex flex-col gap-4">
                        {[
                            { title: "Pagamento Cliente A", amount: 4500, date: "12 Março", in: true },
                            { title: "Licença Software X", amount: 250, date: "14 Março", in: false },
                            { title: "Consultoria Mensal", amount: 8000, date: "15 Março", in: true },
                            { title: "Impostos", amount: 1200, date: "20 Março", in: false },
                        ].map((item, i) => {
                            const listSpring = spring({ frame: frame - 250 - (i * 15), fps });
                            return (
                                <div
                                    key={i}
                                    style={{ transform: `translateY(${interpolate(listSpring, [0, 1], [20, 0])}px)`, opacity: listSpring }}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                            <ArrowUpRight className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-base font-medium text-slate-900">{item.title}</p>
                                            <p className="text-sm text-slate-500">{item.date}</p>
                                        </div>
                                    </div>
                                    <div className={`text-base font-semibold ${item.in ? "text-green-600" : "text-slate-900"}`}>
                                        {item.in ? "+" : "-"}{formatCurrency(item.amount)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
