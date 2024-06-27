"use client"

import React from "react"
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

const data: Schedule[] = [
    {
      id: '1',
      scheduleTitle: "Reference Section Morning Schedule",
      area: "Reference Section",
      duration: "08:00 am - 12:00 pm",
      crowdLevel: 50,
      alertLevel: "Low",
      createdAt: "2024-06-26T09:00:00Z",
      updatedAt: "2024-06-26T09:30:00Z",
    },
    {
    id: '2',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },
    {
    id: '3',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },
    {
    id: '4',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },
    {
    id: '5',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },
    {
    id: '6',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },
    {
    id: '7',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },
    {
    id: '8',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },
    {
    id: '9',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },
    {
    id: '10',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },
    {
    id: '11',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },
    {
    id: '12',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },
    {
    id: '13',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },{
    id: '14',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },

    {
    id: '15',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },
    {
    id: '16',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },
    {
    id: '17',
    scheduleTitle: "Reference Section Morning Schedule",
    area: "Reference Section",
    duration: "08:00 am - 12:00 pm",
    crowdLevel: 50,
    alertLevel: "Low",
    createdAt: "2024-06-26T09:00:00Z",
    updatedAt: "2024-06-26T09:30:00Z",
    },
];

export type Schedule = {
    id: string,
    scheduleTitle: string,
    area: string,
    duration: string,
    crowdLevel: number,
    alertLevel: string,
    createdAt: string,
    updatedAt: string,
}

export const columns: ColumnDef<Schedule>[] = [
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
      accessorKey: "scheduleTitle",
      header: "Schedule",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("scheduleTitle")}</div>
      ),
    },
    {
      accessorKey: "area",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Area
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("area")}</div>,
    },
    {
        accessorKey: "duration",
        header: () => <div className="text-left">Duration</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("duration")}</div>
    },
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="text-left">Date Added</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("createdAt")}</div>
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
  
export function ScheduleDataTable() {
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
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
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
