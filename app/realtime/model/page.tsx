import React from 'react';
import {Card,CardContent} from '@/components/ui/card';
import ModelAccuracyModel from '@/components/ModelAccuracyGraph';

import { DataTableDemo } from '@/components/Schedule';
import { Button } from '@/components/ui/button';

const ModelAccuracyRealtime = () => {
  return (
    <main>
        <h1 className='text-xl font-semibold'>Realtime Model Accuracy Analytics</h1>
        <div className='grid grid-cols-4 mt-4 gap-4'>
        <Card className="col-span-4 row-span-6 shadow-sm">
          <CardContent className='py-3'>
              <h4 className='font-medium'>Model Accuracy Overview</h4>
              <small className='text-slate-300'>Overall model accuracy in realtime.</small>
              <ModelAccuracyModel/>
          </CardContent>
        </Card>
        <Card className='col-span-4 pt-4'>
        <CardContent>
          <div className='flex flex-row justify-between justify-items-center items-center'>
              <h4 className='font-medium'>Available Schedules</h4>
          </div>
          <DataTableDemo/>
        </CardContent>
      </Card>
      </div>
    </main>
  )
}

export default ModelAccuracyRealtime