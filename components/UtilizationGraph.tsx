'use client';

import {BarChart, Bar, ResponsiveContainer,XAxis, YAxis, Tooltip} from 'recharts';

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
  return (
    <div className='mt-5' style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={400} data={deviceCountData}>
            <XAxis tickMargin={0} minTickGap={0} dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }}/>
            <YAxis dataKey="deviceCount" width={20} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickMargin={0} minTickGap={0} />
            <Bar type='monotone' barSize={35} dataKey="deviceCount" fill="#18181B" radius={[5, 5, 5, 5]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UtilizationGraph