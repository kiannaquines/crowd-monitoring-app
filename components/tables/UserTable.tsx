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

const data: Users[] = [
    {
        id: "1",
        firstName: "Kian Jearard",
        lastName: "Naquines",
        middleName: "Geraldez",
        userName: "kjgnaquines09",
        emailAddress: "kjgnaquines09@gmail.com",
        dateJoined: "2024-06-26T10:00:00Z"
    },
    {
        id: "2",
        firstName: "Alexa",
        lastName: "Smith",
        middleName: "Marie",
        userName: "alexasmith01",
        emailAddress: "alexasmith01@example.com",
        dateJoined: "2024-06-26T11:00:00Z"
    },
    {
        id: "3",
        firstName: "John",
        lastName: "Doe",
        middleName: "Allen",
        userName: "johndoe02",
        emailAddress: "johndoe02@example.com",
        dateJoined: "2024-06-26T12:00:00Z"
    },
    {
        id: "4",
        firstName: "Emma",
        lastName: "Johnson",
        middleName: "Grace",
        userName: "emmajohnson03",
        emailAddress: "emmajohnson03@example.com",
        dateJoined: "2024-06-26T13:00:00Z"
    },
    {
        id: "5",
        firstName: "Liam",
        lastName: "Williams",
        middleName: "James",
        userName: "liamwilliams04",
        emailAddress: "liamwilliams04@example.com",
        dateJoined: "2024-06-26T14:00:00Z"
    },
    {
        id: "6",
        firstName: "Olivia",
        lastName: "Brown",
        middleName: "Ava",
        userName: "oliviabrown05",
        emailAddress: "oliviabrown05@example.com",
        dateJoined: "2024-06-26T15:00:00Z"
    },
    {
        id: "7",
        firstName: "Noah",
        lastName: "Jones",
        middleName: "Benjamin",
        userName: "noahjones06",
        emailAddress: "noahjones06@example.com",
        dateJoined: "2024-06-26T16:00:00Z"
    },
    {
        id: "8",
        firstName: "Ava",
        lastName: "Garcia",
        middleName: "Sophia",
        userName: "avagarcia07",
        emailAddress: "avagarcia07@example.com",
        dateJoined: "2024-06-26T17:00:00Z"
    },
    {
        id: "9",
        firstName: "William",
        lastName: "Martinez",
        middleName: "Alexander",
        userName: "williammartinez08",
        emailAddress: "williammartinez08@example.com",
        dateJoined: "2024-06-26T18:00:00Z"
    },
    {
        id: "10",
        firstName: "Sophia",
        lastName: "Rodriguez",
        middleName: "Isabella",
        userName: "sophiarodriguez09",
        emailAddress: "sophiarodriguez09@example.com",
        dateJoined: "2024-06-26T19:00:00Z"
    },
    {
        id: "11",
        firstName: "James",
        lastName: "Hernandez",
        middleName: "Michael",
        userName: "jameshernandez10",
        emailAddress: "jameshernandez10@example.com",
        dateJoined: "2024-06-26T20:00:00Z"
    },
    {
        id: "12",
        firstName: "Isabella",
        lastName: "Lopez",
        middleName: "Mia",
        userName: "isabellalopez11",
        emailAddress: "isabellalopez11@example.com",
        dateJoined: "2024-06-26T21:00:00Z"
    },
    {
        id: "13",
        firstName: "Elijah",
        lastName: "Gonzalez",
        middleName: "Daniel",
        userName: "elijahgonzalez12",
        emailAddress: "elijahgonzalez12@example.com",
        dateJoined: "2024-06-26T22:00:00Z"
    },
    {
        id: "14",
        firstName: "Mia",
        lastName: "Wilson",
        middleName: "Charlotte",
        userName: "miawilson13",
        emailAddress: "miawilson13@example.com",
        dateJoined: "2024-06-26T23:00:00Z"
    },
    {
        id: "15",
        firstName: "Lucas",
        lastName: "Anderson",
        middleName: "Henry",
        userName: "lucasanderson14",
        emailAddress: "lucasanderson14@example.com",
        dateJoined: "2024-06-27T00:00:00Z"
    },
    {
        id: "16",
        firstName: "Amelia",
        lastName: "Thomas",
        middleName: "Evelyn",
        userName: "ameliathomas15",
        emailAddress: "ameliathomas15@example.com",
        dateJoined: "2024-06-27T01:00:00Z"
    },
    {
        id: "17",
        firstName: "Mason",
        lastName: "Taylor",
        middleName: "David",
        userName: "masontaylor16",
        emailAddress: "masontaylor16@example.com",
        dateJoined: "2024-06-27T02:00:00Z"
    }
];


export type Users = {
    id: string,
    firstName: string,
    lastName: string,
    middleName: string,
    userName: string,
    emailAddress: string,
    dateJoined: string,
}

export const columns: ColumnDef<Users>[] = [
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
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("firstName")}</div>
      ),
    },

    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
    },

    {
        accessorKey: "middleName",
        header: () => <div className="text-left">Middle Name</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("middleName")}</div>
        }
    },

    {
        accessorKey: "userName",
        header: () => <div className="text-left">User Name</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("userName")}</div>
        }
    },

    {
        accessorKey: "emailAddress",
        header: () => <div className="text-left">Email Address</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("emailAddress")}</div>
        }
    },

    {
        accessorKey: "dateJoined",
        header: () => <div className="text-left">Date Joined</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("dateJoined")}</div>
        }
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const users = row.original
  
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
];


export function UserDataTable() {
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
            placeholder="Filter using usernames..."
            value={(table.getColumn("userName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("userName")?.setFilterValue(event.target.value)
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
  