"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
import { SECTION_UTILIZATION_URL } from "@/utils/constants";
import Cookies from "js-cookie";
import { useEffect, useState, useCallback } from "react";
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
  const accessToken = Cookies.get('bearer');
  const [chartData, setChartData] = useState<SectionUtilization[]>([]);
  const { toast } = useToast();

  const fetchSectionUtilization = useCallback(async () => {
    try {
      const response = await fetch(`${SECTION_UTILIZATION_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setChartData(data);
    } catch (error) {
      toast({
        title: "Error fetching section utilization data",
        description: "There was an error fetching the section utilization data",
        duration: 5000,
      });
    }
  }, [accessToken, toast]);

  useEffect(() => {
    fetchSectionUtilization();
  }, [fetchSectionUtilization]);

  return (
    <Card className="shadow-sm col-span-1 md:col-span-4 row-span-2">
      <CardHeader>
        <CardTitle>Section Utilization</CardTitle>
        <CardDescription>Shows the utilization of library sections</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 35,
              right: 20,
              top: 20,
              bottom: 5,
            }}
          >
            <XAxis type="number" dataKey="count" hide />
            <YAxis
              dataKey="section_name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 20)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Section utilization <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total utilization for the library sections
        </div>
      </CardFooter>
    </Card>
  );
}
