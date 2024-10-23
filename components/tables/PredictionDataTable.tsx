'use client'

import React, { useState, useEffect } from 'react'
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
import { PREDICTION_URL } from '@/utils/constants'
import Cookies from 'js-cookie'
import { useToast } from '@/hooks/use-toast'
export type PredictionData = {
    id: string,
    zone_name: string,
    estimated_count: string,
    score: string,
    first_seen: string,
    last_seen: string,
    date_predicted: string,
}

export function PredictionDataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const [prediction, setPrediction] = useState<PredictionData[]>([])
    const { toast } = useToast();

    const accessToken = Cookies.get('bearer')

    const fetchPrediction = async () => {
        try {
            const response = await fetch(`${PREDICTION_URL}`, {
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
                  description: "No details found for predicitons",
                })
              } else if (!response.ok && response.status === 500) {
                toast({
                  title: "Something went wrong",
                  description: "Error while fetching predictions",
                })
              }

            const data: PredictionData[] = await response.json();
            setPrediction(data);

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: "There was an error fetching the prediction data",
            })
        }
    }


    useEffect(() => {
        fetchPrediction();
    }, []);


    const columns: ColumnDef<PredictionData>[] = [
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
            accessorKey: "zone_name",
            header: "Section",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("zone_name")}</div>
            ),
        },
        {
            accessorKey: "score",
            header: () => <div className="text-left">Silhouett Score</div>,
            cell: ({ row }) => {
                return <div className="font-normal">{row.getValue("score")}%</div>
            },
        },
        {
            accessorKey: "estimated_count",
            header: () => <div className="text-left">Crowd Count</div>,
            cell: ({ row }) => {
                return <div className="font-normal">{row.getValue("estimated_count")}</div>
            },
        },
        {
            accessorKey: "first_seen",
            header: () => <div className="text-left">First Seen</div>,
            cell: ({ row }) => {
                return <div className="font-normal">{new Date(row.getValue("first_seen")).toLocaleString()}</div>
            },
        },
        {
            accessorKey: "last_seen",
            header: () => <div className="text-left">Last Seen</div>,
            cell: ({ row }) => {
                return <div className="font-normal">{new Date(row.getValue("last_seen")).toLocaleString()}</div>
            },
        },
    ];

    const table = useReactTable({
        data: prediction,
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
