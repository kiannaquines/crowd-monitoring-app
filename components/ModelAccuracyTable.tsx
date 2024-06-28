'use client'

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


const data:ModelAccuracy[] = [
    {
        id:'681c2688-31d2-4a8b-a9e8-7d2009bc777a',
        mac: '00:00:00:00:00:00',
        section: 'Reference Section',
        accuracy: '90.68',
        f1: '93.43',
        precision: '94.56',
        dateTracked: "2024-06-26T09:30:00Z"
    },
    {
        id:'681c2688-31d2-4a8b-a9e8-7d2009bc777a',
        mac: '00:00:00:00:00:00',
        section: 'Reference Section',
        accuracy: '90.68',
        f1: '93.43',
        precision: '94.56',
        dateTracked: "2024-06-26T09:30:00Z"
    },
    {
        id:'681c2688-31d2-4a8b-a9e8-7d2009bc777a',
        mac: '00:00:00:00:00:00',
        section: 'Reference Section',
        accuracy: '90.68',
        f1: '93.43',
        precision: '94.56',
        dateTracked: "2024-06-26T09:30:00Z"
    },
    {
        id:'681c2688-31d2-4a8b-a9e8-7d2009bc777a',
        mac: '00:00:00:00:00:00',
        section: 'Reference Section',
        accuracy: '90.68',
        f1: '93.43',
        precision: '94.56',
        dateTracked: "2024-06-26T09:30:00Z"
    },
    {
        id:'681c2688-31d2-4a8b-a9e8-7d2009bc777a',
        mac: '00:00:00:00:00:00',
        section: 'Reference Section',
        accuracy: '90.68',
        f1: '93.43',
        precision: '94.56',
        dateTracked: "2024-06-26T09:30:00Z"
    },
    {
        id:'681c2688-31d2-4a8b-a9e8-7d2009bc777a',
        mac: '00:00:00:00:00:00',
        section: 'Reference Section',
        accuracy: '90.68',
        f1: '93.43',
        precision: '94.56',
        dateTracked: "2024-06-26T09:30:00Z"
    },
    {
        id:'681c2688-31d2-4a8b-a9e8-7d2009bc777a',
        mac: '00:00:00:00:00:00',
        section: 'Reference Section',
        accuracy: '90.68',
        f1: '93.43',
        precision: '94.56',
        dateTracked: "2024-06-26T09:30:00Z"
    },
    {
        id:'681c2688-31d2-4a8b-a9e8-7d2009bc777a',
        mac: '00:00:00:00:00:00',
        section: 'Reference Section',
        accuracy: '90.68',
        f1: '93.43',
        precision: '94.56',
        dateTracked: "2024-06-26T09:30:00Z"
    },
]


export type ModelAccuracy = {
    id: string,
    mac:string,
    section:string,
    accuracy:string,
    f1:string,
    precision:string,
    dateTracked: string,
}


export const columns: ColumnDef<ModelAccuracy>[] = [
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
      accessorKey: "mac",
      header: "Physical Address",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("mac")}</div>
      ),
    },
    {
      accessorKey: "section",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className='align-center'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Library Section
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className='text-center'>{row.getValue("section")}</div>,
    },
    {
        accessorKey: "accuracy",
        header: () => <div className="text-left">Accuracy Score</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("accuracy")}%</div>
    },
    },
    {
        accessorKey: "f1",
        header: () => <div className="text-left">F1 Score</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("f1")}%</div>
    },
    },
    {
        accessorKey: "precision",
        header: () => <div className="text-left">Precision Score</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("precision")}%</div>
    },
    },
    {
        accessorKey: "dateTracked",
        header: () => <div className="text-left">Date Added</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("dateTracked")}</div>
        },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const schedule = row.original
  
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
              <DropdownMenuItem>
                Edit Schedule
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Schedule</DropdownMenuItem>
              <DropdownMenuItem>Remove Schedule</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
]
export function ModelAccuracyDataTable() {
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
            value={(table.getColumn("sectionName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("sectionName")?.setFilterValue(event.target.value)
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
  