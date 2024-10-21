"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Area, AreaChart, XAxis } from "recharts"

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

const chartData = [
  { timestamp: "2024-10-13 09:00", visitors: 186 },
  { timestamp: "2024-10-14 12:00", visitors: 305 },
  { timestamp: "2024-10-15 15:00", visitors: 237 },
  { timestamp: "2024-10-16 18:00", visitors: 73 },
  { timestamp: "2024-10-17 21:00", visitors: 209 },
  { timestamp: "2024-10-18 09:00", visitors: 214 },
  { timestamp: "2024-10-19 12:00", visitors: 280 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function TimeSeriesChartSection() {
  return (
    <Card className="shadow-sm col-span-1 md:col-span-4 row-span-2">
      <CardHeader>
        <CardTitle>IT Visitors Over Time</CardTitle>
        <CardDescription>Shows daily visitors of IT section</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(11)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <defs>
              <linearGradient id="fillChart" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-visitors)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-visitors)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="visitors"
              type="natural"
              stroke="var(--color-visitors)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-visitors)",
              }}
              activeDot={{
                r: 6,
              }}
              fill="url(#fillChart)"
              fillOpacity={0.4}
              stackId="a"
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Area>
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Time series data for IT section<TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total daily visitors
        </div>
      </CardFooter>
    </Card>
  )
}
