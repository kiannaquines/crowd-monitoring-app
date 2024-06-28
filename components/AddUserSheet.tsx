import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from './ui/button';

type AddUserSheetProps = {
    isOpen: boolean,
    onClose: () => void
}


const AddUserSheet: React.FC<AddUserSheetProps> = ({isOpen,onClose}) => {
  return (
    <Sheet>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>

  )
}

export default AddUserSheet