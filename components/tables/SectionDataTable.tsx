"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge"

import { GET_ZONES_URL, ZONES_URL, ZONE_UPLOAD_URL } from "@/utils/constants";
import { Textarea } from '../ui/textarea';
import FileUploadDropZone from '../parts/Dropzone';
import { Label } from '../ui/label';
import Link from 'next/link';
import Cookies from 'js-cookie'
import { useToast } from '@/hooks/use-toast'
import TagInput from '../parts/TagsInput';

type ImageUrl = {
  id: number;
  image_url: string;
};

type Category = {
  id: number;
  category_name: string;
};

export type Section = {
  id: string;
  name: string;
  description: string;
  image_url: ImageUrl[];
  categories: Category[];
  date_added: string;
  update_date: string;
};

const SectionDetailsSheet: React.FC<{
  section: Section | null;
  onClose: () => void;
  isEditing: boolean;
  onSave: (updatedSection: Section) => void;
}> = ({ section, onClose, isEditing, onSave }) => {
  if (!section) return null;
  const accessToken = Cookies.get('bearer')

  const [name, setName] = useState(section.name);
  const [description, setDescription] = useState(section.description);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { toast } = useToast();
  useEffect(() => {
    setName(section.name);
    setDescription(section.description);
  }, [section]);

  const handleDrop = (acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (selectedCategories.length > 0) {
      const categoryIds = selectedCategories.map(category => category['value']);
      formData.append('categories_json', categoryIds.join(','));
    }
    uploadedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(`${ZONES_URL}${section.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 401) {
        window.location.href = '/'
      }
      const message = await response.json();

      if (response.ok) {
        const updatedSection: Section = {
          ...section,
          name,
          description,
          update_date: new Date().toISOString(),
        };
        onSave(updatedSection);
        toast({
          title: 'Section Details Updated',
          description: 'Section details have been updated successfully.',
        })
        onClose();

        setTimeout(function(){
          window.location.reload();
        }, 1000)
      } else {
        toast({
          variant: "destructive",
          title: 'Something went wrong',
          description: message.detail,
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Something went wrong',
        description: 'There was an error while updating section.',
      })
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionDetails = [
    { field: "ID", value: section.id },
    { field: "Name", value: section.name },
    { field: "Description", value: section.description },
    { field: "Categories", value: section.categories.map(cat => <Badge key={cat.id} variant="outline" className='ml-2'>{cat.category_name}</Badge>) },
    { field: "Date Added", value: new Date(section.date_added).toLocaleString() },
    { field: "Last Updated", value: new Date(section.update_date).toLocaleString() },
  ];

  const handleCategoryChange = (selectedOptions: React.SetStateAction<never[]>) => {
    setSelectedCategories(selectedOptions);
  };

  return (
    <Sheet open={!!section} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto w-[600px] sm:w-[800px]">
        <SheetHeader>
          <SheetTitle>{isEditing ? "Edit Section" : "Section Details"}</SheetTitle>
          <SheetDescription>{section.name} section details</SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-12 items-center gap-4">
                <Label htmlFor="section" className="text-left col-span-12">Section</Label>
                <Input
                  id="section"
                  className="col-span-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-12 items-center gap-4">
                <Label htmlFor="description" className="text-left col-span-12">Description</Label>
                <Textarea
                  id="description"
                  cols={30}
                  rows={8}
                  className="col-span-12"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid w-full gap-1.5">
                <Label>Upload Files</Label>
                <FileUploadDropZone onDrop={handleDrop} />
              </div>

              <div className="grid w-full gap-1.5">
                <Label>Categories</Label>
                <TagInput onChange={handleCategoryChange} />
              </div>

              <div className="grid grid-cols-12 items-center gap-4 mt-2">
                <Button type="submit" disabled={isSubmitting} className='col-span-12'>
                  {isSubmitting ? 'Submitting...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          ) : (
            <Table>
              <TableBody>
                {sectionDetails.map((detail) => (
                  <TableRow key={detail.field}>
                    <TableCell className="font-semibold">{detail.field}</TableCell>
                    <TableCell>{detail.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        {!isEditing && section.image_url && section.image_url.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Images</h3>
            <div className="grid grid-cols-2 gap-4">
              {section.image_url.map((image) => (
                <img
                  key={image.id}
                  src={`${ZONE_UPLOAD_URL}${image.image_url}`}
                  alt={`Section image ${image.id}`}
                  className="w-full h-auto object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export function SectionDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const { toast } = useToast();

  const accessToken = Cookies.get('bearer')

  const fetchSections = async () => {
    try {
      const response = await fetch(`${GET_ZONES_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        window.location.href = '/'
      }

      if (!response.ok && response.status === 404) {
        toast({
          title: "No details found",
          description: "No details found for sections",
        })
      } else if (!response.ok && response.status === 500) {
        toast({
          title: "Something went wrong",
          description: "Error while fetching sections",
        })
      }
      const data: Section[] = await response.json();

      setSections(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Something went wrong',
        description: 'There was an error while fetching sections.',
      })
    } finally {
      setLoading(false);
    }
  };

  const removeSection = async (sectionId: string) => {
    try {
      const response = await fetch(`${ZONES_URL}${sectionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        window.location.href = '/'
      }

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: 'Something went wrong',
          description: 'There was an error while removing sections.',
        })
      }
      await response.json();
      toast({
        title: 'Section Removed',
        description: 'Section has been removed successfully.',
      })

      setSections((prevSections) => prevSections.filter(section => section.id !== sectionId));
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Something went wrong',
        description: 'There was an error while removing sections.',
      })
    }
  };


  useEffect(() => {
    fetchSections();
  }, []);

  const columns: ColumnDef<Section>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Section",
      cell: ({ row }) => (
        <div className="font-normal capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "date_added",
      header: () => <div className="text-left">Date Added</div>,
      cell: ({ row }) => (
        <div className="font-normal">{new Date(row.getValue("date_added")).toLocaleString()}</div>
      ),
    },
    {
      accessorKey: "update_date",
      header: () => <div className="text-left">Date Updated</div>,
      cell: ({ row }) => (
        <div className="font-normal">{new Date(row.getValue("update_date")).toLocaleString()}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const section = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer"
                onClick={() => {
                  setSelectedSection(section);
                  setIsEditing(true);
                }}>Edit Section</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer' onClick={() => setSelectedSection(section)}>View Section</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer' onClick={() => removeSection(section.id)}>
                Remove Section
              </DropdownMenuItem>
              <Link href='/dashboard/sections/1'>
                <DropdownMenuItem className='cursor-pointer'>
                  Details
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: sections,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter sections..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filters <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No sections found. Please add sections to see the table.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <SectionDetailsSheet
        section={selectedSection}
        onClose={() => {
          setSelectedSection(null);
          setIsEditing(false);
        }}
        isEditing={isEditing}
        onSave={(updatedSection) => {
          setSections((prevSections) =>
            prevSections.map((section) =>
              section.id === updatedSection.id ? updatedSection : section
            )
          );
          setIsEditing(false);
        }}
      />
    </div>
  );
}
