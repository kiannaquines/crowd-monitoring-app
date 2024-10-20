"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { motion, useAnimation } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive real-time line chart";

interface DeviceData {
  total_count: number;
  first_detected: string;
  last_detected: string;
  newly_displayed_count: number;
}

interface ChartDataPoint {
  timestamp: string;
  count: number;
}

const chartConfig = {
  count: {
    label: "Device Count",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function LiveChartDevices() {
  const [deviceData, setDeviceData] = React.useState<DeviceData | null>(null);
  const [chartData, setChartData] = React.useState<ChartDataPoint[]>([]);
  const [socket, setSocket] = React.useState<WebSocket | null>(null);
  
  const countAnimation = useAnimation();

  const connectWebSocket = () => {
    const newSocket = new WebSocket("ws://10.0.0.179:5000/api/v1/devices/ws");

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    newSocket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        if ("data" in response) {
          const newData = response.data as DeviceData;
          setDeviceData(newData);

          const newPoint: ChartDataPoint = {
            timestamp: newData.last_detected,
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

    setSocket(newSocket);
  };

  React.useEffect(() => {
    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  React.useEffect(() => {
    if (deviceData) {
      countAnimation.start({
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.2 }
      }).then(() => {
        countAnimation.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.2 }
        });
      });
    }
  }, [deviceData, countAnimation]);

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
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Live Device Tracker</CardTitle>
          <CardDescription>
            Showing detected devices in real-time.
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Overall Total Devices</span>
            <motion.span
              className="text-lg font-bold leading-none sm:text-3xl"
              animate={countAnimation}
            >
              {deviceData ? deviceData.total_count.toLocaleString() : '0'}
            </motion.span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData.slice().reverse()}
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
              minTickGap={32}
              tickFormatter={formatTime}
            />
            <YAxis
              hide={true}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="count"
                  labelFormatter={formatTime}
                />
              }
            />
            <Line
              dataKey="count"
              type="monotone"
              stroke={`var(--color-count)`}
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
