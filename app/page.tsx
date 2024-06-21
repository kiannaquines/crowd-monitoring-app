import React from 'react'
import Navbar from '../components/Header'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Building } from 'lucide-react';

const HomePage = () => {
  return (
    <main>
      <h1 className='text-xl font-semibold'>Dashboard</h1>

      <div className='grid grid-cols-4 mt-4 gap-2'>
        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Today Visit</h4>
            <h1 className='text-2xl font-semibold mt-1'>1,250</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last day</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Last Day Visit</h4>
            <h1 className='text-2xl font-semibold mt-1'>1,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last day</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Last Week Visit</h4>
            <h1 className='text-2xl font-semibold mt-1'>1,672</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last day</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Total Visit</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>
     
        <Card className="col-span-2 row-span-6 shadow-sm">
          <CardContent className='py-3'>
            <h4 className='font-medium'>Today Visit</h4>
            <h1 className='text-2xl font-semibold mt-1'>1,250</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last day</small>
          </CardContent>
        </Card>
        
        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Total Visit</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Total Visit</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>

        <Card className="col-span-2 row-span-5 shadow-sm">
          <CardContent className='py-3'>
            <h4 className='font-medium'>Last Day Visit</h4>
            <h1 className='text-2xl font-semibold mt-1'>1,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last day</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm col-span-2 row-span-3'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Total Visit</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Total Visit</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Total Visit</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Total Visit</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Total Visit</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>


        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Total Visit</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='py-3'>
            <h4 className='font-medium'>Total Visit</h4>
            <h1 className='text-2xl font-semibold mt-1'>34,000</h1>
            <small className='text-slate-500 text-sm'>Increase +20% last week</small>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default HomePage