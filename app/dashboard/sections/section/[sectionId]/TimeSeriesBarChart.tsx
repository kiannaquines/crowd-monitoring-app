"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { SECTION_INFORMATION_URL_DAILY_CHART } from "@/utils/constants"
import Cookies from "js-cookie"

export const description = "An interactive bar chart"

interface TimeSeriesBarChartSectionProps {
  sectionId: string
}

const chartConfig = {
  views: {
    label: "Visitors",
  },
  count: {
    label: "Visitors",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export const TimeSeriesChartSection: React.FC<TimeSeriesBarChartSectionProps> = ({ sectionId }) => {
  const [chartData, setChartData] = React.useState<{ date: string; count: number }[]>([])
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("count")
  const accessToken = Cookies.get("bearer")
  
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${SECTION_INFORMATION_URL_DAILY_CHART}${sectionId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        const data = await response.json()
        const formattedData = data.map((item: { timestamp: string; total_visitors: number }) => ({
          date: item.timestamp.split("T")[0],
          count: item.total_visitors,
        }))
        setChartData(formattedData)
      } catch (error) {
        console.error("Failed to fetch chart data:", error)
      }
    }
    fetchData()
  }, [sectionId, accessToken])

  const total = React.useMemo(
    () => ({
      count: chartData.reduce((acc, curr) => acc + curr.count, 0),
    }),
    [chartData]
  )

  return (
    <Card className="shadow-sm col-span-1 md:col-span-4 row-span-2">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Daily Visitors</CardTitle>
          <CardDescription>
            Showing total visitors every day
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
                  {total[key as keyof typeof total].toLocaleString()}
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
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
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
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}