'use client'

import React,{useState} from 'react'
import { Card,CardContent } from '@/components/ui/card';
import { UserDataTable } from '@/components/UserTable';
import SystemButton from '@/components/SystemButton';
import SystemSheet from '@/components/SystemSheet';

const UsersPage = () => {
  return (
    <main>
      <div className='flex flex-row justify-items-between align-middle justify-between items-center'>
      <h1 className='text-xl font-semibold'>Users</h1>
        <SystemSheet
          buttonName='Add User'
          sheetTitle='Add Your New User'
          sheetDescription='Add your new user to the system' 
        />
      </div>
      <div className='grid grid-cols-4 mt-4'>
        <Card className='col-span-4 pt-4'>
          <CardContent>
            <div className='flex flex-row justify-between justify-items-center items-center'>
                <h4 className='font-medium'>Available Users</h4>
            </div>
            <UserDataTable/>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default UsersPage