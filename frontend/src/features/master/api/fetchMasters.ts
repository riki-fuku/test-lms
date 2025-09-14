import type { Enum } from '@/features/master/types'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type Master = {
  application_statuses: Enum[]
  application_result_statuses: Enum[]
  application_types: Enum[]
  user_workspace_statuses: Enum[]
}

type FetchMastersHttpDocument = HttpDocument<undefined, undefined, undefined, { data: Master }>

export const fetchMasters = async (
  params?: FetchMastersHttpDocument['params'],
  options?: FetchMastersHttpDocument['options'],
) => {
  return await http<FetchMastersHttpDocument>('/api/masters', 'GET', params, options)
}
