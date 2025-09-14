import SideLayout from '@/features/questions/components/SideLayout'

type DetailSideProps = {
  className?: string
}

export default function DetailSide({ className }: DetailSideProps) {
  return (
    <SideLayout className={className}>
      <div className='flex flex-col gap-2'>
        <p className='border-weakGrey'>関連質問</p>
        {/* <RelatedQuestionList /> */}
      </div>
    </SideLayout>
  )
}
