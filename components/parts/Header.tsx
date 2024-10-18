import React from "react";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {Moon,Menu} from 'lucide-react';

import {ModeToggle} from '@/components/parts/Toggler';

const Header = () => {
    return (
        <header className="flex flex-row justify-items-between justify-between border-b p-4">
            <div className="flex justify-items-center justify-center gap-2">
                <Button>
                    <Link href="/">Overview</Link>
                </Button>
            </div>
            <div className="flex flex-row gap-2">
                <ModeToggle/>
            </div>
        </header>
    )
}

export default Header