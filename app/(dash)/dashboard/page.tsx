import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarGraphToday } from '@/components/charts/BarGraphToday';
import { DashBoardChart } from '@/components/charts/DashBoardChart';

import { SectionUtilizationComparisonChart } from '@/components/charts/SectionUtilizationComparisonChart';
import { VisitorsCount } from '@/components/charts/VisitorsCount';
import { LiveChartDevices } from '@/components/charts/LiveChartDevices';
import { AccuracyScoreChart } from '@/components/charts/AccuracyScoreChart';

const HomePage = () => {
  return (
    <main>
      <h1 className='text-xl font-semibold'>Crowd Monitoring Overview</h1>

      <div className='grid grid-cols-1 md:grid-cols-4 mt-4 gap-4'>
        <Card className='shadow-sm cursor-pointer'>
          <CardHeader className="items-start pb-4">
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className='py-3'>
            <h1 className='text-6xl font-semibold mt-1'>150</h1>
          </CardContent>
          <CardFooter className='items-start'>
            <p>Total active users available</p>
          </CardFooter>
        </Card>

        <Card className='shadow-sm cursor-pointer'>
          <CardHeader className="items-start pb-4">
            <CardTitle>Total Staff</CardTitle>
          </CardHeader>
          <CardContent className='py-3'>
            <h1 className='text-6xl font-semibold mt-1'>10</h1>
          </CardContent>
          <CardFooter className='items-start'>
            <p>Total staff users available</p>
          </CardFooter>
        </Card>

        <Card className='shadow-sm cursor-pointer'>
          <CardHeader className="items-start pb-4">
            <CardTitle>Total Admin</CardTitle>
          </CardHeader>
          <CardContent className='py-3'>
            <h1 className='text-6xl font-semibold mt-1'>2</h1>
          </CardContent>
          <CardFooter className='items-start'>
            <p>Total super users available</p>
          </CardFooter>
        </Card>

        <Card className='shadow-sm cursor-pointer'>
          <CardHeader className="items-start pb-4">
            <CardTitle>Total Sections</CardTitle>
          </CardHeader>
          <CardContent className='py-3'>
            <h1 className='text-6xl font-semibold mt-1'>6</h1>
          </CardContent>
          <CardFooter className='items-start'>
            <p>Total sections available</p>
          </CardFooter>
        </Card>
        <DashBoardChart />
        <AccuracyScoreChart />
        <LiveChartDevices />

        <VisitorsCount type="Today" visitors={45} />
        <VisitorsCount type="Last Day" visitors={55} />
        <VisitorsCount type="Last Week" visitors={67} />
        <VisitorsCount type="Last Month" visitors={78} />
        <SectionUtilizationComparisonChart />
        <BarGraphToday />
      </div>
    </main>
  )
}

export default HomePage;
