import React from 'react'

type SideLayoutProps = {
  children: React.ReactNode
  className?: string
}
export default function SideLayout({ className, children }: SideLayoutProps) {
  return <div className={`rounded-sm bg-white px-5 py-8 ${className}`}>{children}</div>
}
