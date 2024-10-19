import CategorySystemSheet from '@/components/parts/CategorySheet'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import {CategoryDataTable} from '@/components/tables/CategoryTable'

const CategoryPage = () => {
  return (
    <main>
      <div className='flex flex-row justify-items-between justify-between items-center'>
      <h1 className='text-xl font-semibold'>Category</h1>
        <CategorySystemSheet
          buttonName="Add Category"
          sheetTitle="Add New Category"
          sheetDescription="Add new category to the system"
          />
      </div>
      <div className='grid grid-cols-4 mt-4'>
      <Card className='col-span-4 pt-4'>
        <CardContent>
          <div className='flex flex-row justify-between justify-items-center items-center'>
              <h4 className='font-medium'>Category List</h4>
          </div>
          <CategoryDataTable/>
        </CardContent>
      </Card>
      </div>
    </main>
  )
}

export default CategoryPage