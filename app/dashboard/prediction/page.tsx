import { PredictionDataTable } from '@/components/tables/PredictionDataTable'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import {GenerateReportDialog} from '@/components/parts/DialogGenerateReport'

const PredictionPage = () => {
  return (
    <main>
      <div className='flex flex-row justify-items-between justify-between items-center'>
        <h1 className='text-xl font-semibold'>Model Predictions History</h1>
          <GenerateReportDialog/>
        </div>
      <div className='grid grid-cols-4 mt-4'>
      <Card className='col-span-4 pt-4'>
        <CardContent>
          <div className='flex flex-row justify-between justify-items-center items-center'>
              <h4 className='font-medium'>Prediction History</h4>
          </div>
          <PredictionDataTable/>
        </CardContent>
      </Card>
      </div>
    </main>
  )
}

export default PredictionPage