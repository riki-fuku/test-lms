import Button from '@/components/ui/Button'
import type { TimerLog } from '@/features/timer/types/TimerLog'
import deleteTimerLog from '@/features/timerLog/api/deleteTimerLog'
import type { UpdateTimerLogBody } from '@/features/timerLog/api/updateTimerLog'
import updateTimerLog from '@/features/timerLog/api/updateTimerLog'
import useDateTools from '@/hooks/useDateTools'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useUserStore } from '@/store/user-store'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ja } from 'date-fns/locale'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { BsTrash } from 'react-icons/bs'

type StudyRecordEditProps = {
  timerLog: TimerLog
  onSave: () => void
  onCancel: () => void
  onDelete: () => void
}

const getElapsedSeconds = (start: string, end: string) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const milliseconds = endDate.getTime() - startDate.getTime()
  const elapsedSeconds = Math.floor(milliseconds / 1000)

  return elapsedSeconds
}

export function TimerLogEdit({ timerLog, onSave, onDelete, onCancel }: StudyRecordEditProps) {
  const user = useUserStore((state) => state.user)
  const form = useForm({
    defaultValues: {
      startDatetime: timerLog.startDatetime,
      endDatetime: timerLog.endDatetime,
      elapsedSeconds: timerLog.elapsedSeconds,
    },
  })
  const { getValues, setValue, handleSubmit } = form

  const dateTools = useDateTools()
  const { showWarning } = useSnackbar()

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

  const handleSave = async (data: UpdateTimerLogBody) => {
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
    await updateTimerLog(user?.activeWorkspace.workspaceId ?? '', timerLog.id, data)
    onSave()
  }

  const handleDelete = async () => {
    await deleteTimerLog(user?.activeWorkspace.workspaceId ?? '', timerLog.id)
    onDelete()
  }

  return (
    <form className='flex flex-col items-center gap-5' onSubmit={handleSubmit(handleSave)}>
      <p className='text-xl'>{dateTools.formatDate(timerLog.startDatetime, 'MM/DD(dd)')}</p>

      <div className='flex w-full items-center justify-between'>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
          <DateTimePicker
            views={['year', 'month', 'day', 'hours', 'minutes']}
            value={dayjs(getValues('startDatetime')).toDate()}
            onChange={handleChangeStartDatetime}
          />
        </LocalizationProvider>
        <p className='mx-2.5'>〜</p>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
          <DateTimePicker
            views={['year', 'month', 'day', 'hours', 'minutes']}
            value={dayjs(getValues('endDatetime')).toDate()}
            onChange={handleChangeEndDatetime}
          />
        </LocalizationProvider>
      </div>

      <div className='w-full border-b'></div>

      <div className='flex w-full items-center justify-between'>
        <div className='flex justify-center gap-5'>
          <Button intent='secondary' size='sm' className='h-12' onClick={onCancel}>
            キャンセル
          </Button>
          <Button type='submit' size='sm' className='h-12'>
            保存
          </Button>
        </div>
        <div
          className='flex size-12 cursor-pointer items-center justify-center'
          onClick={handleDelete}
        >
          <BsTrash className='text-warn-red' size={20} />
        </div>
      </div>
    </form>
  )
}
