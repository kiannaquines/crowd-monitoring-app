'use client';

import React, { useMemo, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  ChevronUp,
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
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import UserItem from "./UserItem";
import { USER_INFO_URL } from '@/utils/constants';
import Cookies from 'js-cookie'
import { useToast } from "@/hooks/use-toast";

const items = [
  {
    group: 'General',
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    group: 'General',
    title: "Manage Sections",
    url: "/dashboard/sections",
    icon: Building,
  },
  {
    group: 'General',
    title: "Manage Comments",
    url: "/dashboard/comments",
    icon: LayoutDashboard,
  },
  {
    group: 'General',
    title: "Manage Category",
    url: "/dashboard/category",
    icon: LayoutDashboard,
  },
  {
    group: 'Authentication',
    title: "Manage Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    group: 'Model Result',
    title: "Predictions",
    url: "/dashboard/prediction",
    icon: Unplug,
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
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const accessToken = Cookies.get('bearer')

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch(`${USER_INFO_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const user = await response.json();
      const fullname = `${user.first_name || ''} ${user.last_name || ''}`.trim();

      setFullName(fullname);
      setEmail(user.email)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: 'Failed to fetch user details',
      })
    }
  }, [accessToken, setFullName, setEmail, toast]);

  useEffect(() => {
    if (accessToken) {
      setIsClient(true);
      fetchUser();
    }
  }, [accessToken, fetchUser]);

  const groupedItems = useMemo(() => {
    return items.reduce((acc, item) => {
      if (!acc[item.group]) {
        acc[item.group] = [];
      }
      acc[item.group].push(item);
      return acc;
    }, {} as Record<string, typeof items[number][]>);
  }, []);

  const logout = () => {
    Cookies.remove('bearer');
    window.location.replace('/');
  };

  if (!isClient) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-2">
          <UserItem name={fullName} email={email} />
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
                    {/* {item.actions && item.actions.length > 0 && (
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
                    )} */}
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
                  {fullName}
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={logout}>
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
