"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import {
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
import { CATEGORY_URL } from '@/utils/constants';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import { Label } from '../ui/label';
import Cookies from 'js-cookie'
import { useToast } from '@/hooks/use-toast';

export type Category = {
  category_id: string;
  category_name: string;
  date_added: string;
  update_date: string;
};


const CategoryEditViewSheet: React.FC<{
  category: Category | null;
  onClose: () => void;
  isEditing: boolean;
  onSave: (updatedSection: Category) => void;
}> = ({ category, onClose, isEditing, onSave }) => {
  if (!category) return null;
  const { toast } = useToast()

  const [category_name, setCategory] = useState(category.category_name);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const accessToken = Cookies.get('bearer')

  useEffect(() => {
    setCategory(category.category_name);
  }, [category]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${CATEGORY_URL}/?category_id=${category.category_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category_name: category_name,
        }),
      });

      const message = await response.json();

      if (response.ok) {

        const updatedCategory: Category = {
          ...category,
          category_name,
          update_date: new Date().toISOString(),
        };
        onSave(updatedCategory);
        toast({
          title: "Success",
          description: "You have successfully updated the category",
        })
        onClose();
      } else {
        toast({
          title: "Something went wrong",
          description: 'An error occurred while updating the category',
        })
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Error occurred while updating the category",
      })
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionDetails = [
    { field: "ID", value: category.category_id },
    { field: "Name", value: category.category_name },
    { field: "Date Added", value: new Date(category.date_added).toLocaleString() },
    { field: "Last Updated", value: new Date(category.update_date).toLocaleString() },
  ];

  return (
    <Sheet open={!!category} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto w-[600px] sm:w-[800px]">
        <SheetHeader>
          <SheetTitle>{isEditing ? "Edit Category" : "Category Details"}</SheetTitle>
          <SheetDescription>{category.category_name} category details</SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-12 items-center gap-4">
                <Label htmlFor="section" className="text-left col-span-12">Section</Label>
                <Input
                  id="section"
                  className="col-span-12"
                  value={category_name}
                  onChange={(e) => setCategory(e.target.value)}
                />
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
      </SheetContent>
    </Sheet>
  );
};


export function CategoryDataTable() {

  const accessToken = Cookies.get('bearer')

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [category, setCategory] = useState<Category[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast()

  const fetchCategory = async () => {
    try {
      const response = await fetch(`${CATEGORY_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const message = await response.json();

      if (!response.ok) {
        toast({
          title: "Something went wrong",
          description: message.detail,
        });
        return;
      }

      const data: Category[] = message;
      setCategory(data);

    } catch (error) {
      toast({
        title: "Something went wrong",
        description: 'Error fetching category',
      });
    } finally {
      setLoading(false);
    }
  };


  const removeCategory = async (category_id: string) => {
    try {
      const response = await fetch(`${CATEGORY_URL}/?catId=${category_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const message = await response.json()

      if (!response.ok) {
        toast({
          title: "Something went wrong",
          description: message.detail,
        })
      } else {
        toast({
          title: "Success",
          description: message.message,
        })
      }

      setCategory((prevCategory) => prevCategory.filter((cat) => String(cat.category_id) !== String(category_id)));

    } catch (error) {
      toast({
        title: "Something went wrong",
        description: 'Error removing category',
      })
    }
  }


  useEffect(() => {
    fetchCategory();
  }, []);


  const columns: ColumnDef<Category>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
      accessorKey: "category_name",
      header: "Category",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("category_name")}</div>
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
      header: () => <div className="text-left">Update Added</div>,
      cell: ({ row }) => (
        <div className="font-normal">{new Date(row.getValue("update_date")).toLocaleString()}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const category = row.original;
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
              <DropdownMenuItem onClick={() => {
                setSelectedCategory(category);
                setIsEditing(true);
              }}>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedCategory(category)}>View</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer' onClick={() => removeCategory(category.category_id)}>Remove</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

  const table = useReactTable({
    data: category,
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
          value={(table.getColumn("section.name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("section.name")?.setFilterValue(event.target.value)
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
            {table.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
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
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No Categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
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
      <CategoryEditViewSheet
        category={selectedCategory}
        onClose={() => {
          setSelectedCategory(null);
          setIsEditing(false);
        }}
        isEditing={isEditing}
        onSave={(updatedCategory) => {
          setCategory((prevCategory) =>
            prevCategory.map((category) =>
              category.category_id === updatedCategory.category_id ? updatedCategory : category
            )
          );
          setIsEditing(false);
        }}
      />
    </div>
  );
}
