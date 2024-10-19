"use client";

import React, { useState, useEffect } from 'react';
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

import { AUTHORIZATION_TOKEN, COMMENTS_URL } from "@/utils/constants";

export type Section = {
  id: string;
  full_name: string;
  comment: string;
  rating: string;
  date_added: string;
  update_date: string;
};


export function CommentDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});


  const [comments, setComment] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${COMMENTS_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Section[] = await response.json();

      setComment(data);
    } catch (error) {
      console.error('Error fetching sections:', error);
    } finally {
      setLoading(false);
    }
  }


  const removeComment = async (commentId: string) => {
    try {
      const response = await fetch(`${COMMENTS_URL}/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Section removed successfully');
      setComment((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.log('Error removing section:', error);
    }
  }

  const columns: ColumnDef<Section>[] = [
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
      accessorKey: "comment",
      header: "Comment",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("comment")}</div>
      ),
    },
    {
      accessorKey: "full_name",
      header: "Comment by",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("full_name")}</div>
      ),
    },
    {
      accessorKey: "rating",
      header: () => <div className="text-left">Rating</div>,
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("rating")}</div>
      ),
    },
    {
      accessorKey: "date_added",
      header: () => <div className="text-left">Date Added</div>,
      cell: ({ row }) => (
        <div className="font-medium">{new Date(row.getValue("date_added")).toLocaleString()}</div>
      ),
    },
    {
      accessorKey: "update_date",
      header: () => <div className="text-left">Update Date</div>,
      cell: ({ row }) => (
        <div className="font-medium">{new Date(row.getValue("update_date")).toLocaleString()}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const comment = row.original;
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
              <DropdownMenuItem>Edit Section</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Section</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer' onClick={() => removeComment(comment.id)}>Remove Section</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: comments,
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
                  No comments found. Please try again later.
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
    </div>
  );
}
