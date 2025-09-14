'use client'

import Button from '@/components/ui/Button'
import { COMPLETED } from '@/features/timer/types/TimerLog'
import type { CreateTimerLogBody } from '@/features/timerLog/api/createTimerLog'
import createTimerLog from '@/features/timerLog/api/createTimerLog'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useUserStore } from '@/store/user-store'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ja } from 'date-fns/locale'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type TimerLogAddProps = {
  date: Date
  onAdd: () => void
}

const getElapsedSeconds = (start: string, end: string) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const milliseconds = endDate.getTime() - startDate.getTime()
  const elapsedSeconds = Math.floor(milliseconds / 1000)

  return elapsedSeconds
}

export function TimerLogAdd({ date, onAdd }: TimerLogAddProps) {
  const user = useUserStore((state) => state.user)
  const [isOpen, setIsOpen] = useState(false)

  const { showWarning } = useSnackbar()

  const { getValues, setValue, handleSubmit } = useForm({
    defaultValues: {
      userId: user?.id ?? '',
      startDatetime: dayjs(date).format('YYYY-MM-DD HH:mm'),
      endDatetime: dayjs(date).format('YYYY-MM-DD HH:mm'),
      elapsedSeconds: 0,
      status: COMPLETED,
    },
  })

  const handleChangeStartDatetime = (value: Date | null) => {
    setValue('startDatetime', dayjs(value).format('YYYY-MM-DD HH:mm'))
    setValue(
      'elapsedSeconds',
      getElapsedSeconds(dayjs(value).format('YYYY-MM-DD HH:mm'), getValues('endDatetime')),
    )
  }

  const handleChangeEndDatetime = (value: Date | null) => {
    setValue('endDatetime', dayjs(value).format('YYYY-MM-DD HH:mm'))
    setValue(
      'elapsedSeconds',
      getElapsedSeconds(getValues('startDatetime'), dayjs(value).format('YYYY-MM-DD HH:mm')),
    )
  }

  const handleAdd = async (data: CreateTimerLogBody) => {
    if (
      data.startDatetime === 'Invalid Date' ||
      data.endDatetime === 'Invalid Date' ||
      !data.endDatetime ||
      !data.startDatetime
    ) {
      showWarning('学習開始時間と学習終了時間を入力してください')
      return
    }

    if (data.startDatetime >= data.endDatetime) {
      showWarning('学習開始時間は学習終了時間より前にしてください')
      return
    }

    await createTimerLog(user?.activeWorkspace.workspaceId ?? '', {
      ...data,
      userId: user?.id ?? '',
    })
    onAdd()
    setIsOpen(false)
    setValue('startDatetime', '')
    setValue('endDatetime', '')
    setValue('elapsedSeconds', 0)
  }

  return (
    <>
      {!isOpen ? (
        <div className='w-full p-2.5 text-form-gray' onClick={() => setIsOpen(true)}>
          <p>+ 学習記録を追加</p>
        </div>
      ) : (
        <form className='flex flex-col items-center gap-5' onSubmit={handleSubmit(handleAdd)}>
          <div className='mt-5 flex w-full items-center justify-center gap-2.5'>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
              <DateTimePicker
                views={['year', 'month', 'day', 'hours', 'minutes']}
                onChange={handleChangeStartDatetime}
              />
            </LocalizationProvider>
            <p>〜</p>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
              <DateTimePicker
                views={['year', 'month', 'day', 'hours', 'minutes']}
                onChange={handleChangeEndDatetime}
              />
            </LocalizationProvider>
          </div>

          <div className='w-full border-b'></div>

          <div className='flex justify-center gap-5'>
            <Button className='h-12' intent='secondary' onClick={() => setIsOpen(false)}>
              キャンセル
            </Button>
            <Button type='submit' className='h-12'>
              追加
            </Button>
          </div>
        </form>
      )}
    </>
  )
}
