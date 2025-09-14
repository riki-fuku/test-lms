import cn from '@/hooks/cn'
import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react'

type TabState = {
  activeKey: string
  addItem: (label: string, key: string) => void
}

const TabContext = createContext<TabState>({
  activeKey: '',
  addItem: () => {},
})

type Tab = {
  label: string
  key: string
}

type TabsProps = {
  defaultActiveKey: string
  children: React.ReactNode
  className?: string
}

export default function Tab({ defaultActiveKey, children, className }: TabsProps) {
  const [activeKey, setActiveKey] = useState(defaultActiveKey)
  const [tabs, setTabs] = useState<Tab[]>([])

  const addTab = useCallback((label: string, key: string) => {
    setTabs((tabs) => {
      if (tabs.findIndex((item) => item.key === key) >= 0) {
        return tabs
      } else {
        return [...tabs, { label, key }]
      }
    })
  }, [])

  const state = useMemo<TabState>(
    () => ({
      activeKey,
      addItem: addTab,
    }),
    [activeKey, tabs],
  )

  const isActive = (key: string) => {
    return activeKey === key
  }

  return (
    <TabContext.Provider value={state}>
      <div className={cn('flex h-full flex-col', className)}>
        <div className='relative z-10 flex'>
          {tabs.map(({ label, key }) => (
            <div
              key={key}
              className='tab relative cursor-pointer overflow-auto rounded-t bg-white [&:not(:first-child)]:-left-px'
            >
              <div
                className={cn(
                  'absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-sub-color to-main-color',
                  !isActive(key) && 'opacity-0',
                )}
              ></div>
              <div
                className={cn(
                  'rounded-t border border-border-primary',
                  isActive(key) && 'border-b-white',
                )}
                onClick={() => setActiveKey(key)}
              >
                <p
                  className={cn(
                    'px-5 py-2 text-center text-sm',
                    isActive(key) ? 'text-main-color' : 'text-text-secondary',
                  )}
                >
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          className={cn(
            'relative -top-px grow overflow-scroll border border-border-primary bg-white p-5',
          )}
        >
          {children}
        </div>
      </div>
    </TabContext.Provider>
  )
}

type TabItemProps = {
  tabKey: string
  label: string
  children: React.ReactNode
}

export function TabItem({ tabKey, label, children }: TabItemProps) {
  const { activeKey, addItem } = useContext(TabContext)

  useLayoutEffect(() => {
    addItem(label, tabKey)
  }, [])

  return tabKey === activeKey ? <>{children}</> : null
}
