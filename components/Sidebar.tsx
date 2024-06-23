'use client';

import React from 'react';
import Link from "next/link";
import UserItem from '../components/UserItem'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command';
import {
    Settings,
    Calendar,
    LayoutDashboard,
    Building,
    User,
    Users,
    Lock,
    Unplug,
    Settings2,
    LogOut,
    Scroll,
    GanttChart 
  } from "lucide-react"

const Sidebar = () => {
    return (
        <div className='fixed flex flex-col gap-4 w-[300px] h-[1006px] p-4'>
            <UserItem/>
            <div className='grow'>
            <Command style={{ overflow:'visible', height:'850px' }}>
                <CommandInput placeholder="Search..." />
                <CommandList style={{ overflow:'visible' }}>
                    <CommandEmpty>Crowd Monitoring System Module Not Found.</CommandEmpty>
                    <CommandGroup heading="General">
                        <Link href="/" passHref>
                            <CommandItem className='cursor-pointer'>
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                            </CommandItem>
                        </Link>
                        <Link href="/schedule">
                            <CommandItem className='cursor-pointer'>
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>Schedules</span>
                            </CommandItem>
                        </Link>
                        <Link href="/sections" passHref>
                            <CommandItem className='cursor-pointer'>
                                <Building className="mr-2 h-4 w-4" />
                                <span>Sections</span>
                            </CommandItem>
                        </Link>
                        <Link href="/users">
                            <CommandItem className='cursor-pointer'>
                                <Users className="mr-2 h-4 w-4" />
                                <span>Users</span>
                            </CommandItem>
                        </Link>
                    </CommandGroup>
                    <CommandGroup heading="Realtime Charts">
                        <Link href="/realtime" passHref>
                            <CommandItem className='cursor-pointer'>
                                <GanttChart className="mr-2 h-4 w-4" />
                                <span>Realtime Monitoring</span>
                            </CommandItem>
                        </Link>
                        <Link href="/realtime/model" passHref>
                            <CommandItem className='cursor-pointer'>
                                <GanttChart className="mr-2 h-4 w-4" />
                                <span>Model Accuracy</span>
                            </CommandItem>
                        </Link>
                    </CommandGroup>
                    <CommandGroup heading="Device">
                        <Link href="/sections" passHref>
                            <CommandItem className='cursor-pointer'>
                                <Unplug className="mr-2 h-4 w-4" />
                                <span>Devices</span>
                            </CommandItem>
                        </Link>
                        <CommandItem className='cursor-pointer'>
                            <Settings2 className="mr-2 h-4 w-4" />
                            <span>Configure</span>
                        </CommandItem>
                        <CommandItem className='cursor-pointer'>
                            <Scroll className="mr-2 h-4 w-4" />
                            <span>Logs</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Settings">
                        <CommandItem className='cursor-pointer'>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </CommandItem>
                        <CommandItem className='cursor-pointer'>
                            <Lock className="mr-2 h-4 w-4" />
                            <span>Privacy</span>
                        </CommandItem>
                        <CommandItem className='cursor-pointer'>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Account">
                        <CommandItem className='cursor-pointer'>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Logout</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>

            </div>
        </div>
    )
}

export default Sidebar