"use client";

import React from 'react'
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
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
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Section[] = [
  {
    id: "1",
    name: "Reference",
    description: "The Reference Section in the library is designed to provide access to a variety of resources such as encyclopedias, dictionaries, atlases, and almanacs, which offer quick facts, definitions, and background information on various subjects. These materials are typically not available for borrowing and are meant for in-library use to support research, study, and fact-checking.",
    total_visits: '123',
    categories: ["Relax","Study","With Desk","Free Wifi"],
    date_added: "2024-06-26T09:00:00Z",
    date_update: "2024-06-26T09:00:00Z",
  },
  {
    id: "2",
    name: "IT",
    description: "The Information Technology Section in the library offers resources and materials related to computing, software development, networking, and cybersecurity. It provides access to books, research papers, and digital resources for IT professionals, students, and enthusiasts seeking to expand their knowledge in technology and innovation.",
    total_visits: '78',
    categories: ["Relax","Study","With Desk","Free Wifi"],
    date_added: "2024-06-26T10:00:00Z",
    date_update: "2024-06-26T09:00:00Z",
  },
  {
    id: "3",
    name: "Serial",
    description: "The Serials Section in the library is dedicated to materials and publications related to Philippine history, culture, and heritage. This collection includes books, manuscripts, periodicals, and other resources written by Filipino authors or about the Philippines. The section serves as an essential resource for students, researchers, and anyone interested in the rich cultural and historical heritage of the country.",
    total_visits: '90',
    categories: ["Relax","Study","With Desk","Free Wifi"],
    date_added: "2024-06-26T11:00:00Z",
    date_update: "2024-06-26T09:00:00Z",
  },
  {
    id: "4",
    name: "Medical",
    description: "The Medical Section in the library is dedicated to materials and publications related to Philippine history, culture, and heritage. This collection includes books, manuscripts, periodicals, and other resources written by Filipino authors or about the Philippines. The section serves as an essential resource for students, researchers, and anyone interested in the rich cultural and historical heritage of the country.",
    total_visits: '65',
    categories: ["Relax","Study","With Desk","Free Wifi"],
    date_added: "2024-06-26T12:00:00Z",
    date_update: "2024-06-26T09:00:00Z",
  },
  {
    id: "5",
    name: "Filipiniana",
    description: "The Filipiniana Section in the library is dedicated to materials and publications related to Philippine history, culture, and heritage. This collection includes books, manuscripts, periodicals, and other resources written by Filipino authors or about the Philippines. The section serves as an essential resource for students, researchers, and anyone interested in the rich cultural and historical heritage of the country.",
    total_visits: '45',
    categories: ["Relax","Study","With Desk","Free Wifi"],
    date_added: "2024-06-26T13:00:00Z",
    date_update: "2024-06-26T09:00:00Z",
  },
  {
    id: "6",
    name: "Publication",
    description: "The Publication Section in the library is dedicated to providing access to a wide range of printed and digital publications, including academic journals, books, magazines, and research papers. It serves as a vital resource for students, researchers, and professionals seeking reliable references and scholarly content.",
    total_visits: '56',
    categories: ["Relax","Study","With Desk","Free Wifi"],
    date_added: "2024-06-26T14:00:00Z",
    date_update: "2024-06-26T09:00:00Z",
  }
];


export type Section = {
  id: string,
  name: string,
  description: string,
  total_visits: string,
  categories: string[],
  date_added: string,
  date_update: string,
}

export const columns: ColumnDef<Section>[] = [
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
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "total_visits",
    header: () => <div className="text-left">Total Visits</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("total_visits")}</div>
    },
  },
  {
    accessorKey: "date_added",
    header: () => <div className="text-left">Date Added</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("date_added")}</div>
    },
  },
  {
    accessorKey: "date_update",
    header: () => <div className="text-left">Date Updated</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("date_update")}</div>
    },
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
            <DropdownMenuItem>Edit Section</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Section</DropdownMenuItem>
            <DropdownMenuItem>Remove Section</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


export function SectionDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
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
  })

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
              .map((column) => {
                return (
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
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
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
                  No results.
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
    </div>
  )
}
