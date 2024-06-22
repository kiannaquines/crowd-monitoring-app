'use client';

import {BarChart,Bar,ResponsiveContainer,XAxis, YAxis, Tooltip} from 'recharts';

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

const BarGraphToday = () => {
  return (
    <div className='mt-5' style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={400} data={deviceCountData}>
            <XAxis tickMargin={0} minTickGap={0} dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }}/>
            <YAxis dataKey="deviceCount" width={20} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickMargin={0} minTickGap={0} />
            <Bar type='monotone' barSize={20} dataKey="deviceCount" fill="#18181B" radius={[5, 5, 5, 5]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarGraphToday