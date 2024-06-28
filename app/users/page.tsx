'use client'

import React,{useState} from 'react'
import { Card,CardContent } from '@/components/ui/card';
import { UserDataTable } from '@/components/UserTable';
import { Button } from '@/components/ui/button';
import SystemButton from '@/components/ui/SystemButton';
import AddUserSheet from '@/components/AddUserSheet';

const UsersPage = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <main>
      <div className='flex flex-row justify-items-between justify-between items-center'>
      <h1 className='text-xl font-semibold'>Users</h1>
        <SystemButton onClick={handleOpenSheet} name='Add User'/>
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
        <AddUserSheet isOpen={isSheetOpen} onClose={handleCloseSheet}/>
    </main>
  )
}

export default UsersPage