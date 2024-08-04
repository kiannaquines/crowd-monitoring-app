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
                            Schedule Name
                        </Label>
                        <Input id="name" className="col-span-12" />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="role" className="text-left col-span-12">
                            Library Section
                        </Label>
                        <Select>
                            <SelectTrigger className="col-span-12">
                                <SelectValue placeholder="Select Library Section" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Reference Section</SelectItem>
                                <SelectItem value="staff">Medical Section</SelectItem>
                                <SelectItem value="info">Information Tech Section</SelectItem>
                                <SelectItem value="pub">USM Publication</SelectItem>
                                <SelectItem value="ser">Serials Section</SelectItem>
                                <SelectItem value="fil">Filipinianas Section</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="name" className="text-left col-span-12">
                            Schedule
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "col-span-12 justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
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