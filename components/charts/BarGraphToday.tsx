'use client';

import {BarChart,Bar,ResponsiveContainer,XAxis, YAxis, Tooltip, CartesianGrid} from 'recharts';
import { useTheme } from 'next-themes';

const deviceCountData = [
  {
    name: '7:00 am',
    deviceCount: 27
  },
  {
    name: '8:00 am',
    deviceCount: 57
  },
  {
    name: '9:00 am',
    deviceCount: 45
  },
  {
    name: '10:00 am',
    deviceCount: 35
  },
  {
    name: '11:00 am',
    deviceCount: 55
  },
  {
    name: '12:00 pm',
    deviceCount: 30
  },
  {
    name: '1:00 pm',
    deviceCount: 20
  },
  {
    name: '2:00 pm',
    deviceCount: 35
  },
  {
    name: '3:00 pm',
    deviceCount: 30
  },
  {
    name: '4:00 pm',
    deviceCount: 24
  }
];

const BarGraphToday = () => {

  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return (
    <div className='mt-5' style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={400} data={deviceCountData}>
          <XAxis 
            tickMargin={0}
            minTickGap={0}
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={isDarkMode? { fontSize: 12, fill: "#fafafa" } : { fontSize: 12, fill: "#18181b" }}
          />
          <YAxis
            tickMargin={0}
            minTickGap={0}
            dataKey="deviceCount"
            width={20}
            axisLine={false}
            tickLine={false}
            tick={isDarkMode? { fontSize: 12, fill: "#fafafa" } : { fontSize: 12, fill: "#18181b" }}
          />
          <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              horizontalCoordinatesGenerator={() => []}
              verticalCoordinatesGenerator={() => [0, 25, 50, 75, 100]}
              stroke={isDarkMode ? "#4b5563" : "#e5e7eb"}
            />
          <Bar
            type='monotone'
            barSize={25}
            dataKey="deviceCount"
            fill={isDarkMode? "#fafafa": "#18181b"}
            radius={[3,3,3,3]}
            fillOpacity={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarGraphToday