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

const data: DeviceApi[] = [
    {
        id: "1abb47e4-05a2-4849-8061-465aaa06eb8c",
        deviceName: "Device Tracker Reference Section",
        apiKey: "c515c1ae-62e0-4b21-9b91-f2dc08e9370e",
        deviceLocalIP: "192.168.0.44",
        deviceUserName: "Reference Section",
        issuedBy: "Kian Naquines",
    },
    {
        id: "1abb47e4-05a2-4849-8061-465aaa06eb8c",
        deviceName: "Device Tracker Medical Section",
        apiKey: "c515c1ae-62e0-4b21-9b91-f2dc08e9370e",
        deviceLocalIP: "192.168.0.45",
        deviceUserName: "Medical Section",
        issuedBy: "Kian Naquines",
    },
    {
        id: "1abb47e4-05a2-4849-8061-465aaa06eb8c",
        deviceName: "Device Tracker Filipiniana Section",
        apiKey: "c515c1ae-62e0-4b21-9b91-f2dc08e9370e",
        deviceLocalIP: "192.168.0.46",
        deviceUserName: "Filipiniana Section",
        issuedBy: "Kian Naquines",
    },
    {
        id: "1abb47e4-05a2-4849-8061-465aaa06eb8c",
        deviceName: "Device Tracker Serial Section",
        apiKey: "c515c1ae-62e0-4b21-9b91-f2dc08e9370e",
        deviceLocalIP: "192.168.0.47",
        deviceUserName: "Serial Section",
        issuedBy: "Kian Naquines",
    },
    {
        id: "1abb47e4-05a2-4849-8061-465aaa06eb8c",
        deviceName: "Device Tracker USM Publication Section",
        apiKey: "c515c1ae-62e0-4b21-9b91-f2dc08e9370e",
        deviceLocalIP: "192.168.0.48",
        deviceUserName: "USM Publication Section",
        issuedBy: "Kian Naquines",
    },
    {
        id: "1abb47e4-05a2-4849-8061-465aaa06eb8c",
        deviceName: "Device Tracker Information Tech. Section",
        apiKey: "c515c1ae-62e0-4b21-9b91-f2dc08e9370e",
        deviceLocalIP: "192.168.0.49",
        deviceUserName: "Information Tech. Section",
        issuedBy: "Kian Naquines",
    }
];

type DeviceApi = {
    id: string,
    deviceName: string,
    apiKey: string,
    deviceLocalIP: string,
    deviceUserName: string,
    issuedBy: string,
}

export const columns: ColumnDef<DeviceApi>[] = [
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
      accessorKey: "deviceName",
      header: "Device Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("deviceName")}</div>
      ),
    },
    {
      accessorKey: "deviceUserName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Device Tracker Username
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("deviceUserName")}</div>,
    },
    {
        accessorKey: "deviceLocalIP",
        header: () => <div className="text-left">Device Local Address</div>,
            cell: ({ row }) => {
                return <div className="font-medium">{row.getValue("deviceLocalIP")}</div>
        },
    },
    {
        accessorKey: "issuedBy",
        header: () => <div className="text-left">Issued By</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("issuedBy")}</div>
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
                Copy API Key
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Device</DropdownMenuItem>
              <DropdownMenuItem>View Device</DropdownMenuItem>
              <DropdownMenuItem>Remove Device</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
]


export function DeviceApiDataTable() {
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
            value={(table.getColumn("issuedBy")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("issuedBy")?.setFilterValue(event.target.value)
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
  