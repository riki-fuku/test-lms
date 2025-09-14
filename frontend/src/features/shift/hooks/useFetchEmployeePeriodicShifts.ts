import type { FetchEmployeePeriodicShiftQuery } from '@/features/shift/api/fetchEmployeePeriodicShifts'
import fetchEmployeePeriodicShifts from '@/features/shift/api/fetchEmployeePeriodicShifts'
import useSWR from 'swr'

export default function useFetchEmployeePeriodicShifts(query: FetchEmployeePeriodicShiftQuery) {
  const fetcher = () => fetchEmployeePeriodicShifts(query)
  return useSWR([`/api/employee-periodic-shifts`, query], fetcher)
}
