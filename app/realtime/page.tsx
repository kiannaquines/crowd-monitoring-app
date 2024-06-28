import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Building,Calendar,User,Users } from 'lucide-react';
import BarGraphToday from '@/components/BarGraphToday';
import UtilizationGraph from '@/components/UtilizationGraph';
import ModelAccuracyModel from '@/components/ModelAccuracyGraph';
import Link from 'next/link';

const RealtimeDashboard = () => {
  return (
    <main>
      <h1 className='text-xl font-semibold'>Realtime Analytics</h1>
      <div className='grid grid-cols-4 mt-4 gap-4'>
      <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <div className='flex flex-row justify-between justify-items-center items-center'>
              <h4 className='font-medium '>Today Visit</h4>
              <Calendar/>
            </div>
            <h1 className='text-2xl font-semibold mt-1'>+1,250</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last day</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <div className='flex flex-row justify-between justify-items-center items-center'>
              <h4 className='font-medium'>Last Day Visit</h4>
              <Calendar/>
            </div>
            <h1 className='text-2xl font-semibold mt-1'>+1,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last day</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <div className='flex flex-row justify-between justify-items-center items-center'>
              <h4 className='font-medium'>Last Week Visit</h4>
              <Calendar/>
            </div>
            <h1 className='text-2xl font-semibold mt-1'>+1,672</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last day</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <div className='flex flex-row justify-between justify-items-center items-center'>
              <h4 className='font-medium'>Total Visit</h4>
              <Calendar/>
            </div>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>
        <Card className="col-span-4 row-span-6 shadow-sm">
          <CardContent className='py-3'>
              <h4 className='font-medium'>Visitors Overview</h4>
              <small className='text-slate-500'>Overall overview in realtime.</small>
              <BarGraphToday/>
          </CardContent>
        </Card>
        <Card className="col-span-4 row-span-6 shadow-sm">
          <CardContent className='py-3'>
              <h4 className='font-medium'>Section Utilization</h4>
              <small className='text-slate-500'>Overall section utilization in realtime.</small>
              <UtilizationGraph/>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default RealtimeDashboard