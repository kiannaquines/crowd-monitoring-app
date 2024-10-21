"use client";

import React, { useState, FormEvent, useEffect } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CATEGORY_URL, } from '@/utils/constants';
import Cookies from 'js-cookie';
import { useToast } from "@/hooks/use-toast";

type CategorySheetProps = {
    buttonName: string;
    sheetTitle: string;
    sheetDescription: string;
};

const CategorySystemSheet: React.FC<CategorySheetProps> = ({
    buttonName,
    sheetTitle,
    sheetDescription,
}) => {
    const [categoryName, setSection] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { toast } = useToast();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const accessToken = Cookies.get('bearer')
            const response = await fetch(`${CATEGORY_URL}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category_name: categoryName }),
            });

            if (response.ok) {
                const result = await response.json();
                toast({
                    title: 'Category submitted successfully',
                    description: 'Your category has been added.',
                    duration: 3000,
                })
                setIsOpen(false);
                setSection('');

                setTimeout(() => {
                    window.location.reload();
                }, 2000,);
            } else {
                toast({
                    title: 'Failed to submit category',
                    description: 'An error occurred while trying to add your category.',
                    duration: 3000,
                })
            }
        } catch (error) {
            toast({
                title: 'Failed to submit category',
                description: 'An error occurred while trying to add your category.',
                duration: 3000,
            })
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button>
                    {buttonName}
                </Button>
            </SheetTrigger>
            <SheetContent className='overflow-y-auto'>
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>
                        {sheetDescription}
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="category" className="text-left col-span-12">
                            Category
                        </Label>
                        <Input
                            id="category"
                            className="col-span-12"
                            value={categoryName}
                            onChange={(e) => setSection(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-12 items-center gap-4 mt-2">
                        <Button type="submit" disabled={isSubmitting} className='col-span-12'>
                            {isSubmitting ? 'Submitting...' : 'Add Category'}
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default CategorySystemSheet;
