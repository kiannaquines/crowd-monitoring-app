"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Tooltip } from "recharts";
import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { SECTION_VS_SECTION_UTILIZATION_URL, AUTHORIZATION_TOKEN } from "@/utils/constants";

export const description = "A radar chart comparing section utilization percentages";

interface SectionUtilization {
    section_name: string;
    percentage: number;
}

const chartConfig = {
    desktop: {
        label: "Utilization",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig;

export function SectionUtilizationComparisonChart() {
    const [chartData, setChartData] = useState<SectionUtilization[]>([]);
    const [mostUtilizedSection, setMostUtilizedSection] = useState<SectionUtilization | null>(null);

    const fetchSectionUtilization = async () => {
        try {
            const response = await fetch(`${SECTION_VS_SECTION_UTILIZATION_URL}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setChartData(data);

            if (data.length > 0) {
                const highestUtilized = data.reduce(
                    (prev: SectionUtilization, curr: SectionUtilization) => 
                        curr.percentage > prev.percentage ? curr : prev
                );
                setMostUtilizedSection(highestUtilized);
            }

        } catch (error) {
            console.error("Error fetching section utilization data:", error);
        }
    };

    useEffect(() => {
        fetchSectionUtilization();
    }, []);

    return (
        <Card className="shadow-sm col-span-1 md:col-span-2 row-span-2">
            <CardHeader className="items-center pb-4">
                <CardTitle>Library Section Comparisons</CardTitle>
                <CardDescription>
                    6 Library Section Comparisons
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer config={chartConfig}>
                    <RadarChart data={chartData}>
                        <Tooltip
                            formatter={(value) => `${value}%`}
                        />
                        <PolarGrid className="fill-[--color-desktop] opacity-20" />
                        <PolarAngleAxis dataKey="section_name" />
                        <Radar
                            dataKey="percentage"
                            fill="var(--color-desktop)"
                            fillOpacity={0.5}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                {mostUtilizedSection && (
                    <div className="flex items-center gap-2 font-medium leading-none">
                        {mostUtilizedSection.section_name} with {mostUtilizedSection.percentage.toFixed(2)}% utilization
                    </div>
                )}
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    January - June 2024
                </div>
            </CardFooter>
        </Card>
    );
}
