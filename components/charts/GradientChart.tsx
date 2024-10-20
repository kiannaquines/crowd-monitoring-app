"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { motion, useAnimation } from "framer-motion";

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

export const description = "An area chart with gradient fill";

interface VisitorData {
    total_count: number;
    first_seen: string;
    newly_displayed_count: number;
}

interface ChartDataPoint {
    timestamp: string;
    count: number;
}

const chartConfig = {
    views: {
        label: "Visitors",
    },
    desktop: {
        label: "Visitors",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig;

export function GradientChart() {
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("desktop");
    const [visitorData, setVisitorData] = React.useState<VisitorData | null>(null);
    const [chartData, setChartData] = React.useState<ChartDataPoint[]>([]);
    const countAnimation = useAnimation();

    const connectWebSocket = () => {
        const newSocket = new WebSocket("ws://10.0.0.179:5000/api/v1/visitors/ws");

        newSocket.onopen = () => {
            console.log("WebSocket connection established");
        };

        newSocket.onmessage = (event) => {
            try {
                const response = JSON.parse(event.data);
                if (response && "data" in response) {
                    const newData = response.data as VisitorData;
                    setVisitorData(newData);

                    const newPoint: ChartDataPoint = {
                        timestamp: newData.first_seen,
                        count: newData.newly_displayed_count,
                    };

                    setChartData((prevData) => {
                        const updatedData = [...prevData, newPoint];
                        return updatedData.slice(-50);
                    });
                } else {
                    console.error("Received data is missing required properties:", response);
                }
            } catch (error) {
                console.error("Error parsing incoming data:", error);
            }
        };

        newSocket.onclose = () => {
            console.log("WebSocket connection closed. Attempting to reconnect...");
            setTimeout(connectWebSocket, 1000);
        };

        newSocket.onerror = (error) => {
            console.error("WebSocket error:", error);
            newSocket.close();
        };
    };

    React.useEffect(() => {
        connectWebSocket();
        return () => {
        };
    }, []);

    React.useEffect(() => {
        if (visitorData) {
            countAnimation.start({
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.2 },
            }).then(() => {
                countAnimation.start({
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.2 },
                });
            });
        }
    }, [visitorData, countAnimation]);

    const formatTime = (value: string) => {
        const date = new Date(value);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;

        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${ampm}`;
    };

    return (
        <Card className="shadow-sm col-span-1 md:col-span-4 row-span-2">
            <CardHeader>
                <CardTitle>Live Visitors Tracker</CardTitle>
                <CardDescription>
                    Today's library visitors
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                            top: 6,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="timestamp"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={formatTime}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="count"
                            type="natural"
                            fill="url(#fillDesktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            January - June 2024
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
