import Input from '@/components/ui/Input'
import { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

type SlackLinkageProps = {
  token: string
  isLinked: boolean
  onConnect: (webhookURL: string) => void
  onDisconnect: () => void
}

export default function SlackLinkage({
  token,
  isLinked,
  onConnect,
  onDisconnect,
}: SlackLinkageProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const [webhookURL, setWebhookURL] = useState('')

  useEffect(() => {
    setWebhookURL(token)
  }, [token])

  const handleClickAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebhookURL(e.target.value)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onConnect(webhookURL)
  }

  const handleDisconnect = () => {
    onDisconnect()
  }

  const titleClass = 'text-md mb-5 lg:text-xl'

  return (
    <>
      <div className='mb-5 flex items-center gap-12 text-center'>
        <h2 className='text-2xl'>Slack通知連携</h2>
        <div className='flex items-center gap-2.5'>
          連携状況：
          <div className='rounded bg-bg-primary px-3 py-1 text-center text-md text-text-primary'>
            {isLinked ? '連携済' : '未連携'}
          </div>
        </div>
      </div>

      <div>
        <div
          className={`flex w-full cursor-pointer items-center justify-between bg-bg-primary p-3 text-text-primary ${isAccordionOpen || 'mb-5'}`}
          onClick={handleClickAccordion}
        >
          Slackの連携方法を確認
          <div className='text-2xl text-text-secondary'>
            {isAccordionOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>
        {isAccordionOpen && (
          <div className='mb-5 flex flex-col gap-8 border border-border-primary px-5 py-8'>
            <section>
              <div className='flex'>
                <p className='text-xl font-bold'>1.</p>
                <p className={titleClass}>
                  <a
                    className='text-blue-600'
                    href='https://coachtech-qir9467.slack.com/marketplace/A0F7XDUAZ--incoming-webhook-'
                  >
                    こちら
                  </a>
                  にアクセス
                </p>
              </div>
            </section>

            <section>
              <div className='flex'>
                <p className='text-xl font-bold'>2.</p>
                <p className={titleClass}>「slackに追加」を押下</p>
              </div>
            </section>

            <section>
              <p className={titleClass}>
                3. &quot;チャンネルを選択&quot; というプルダウンメニューから
                <strong>
                  <span className='text-red-500'>必ず</span>自分のDMを選択
                </strong>
                （ご自身の&quot;slack表示名 登録名&quot;となっている項目です）
                <br />
                ※「Slackに追加」の部分で「制限付き」と表示されていましたら、選択されたワークスペース内でシングルチャンネルゲスト/マルチチャンネルゲストの可能性がございます。
              </p>
            </section>

            <section>
              <div className='flex'>
                <p className='text-xl font-bold'>4.</p>
                <p className={titleClass}>「Incoming Webhook インテグレーションの追加」を押下</p>
              </div>
            </section>

            <section>
              <div className='flex'>
                <p className='text-xl font-bold'>5.</p>
                <p className={titleClass}>
                  表示されたWebhookURLをコピーして、LMSの通知設定画面のフォームにペースト
                </p>
              </div>
            </section>

            <section>
              <div className='flex'>
                <p className='text-xl font-bold'>6.</p>
                <p className={titleClass}>LMSの通知設定画面の「連携」を押下して連携完了です。</p>
              </div>
            </section>
          </div>
        )}
      </div>

      <div className='mb-5 flex items-center gap-5'>
        <Input
          className='w-96'
          placeholder='WebhookURL'
          onChange={handleChange}
          value={webhookURL}
        />

        {!isLinked ? (
          <button
            type='button'
            className='flex h-8 w-24 cursor-pointer items-center justify-center rounded bg-slack-link text-md text-white'
            onClick={handleClick}
          >
            連携
          </button>
        ) : (
          <button
            type='button'
            className='flex h-8 w-24 cursor-pointer items-center justify-center rounded bg-gray-500 text-md text-white'
            onClick={handleDisconnect}
          >
            解除
          </button>
        )}
      </div>
    </>
  )
}
