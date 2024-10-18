import React from 'react'
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Building, Users, Activity } from 'lucide-react';
import BarGraphToday from '@/components/charts/BarGraphToday';
import UtilizationGraph from '@/components/charts/UtilizationGraph';
import Link from 'next/link';

const HomePage = () => {
  return (
    <main>
      <h1 className='text-xl font-semibold'>Today's Overview</h1>

      <div className='grid grid-cols-1 md:grid-cols-4 mt-4 gap-4'>
        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <div className='flex flex-row justify-between items-center'>
              <h4 className='font-medium'>Today Visit</h4>
              <Activity />
            </div>
            <h1 className='text-2xl font-semibold mt-1'>+1,250</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last day</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <div className='flex flex-row justify-between items-center'>
              <h4 className='font-medium'>Last Day Visit</h4>
              <Activity />
            </div>
            <h1 className='text-2xl font-semibold mt-1'>+1,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last day</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <div className='flex flex-row justify-between items-center'>
              <h4 className='font-medium'>Last Week Visit</h4>
              <Activity />
            </div>
            <h1 className='text-2xl font-semibold mt-1'>+1,672</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last day</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <div className='flex flex-row justify-between items-center'>
              <h4 className='font-medium'>Total Visit</h4>
              <Activity />
            </div>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm col-span-1 md:col-span-4 row-span-2'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Today's Section Utilization</h4>
            <small className='text-slate-500 text-sm'>Overview of section utilization today</small>
            <div className='w-full h-48'> {/* Adjust the height as needed */}
              <UtilizationGraph />
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Reference Section</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Medical Section</h4>
            <h1 className='text-2xl font-semibold mt-1'>1,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last day</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>IT Section</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Filipiniana</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm col-span-1 md:col-span-4 row-span-3'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Today's Overview</h4>
            <small className='text-slate-500 text-sm'>Overview of hourly activities today</small>
            <div className='w-full h-48'>
              <BarGraphToday />
            </div>
          </CardContent>
        </Card>

        <Link href="/users">
          <Card className='shadow-sm cursor-pointer'>
            <CardContent className='py-3'>
              <div className='flex flex-row justify-between items-center'>
                <h4 className='font-medium'>Total Users</h4>
                <Users />
              </div>
              <h1 className='text-2xl font-semibold mt-1'>150</h1>
              <small className='text-slate-500 text-sm'>More users information.</small>
            </CardContent>
          </Card>
        </Link>

        <Link href="/users/staff">
          <Card className='shadow-sm cursor-pointer'>
            <CardContent className='py-3'>
              <div className='flex flex-row justify-between items-center'>
                <h4 className='font-medium'>Total Staff</h4>
                <Users />
              </div>
              <h1 className='text-2xl font-semibold mt-1'>10</h1>
              <small className='text-slate-500 text-sm'>More staff information.</small>
            </CardContent>
          </Card>
        </Link>

        <Link href="/users/admin">
          <Card className='shadow-sm cursor-pointer'>
            <CardContent className='py-3'>
              <div className='flex flex-row justify-between items-center'>
                <h4 className='font-medium'>Total Admin</h4>
                <Users />
              </div>
              <h1 className='text-2xl font-semibold mt-1'>2</h1>
              <small className='text-slate-500 text-sm'>More admin information.</small>
            </CardContent>
          </Card>
        </Link>

        <Link href="/sections">
          <Card className='shadow-sm cursor-pointer'>
            <CardContent className='py-3'>
              <div className='flex flex-row justify-between items-center'>
                <h4 className='font-medium'>Total Sections</h4>
                <Building />
              </div>
              <h1 className='text-2xl font-semibold mt-1'>6</h1>
              <small className='text-slate-500 text-sm'>More section information.</small>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  )
}

export default HomePage;
