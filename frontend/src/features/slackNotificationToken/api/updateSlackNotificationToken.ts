import { Http } from '@/lib/api-client'

export type UpdateSlackNotificationTokenBody = {
  webHookUrl: string
}

export default function updateSlackNotificationToken(
  actorId: string,
  slackNotificationTokenId: string,
  body: UpdateSlackNotificationTokenBody,
) {
  return Http.axios()
    .patch(`/api/actors/${actorId}/slack-notification-tokens/${slackNotificationTokenId}`, body)
    .then((res) => res.data.data)
}
