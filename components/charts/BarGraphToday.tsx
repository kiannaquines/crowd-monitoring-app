"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Tooltip } from "recharts";
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
import {SECTION_UTILIZATION_URL} from "@/utils/constants";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";

interface SectionUtilization {
  section_name: string;
  count: number;
}

const chartConfig = {
  desktop: {
    label: "Visitors",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function BarGraphToday() {

  const accessToken = Cookies.get('bearer')
  const [chartData, setChartData] = useState<SectionUtilization[]>([]);
  const { toast } = useToast()
  const fetchSectionUtilization = async () => {
    try {
      const response = await fetch(`${SECTION_UTILIZATION_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      toast({
        title: "Error fetching section utilization data",
        description: "There was an error fetching the section utilization data",
        duration: 5000,
      })
    }
  };

  useEffect(() => {
    fetchSectionUtilization();
  }, []);

  return (
    <Card className="shadow-sm col-span-1 md:col-span-4 row-span-2">
      <CardHeader>
        <CardTitle>Section Utilization</CardTitle>
        <CardDescription>Shows the utilization of library sections</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            height={150}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="section_name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" fill="var(--color-desktop)" radius={5}>
              <LabelList
                dataKey="count"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
