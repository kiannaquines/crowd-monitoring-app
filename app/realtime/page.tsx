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
      <div className='grid grid-cols-4 mt-4 gap-2'>
  
        <Card className="col-span-4 row-span-6 shadow-sm">
          <CardContent className='py-3'>
              <h4 className='font-medium'>Visitors Overview</h4>
              <small className='text-slate-300'>Todays overview in realtime.</small>
              <BarGraphToday/>
          </CardContent>
        </Card>
        <Card className="col-span-4 row-span-6 shadow-sm">
          <CardContent className='py-3'>
              <h4 className='font-medium'>Model Accuracy Overview</h4>
              <small className='text-slate-300'>Todays model accuracy in realtime.</small>
              <ModelAccuracyModel/>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default RealtimeDashboard