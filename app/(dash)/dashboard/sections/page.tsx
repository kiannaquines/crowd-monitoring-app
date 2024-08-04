import React from "react";
import { Card,CardContent } from '@/components/ui/card';
import {SectionDataTable} from '@/components/tables/SectionTable';
import SectionSystemSheet from "@/components/parts/SectionSystemSheet";

const Sections = () => {
    return (
      <main>
        <div className='flex flex-row justify-items-between justify-between items-center'>
        <h1 className='text-xl font-semibold'>Sections</h1>
          <SectionSystemSheet
            buttonName="Add Section"
            sheetTitle="Add New Library Section"
            sheetDescription="Add new library section to the system"
            />
        </div>
        <div className='grid grid-cols-4 mt-4'>
        <Card className='col-span-4 pt-4'>
          <CardContent>
            <div className='flex flex-row justify-between justify-items-center items-center'>
                <h4 className='font-medium'>Available Schedules</h4>
            </div>
            <SectionDataTable/>
          </CardContent>
        </Card>
        </div>
      </main>
    )
}

export default Sections