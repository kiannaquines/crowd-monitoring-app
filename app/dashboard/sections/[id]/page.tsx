import React from 'react'
import { TimeSeriesChartSection } from './TimeSeriesChartSection'
import { VisitorsCount } from '@/components/charts/VisitorsCount'

function SectionInformation() {
  return (
    <main>
        <h1 className='text-xl font-semibold'>Information Technology Utilization</h1>
        <div className='grid grid-cols-1 md:grid-cols-4 mt-4 gap-4'>
          <VisitorsCount type='Today' visitors={349}/>
          <VisitorsCount type='Last Day' visitors={949}/>
          <VisitorsCount type='Last Week' visitors={3249}/>
          <VisitorsCount type='Last Month' visitors={2909}/>
          <TimeSeriesChartSection/>
        </div>
      </main>
  )
}

export default SectionInformation