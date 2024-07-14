import React from "react";
import {
    Settings,
    Calendar,
    LayoutDashboard,
    Building,
    User,
    Users,
    Unplug,
    Settings2,
    LogOut,
    Scroll,
    Activity 
} from "lucide-react"

type urls =  {
    category: string,
    name: string,
    path: string,
    icon: React.ComponentType<any>,
}

const RouteUrls: urls[] = [
    {   
        category: 'general',
        name: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        category: 'general',
        name: 'Schedules',
        path: '/dashboard/schedule',
        icon: Calendar,
    },
    {
        category: 'general',
        name: 'Sections',
        path: '/dashboard/sections',
        icon: Building,
    },
    {
        category: 'general',
        name: 'Users',
        path: '/dashboard/users',
        icon: Users,
    },
    {
        category: 'realtime',
        name: 'Realtime Monitoring',
        path: '/dashboard/realtime',
        icon: Activity,
    },
    {
        category: 'realtime',
        name: 'Model Accuracy',
        path: '/dashboard/realtime/model',
        icon: Activity,
    },
    {
        category: 'advance',
        name: 'Device Token',
        path: '/dashboard/devices',
        icon: Unplug,
    },
    {
        category: 'advance',
        name: 'Configure',
        path: '/dashboard/devices/configuration',
        icon: Settings2,
    },
    {
        category: 'advance',
        name: 'Logs',
        path: '/dashboard/devices/logs',
        icon: Scroll,
    },
    {
        category: 'profile_setting',
        name: 'Profile',
        path: '/user/profile',
        icon: User,
    },
    {
        category: 'profile_setting',
        name: 'Settings',
        path: '/dashboard/settings',
        icon: Settings,
    },
    {
        category: 'account_setting',
        name: 'Logout',
        path: '/logout',
        icon: LogOut,
    },
]

export default RouteUrls;

