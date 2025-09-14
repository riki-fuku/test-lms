import type {
  LeaveOfAbsenceReq,
  LeaveOfAbsenceRes,
} from '@/features/applications/types/leaveOfAbsence'
import { Http } from '@/lib/api-client'

export default function postLeaveOfAbsence(workspaceId: string, data: LeaveOfAbsenceReq) {
  return Http.axios()
    .post<{ data: LeaveOfAbsenceRes }>(`/api/workspaces/${workspaceId}/suspend-applications`, data)
    .then((res) => res.data.data)
}
