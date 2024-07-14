'use client';

import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useTheme } from 'next-themes';

const deviceCountData = [
  { name: '7:00 am', deviceCount: 8 },
  { name: '7:01 am', deviceCount: 10 },
  { name: '7:02 am', deviceCount: 6 },
  { name: '7:05 am', deviceCount: 16 },
  { name: '7:06 am', deviceCount: 10 },
  { name: '7:07 am', deviceCount: 6 },
  { name: '7:08 am', deviceCount: 10 },
  { name: '7:09 am', deviceCount: 12 },
  { name: '7:10 am', deviceCount: 6 },
  { name: '7:11 am', deviceCount: 9 },
  { name: '7:12 am', deviceCount: 14 },
  { name: '7:13 pm', deviceCount: 10 },
  { name: '7:14 pm', deviceCount: 12 },
  { name: '7:15 pm', deviceCount: 9 },
  { name: '7:16 pm', deviceCount: 10 },
  { name: '7:17 pm', deviceCount: 8 }
];

const OverViewVisit = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className='mt-5' style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={500} height={400} data={deviceCountData}>
          <defs>
            <linearGradient id="colorUvDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1e293b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1e293b" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorUvLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f1f5f9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f1f5f9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            tickMargin={0}
            minTickGap={0}
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={isDarkMode ? { fontSize: 12, fill: '#f1f5f9' } : { fontSize: 12, fill: '#1e293b' }}
          />
          <YAxis
            tickMargin={0}
            minTickGap={0}
            width={20}
            axisLine={false}
            tickLine={false}
            tick={isDarkMode ? { fontSize: 12, fill: '#f1f5f9' } : { fontSize: 12, fill: '#1e293b' }}
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
          <Area
            type='monotone'
            dataKey="deviceCount"
            stroke={isDarkMode ? "#e2e8f0" : "#1e293b"}
            strokeWidth={3}
            fillOpacity={1}
            fill={isDarkMode ? "url(#colorUvDark)" : "url(#colorUvLight)"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OverViewVisit;
