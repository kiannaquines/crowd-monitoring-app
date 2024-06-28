'use client'

import React from 'react'
import {Button} from '@/components/ui/button';

type SystemButtonProp = {
    name: string,
    onClick: () => void 
}

const SystemButton: React.FC<SystemButtonProp> = ({name,onClick}) => {
  return (
    <Button onClick={onClick}>{name}</Button>
  )
}

export default SystemButton