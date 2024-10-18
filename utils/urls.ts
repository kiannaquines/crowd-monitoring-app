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
    // {
    //     category: 'realtime',
    //     name: 'Realtime Monitoring',
    //     path: '/dashboard/realtime',
    //     icon: Activity,
    // },
    // {
    //     category: 'realtime',
    //     name: 'Model Accuracy',
    //     path: '/dashboard/realtime/model',
    //     icon: Activity,
    // },
    // {
    //     category: 'advance',
    //     name: 'Predictions',
    //     path: '/dashboard/predictions',
    //     icon: Unplug,
    // },
    // {
    //     category: 'advance',
    //     name: 'Devices',
    //     path: '/dashboard/devices/logs',
    //     icon: Scroll,
    // },
    // {
    //     category: 'account_setting',
    //     name: 'Logout',
    //     path: '/logout',
    //     icon: LogOut,
    // },
]

export default RouteUrls;

