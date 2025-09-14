import fetchExtensionPlan from '@/features/applications/api/fetchExtensionPlan'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchExtensionPlan(workspaceId: string, swrOptions?: SWRConfiguration) {
  const fetcher = () => fetchExtensionPlan(workspaceId)
  return useSWR(`/api/workspaces/${workspaceId}/applications/extension/plans`, fetcher, swrOptions)
}
