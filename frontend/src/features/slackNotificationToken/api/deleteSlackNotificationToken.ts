import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type DeleteSlackNotificationTokenHttpDocument = HttpDocument<
  {
    actorId: string
    slackNotificationTokenId: string
  },
  undefined,
  undefined,
  undefined
>

export async function deleteSlackNotificationToken(
  params: DeleteSlackNotificationTokenHttpDocument['params'],
  options?: DeleteSlackNotificationTokenHttpDocument['options'],
) {
  return await http<DeleteSlackNotificationTokenHttpDocument>(
    `/api/actors/:actorId/slack-notification-tokens/:slackNotificationTokenId`,
    'DELETE',
    params,
    options,
  )
}
