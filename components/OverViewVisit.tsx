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
          {isDarkMode && (
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fafafa" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#fafafa" stopOpacity={0} />
              </linearGradient>
            </defs>
          )}
          <XAxis
            tickMargin={0}
            minTickGap={0}
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={isDarkMode ? { fontSize: 12, fill: '#fafafa' } : { fontSize: 12, fill: '#18181b' }}
          />
          <YAxis
            tickMargin={0}
            minTickGap={0}
            width={20}
            axisLine={false}
            tickLine={false}
            tick={isDarkMode ? { fontSize: 12, fill: '#fafafa' } : { fontSize: 12, fill: '#18181b' }}
          />
          <Area
            type='monotone'
            dataKey="deviceCount"
            stroke={isDarkMode ? "#f8fafc" : "#09090b"}
            strokeWidth={3}
            fillOpacity={1}
            fill={isDarkMode ? "url(#colorUv)" : "#09090b"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OverViewVisit;
