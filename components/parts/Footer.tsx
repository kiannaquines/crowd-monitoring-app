import React from 'react'
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="fixed flex flex-row justify-items-between justify-between border-b p-4">
            <div className="flex justify-items-center gap-2">
                <div>
                    <a href="" className="text-slate-900">Overview</a>
                </div>
                <div>
                    <a href="" className="text-slate-500">Sections</a>
                </div>
                <div>
                    <a href="" className="text-slate-500">Schedules</a>
                </div>
            </div>
        </footer>
  )
}

export default Footer