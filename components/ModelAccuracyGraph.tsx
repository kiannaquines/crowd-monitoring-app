'use client';

import {AreaChart, Area, ResponsiveContainer,XAxis, YAxis, Tooltip, CartesianGrid} from 'recharts';
import { useTheme } from 'next-themes';

const deviceCountData = [
    {
    "score": 50,
    "precision": 78,
    "f1": 80,
    "time": "09:30"
    },
    {
    "score": 60,
    "precision": 81,
    "f1": 83,
    "time": "09:45"
    },
    {
    "score": 82,
    "precision": 75,
    "f1": 78,
    "time": "10:00"
    },
    {
    "score": 89,
    "precision": 84,
    "f1": 86,
    "time": "10:15"
    },
    {
    "score": 86,
    "precision": 79,
    "f1": 82,
    "time": "10:30"
    },
    {
    "score": 84,
    "precision": 77,
    "f1": 79,
    "time": "10:45"
    },
    {
    "score": 70,
    "precision": 83,
    "f1": 85,
    "time": "11:00"
    },
    {
    "score": 50,
    "precision": 76,
    "f1": 79,
    "time": "11:15"
    },
    {
    "score": 90,
    "precision": 86,
    "f1": 88,
    "time": "11:30"
    },
    {
    "score": 85,
    "precision": 80,
    "f1": 82,
    "time": "11:45"
    },
];

const ModelAccuracyGraph = () => {
  const {theme} = useTheme()
  const isDarkMode = theme === "dark";

  return (
    <div className='mt-5' style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={500} height={400} data={deviceCountData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fafafa" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#fafafa" stopOpacity={0} />
            </linearGradient>
          </defs>
            <XAxis
              tickMargin={0}
              minTickGap={0}
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={isDarkMode? {fontSize: 12, fill: '#FBFAFB' }: {fontSize: 12, fill: '#0C0A09' }}
            />
            <YAxis
              dataKey="score"
              width={20}
              tick={isDarkMode? {fontSize: 12, fill: '#FBFAFB' }: {fontSize: 12, fill: '#0C0A09' }}
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              minTickGap={0}
            />
            <Area
              type='monotone'
              dataKey="f1"
              strokeWidth={3}
              stroke="#fafafa"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ModelAccuracyGraph