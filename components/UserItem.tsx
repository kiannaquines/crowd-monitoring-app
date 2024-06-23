import React from 'react'

const UserItem = () => {
  return (
    <div className='flex items-center justify-between gap-2 border rounded-[8px] p-2 shadow-sm'>
        <div className='avatar rounded-full bg-rose-600 h-10 w-10 text-white flex items-center justify-center'>
            <span>KN</span>
        </div>
        <div className='grow'>
            <p className='text-[18px] font-medium'>Kian Naquines</p>
            <p className='text-[15px] text-slate-500'>kjgnaquines@gmail.com</p>
        </div>
    </div>
  )
}

export default UserItem