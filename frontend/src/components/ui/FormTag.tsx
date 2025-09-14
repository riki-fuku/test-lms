import cn from '@/hooks/cn'

type FormTagProps = {
  required?: boolean
}

export default function FormTag(props: FormTagProps) {
  const className = cn(
    'w-7 h-4 flex justify-center items-center rounded-sm pointer-events-none whitespace-nowrap text-white text-xs',
    props.required ? 'bg-warn-red' : 'bg-bg-tertiary',
  )
  return <span className={cn(className)}>{props.required ? '必須' : '任意'}</span>
}
