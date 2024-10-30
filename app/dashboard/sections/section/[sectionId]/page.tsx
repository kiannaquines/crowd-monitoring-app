'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { VisitorsCount } from '@/components/charts/VisitorsCount'
import Cookies from 'js-cookie';
import { useToast } from '@/hooks/use-toast';
import { SECTION_INFORMATION_URL_TODAY_COUNT } from '@/utils/constants'
import { TimeSeriesChartSection } from './TimeSeriesBarChart'

type SectionInformationProps = {
  params: {
    sectionId: string
  }
}

type VisitorCountData = {
  section: string,
  today?: { count: number; analysis_type: string };
  yesterday?: { count: number; analysis_type: string };
  last_week?: { count: number; analysis_type: string };
  last_month?: { count: number; analysis_type: string };
}

const SectionInformation: React.FC<SectionInformationProps> = ({ params: { sectionId } }) => {
  const { toast } = useToast()
  const accessToken = Cookies.get('bearer')
  const [visitorsCount, setVisitorsCount] = useState<VisitorCountData>({
    section: '',
    today: { count: 0, analysis_type: '' },
    yesterday: { count: 0, analysis_type: '' },
    last_week: { count: 0, analysis_type: '' },
    last_month: { count: 0, analysis_type: '' }
  })

  const fetchTodayCount = useCallback(async () => {
    try {
      const response = await fetch(`${SECTION_INFORMATION_URL_TODAY_COUNT}${sectionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const message = await response.json()
        toast({
          title: "Something went wrong",
          description: message.detail,
        })
        return;
      }

      const data = await response.json()
      setVisitorsCount(data)

    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There was an error while fetching data",
      })
    }
  }, [accessToken, sectionId, toast]);

  useEffect(() => {
    fetchTodayCount()
  }, [fetchTodayCount])

  return (
    <main>
      <h1 className='text-xl font-semibold'>{visitorsCount.section} Utilization</h1>
      <div className='grid grid-cols-1 md:grid-cols-4 mt-4 gap-4'>
        <VisitorsCount type='Today' visitors={visitorsCount.today?.count || 0} />
        <VisitorsCount type='Yesterday' visitors={visitorsCount.yesterday?.count || 0} />
        <VisitorsCount type='Last Week' visitors={visitorsCount.last_week?.count || 0} />
        <VisitorsCount type='Last Month' visitors={visitorsCount.last_month?.count || 0} />

        <TimeSeriesChartSection sectionId={sectionId} />
      </div>
    </main>
  )
}

export default SectionInformation