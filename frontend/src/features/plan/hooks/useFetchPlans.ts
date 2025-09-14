import fetchPlans from '@/features/plan/api/fetchPlans'
import useSWR from 'swr'

export default function useFetchPlans(workspaceId: string) {
  const fetcher = () => fetchPlans(workspaceId)
  return useSWR(`/api/workspaces/${workspaceId}/plans`, fetcher)
}
