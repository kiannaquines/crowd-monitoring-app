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
    GanttChart,
    Activity 
  } from "lucide-react"

const Sidebar = () => {
    return (
        <div className='fixed flex flex-col gap-4 w-[300px] h-auto p-4 border-r overflow'>
            <UserItem/>
            <div className='grow'>
            <Command style={{height:'875px', overflow:'auto' }}>
                <CommandInput placeholder="Search..." />
                <CommandList style={{ overflow:'visible' }}>
                    <CommandEmpty>Crowd Monitoring System Module Not Found.</CommandEmpty>
                    <CommandGroup heading="General Options">
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
                                <Activity className="mr-2 h-4 w-4" />
                                <span>Realtime Monitoring</span>
                            </CommandItem>
                        </Link>
                        <Link href="/realtime/model" passHref>
                            <CommandItem className='cursor-pointer'>
                                <Activity className="mr-2 h-4 w-4" />
                                <span>Model Accuracy</span>
                            </CommandItem>
                        </Link>
                    </CommandGroup>
                    <CommandGroup heading="Advance Device Configuration">
                        <CommandItem className='cursor-pointer'>
                            <Unplug className="mr-2 h-4 w-4" />
                            <Link href="/devices" passHref>
                                <span>Device Token</span>
                            </Link>
                        </CommandItem>
                        <Link href="/devices/configuration">
                        <CommandItem className='cursor-pointer'>
                            <Settings2 className="mr-2 h-4 w-4" />
                                <span>Configure</span>
                        </CommandItem>
                        </Link>
                        <CommandItem className='cursor-pointer'>
                            <Scroll className="mr-2 h-4 w-4" />
                            <span>Logs</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="User Profile Settings">
                        <CommandItem className='cursor-pointer'>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
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