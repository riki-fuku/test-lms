import Button from '@/components/ui/Button'
import SideLayout from '@/features/questions/components/SideLayout'
import useFetchQuestionAnswerStats from '@/features/questions/hooks/useFetchQuestionAnswerStats'
import Link from 'next/link'

type IndexSideProps = {
  isUser: boolean
  workspaceId: string
  className?: string
}

export default function IndexSide({ isUser, workspaceId, className }: IndexSideProps) {
  const { data: answerStats } = useFetchQuestionAnswerStats(
    workspaceId,
    { guardType: isUser ? 'user' : 'employee' },
    {
      revalidateOnFocus: false,
    },
  )

  return (
    <SideLayout className={className}>
      <div className='flex flex-col gap-8'>
        {isUser && (
          <Link href={`/renewal/${workspaceId}/questions/create`}>
            <Button className='w-full' size='md'>
              質問を投稿
            </Button>
          </Link>
        )}
        {/* <div>
          <p className='border-grey-tertiary mb-5 border-b py-2.5'>学習中のタグ</p>
          <div className='flex flex-wrap gap-2.5'>
            {learningTags.map((tag, index) => (
              <TagLabel key={index} label={tag} />
            ))}
          </div>
        </div> */}
        {answerStats && (
          <div>
            <p className='border-grey-tertiary mb-5 border-b py-2.5'>回答データ</p>
            <div className='mb-2.5 flex justify-between text-sm'>
              <p>回答数</p>
              <p>{answerStats.myAnswerCount}</p>
            </div>
            <div className='mb-2.5 flex justify-between text-sm'>
              <p>ベストアンサー</p>
              <p>{answerStats.myBestAnswerCount}</p>
            </div>
            {/* <div className='mb-2.5 flex justify-between text-sm'>
              <p>総いいね数</p>
              <p>26</p>
            </div> */}
          </div>
        )}
        {/* <div>
          <p className='border-grey-tertiary mb-5 border-b py-2.5'>タグ一覧</p>
          <div className='flex flex-wrap gap-2.5'>
            {allTags.map((tag, index) => (
              <TagLabel key={index} label={tag} />
            ))}
          </div>
        </div> */}
      </div>
    </SideLayout>
  )
}
