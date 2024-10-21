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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import FileUploadDropZone from '@/components/parts/Dropzone';
import { ZONES_URL, AUTHORIZATION_TOKEN, GET_ZONES_URL, } from '@/utils/constants';
import Cookies from 'js-cookie'

type ScheduleSystemSheetProps = {
    buttonName: string;
    sheetTitle: string;
    sheetDescription: string;
};

const ScheduleSystemSheet: React.FC<ScheduleSystemSheetProps> = ({
    buttonName,
    sheetTitle,
    sheetDescription,
}) => {

    const accessToken = Cookies.get('bearer')


    const [section, setSection] = useState('');
    const [description, setDescription] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDrop = (acceptedFiles: File[]) => {
        setUploadedFiles(acceptedFiles);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('name', section);
        formData.append('description', description);
        uploadedFiles.forEach((file) => {
            formData.append('files', file);
        });


        try {
            const response = await fetch(`${ZONES_URL}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                alert('Submission successful');
                setIsOpen(false);
                setSection('');
                setDescription('');

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
                    'Authorization': `Bearer ${accessToken}`,
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
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="description" className="text-left col-span-12">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            cols={30}
                            className="col-span-12"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="grid w-full gap-1.5">
                        <Label>Upload Files</Label>
                        <FileUploadDropZone onDrop={handleDrop} />
                    </div>

                    <div className="grid grid-cols-12 items-center gap-4 mt-2">
                        <Button type="submit" disabled={isSubmitting} className='col-span-12'>
                            {isSubmitting ? 'Submitting...' : 'Create Section'}
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default ScheduleSystemSheet;
