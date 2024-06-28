'use client';

import {BarChart,Bar,ResponsiveContainer,XAxis, YAxis, Tooltip} from 'recharts';
import { useTheme } from 'next-themes';

const deviceCountData = [
  {
    name: '7:00 am',
    deviceCount: 27
  },
  {
    name: '7:01 am',
    deviceCount: 12
  },
  {
    name: '7:02 am',
    deviceCount: 6
  },
  {
    name: '7:05 am',
    deviceCount: 12
  },
  {
    name: '7:10 am',
    deviceCount: 12
  },
  {
    name: '7:20 am',
    deviceCount: 27
  },
  {
    name: '7:30 am',
    deviceCount: 12
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
    deviceCount: 67
  },
  {
    name: '11:00 am',
    deviceCount: 80
  },
  {
    name: '12:00 pm',
    deviceCount: 70
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
    deviceCount: 60
  }
];

const OverViewVisit = () => {

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
              tick={isDarkMode? { fontSize: 12, fill: '#FBFAFB' } : { fontSize: 12, fill: '#0C0A09' }}
            />
            <YAxis
              tickMargin={0}
              minTickGap={0}
              dataKey="deviceCount"
              width={20}
              axisLine={false}
              tickLine={false}
              tick={isDarkMode? { fontSize: 12, fill: '#FBFAFB' } : { fontSize: 12, fill: '#0C0A09' }}
            />
            <Bar type='monotone' barSize={40} dataKey="deviceCount" fill={isDarkMode ? '#FBFAFB' : '#0C0A09'} radius={[5, 5, 0, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OverViewVisit