import type { Question } from '@/features/quiz/types/Question'

type RelatedQuestionCardProps = {
  className?: string
  question: Question
}

export default function RelatedQuestionCard({ question, className }: RelatedQuestionCardProps) {
  // // 解決済み
  // const resolvedStyle =
  //   question.status === UserQueryStatus.RESOLVED.id
  //     ? {
  //         label: '解決済',
  //         labelStyle: 'bg-warn text-white',
  //         textColor: 'text-warn',
  //       }
  //     : {
  //         label: '未解決',
  //         labelStyle: 'text-white',
  //         textColor: '',
  //       }
  // return (
  //   <Link href={`/questions/posts/${question.id}`} target='_blank'>
  //     <div className={className}>
  //       <div className='mb-2.5 flex gap-2.5'>
  //         <LabelCategory id={question.category} />
  //         <Label label={resolvedStyle.label} className={resolvedStyle.labelStyle} />
  //       </div>
  //       <div>
  //         <p className='mb-2.5 text-sm text-mainColor'>{question.title}</p>
  //         <TagLabelList tags={question.tags || []} />
  //       </div>
  //     </div>
  //   </Link>
  // )
}
