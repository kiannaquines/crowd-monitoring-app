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
import BarGraphToday from '../components/BarGraphToday';
import UtilizationGraph from '../components/UtilizationGraph';
import DashboardCalendar from '@/components/DashboardCalendar';
import Link from 'next/link';

const HomePage = () => {
  return (
    <main>
      <h1 className='text-xl font-semibold'>Todays Overview</h1>

      <div className='grid grid-cols-4 mt-4 gap-4'>
        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <div className='flex flex-row justify-between justify-items-center items-center'>
              <h4 className='font-medium'>Today Visit</h4>
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
     
        <Card className="col-span-2 row-span-6 shadow-sm">
          <CardContent className='py-3'>
            <h4 className='font-medium'>Todays Overview</h4>
              <BarGraphToday/>
          </CardContent>
        </Card>
        
        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Reference Section</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>

        <Card className="shadow-sm ">
          <CardContent className='py-3'>
            <h4 className='font-medium'>Medical Section</h4>
            <h1 className='text-2xl font-semibold mt-1'>1,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last day</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm '>
          <CardContent className='py-3'>
            <h4 className='font-medium'>IT Section</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm '>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Filipiniana</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm col-span-2 row-span-6 min-h-[100px]'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Todays Section Utilization</h4>
            <UtilizationGraph/>
          </CardContent>
        </Card>

        <Link href="/users">
          <Card className='shadow-sm cursor-pointer'>
            <CardContent className='py-3'>
              <div className='flex flex-row justify-between items-center justify-items-center'>
                <h4 className='font-medium'>Total Users</h4>
                <Users/>
              </div>
              <h1 className='text-2xl font-semibold mt-1'>150</h1>
              <small className='text-slate-400 text-sm'>Click here for more information.</small>
            </CardContent>
          </Card>
        </Link>
        <Link href="/users/staff">
          <Card className='shadow-sm cursor-pointer'>
            <CardContent className='py-3'>
              <div className='flex flex-row justify-between items-center justify-items-center'>
                <h4 className='font-medium'>Total Staff</h4>
                <Users/>
              </div>
              <h1 className='text-2xl font-semibold mt-1'>10</h1>
              <small className='text-slate-400 text-sm'>Click here for more information.</small>
            </CardContent>
          </Card>
        </Link>
        <Link href="/users/admin">
          <Card className='shadow-sm cursor-pointer'>
            <CardContent className='py-3'>
              <div className='flex flex-row justify-between items-center justify-items-center'>
                <h4 className='font-medium'>Total Admin</h4>
                <Users/>
              </div>
              <h1 className='text-2xl font-semibold mt-1'>2</h1>
              <small className='text-slate-400 text-sm'>Click here for more information.</small>
            </CardContent>
          </Card>
        </Link>
        <Link href="/sections">
          <Card className='shadow-sm cursor-pointer'>
            <CardContent className='py-3'>
              <div className='flex flex-row justify-between items-center justify-items-center'>
                <h4 className='font-medium'>Total Staff</h4>
                <Building/>
              </div>
              <h1 className='text-2xl font-semibold mt-1'>6</h1>
              <small className='text-slate-400 text-sm'>Click here for more information.</small>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  )
}

export default HomePage