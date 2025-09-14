import fetchUserTask from '@/features/backlog/api/fetchUserTask'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export function useFetchUserTask(
  workspaceId: string,
  userId: string,
  projectId: string,
  taskId: string,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchUserTask(workspaceId, userId, projectId, taskId)
  return useSWR(
    `/api/workspaces/${workspaceId}/users/${userId}/projects/${projectId}/user-tasks/${taskId}`,
    fetcher,
    swrOptions,
  )
}
