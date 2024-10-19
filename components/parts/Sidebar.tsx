'use client';

import React from 'react';
import Link from "next/link";
import UserItem from './UserItem'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './../ui/command';
import RouteUrls from '@/utils/urls';

const Sidebar = () => {
    return (
        <div className='fixed flex flex-col gap-4 w-[300px] h-auto p-4 border-r overflow'>
            <UserItem />
            <div className='grow'>
                <Command style={{ height: '875px', overflow: 'auto' }}>
                    <CommandInput placeholder="Search..." />
                    <CommandList style={{ overflow: 'visible' }}>
                        <CommandEmpty>Sorry, Module Not Found.</CommandEmpty>

                        <CommandGroup heading="General Options">
                            {RouteUrls.map((url, index) => (
                                url.category === 'general' && (
                                    <Link key={index} href={url.path} passHref>
                                        <CommandItem className='cursor-pointer' key={index}>
                                            <url.icon className="mr-2 h-4 w-4" />
                                            <span>{url.name}</span>
                                        </CommandItem>
                                    </Link>
                                )
                            ))}
                        </CommandGroup>

                        <CommandGroup heading="Crowd Monitoring Result">
                            {RouteUrls.map((url, index) => (
                                url.category === 'advance' && (

                                    <Link key={index} href={url.path} passHref>
                                        <CommandItem className='cursor-pointer' key={index}>
                                            <url.icon className="mr-2 h-4 w-4" />
                                            <span>{url.name}</span>
                                        </CommandItem>
                                    </Link>
                                )
                            ))}
                        </CommandGroup>

                        <CommandGroup heading="Account">
                            {RouteUrls.map((url, index) => (
                                url.category === 'account_setting' && (
                                    <Link key={index} href={url.path} passHref>
                                        <CommandItem className='cursor-pointer' key={index}>
                                            <url.icon className="mr-2 h-4 w-4" />
                                            <span>{url.name}</span>
                                        </CommandItem>
                                    </Link>
                                )
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>

            </div>
        </div>
    )
}

export default Sidebar