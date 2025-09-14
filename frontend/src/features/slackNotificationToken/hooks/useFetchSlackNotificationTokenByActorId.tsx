import type { FetchSlackNotificationTokenByActorIdQuery } from '@/features/slackNotificationToken/api/fetchSlackNotificationTokenByActorId'
import fetchSlackNotificationTokenByActorId from '@/features/slackNotificationToken/api/fetchSlackNotificationTokenByActorId'
import useSWR from 'swr'

export default function useFetchSlackNotificationTokenByActorId(
  actorId: string,
  query: FetchSlackNotificationTokenByActorIdQuery,
) {
  const fetcher = () => fetchSlackNotificationTokenByActorId(actorId, query)
  return useSWR(`/api/actors/${actorId}/slack-notification-tokens`, fetcher)
}
