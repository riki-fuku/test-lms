import type { SlackNotificationToken } from '@/features/settings/types/SlackNotificationToken'
import { Http } from '@/lib/api-client'

export default function findSlackNotificationTokenByUserId(userId: string) {
  return Http.axios()
    .get<{ data: SlackNotificationToken }>(`api/v1/users/${userId}/slack-notification-tokens`)
    .then((res) => res.data.data)
}
