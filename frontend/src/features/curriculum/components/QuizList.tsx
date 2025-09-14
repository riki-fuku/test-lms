import QuizCard from '@/features/curriculum/components/QuizCard'
import type { Curriculum } from '@/features/curriculum/types/Curriculum'

type CurriculumListPageProps = {
  curriculums: Curriculum[]
  workspaceId: string
}

export default function QuizList({ curriculums, workspaceId }: CurriculumListPageProps) {
  return (
    <>
      {curriculums.map((curriculum) => {
        return <QuizCard key={curriculum.id} workspaceId={workspaceId} curriculum={curriculum} />
      })}
    </>
  )
}
