'use client'

import type { TabItemProps, TabsProps } from '@heroui/react'
import { Tabs as HeroTabs, Tab } from '@heroui/react'

type TabItem = TabItemProps & {
  children: React.ReactNode
}

type Props = TabsProps & {
  tabs: TabItem[]
}

export function Tabs({ tabs, ...props }: Props) {
  return (
    <HeroTabs {...props}>
      {tabs.map(({ key, children, ...props }) => (
        <Tab key={key} {...props}>
          {children}
        </Tab>
      ))}
    </HeroTabs>
  )
}
