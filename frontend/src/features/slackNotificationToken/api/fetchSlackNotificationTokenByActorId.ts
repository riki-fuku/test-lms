import type { SlackNotificationToken } from '@/features/slackNotificationToken/types/SlackNotificationToken'
import { Http } from '@/lib/api-client'

export type FetchSlackNotificationTokenByActorIdQuery = {
  guardType: 'user' | 'employee'
}

export default function fetchSlackNotificationTokenByActorId(
  actorId: string,
  query: FetchSlackNotificationTokenByActorIdQuery,
) {
  return Http.axios()
    .get<{ data: SlackNotificationToken }>(`/api/actors/${actorId}/slack-notification-tokens`, {
      params: query,
    })
    .then((res) => res.data.data)
}
