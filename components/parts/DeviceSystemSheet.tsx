import React from 'react'
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

type DeviceSystemSheetProps = {
    buttonName: string,
    sheetTitle: string,
    sheetDescription: string,
}

const DeviceSystemSheet: React.FC<DeviceSystemSheetProps> = ({ buttonName, sheetTitle, sheetDescription }) => {
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
                            Device Name
                        </Label>
                        <Input id="name" className="col-span-12" />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="name" className="text-left col-span-12">
                            Device Tracker User Name
                        </Label>
                        <Input id="name" className="col-span-12" />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="name" className="text-left col-span-12">
                            Static Local IP Address
                        </Label>
                        <Input type="text" id="name" placeholder='Static IP Address' className="col-span-12" />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="role" className="text-left col-span-12">
                            Device Status
                        </Label>
                        <Select>
                            <SelectTrigger className="col-span-12">
                                <SelectValue placeholder="Device Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="revoked">Revoked</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4 mt-2">
                        <Button className='col-span-12'>
                            Create Device Key
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default DeviceSystemSheet