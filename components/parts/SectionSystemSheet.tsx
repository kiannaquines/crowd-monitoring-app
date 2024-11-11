"use client";

import React, { useState, useEffect, FormEvent } from 'react';
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
import { ZONES_URL, GET_ZONES_URL } from '@/utils/constants';
import Cookies from 'js-cookie';
import { useToast } from '@/hooks/use-toast';

type SectionSystemSheetProps = {
    buttonName: string;
    sheetTitle: string;
    sheetDescription: string;
};

const SectionSystemSheet: React.FC<SectionSystemSheetProps> = ({
    buttonName,
    sheetTitle,
    sheetDescription,
}) => {
    const { toast } = useToast();
    const accessToken = Cookies.get('bearer') || '';

    const [section, setSection] = useState('');
    const [description, setDescription] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [sections, setSections] = useState([]);

    const handleDrop = (acceptedFiles: File[]) => setUploadedFiles(acceptedFiles);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!accessToken) {
            toast({ variant: "destructive", title: "Authentication Error", description: "Please log in." });
            return;
        }
        
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('name', section);
        formData.append('description', description);
        uploadedFiles.forEach(file => formData.append('files', file));

        try {
            const response = await fetch(ZONES_URL, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${accessToken}` },
                body: formData,
            });

            if (response.ok) {
                toast({ title: 'Success', description: 'New schedule system created successfully', duration: 3000 });
                setIsOpen(false);
                setSection('');
                setDescription('');
                setUploadedFiles([]);
                setTimeout(() => window.location.reload(), 2000);
            } else {
                const errorData = await response.json();
                toast({
                    variant: "destructive",
                    title: 'Error',
                    description: errorData?.message || 'Failed to create schedule system',
                    duration: 3000,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: 'Error',
                description: 'Failed to create schedule system',
                duration: 3000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchSections = async () => {
            if (!accessToken) return;

            try {
                const response = await fetch(GET_ZONES_URL, {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setSections(data);
                } else {
                    toast({ variant: "destructive", title: "Error", description: "Failed to fetch sections." });
                }
            } catch (error) {
                toast({ variant: "destructive", title: "Error", description: "Failed to fetch sections." });
            }
        };
        
        fetchSections();
    }, [accessToken, toast]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} aria-labelledby="sheet-title" aria-describedby="sheet-description">
            <SheetTrigger asChild>
                <Button>{buttonName}</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle id="sheet-title">{sheetTitle}</SheetTitle>
                    <SheetDescription id="sheet-description">{sheetDescription}</SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="section" className="text-left col-span-12">Section</Label>
                        <Input
                            id="section"
                            className="col-span-12"
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4">
                        <Label htmlFor="description" className="text-left col-span-12">Description</Label>
                        <Textarea
                            id="description"
                            className="col-span-12"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="file-upload">Upload Files</Label>
                        <FileUploadDropZone onDrop={handleDrop} />
                    </div>
                    <div className="grid grid-cols-12 items-center gap-4 mt-2">
                        <Button type="submit" disabled={isSubmitting} className="col-span-12">
                            {isSubmitting ? 'Submitting...' : 'Create Section'}
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default SectionSystemSheet;