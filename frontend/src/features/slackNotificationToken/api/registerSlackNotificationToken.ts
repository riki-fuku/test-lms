import { Http } from '@/lib/api-client'

export type RegisterSlackNotificationTokenBody = {
  guardType: string
  webHookUrl: string
}

export default function registerSlackNotificationToken(
  actorId: string,
  body: RegisterSlackNotificationTokenBody,
) {
  return Http.axios()
    .post(`/api/actors/${actorId}/slack-notification-tokens`, body)
    .then((res) => res.data.data)
}
