'use client'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import ja from 'date-fns/locale/ja'
import 'public/css/datePicker.css'
import { useEffect, useState } from 'react'

type DatePickerProps = {
  selectDate: Date
  onChange: (date: Date) => void
  className?: string
}

export default function DatePicker({ selectDate, onChange, className }: DatePickerProps) {
  // ハイドレーションエラーの解消
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // サーバーサイドレンダリング時には何もレンダリングしない
  }

  const handleChange = (date: Date) => {
    onChange(date)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <DateCalendar
        value={selectDate}
        onChange={handleChange}
        className={className}
        sx={{
          width: '90%',
          '& .MuiPickersCalendarHeader-root': {
            paddingLeft: '10px',
            paddingRight: '0',
          },
        }}
      />
    </LocalizationProvider>
  )
}
