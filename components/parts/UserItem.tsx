'use client';

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface UserItemProps {
  name: string;
  email: string;
}

const UserItem: React.FC<UserItemProps> = ({ name, email }) => {

  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    return initials;
  };

  return (
    <div className='flex items-center justify-between gap-2 border rounded-[8px] p-2 shadow-sm'>
      <Avatar>
        <AvatarImage
          src="https://avatars.githubusercontent.com/u/88887528?v=4"
        />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div className='grow'>
        <p className='text-[18px] font-medium'>{name}</p>
        <p className='text-[15px] text-slate-500'>{email}</p>
      </div>
    </div>
  )
}

export default UserItem