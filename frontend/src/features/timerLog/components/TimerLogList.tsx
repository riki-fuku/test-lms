'use client'

import useFetchTimerLogs from '@/features/timer/hooks/useFetchTimerLogs'
import type { TimerLog } from '@/features/timer/types/TimerLog'
import { TimerLogAdd, TimerLogEdit, TimerLogListItem } from '@/features/timerLog/components'
import useDateTools from '@/hooks/useDateTools'
import useDisclosure from '@/hooks/useDisclosure'
import { useUserStore } from '@/store/user-store'
import dayjs from 'dayjs'
import { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export function TimerLogList() {
  const edit = useDisclosure()
  const dateTools = useDateTools()
  const user = useUserStore((state) => state.user)

  const [count, setCount] = useState<number>(0)
  const [selectedTimerLog, setSelectedTimerLog] = useState<TimerLog | null>(null)

  const date = dayjs().add(count, 'day')
  const startDatetime = dayjs(date).startOf('day').format('YYYY-MM-DD HH:mm')
  const endDatetime = dayjs(date).endOf('day').format('YYYY-MM-DD HH:mm')
  const { data, mutate } = useFetchTimerLogs(user?.activeWorkspace.workspaceId ?? '', {
    userId: user?.id ?? '',
    startDatetime,
    endDatetime,
  })

  const timerLogs = data ?? []

  return (
    <div className='flex h-96 flex-col items-center overflow-y-scroll'>
      <h2 className='mb-2.5 text-2xl font-bold'>学習記録</h2>
      {edit.isOpen && selectedTimerLog ? (
        <div className='flex w-full justify-center'>
          <TimerLogEdit
            timerLog={selectedTimerLog}
            onSave={() => {
              mutate()
              edit.close()
            }}
            onCancel={edit.close}
            onDelete={() => {
              mutate()
              edit.close()
            }}
          />
        </div>
      ) : (
        <div className='flex  w-full justify-center'>
          <div className='flex w-full flex-col  items-center'>
            <div className='flex w-full items-center justify-between'>
              <IoIosArrowBack
                className='cursor-pointer'
                size={24}
                onClick={() => setCount(count - 1)}
              />

              <p className='text-xl'>{dateTools.formatDate(startDatetime, 'MM/DD（ddd）')}</p>

              <IoIosArrowForward
                className='cursor-pointer'
                size={24}
                onClick={() => setCount(count + 1)}
              />
            </div>

            <div className='w-full'>
              {timerLogs.map((timerLog) => (
                <TimerLogListItem
                  key={timerLog.id}
                  timerLog={timerLog}
                  onClick={() => {
                    setSelectedTimerLog(timerLog)
                    edit.open()
                  }}
                />
              ))}
              <TimerLogAdd date={date.toDate()} onAdd={mutate} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
