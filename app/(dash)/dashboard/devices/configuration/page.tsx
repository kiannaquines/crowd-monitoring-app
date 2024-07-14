import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {DeviceConfigurationDataTable} from '@/components/tables/DeviceConfiguration';

const Configuration = () => {
    return (
      <main>
        <div className='flex flex-row justify-items-between justify-between items-center'>
        <h1 className='text-xl font-semibold'>Configuration</h1>
        </div>
        <div className='grid grid-cols-4 mt-4'>
        <Card className='col-span-4 pt-4'>
          <CardContent>
            <div className='flex flex-row justify-between justify-items-center items-center'>
                <h4 className='font-medium'>Available Devices</h4>
            </div>
            <DeviceConfigurationDataTable/>
          </CardContent>
        </Card>
        </div>
      </main>
  )
}

export default Configuration