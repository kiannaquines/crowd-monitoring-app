import SectionSystemSheet from '@/components/parts/SectionSystemSheet'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import {CommentDataTable} from '@/components/tables/CommentsTable'

const CommentsPage = () => {
  return (
    <main>
      <div className='flex flex-row justify-items-between justify-between items-center'>
      <h1 className='text-xl font-semibold'>Comments</h1>
        <SectionSystemSheet
          buttonName="Add Comment"
          sheetTitle="Add New Comment"
          sheetDescription="Add new library comment to the system"
          />
      </div>
      <div className='grid grid-cols-4 mt-4'>
      <Card className='col-span-4 pt-4'>
        <CardContent>
          <div className='flex flex-row justify-between justify-items-center items-center'>
              <h4 className='font-medium'>Comment List</h4>
          </div>
          <CommentDataTable/>
        </CardContent>
      </Card>
      </div>
    </main>
  )
}

export default CommentsPage