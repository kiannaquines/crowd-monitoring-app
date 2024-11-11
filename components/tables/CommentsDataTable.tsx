"use client";

import React, { useState, useEffect, FormEvent, useCallback } from 'react';
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

import { COMMENTS_URL } from "@/utils/constants";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import { Label } from '../ui/label';
import Cookies from 'js-cookie'
import { useToast } from '@/hooks/use-toast';

export type Comment = {
  id: string;
  full_name: string;
  comment: string;
  rating: string;
  date_added: string;
  update_date: string;
};


const CommentEditViewSheet: React.FC<{
  comment: Comment | null;
  onClose: () => void;
  isEditing: boolean;
  onSave: (updatedComment: Comment) => void;
}> = ({ comment, onClose, isEditing, onSave }) => {
  const { toast } = useToast();

  const accessToken = Cookies.get('bearer');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (comment) {
      setCommentText(comment.comment);
    }
  }, [comment]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${COMMENTS_URL}/${comment?.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: commentText }),
      });

      if (response.ok && comment) {
        const updatedComment: Comment = {
          ...comment,
          comment: commentText,
          update_date: new Date().toISOString(),
        };
        onSave(updatedComment);
        toast({
          title: "Success",
          description: "Comment updated successfully",
        });
        onClose();
      } else {
        toast({
          title: "Something went wrong",
          description: "There was an error updating the comment",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There was an error updating the comment",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionDetails = comment
    ? [
        { field: "ID", value: comment.id },
        { field: "Comment", value: comment.comment },
        { field: "Date Added", value: new Date(comment.date_added).toLocaleString() },
        { field: "Last Updated", value: new Date(comment.update_date).toLocaleString() },
      ]
    : [];

  return (
    <Sheet open={!!comment} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto w-[600px] sm:w-[800px]">
        <SheetHeader>
          <SheetTitle>{isEditing ? "Edit Comment" : "Comment Details"}</SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-12 items-center gap-4">
                <Label htmlFor="comment" className="text-left col-span-12">Comment</Label>
                <Input
                  id="comment"
                  className="col-span-12"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
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




export function CommentDataTable() {
  
  const { toast } = useToast()
  const accessToken = Cookies.get('bearer')
  
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${COMMENTS_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        window.location.href = '/'
      }

      if (!response.ok && response.status === 404) {
        toast({
          title: "No details found",
          description: "No details found for comments",
        })
      } else if (!response.ok && response.status === 500) {
        toast({
          title: "Something went wrong",
          description: "Error while fetching comments",
        })
      }

      const data: Comment[] = await response.json();

      setComments(data);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There was an error fetching comments",
      })
    } finally {
      setLoading(false);
    }
  }, [accessToken, toast]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const removeComment = async (commentId: string) => {
    try {
      const response = await fetch(`${COMMENTS_URL}/${commentId}`, {
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
          title: "Something went wrong",
          description: "There was an error removing the comment",
        })
      }

      toast({
        title: "Success",
        description: "You have successfully removed the comment",
      })
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There was an error removing the comment",
      })
    }
  }

  const handleEditClick = (comment: Comment) => {
    setSelectedComment(comment);
    setIsEditing(true);
  };

  const handleViewClick = (comment: Comment) => {
    setSelectedComment(comment);
    setIsEditing(false);
  };

  const columns: ColumnDef<Comment>[] = [
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
      cell: ({ row }) => {
        const rating = row.getValue("rating") as number;
    
        const renderStars = (rating: number) => {
          const totalStars = 5; 
          const filledStars = Math.round(rating);
    
          return (
            <div className="flex">
              {[...Array(totalStars)].map((_, index) => (
                <span key={index}>
                  {index < filledStars ? (
                    <span className="text-yellow-500">★</span>
                  ) : (
                    <span className="text-gray-400">☆</span>
                  )}
                </span>
              ))}
            </div>
          );
        };
    
        return (
          <div className="font-medium">
            {renderStars(rating)}
          </div>
        );
      },
    },
    
    {
      accessorKey: "date_added",
      header: () => <div className="text-left">Date Added</div>,
      cell: ({ row }) => (
        <div className="font-medium">{new Date(row.getValue("date_added")).toLocaleString()}</div>
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
              <DropdownMenuItem onClick={() => handleEditClick(comment)}>Edit Comment</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleViewClick(comment)}>View Comment</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer' onClick={() => removeComment(comment.id)}>Remove Comment</DropdownMenuItem>
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
          value={(table.getColumn("full_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("full_name")?.setFilterValue(event.target.value)
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
                {isLoading ? 'Please wait while loading the data': 'No comment'}
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
      <CommentEditViewSheet
        comment={selectedComment}
        onClose={() => {
          setSelectedComment(null);
          setIsEditing(false);
        }}
        isEditing={isEditing}
        onSave={(updatedCategory) => {
          setComments((prevComments) =>
            prevComments.map((c) =>
              c.id === updatedCategory.id ? updatedCategory : c
            )
          );
          setIsEditing(false);
          setSelectedComment(null);
        }}
      />
    </div>
  );
}
