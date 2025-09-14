import CurriculumCard from '@/features/curriculum/components/CurriculumCard'
import type { Curriculum } from '@/features/curriculum/types/Curriculum'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useRouter } from 'next/navigation'

type CurriculumListPageProps = {
  workspaceId: string
  curriculums: Curriculum[]
}

export default function CurriculumList({ workspaceId, curriculums }: CurriculumListPageProps) {
  const { showSnackbar } = useSnackbar()
  const router = useRouter()

  const getCurriculumLink = (curriculum: Curriculum) => {
    if (!curriculum.firstChapter) {
      showSnackbar('この教材には章がありません', 'info')
      return `/renewal/${workspaceId}/curriculums`
    }

    if (!curriculum.firstChapter.firstSection) {
      showSnackbar('この教材の章には記事がありません', 'info')
      return `/renewal/${workspaceId}/curriculums`
    }

    router.push(
      `/renewal/${workspaceId}/curriculums/${curriculum.id}/chapters/${curriculum.firstChapter.id}/sections/${curriculum.firstChapter.firstSection.id}`,
    )
  }

  return (
    <>
      {Object.values(curriculums).map((curriculum, index) => {
        return (
          <a key={index} onClick={() => getCurriculumLink(curriculum)}>
            <CurriculumCard curriculum={curriculum} />
          </a>
        )
      })}
    </>
  )
}
