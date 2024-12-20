"use client";

import React, { useState, useEffect, FormEvent, useCallback } from 'react'
import {
  ChevronDownIcon,
  DotsHorizontalIcon,
  TrashIcon,
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
import { USERS_URL, DELETE_USERS_URL, UPDATE_USERS_URL } from '@/utils/constants';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import { Label } from '../ui/label';
import Cookies from 'js-cookie'
import { useToast } from '@/hooks/use-toast'
import { Switch } from "@/components/ui/switch"



export type Users = {
  id: string,
  email: string,
  username: string,
  first_name: string,
  last_name: string,
  is_verified: boolean,
  is_superuser: boolean,
  is_staff: boolean,
  is_active: boolean,
  register_date: string,
  update_date: string,
}


const UsersEditViewSheet: React.FC<{
  users: Users | null;
  onClose: () => void;
  isEditing: boolean;
  onSave: (updatedUsers: Users) => void;
}> = ({ users, onClose, isEditing, onSave }) => {
  const { toast } = useToast();

  const accessToken = Cookies.get('bearer')


  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [is_staff, setIsStaff] = useState(false);
  const [is_superuser, setIsSuperUser] = useState(false);
  const [is_verified, setIsVerified] = useState(false);
  const [is_active, setIsActive] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (users) {
      setFirstname(users.first_name);
      setLastname(users.last_name);
      setUsername(users.username);
      setEmail(users.email);
      setIsStaff(users.is_staff);
      setIsSuperUser(users.is_superuser);
      setIsVerified(users.is_verified);
      setIsActive(users.is_active);
    }
  }, [users]);

  if (!users) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();

    const params = new URLSearchParams({
      user_id: users.id,
      username: username.trim(),
      email: email.trim(),
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      is_superuser: String(is_superuser),
      is_verified: String(is_verified),
      is_staff: String(is_staff),
      is_active: String(is_active)
    });


    if (profileImage) {
      formData.append('profile_img', profileImage);
    }

    try {
      const response = await fetch(`${UPDATE_USERS_URL}/?${params.toString()}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 401) {
        window.location.href = '/';
      }

      if (response.ok) {
        const updatedUsers: Users = {
          ...users,
          first_name,
          last_name,
          username,
          email,
          is_verified,
          is_superuser,
          is_staff,
          is_active,
          register_date: users.register_date,
          update_date: new Date().toISOString(),
        };

        onSave(updatedUsers);

        toast({
          title: "Success",
          description: 'User details updated successfully',
        });

        onClose();
      } else {
        toast({
          title: "Something went wrong",
          description: 'Failed to update user details',
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: 'Failed to update user details',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionDetails = [
    { field: "ID", value: users.id },
    { field: "Firstname", value: users.first_name },
    { field: "Lastname", value: users.last_name },
    { field: "Email Address", value: users.email },
    { field: "Username", value: users.username },
    { field: "Verified", value: users.is_verified ? "Yes" : "No" },
    { field: "Superuser", value: users.is_superuser ? "Yes" : "No" },
    { field: "Staff", value: users.is_staff ? "Yes" : "No" },
    { field: "Active", value: users.is_active ? "Yes" : "No" },
    { field: "Date Added", value: new Date(users.register_date).toLocaleString() },
    { field: "Last Updated", value: new Date(users.update_date).toLocaleString() },
  ];

  return (
    <Sheet open={!!users} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto w-[600px] sm:w-[800px]">
        <SheetHeader>
          <SheetTitle>{isEditing ? "Edit User" : "User's Details"}</SheetTitle>
          <SheetDescription>{users.first_name} {users.last_name} user details</SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-12 items-center gap-4">
                <Label htmlFor="first_name" className="text-left col-span-12">Firstname</Label>
                <Input
                  id="first_name"
                  className="col-span-12"
                  value={first_name}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-12 items-center gap-4">
                <Label htmlFor="last_name" className="text-left col-span-12">Lastname</Label>
                <Input
                  id="last_name"
                  className="col-span-12"
                  value={last_name}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-12 items-center gap-4">
                <Label htmlFor="username" className="text-left col-span-12">Username</Label>
                <Input
                  id="username"
                  className="col-span-12"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-12 items-center gap-4">
                <Label htmlFor="email" className="text-left col-span-12">Email Address</Label>
                <Input
                  id="email"
                  className="col-span-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>


              <div className="grid w-full max-w-sm items-center gap-4">
                <Label htmlFor="profile_img">Profile</Label>
                <Input
                  id="profile_img"
                  type="file"
                  name="profile_img"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      setProfileImage(files[0]);
                    }
                  }}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_superuser"
                  checked={is_superuser}
                  onCheckedChange={setIsSuperUser}
                />
                <Label htmlFor="is_superuser">Super User</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={is_active}
                  onCheckedChange={setIsActive}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_verified"
                  checked={is_verified}
                  onCheckedChange={setIsVerified}
                />
                <Label htmlFor="is_verified">Verified</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_staff"
                  checked={is_staff}
                  onCheckedChange={setIsStaff}
                />
                <Label htmlFor="is_staff">Staff</Label>
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

export function UserDataTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const { toast } = useToast();

  const accessToken = Cookies.get('bearer')
  const [users, setUsers] = useState<Users[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchSections = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${USERS_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        window.location.href = '/'
        return
      }

      if (!response.ok && response.status === 404) {
        toast({
          title: "No details found",
          description: "No details found for users",
        })

        setLoading(false);

      }

      const data: Users[] = await response.json();

      setUsers(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: 'Failed to fetch user data',
      })
    } finally {
      setLoading(false);
    }
  }, [accessToken, toast]);

  const removeUser = async (userId: string) => {
    try {
      const response = await fetch(`${DELETE_USERS_URL}/?user_id=${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        window.location.href = '/'
      }

      if (!response.ok) {
        toast({
          title: "Something went wrong",
          description: 'Failed to remove user',
        })
        return;
      }

      toast({
        title: "User Removed",
        description: 'User removed successfully',
      })
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: 'Failed to remove user',
      })
    }
  }

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);


  const columns: ColumnDef<Users>[] = [
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
      accessorKey: "first_name",
      header: "Firstname",
      cell: ({ row }) => (
        <div className="capitalize font-normal">{row.getValue("first_name")}</div>
      ),
    },

    {
      accessorKey: "last_name",
      header: "Lastname",
      cell: ({ row }) => <div className='font-normal'>{row.getValue("last_name")}</div>,
    },

    {
      accessorKey: "username",
      header: () => <div className="text-left">Username</div>,
      cell: ({ row }) => {
        return <div className='font-normal'>{row.getValue("username")}</div>
      }
    },

    {
      accessorKey: "email",
      header: () => <div className="text-left">Email Address</div>,
      cell: ({ row }) => {
        return <div className='font-normal'>{row.getValue("email")}</div>
      }
    },

    {
      accessorKey: "register_date",
      header: () => <div className="text-left">Date Joined</div>,
      cell: ({ row }) => {
        return <div className='font-normal'>{new Date(row.getValue("register_date")).toLocaleString()}</div>
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
              <DropdownMenuItem
                onClick={() => {
                  setSelectedUser(users);
                  setIsEditing(true);
                }}
              >
                Edit User
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedUser(users);
                  setIsEditing(false);
                }}
              >
                View User
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => removeUser(users.id)}>Remove User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

  const table = useReactTable({
    data: users,
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
          value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
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
                  {isLoading ? 'Please wait while loading the data' : 'No Users Available'}
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
      <UsersEditViewSheet
        users={selectedUser !== undefined ? selectedUser : null}
        onClose={() => {
          setSelectedUser(null);
          setIsEditing(false);
        }}
        isEditing={isEditing}
        onSave={(updatedUsers) => {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === updatedUsers.id ? updatedUsers : user
            )
          );
          setIsEditing(false);
          setSelectedUser(null);
        }}
      />
    </div>
  )
}
