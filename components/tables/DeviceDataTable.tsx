"use client";

import React, {useEffect, useCallback, useState} from 'react';
import { ChevronDownIcon } from "@radix-ui/react-icons";
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
import { DEVICES_URL } from '@/utils/constants';
import Cookies from 'js-cookie';
import { useToast } from '@/hooks/use-toast';
import { Badge } from "@/components/ui/badge";

type TrackDevices = {
  id: string;
  device_addr: string;
  date_detected: string;
  is_randomized: boolean;
  device_power: string;
  frame_type: string;
  zone: string;
  processed: boolean;
};

type TrackDevicesInfo = {
  total: number;
  page: number;
  limit: number;
  devices: TrackDevices[];
}

export function DeviceDataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [devicesInfo, setDevicesInfo] = useState<TrackDevicesInfo>({ total: 0, page: 1, limit: 100, devices: [] });
  const { toast } = useToast();
  const accessToken = Cookies.get('bearer');
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 500;

  const fetchDevices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${DEVICES_URL}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        window.location.href = '/';
        return;
      }

      if (!response.ok) {
        const errorMessage = response.status === 404
          ? "No details found for tracked devices"
          : "Error while fetching tracked devices";
        toast({
          title: response.status === 404 ? "No details found" : "Something went wrong",
          description: errorMessage,
        });
        setLoading(false);
        return;
      }

      const data: TrackDevicesInfo = await response.json();
      setDevicesInfo(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Error removing section",
      });
      setLoading(false);
    }
  }, [accessToken, page, toast]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const columns: ColumnDef<TrackDevices>[] = [
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
      accessorKey: "device_addr",
      header: "MAC Address",
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("device_addr")}</div>
      ),
    },
    {
      accessorKey: "zone",
      header: () => <div className="text-left">Section</div>,
      cell: ({ row }) => (
        <div className="font-normal">{row.getValue("zone")}</div>
      ),
    },
    {
      accessorKey: "is_randomized",
      header: () => <div className="text-left">Administered</div>,
      cell: ({ row }) => (
        <div><Badge>{row.getValue("is_randomized") ? "Yes" : "No"}</Badge></div>
      ),
    },
    {
      accessorKey: "date_detected",
      header: () => <div className="text-left">Date Detected</div>,
      cell: ({ row }) => (
        <div className="font-normal">{new Date(row.getValue("date_detected")).toLocaleString()}</div>
      ),
    },
    {
      accessorKey: "frame_type",
      header: () => <div className="text-left">Frame</div>,
      cell: ({ row }) => (
        <div className="font-normal"><Badge>{row.getValue("frame_type")}</Badge></div>
      ),
    },
  ];

  const table = useReactTable({
    data: devicesInfo.devices,
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
      pagination: {
        pageIndex: 0, pageSize: 500,
      }
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter sections..."
          value={(table.getColumn("device_addr")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("device_addr")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto flex items-center space-x-2">
          <Button variant="outline">Export</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-2">
                Columns <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns().map(column => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={value => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Please wait while loading the data...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No Tracked Devices Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {devicesInfo.page} of {Math.ceil(devicesInfo.total / limit)} rows.
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={devicesInfo.page === 1}
            onClick={() => setPage(old => Math.max(old - 1, 1))}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={devicesInfo.page === Math.ceil(devicesInfo.total / limit)}
            onClick={() => setPage(old => Math.min(old + 1, Math.ceil(devicesInfo.total / limit)))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
