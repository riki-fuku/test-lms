import Check from '@/components/ui/Check'
import type { Section } from '@/features/curriculum/types/Section'
import Link from 'next/link'

type SectionNavListProps = {
  workspaceId: string
  chapterNumber: number
  sections: Section[]
  chapterId: string
  curriculumId: string
}

export default function SectionNavList({
  workspaceId,
  chapterNumber,
  sections,
  chapterId,
  curriculumId,
}: SectionNavListProps) {
  return (
    <ul className='flex flex-col gap-5'>
      {sections.map((section, index) => {
        return (
          <Link
            key={index}
            href={`/renewal/${workspaceId}/curriculums/${curriculumId}/chapters/${chapterId}/sections/${section.id}`}
          >
            <li className='flex items-center'>
              <Check size='xs' value={section?.learned ?? false} disable />
              <span className='ml-2 shrink-0'>
                {chapterNumber}&#045;{index + 1}&#8194;&#58;
              </span>
              <span className='ml-3 text-md'>{section.title}</span>
            </li>
          </Link>
        )
      })}
    </ul>
  )
}
