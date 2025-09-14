'use client'

import { useCallback, useEffect } from 'react'
import { useController, type Control } from 'react-hook-form'

import { Button } from '@/components'
import { IoClose } from 'react-icons/io5'

import cn from '@/hooks/cn'
import useDateTools from '@/hooks/useDateTools'
import useDisclosure from '@/hooks/useDisclosure'

type CellItem = {
  dateTime: string
  isAvailable: boolean
}

type SlotCalendar = {
  dates: string[]
  times: Record<string, CellItem[]>
}

type Props = {
  slotCalendar: SlotCalendar
  control: Control<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  name: string
  className?: string
  onChangeDate?: (cellItem: CellItem) => void
}

export function ReserveSlotCalendar({
  slotCalendar,
  control,
  name = 'dateTime',
  className,
}: Props) {
  const showCalendar = useDisclosure(true)
  const dateTools = useDateTools()
  const dateTime = useController({ name, control })

  useEffect(() => {
    if (dateTime.field.value) {
      showCalendar.close()
    }
  }, [dateTime.field.value, showCalendar])

  // TODO: 面談スケジュールの表示位置を調整
  // 上から[28]行目の14:00までスクロール

  return (
    <div className={cn('h-[520px]', className)}>
      {showCalendar.isOpen ? (
        <Calendar
          dates={slotCalendar.dates}
          times={slotCalendar.times}
          onSelectCell={(cellItem) => {
            dateTime.field.onChange(cellItem.dateTime)
            showCalendar.close()
          }}
        />
      ) : (
        <div className='flex size-full items-center justify-between'>
          <div className='flex w-full items-center justify-between gap-2 rounded bg-bg-primary p-5'>
            <p>選択した日付</p>
            <p className='text-xl font-bold'>
              {dateTools.formatDate(new Date(dateTime.field.value), 'YYYY年MM月DD日(ddd) HH:mm〜')}
            </p>
            <Button
              size='lg'
              variant='bordered'
              onPress={() => {
                dateTime.field.onChange('')
                showCalendar.open()
              }}
            >
              戻る
            </Button>
          </div>
        </div>
      )}

      {dateTime.fieldState.error && (
        <p className='p-1 text-sm text-warn-red'>{dateTime.fieldState.error?.message}</p>
      )}
    </div>
  )
}

type CalendarProps = {
  dates: string[]
  times: Record<string, CellItem[]>
  onSelectCell: (cellItem: CellItem) => void
}

/**
 * カレンダー
 * @param dates 日付
 * @param times 時間
 * @param onSelectCell セルを選択した時の処理
 */
function Calendar({ dates, times, onSelectCell }: CalendarProps) {
  return (
    <div className='flex h-full flex-col text-sm lg:text-md'>
      <DateLabel dates={dates} />
      <div className='flex-1 overflow-y-auto'>
        <CellMap times={times} onSelectCell={onSelectCell} />
      </div>
    </div>
  )
}

type DateLabelProps = {
  dates: string[]
}

/**
 * 日付ラベル
 * @param dates 日付
 */
function DateLabel({ dates }: DateLabelProps) {
  const dateTools = useDateTools()

  return (
    <div className='flex items-center py-1'>
      <div className='grid h-10 w-full grid-cols-8 gap-1'>
        <div></div>
        {dates.map((date) => (
          <>
            <div className='flex items-center justify-center gap-1'>
              <div key={date}>{dateTools.formatDate(date, 'MM/DD')}</div>
              <div
                className={cn(
                  dateTools.isSaturday(new Date(date)) && 'text-main-color',
                  dateTools.isSunday(new Date(date)) && 'text-warn-red',
                )}
              >
                {dateTools.formatDate(date, '(ddd)')}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

type CellMapProps = {
  times: Record<string, CellItem[]>
  onSelectCell: (cellItem: CellItem) => void
}

/**
 * セルマップ
 * @param times 時間
 * @param onSelectCell セルを選択した時の処理
 */
function CellMap({ times, onSelectCell }: CellMapProps) {
  return (
    <div className='flex w-full flex-col gap-1'>
      {times &&
        Object.keys(times).map((key) => {
          return (
            <div key={key} className='grid w-full grid-cols-8 items-center gap-1'>
              <div className='flex items-center text-base'>{key}</div>
              {times[key].map((time) => (
                <Cell key={time.dateTime} time={time} onClick={() => onSelectCell(time)} />
              ))}
            </div>
          )
        })}
    </div>
  )
}

type CellProps = {
  time: CellItem
  onClick?: () => void
}

/**
 * セル
 * @param time 時間
 * @param onClick セルを選択した時の処理
 */
function Cell({ time, onClick }: CellProps) {
  const CellBody = useCallback(
    ({
      children,
      className,
      onClick,
    }: {
      children: React.ReactNode
      className?: string
      onClick?: () => void
    }) => {
      return (
        <div
          className={cn('flex h-12 items-center justify-center rounded', className)}
          onClick={onClick}
        >
          {children}
        </div>
      )
    },
    [],
  )

  if (!time.isAvailable) {
    return (
      <CellBody className='bg-bg-primary text-text-secondary'>
        <IoClose className='size-5' />
      </CellBody>
    )
  } else {
    return (
      <CellBody className='cursor-pointer border bg-white' onClick={onClick}>
        <p className='cursor-pointer bg-gradient-to-r from-sub-color to-main-color bg-clip-text text-3xl text-transparent'>
          ○
        </p>
      </CellBody>
    )
  }
}
