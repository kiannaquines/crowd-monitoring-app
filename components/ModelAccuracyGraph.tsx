'use client';

import {LineChart, Line, ResponsiveContainer,XAxis, YAxis, Tooltip} from 'recharts';

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
  return (
    <div className='mt-5' style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={400} data={deviceCountData}>
            <XAxis tickMargin={0} minTickGap={0} dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#ffffff' }}/>
            <YAxis dataKey="score" width={20} tick={{ fontSize: 12, fill: '#ffffff' }} tickLine={false} axisLine={false} tickMargin={0} minTickGap={0}/>
            <Line type='monotone' dataKey="score" strokeWidth={3} dot={{ stroke: '#EBEBEB', strokeWidth: 4 }} activeDot={true} stroke="#FBFAFB"/>
            <Line type='monotone' dataKey="precision" strokeWidth={3} dot={{ stroke: '#EBEBEB', strokeWidth: 4 }} activeDot={true} stroke="#FBFAFB"/>
            <Line type='monotone' dataKey="f1" strokeWidth={3} dot={{ stroke: '#EBEBEB', strokeWidth: 4 }} activeDot={true} stroke="#FBFAFB"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ModelAccuracyGraph