import { cn } from '@/lib/utils';
import React from 'react'

const Container = ({children, className}:{children: React.ReactNode; className?: string}) => {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 py-12", className)}>
      {children}
    </div>
  )
}

export default Container
