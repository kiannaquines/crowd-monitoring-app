"use client"

import * as React from "react"
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts"

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
import Cookies from "js-cookie";
import { PER_HOUR } from "@/utils/constants"
import { useToast } from "@/hooks/use-toast";
import { TrendingUp } from "lucide-react"

interface TimeSeriesData {
  count: number;
  timestamp: string;
}

const chartConfig = {
  views: {
    label: "Visitors",
  },
  count: {
    label: "Visitor Count",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function TimeSeriesChart() {

  const accessToken = Cookies.get('bearer')

  const [chartData, setChartData] = React.useState<TimeSeriesData[]>([]);
  const [total, setTotal] = React.useState(0);
  const { toast } = useToast()
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${PER_HOUR}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setChartData(data);
        setTotal(data.reduce((acc: number, curr: TimeSeriesData) => acc + curr.count, 0));
      } catch (error) {
        toast({
          title: "Error fetching section time series data",
          description: "There was an error fetching the time series data",
          duration: 5000,
        })
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="shadow-sm col-span-1 md:col-span-4 row-span-2">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Estimated People Time Series</CardTitle>
          <CardDescription>
            Showing total visitors every day
          </CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              {chartConfig.count.label}
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            data={chartData}
            margin={{
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
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
            />
            <YAxis hide={true} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  indicator="line"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  }}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke={chartConfig.count.color}
              strokeWidth={2}
              fillOpacity={0.4}
              fill={`url(#fillCount)`}
            />
            <defs>
              <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.count.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartConfig.count.color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Time series of overall visitors <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total utilization for the library sections
        </div>
      </CardFooter>
    </Card>
  )
}
