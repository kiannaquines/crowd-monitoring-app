"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type ChartDataPoint = {
  date: string
  count: number
}

const initialChartData = [
  { date: "2024-04-01", count: 0 },
  { date: "2024-04-02", count: 0 },
  { date: "2024-04-03", count: 0 },
  { date: "2024-04-04", count: 0 },
  { date: "2024-04-05", count: 0 },
  { date: "2024-04-06", count: 0 },
  { date: "2024-04-07", count: 0 },
  { date: "2024-04-08", count: 0 },
  { date: "2024-04-09", count: 0 },
  { date: "2024-04-10", count: 0 },
  { date: "2024-04-11", count: 0 },
  { date: "2024-04-12", count: 0 },
  { date: "2024-04-13", count: 0 },
  { date: "2024-04-14", count: 0 },
  { date: "2024-04-15", count: 0 },
  { date: "2024-04-16", count: 0 },
  { date: "2024-04-17", count: 0 },
  { date: "2024-04-18", count: 0 },
  { date: "2024-04-19", count: 0 },
  { date: "2024-04-20", count: 0 },
  { date: "2024-04-21", count: 0 },
  { date: "2024-04-22", count: 0 },
  { date: "2024-04-23", count: 0 },
  { date: "2024-04-24", count: 0 },
  { date: "2024-04-25", count: 0 },
  { date: "2024-04-26", count: 0 },
  { date: "2024-04-27", count: 0 },
  { date: "2024-04-28", count: 0 },
  { date: "2024-04-29", count: 0 },
  { date: "2024-04-30", count: 0 },
  { date: "2024-05-01", count: 0 },
  { date: "2024-05-02", count: 0 },
  { date: "2024-05-03", count: 0 },
  { date: "2024-05-04", count: 0 },
  { date: "2024-05-05", count: 0 },
  { date: "2024-05-06", count: 0 },
]

const chartConfig = {
  views: {
    label: "Detected",
  },
  count: {
    label: "Total Detected",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function RealTimeChartDevice() {
  const [chartData, setChartData] = React.useState<ChartDataPoint[]>(initialChartData)
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("count")

  const total = React.useMemo(() => {
    return {
      count: chartData.reduce((acc, curr) => acc + curr.count, 0),
    }
  }, [chartData])

  React.useEffect(() => {
    let websocket: WebSocket;
    let reconnectInterval: string | number | NodeJS.Timeout | undefined;

    const connectWebSocket = () => {
      websocket = new WebSocket("wss://api.taralibrary.online/ws/");

      websocket.onopen = () => {
        clearInterval(reconnectInterval);
      };

      websocket.onmessage = (event) => {
        const { count, timestamp } = JSON.parse(event.data);

        if (count !== 0) {
          const newDataPoint = { date: timestamp, count };
          setChartData((prevData) => [...prevData, newDataPoint].slice(-80));
        }
      };

      websocket.onclose = (event) => {
        if (!event.wasClean) {
          reconnectInterval = setInterval(connectWebSocket, 5000);
        }
      };

      websocket.onerror = (error) => {
        websocket.close();
      };
    };

    connectWebSocket();

    return () => {
      clearInterval(reconnectInterval);
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

  return (
    <Card className="shadow-sm col-span-1 md:col-span-4 row-span-2">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Real-Time Device Chart</CardTitle>
          <CardDescription>
            Showing real-time device detected by tracker
          </CardDescription>
        </div>
        <div className="flex">
          {["count"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[chart as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleTimeString("en-PH", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} isAnimationActive={false} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
