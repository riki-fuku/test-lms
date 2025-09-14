import { Http } from '@/lib/api-client'

export type SendVerificationEmailBody = {
  actor_type: 'user' | 'employee'
  workspace_id: string
}

export default function sendVerificationEmail(email: string, body: SendVerificationEmailBody) {
  return Http.axios().get(`/api/email/verification-notification/${email}`, { params: body })
}
