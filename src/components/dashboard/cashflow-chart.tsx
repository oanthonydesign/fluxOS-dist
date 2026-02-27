"use client"

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts"
import { useTheme } from "next-themes"
import { formatCurrency } from "@/lib/utils"

interface CashFlowChartProps {
    data: any[]
}

export function CashFlowChart({ data }: CashFlowChartProps) {
    const { theme } = useTheme()

    // Configurações baseadas no tema para garantir legibilidade
    const isDark = theme === "dark"

    const axisColor = isDark ? "#94a3b8" : "#9ca3af" // slate-400 vs gray-400
    const gridColor = isDark ? "#334155" : "#e5e7eb" // slate-700 vs gray-200 (border default)
    const tooltipBg = isDark ? "#121214" : "#ffffff" // dark elevated vs white
    const tooltipBorder = isDark ? "#27272A" : "#f3f4f6" // border dark vs gray-100
    const tooltipText = isDark ? "#f8fafc" : "#1f2937" // slate-50 vs gray-800

    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    barGap={8}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: axisColor, fontWeight: 500 }}
                        dy={10}
                        className="uppercase tracking-wider"
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: axisColor }}
                        tickFormatter={(value) => `R$ ${Intl.NumberFormat('pt-BR', { notation: "compact", compactDisplay: "short" }).format(value)}`}
                    />
                    <Tooltip
                        cursor={{ fill: isDark ? '#334155' : '#f9fafb', opacity: 0.4 }}
                        formatter={(value: any) => [formatCurrency(Number(value || 0)), ""]}
                        contentStyle={{
                            backgroundColor: tooltipBg,
                            borderRadius: '12px',
                            border: `1px solid ${tooltipBorder}`,
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: tooltipText
                        }}
                        itemStyle={{ color: tooltipText }}
                    />
                    <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{
                            paddingBottom: '20px',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontWeight: 'bold',
                            color: axisColor
                        }}
                    />
                    <Bar
                        dataKey="income"
                        name="Receita"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                        barSize={20}
                        animationDuration={1500}
                    />
                    <Bar
                        dataKey="expense"
                        name="Despesas"
                        fill="#ef4444"
                        radius={[4, 4, 0, 0]}
                        barSize={20}
                        animationDuration={1500}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
