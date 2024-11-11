"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

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
} from "@/components/ui/chart"

type VisitorsCountProps = {
  type: string;
  visitors: number;
  fill?: string;
};

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function VisitorsCount({ type, visitors, fill = "var(--color-visitors)" }: VisitorsCountProps) {
  const scaledVisitors = visitors >= 1000 ? (visitors / 1000).toFixed(1) + 'K' : visitors.toString();
  const data = [{ type, visitors, fill }];

  return (
    <Card className="flex flex-col w-full">
      <CardHeader>
        <CardTitle>{type}</CardTitle>
        <CardDescription>
          {visitors.toLocaleString()} visitors today.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[230px] w-full"
        >
          <RadialBarChart
            data={data}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" fill={data[0].fill} background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {scaledVisitors}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {type}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm mt-3">
        <div className="flex items-start gap-2 font-medium leading-none text-center">
          Visitors up by {visitors.toLocaleString()} <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
