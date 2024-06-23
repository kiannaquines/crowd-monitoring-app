import React from 'react'
import { Card,CardContent } from '@/components/ui/card';
import { DataTableDemo } from '@/components/Schedule';
import { Button } from '@/components/ui/button';

const UsersPage = () => {
  return (
    <main>
      <div className='flex flex-row justify-items-between justify-between items-center'>
      <h1 className='text-xl font-semibold'>Users</h1>
      <Button>
        Add Section
      </Button>
      </div>
      <div className='grid grid-cols-4 mt-4'>
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

export default UsersPage