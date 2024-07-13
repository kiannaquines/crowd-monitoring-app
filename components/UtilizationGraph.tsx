'use client';

import {BarChart, Bar, ResponsiveContainer,XAxis, YAxis, Tooltip, CartesianGrid} from 'recharts';
import { useTheme } from 'next-themes';

const deviceCountData = [
  {
    name: 'Reference',
    deviceCount: 76
  },
  {
    name: 'Info Tech',
    deviceCount: 60
  },
  {
    name: 'Medical',
    deviceCount: 65
  },
  {
    name: 'USM Publication',
    deviceCount: 70
  },
  {
    name: 'Filipiniana',
    deviceCount: 60
  },
  {
    name: 'Serial',
    deviceCount: 50
  },
];

const UtilizationGraph = () => {
  const {theme} = useTheme()
  const isDarkMode = theme === "dark"

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
            tick={isDarkMode? { fontSize: 12, fill: "#fafafa" }:{ fontSize: 12, fill: "18181b" }}
          />
          <YAxis
            dataKey="deviceCount"
            width={20}
            tick={isDarkMode? { fontSize: 12, fill: "#fafafa" }:{ fontSize: 12, fill: "18181b" }}
            tickLine={false}
            axisLine={false}
            tickMargin={0}
            minTickGap={0} 
          />
          <Bar
            type='monotone'
            barSize={40}
            dataKey="deviceCount"
            fill={isDarkMode? "#fafafa": "18181b"}
            radius={[3,3,0,0]}
            fillOpacity={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UtilizationGraph