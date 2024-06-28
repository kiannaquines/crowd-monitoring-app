import React from 'react'
import { useTheme } from 'next-themes';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserItem = () => {
 

  return (
    <div className='flex items-center justify-between gap-2 border rounded-[8px] p-2 shadow-sm'>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>KN</AvatarFallback>
        </Avatar>
        <div className='grow'>
            <p className='text-[18px] font-medium'>Kian Naquines</p>
            <p className='text-[15px] text-slate-500'>kjgnaquines@gmail.com</p>
        </div>
    </div>
  )
}

export default UserItem