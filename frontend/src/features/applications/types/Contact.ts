export type ContactReq = {
  userId: string
  workspaceId: string
  title: string
  reason: string
  reasonDetail: string
}

export type ContactRes = {
  id: number
  userId: string
  title: string
  reason: string
  reasonDetail: string
  createdAt: string
  updatedAt: string
}
