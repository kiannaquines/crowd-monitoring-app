"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart with a grid filled"

const chartData = [
    { month: "IT", desktop: 186 },
    { month: "Publication", desktop: 285 },
    { month: "Medical", desktop: 237 },
    { month: "Filipinina", desktop: 203 },
    { month: "Serials", desktop: 209 },
    { month: "Reference", desktop: 264 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

export function SectionUtilizationComparisonChart() {
    return (
        <Card className="shadow-sm col-span-1 md:col-span-2 row-span-2">
            <CardHeader className="items-center pb-4">
                <CardTitle>Library Section Comparisons</CardTitle>
                <CardDescription>
                    Showing total visitors for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarGrid className="fill-[--color-desktop] opacity-20" />
                        <PolarAngleAxis dataKey="month" />
                        <Radar
                            dataKey="desktop"
                            fill="var(--color-desktop)"
                            fillOpacity={0.5}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    January - June 2024
                </div>
            </CardFooter>
        </Card>
    )
}
