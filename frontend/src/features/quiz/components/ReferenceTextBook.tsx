import type { Section } from '@/features/curriculum/types/Section'
import { useUserStore } from '@/store/user-store'
import Link from 'next/link'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'

type ReferenceTextBookProps = {
  section: Section
  className?: string
}

export default function ReferenceTextBook({ section, className }: ReferenceTextBookProps) {
  const workspaceId = useUserStore((state) => state.user?.activeWorkspace.workspaceId ?? '')

  return (
    <div className={className}>
      <div className='flex max-w-fit items-center gap-2 rounded-t-md bg-bg-tertiary px-5 py-2 font-bold text-white'>
        <FaArrowUpRightFromSquare />
        <div>参考教材</div>
      </div>
      <ul className='rounded-r-md rounded-bl-md border border-border-secondary px-5 py-3 text-md'>
        {section && (
          <li className='border-b py-2'>
            <Link
              className='flex gap-5 text-text-blue-primary'
              href={`/renewal/${workspaceId}/curriculums/${section.chapter?.curriculumId}/chapters/${section.chapterId}/sections/${section.id}`}
            >
              <span>{section.title}</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}
