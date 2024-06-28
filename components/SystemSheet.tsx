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

type SystemSheetProps = {
    buttonName: string,
    sheetTitle: string,
    sheetDescription: string,
}

const SystemSheet: React.FC<SystemSheetProps> = ({buttonName,sheetTitle,sheetDescription}) => {
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
            </SheetContent>
        </Sheet>
    )
}

export default SystemSheet