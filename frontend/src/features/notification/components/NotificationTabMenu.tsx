import Tab, { TabItem } from '@/components/ui/Tab'
import NotificationTabMenuItem from '@/features/notification/components/NotificationTabMenuItem'

export default function NotificationTabMenu() {
  const notification = [
    {
      user: {
        name: 'テストユーザー',
        avatar: 'https://picsum.photos/200/200',
      },
      message: {
        content: 'お知らせメッセージ',
        createdAt: '2024-08-04 00:00:00',
      },
    },
    {
      user: {
        name: 'テストユーザー',
        avatar: 'https://picsum.photos/200/200',
      },
      message: {
        content: 'お知らせメッセージ',
        createdAt: '2024-08-04 00:00:00',
      },
    },
    {
      user: {
        name: 'テストユーザー',
        avatar: 'https://picsum.photos/200/200',
      },
      message: {
        content: 'お知らせメッセージ',
        createdAt: '2024-08-04 00:00:00',
      },
    },
  ]

  const question = [
    {
      user: {
        name: 'テストユーザー',
        avatar: 'https://picsum.photos/200/200',
      },
      message: {
        content: '質問メッセージ',
        createdAt: '2024-08-04 00:00:00',
      },
    },
    {
      user: {
        name: 'テストユーザー',
        avatar: 'https://picsum.photos/200/200',
      },
      message: {
        content: '質問メッセージ',
        createdAt: '2024-08-04 00:00:00',
      },
    },
    {
      user: {
        name: 'テストユーザー',
        avatar: 'https://picsum.photos/200/200',
      },
      message: {
        content: '質問メッセージ',
        createdAt: '2024-08-04 00:00:00',
      },
    },
  ]

  const coach = [
    {
      user: {
        name: 'テストユーザー',
        avatar: 'https://picsum.photos/200/200',
      },
      message: {
        content: 'コーチからのメッセージ',
        createdAt: '2024-08-04 00:00:00',
      },
    },
    {
      user: {
        name: 'テストユーザー',
        avatar: 'https://picsum.photos/200/200',
      },
      message: {
        content:
          '3行以上のメッセージは省略されるよ！あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
        createdAt: '2024-08-04 00:00:00',
      },
    },
  ]

  const all = [...notification, ...question, ...coach]

  return (
    <Tab defaultActiveKey='all' className='max-h-[484px] w-[420px] [&_.tab]:w-full'>
      <TabItem label='全ての通知' tabKey='all'>
        <div className='[&>div]:border-border flex flex-col gap-2 overflow-y-scroll [&>div:not(:last-child)]:border-b'>
          {all.map((item, index) => (
            <NotificationTabMenuItem key={index} {...item} />
          ))}
        </div>
      </TabItem>
      <TabItem label='お知らせ' tabKey='notification'>
        {notification.map((item, index) => (
          <NotificationTabMenuItem key={index} {...item} />
        ))}
      </TabItem>
      <TabItem label='質問' tabKey='question'>
        {question.map((item, index) => (
          <NotificationTabMenuItem key={index} {...item} />
        ))}
      </TabItem>
      <TabItem label='コーチ' tabKey='coach'>
        {coach.map((item, index) => (
          <NotificationTabMenuItem key={index} {...item} />
        ))}
      </TabItem>
    </Tab>
  )
}
