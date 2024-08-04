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

type UserSystemSheetProps = {
    buttonName: string,
    sheetTitle: string,
    sheetDescription: string,
}

const UserSystemSheet: React.FC<UserSystemSheetProps> = ({ buttonName, sheetTitle, sheetDescription }) => {
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
                            First Name
                        </Label>
                        <Input id="name" className="col-span-12" />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="name" className="text-left col-span-12">
                            Last Name
                        </Label>
                        <Input id="name" className="col-span-12" />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="name" className="text-left col-span-12">
                            Email Address
                        </Label>
                        <Input type="email" id="name" className="col-span-12" />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="username" className="text-left col-span-12">
                            Username
                        </Label>
                        <Input id="username" className="col-span-12" />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="username" className="text-left col-span-12">
                            Password
                        </Label>
                        <Input type="password" id="username" placeholder="Password" className="col-span-12" />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="username" className="text-left col-span-12">
                            Confirm Password
                        </Label>
                        <Input type="password" id="username" placeholder="Confirm Password" className="col-span-12" />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="role" className="text-left col-span-12">
                            User Role
                        </Label>
                        <Select>
                            <SelectTrigger className="col-span-12">
                                <SelectValue placeholder="User Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Administrator</SelectItem>
                                <SelectItem value="staff">Staff</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4 mt-2">
                        <Button className='col-span-12'>
                            Create User
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default UserSystemSheet