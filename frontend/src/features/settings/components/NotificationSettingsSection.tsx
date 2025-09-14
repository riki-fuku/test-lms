'use client'

import disconnectLine from '@/features/line/api/disconnectLine'
import { fetchLineOAuthUrl } from '@/features/line/api/fetchLineOAuthUrl'
import useFetchLineStatus from '@/features/line/hook/useFetchLineStatus'
import LineLinkage from '@/features/register/components/LineLinkage'
import SlackLinkage from '@/features/register/components/SlackLinkage'
import { deleteSlackNotificationToken } from '@/features/slackNotificationToken/api/deleteSlackNotificationToken'
import registerSlackNotificationToken from '@/features/slackNotificationToken/api/registerSlackNotificationToken'
import updateSlackNotificationToken from '@/features/slackNotificationToken/api/updateSlackNotificationToken'
import useFetchSlackNotificationTokenByActorId from '@/features/slackNotificationToken/hooks/useFetchSlackNotificationTokenByActorId'
import { useSnackbar } from '@/hooks/useSnackbar'

type NotificationSettingsSectionProps = {
  actorId: string
  actorType: 'user' | 'employee'
  lineRedirectPath: string
  isShowSlackLinkage?: boolean
}

export default function NotificationSettingsSection({
  actorId,
  actorType,
  lineRedirectPath,
  isShowSlackLinkage = true,
}: NotificationSettingsSectionProps) {
  const { data, mutate: mutateLineStatus } = useFetchLineStatus({
    guardType: actorType,
  })
  const isLineLinked = data?.status || false
  // slack通知トークン取得
  const { data: slackNotificationToken, mutate } = useFetchSlackNotificationTokenByActorId(
    actorId,
    {
      guardType: actorType,
    },
  )
  const isSlackLinked = slackNotificationToken ? true : false
  const { showSnackbar } = useSnackbar()

  const handleClickLineLinkage = async () => {
    if (isLineLinked) {
      return
    }

    const url = await fetchLineOAuthUrl({
      guardType: actorType,
      redirectPath: lineRedirectPath,
    })

    if (url) {
      window.location.href = url
    }
  }

  const handleClickLineDisconnect = async () => {
    await disconnectLine({
      guardType: actorType,
    })
    showSnackbar('LINE連携を解除しました', 'success')
    mutateLineStatus()
  }

  const handleClickSlackConnect = async (webHookUrl: string) => {
    const webHookPattern = /^https:\/\/hooks\.slack\.com/
    const isWebHookUrl = webHookPattern.test(webHookUrl)
    if (!isWebHookUrl) return showSnackbar('Webhook URLが不正です', 'warning')

    // slackトークンが作成済みの場合
    if (slackNotificationToken) {
      await updateSlackNotificationToken(actorId, slackNotificationToken.id, {
        webHookUrl,
      })
    }

    // slackトークンが未作成の場合
    if (!slackNotificationToken) {
      await registerSlackNotificationToken(actorId, {
        guardType: actorType,
        webHookUrl,
      })
    }
    showSnackbar('slack連携が完了しました。', 'success')
    mutate()
  }

  // Slack連携解除
  const handleClickSlackDisconnect = async () => {
    if (!slackNotificationToken) return

    try {
      await deleteSlackNotificationToken({
        pathParams: {
          actorId,
          slackNotificationTokenId: slackNotificationToken.id,
        },
      })
      showSnackbar('Slack連携を解除しました', 'success')
      mutate(() => undefined, false)
    } catch (error) {
      console.error(error)
      showSnackbar('Slack連携解除に失敗しました', 'error')
    }
  }

  return (
    <>
      <div className='flex w-full flex-col gap-10'>
        <LineLinkage
          isLinked={isLineLinked}
          onConnect={handleClickLineLinkage}
          onDisconnect={handleClickLineDisconnect}
        />

        {isShowSlackLinkage && (
          <SlackLinkage
            token={slackNotificationToken?.webHookUrl ?? ''}
            isLinked={isSlackLinked}
            onConnect={handleClickSlackConnect}
            onDisconnect={handleClickSlackDisconnect}
          />
        )}
      </div>
    </>
  )
}
