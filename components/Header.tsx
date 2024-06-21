import React from "react";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Bell,MessageCircle,UserRound } from 'lucide-react';

const Header = () => {
    return (
        <header className="flex flex-row justify-items-between justify-between border-b p-4">
            <div className="flex justify-items-center justify-center gap-2">
                <Button>
                    <Link href="/">Overview</Link>
                </Button>
                <Button variant="link">
                    <Link href="/">Sections</Link>
                </Button>
                <Button variant="link">
                    <Link href="/">Schedules</Link>
                </Button>
            </div>
            <div className="flex flex-row gap-2">
            <Button variant="outline" size="icon" className="shadow-sm">
                <MessageCircle className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="shadow-sm">
                <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="shadow-sm">
                <UserRound className="h-4 w-4 " />
            </Button>
            </div>
        </header>
    )
}

export default Header