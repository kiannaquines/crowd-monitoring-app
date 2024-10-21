'use client';

import React, { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ChevronUp,
  MoreHorizontal,
  LayoutDashboard,
  Building,
  Users,
  Unplug,
  Scroll,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UserItem from "./UserItem";

const items = [
  {
    group: 'General',
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    group: 'General',
    title: "Sections",
    url: "/dashboard/sections",
    icon: Building,
    actions: [
      { title: "Add Section", url: "/dashboard/section" }
    ],
  },
  {
    group: 'General',
    title: "Comments",
    url: "/dashboard/comments",
    icon: LayoutDashboard,
  },
  {
    group: 'Authentication',
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
    actions: [
      { title: "Add User", url: "/dashboard/section" }
    ],
  },
  {
    group: 'Model Result',
    title: "Predictions",
    url: "/dashboard/prediction",
    icon: Unplug,
    actions: [
      { title: "Generate Report", url: "/dashboard/section" },
      { title: "Generate Users", url: "/dashboard/section" }
    ],
  },
  {
    group: 'Model Result',
    title: "Track Devices",
    url: '/dashboard/devices',
    icon: Scroll,
  },
];

export function AppSideBar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const groupedItems = useMemo(() => {
    return items.reduce((acc, item) => {
      if (!acc[item.group]) {
        acc[item.group] = [];
      }
      acc[item.group].push(item);
      return acc;
    }, {} as Record<string, typeof items>);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-2">
          <UserItem />
        </div>
        {Object.entries(groupedItems).map(([group, items]) => (
          <SidebarGroup key={group}>
            <SidebarGroupLabel>{group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.actions && item.actions.length > 0 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction>
                            <MoreHorizontal className="h-4 w-4" />
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="start">
                          {item.actions.map((action) => (
                            <DropdownMenuItem key={action.title}>
                              <Link href={action.url}>
                                {action.title}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  Kian Naquines
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
