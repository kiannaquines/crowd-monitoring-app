"use client"

import React from 'react'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type ScheduleSystemSheetProps = {
    buttonName: string,
    sheetTitle: string,
    sheetDescription: string,
}

const ScheduleSystemSheet: React.FC<ScheduleSystemSheetProps> = ({ buttonName, sheetTitle, sheetDescription }) => {

    const [date, setDate] = React.useState<Date>()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>
                    {buttonName}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>
                        {sheetDescription}
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="name" className="text-left col-span-12">
                            Section Name
                        </Label>
                        <Input id="name" className="col-span-12" />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="name" className="text-left col-span-12">
                            Maximum Capacity
                        </Label>
                        <Input type='number' id="name" className="col-span-12" />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="role" className="text-left col-span-12">
                            Library Section
                        </Label>
                        <Select>
                            <SelectTrigger className="col-span-12">
                                <SelectValue placeholder="Select Library Section Alert Level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Low</SelectItem>
                                <SelectItem value="staff">Medium</SelectItem>
                                <SelectItem value="info">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4 mt-2">
                        <Button className='col-span-12'>
                            Create Schedule
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default ScheduleSystemSheet