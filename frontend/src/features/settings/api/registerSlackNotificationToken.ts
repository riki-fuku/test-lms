import { Http } from '@/lib/api-client'

export default function registerSlackNotificationToken(body: {
  userId: string
  webhookUrl: string
}) {
  return Http.axios()
    .post(`api/slack-notification-tokens`, { user_id: body.userId, web_hook_url: body.webhookUrl })
    .then((res) => res.data.data)
}
