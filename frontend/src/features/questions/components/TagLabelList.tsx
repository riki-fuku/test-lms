import TagLabel from '@/features/questions/components/TagLabel'
import type { QuestionTag } from '@/features/questions/types/QuestionTag'

type TagLabelListProps = {
  tags: QuestionTag[]
}

export default function TagLabelList({ tags }: TagLabelListProps) {
  return (
    <div className='flex gap-2'>
      {tags.map((tag, index) => (
        <TagLabel key={index} label={tag.name} />
      ))}
    </div>
  )
}
