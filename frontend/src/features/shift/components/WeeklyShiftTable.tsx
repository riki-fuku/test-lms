'use client'

import useFetchEmployeePeriodicShifts from '@/features/shift/hooks/useFetchEmployeePeriodicShifts'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

type WeeklyShiftTableProps = {
  employeeId: string | ''
}

export default function WeeklyShiftTable({ employeeId }: WeeklyShiftTableProps) {
  const { data: periodicShifts } = useFetchEmployeePeriodicShifts({ employeeId })
  const weekShifts = Array(7).fill(0)

  const convertTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  periodicShifts?.map((shift) => {
    const startTimeMinutes = convertTimeToMinutes(shift.startTime)
    const endTimeMinutes = convertTimeToMinutes(shift.endTime)
    const diff = endTimeMinutes - startTimeMinutes
    weekShifts[shift.day] += diff
  })

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}時間${remainingMinutes}分`
  }

  const totalWeekShifts = weekShifts.reduce((sum, day) => sum + day, 0)

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>合計</TableCell>
              <TableCell align='center'>日</TableCell>
              <TableCell align='center'>月</TableCell>
              <TableCell align='center'>火</TableCell>
              <TableCell align='center'>水</TableCell>
              <TableCell align='center'>木</TableCell>
              <TableCell align='center'>金</TableCell>
              <TableCell align='center'>土</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align='center'>{formatMinutes(totalWeekShifts)}</TableCell>
              {weekShifts.map((weekShift, index) => (
                <TableCell key={index} align='center'>
                  {formatMinutes(weekShift)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
