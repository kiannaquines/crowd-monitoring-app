import React from "react";
import {
    LayoutDashboard,
    Building,
    Users,
    Unplug,
    LogOut,
    Scroll, 
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
        name: 'Sections',
        path: '/dashboard/sections',
        icon: Building,
    },
    {
        category: 'general',
        name: 'Comments',
        path: '/dashboard/comments',
        icon: Building,
    },
    {
        category: 'general',
        name: 'Users',
        path: '/dashboard/users',
        icon: Users,
    },
    {
        category: 'general',
        name: 'Categories',
        path: '/dashboard/category',
        icon: Users,
    },
    {
        category: 'advance',
        name: 'Predictions',
        path: '/dashboard/prediction',
        icon: Unplug,
    },
    {
        category: 'advance',
        name: 'Track Devices',
        path: '/dashboard/devices',
        icon: Scroll,
    },
    {
        category: 'account_setting',
        name: 'Logout',
        path: '/logout',
        icon: LogOut,
    }
]

export default RouteUrls;

