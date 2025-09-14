import Tooltip from '@/components/ui/Tooltip'
import useFetchQuestionCategories from '@/features/questions/hooks/useFetchQuestionCategories'
import { CONSULTATION, Q_AND_A } from '@/features/questions/types/QuestionCategory'
import cn from '@/hooks/cn'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

type LabelCategoryProps = VariantProps<typeof labelCategory> & {
  id: number
  className?: string
}

const labelCategory = cva(['border'], {
  variants: {
    type: {
      CONSULTATION: ['border-sub-color bg-qa-bg-color !text-sub-color'],
      Q_AND_A: ['border-main-color bg-bg-blue-primary !text-main-color'],
      DEFAULT: ['border-border-secondary bg-bg-primary !text-text-primary'],
    },
  },
})

export default function LabelCategory({ id, className }: LabelCategoryProps) {
  const { data: categoryList } = useFetchQuestionCategories({
    revalidateOnFocus: false,
  })

  if (!categoryList) return null

  const getLabel = () => {
    const label = categoryList.find((category) => category.value === id)?.label
    return label || ''
  }

  const getType = () => {
    switch (id) {
      case CONSULTATION:
        return 'CONSULTATION'
      case Q_AND_A:
        return 'Q_AND_A'
      default:
        return 'DEFAULT'
    }
  }

  const toolTipClassName = cn(labelCategory({ type: getType() }))
  return <Tooltip size='sm' text={getLabel()} className={toolTipClassName} />
}
