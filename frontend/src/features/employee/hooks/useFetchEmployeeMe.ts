import fetchEmployeeMe from '@/features/employee/api/fetchEmployeeMe'
import useSWR from 'swr'

export default function useFetchEmployeeMe() {
  const { data } = useSWR('/api/employees/me', fetchEmployeeMe)
  return { data }
}
