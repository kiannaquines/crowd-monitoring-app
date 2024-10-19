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
import { ZONES_URL, AUTHORIZATION_TOKEN, GET_ZONES_URL, } from '@/utils/constants';

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
    const [section, setSection] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('name', section);

        try {
            const response = await fetch(`${ZONES_URL}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`,
                },
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                alert('Submission successful');
                setIsOpen(false);
                setSection('');

                setTimeout(() => {
                    window.location.reload();
                }, 2000,);
            } else {
                alert('Submission failed');
            }
        } catch (error) {
            alert('Error submitting form');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchSections = async () => {
            const response = await fetch(GET_ZONES_URL, {
                headers: {
                    'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`,
                },
            });
            const data = await response.json();
        };

        fetchSections();
    }, []);

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
                        <Label htmlFor="section" className="text-left col-span-12">
                            Section
                        </Label>
                        <Input
                            id="section"
                            className="col-span-12"
                            value={section}
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
