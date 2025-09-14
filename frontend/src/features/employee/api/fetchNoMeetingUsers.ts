import { Http } from '@/lib/api-client'

export type FetchNoMeetingUsersQuery = {
  employeeId: string
}

export type NoMeetingUser = {
  id: string
  name: string
  avatar: string
  role: number
  lastLoginAt: string
  daysSinceLastMeeting: number | null
}

// 面談予約のない生徒一覧を取得する関数
export default async function fetchNoMeetingUsers(
  workspaceId: string,
  query: FetchNoMeetingUsersQuery,
) {
  return await Http.axios()
    .get<{ data: NoMeetingUser[] }>(
      `/api/workspaces/${workspaceId}/no-meeting-users?employee_id=${query.employeeId}`,
    )
    .then((res) => res.data.data)
}
