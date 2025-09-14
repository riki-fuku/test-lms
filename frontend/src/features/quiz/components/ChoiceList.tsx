import Choice from '@/features/quiz/components/Choice'
import type { Choice as TypeChoice } from '@/features/quiz/types/Choice'
import cn from '@/hooks/cn'

type ChoiceListProps = {
  choices: TypeChoice[]
  onSelect?: (choice: TypeChoice, index: number) => void
  className?: string
}

export default function ChoiceList(props: ChoiceListProps) {
  function handleSelect(choice: TypeChoice, index: number): void {
    if (props.onSelect) {
      props.onSelect({ ...choice, value: !choice.value }, index)
    }
  }

  return (
    <ul className={cn('flex flex-col gap-2', props.className)}>
      {props.choices.map((choice, index) => {
        return (
          <li key={index} onClick={() => handleSelect(choice, index)}>
            <Choice
              type={choice.type}
              prefix={choice.prefix}
              text={choice.text}
              value={choice.value}
            />
          </li>
        )
      })}
    </ul>
  )
}
