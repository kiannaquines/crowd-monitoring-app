'use client'

import React from "react";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Menu } from 'lucide-react';
import { ModeToggle } from '@/components/parts/Toggler';
import { useSidebar } from "@/components/ui/sidebar"

const Header = () => {

    const { toggleSidebar } = useSidebar()
    return (
        <header className="flex flex-row justify-items-between justify-between border-b p-4">
            <div className="flex justify-items-center justify-center gap-2">
                <Button onClick={toggleSidebar} variant="outline">
                    <Menu size="24px" />
                </Button>
            </div>
            <div className="flex flex-row gap-2">
                <Button onClick={() => {
                    window.location.reload();
                }}>
                    Reload
                </Button>
                <ModeToggle />
            </div>
        </header>
    )
}

export default Header