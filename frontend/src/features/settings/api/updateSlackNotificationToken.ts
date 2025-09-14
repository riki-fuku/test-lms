import { Http } from '@/lib/api-client'

export default function updateSlackNotificationToken(
  tokenId: string,
  body: {
    webhookUrl: string
  },
) {
  return Http.axios()
    .patch(`/api/slack-notification-tokens/${tokenId}`, { web_hook_url: body.webhookUrl })
    .then((res) => res.data.data)
}
