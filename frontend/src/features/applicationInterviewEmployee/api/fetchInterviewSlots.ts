import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type InterviewSlot = {
  dateTime: string
  isAvailable: boolean
  employeeId: string
}

export type FetchInterviewSlotResponse = {
  dates: string[]
  times: Record<string, InterviewSlot[]>
}

type FetchInterviewSlotHttpDocument = HttpDocument<
  { workspaceId: string },
  {
    application_type: string
    start_date: string
    end_date: string
  },
  undefined,
  { data: FetchInterviewSlotResponse }
>

export const fetchInterviewSlots = async (
  params: FetchInterviewSlotHttpDocument['params'],
  options?: FetchInterviewSlotHttpDocument['options'],
) => {
  return await http<FetchInterviewSlotHttpDocument>(
    `/api/workspaces/:workspaceId/application-interview-employees/interview-slots`,
    'GET',
    params,
    options,
  )
}
