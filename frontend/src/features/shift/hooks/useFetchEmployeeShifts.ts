import type { FetchEmployeeShiftQuery } from '@/features/shift/api/fetchEmployeeShifts'
import fetchEmployeeShifts from '@/features/shift/api/fetchEmployeeShifts'
import useSWR from 'swr'

export default function useFetchEmployeeShifts(query: FetchEmployeeShiftQuery) {
  const fetcher = () => fetchEmployeeShifts(query)
  return useSWR([`/api/employee-shifts`, query], fetcher)
}
