import type { Curriculum } from '@/features/curriculum/types/Curriculum'
import Link from 'next/link'

type CurriculumSearchResultProps = {
  workspaceId: string
  searchResult: Curriculum[]
}

export default function CurriculumSearchResult({
  workspaceId,
  searchResult,
}: CurriculumSearchResultProps) {
  return (
    <div>
      <p className='font-bold'>検索結果</p>
      {searchResult.map((curriculum) =>
        curriculum.chapters?.map((chapter, ChapterIndex) =>
          chapter.sections?.map((section, SectionIndex) => (
            <div key={SectionIndex}>
              {(SectionIndex == 0 && ChapterIndex == 0) ?? (
                <h3 className='mt-2 border-2 px-1 font-bold'>{curriculum.title}</h3>
              )}
              {SectionIndex == 0 && <h3 className='ml-2 text-md font-bold'>{chapter.title}</h3>}
              <p key={SectionIndex} className='ml-4 p-1 text-sm underline'>
                <Link
                  href={`/renewal/${workspaceId}/curriculums/${curriculum.id}/chapters/${chapter.id}/sections/${section.id}`}
                >
                  {section.title}
                </Link>
              </p>
            </div>
          )),
        ),
      )}

      {searchResult.length < 0 && (
        <p className='text-center text-xl font-bold text-sub-color'>該当する教材がありません</p>
      )}
    </div>
  )
}
