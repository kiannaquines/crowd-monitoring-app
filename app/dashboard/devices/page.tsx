'use client';

import React from 'react'
import { Card,CardContent } from '@/components/ui/card';
import {DeviceApiDataTable} from '@/components/tables/DeviceAPI';

const Devices = () => {
  return (
    <main>
      <div className='flex flex-row justify-items-between justify-between items-center'>
      <h1 className='text-xl font-semibold'>Device Track History</h1>
      </div>
      <div className='grid grid-cols-4 mt-4'>
      <Card className='col-span-4 pt-4'>
        <CardContent>
          <div className='flex flex-row justify-between justify-items-center items-center'>
              <h4 className='font-medium'>Device Track History</h4>
          </div>
          <DeviceApiDataTable/>
        </CardContent>
      </Card>
      </div>
    </main>
  )
}

export default Devices