import Tooltip from '@/components/ui/Tooltip'

type LabelProps = {
  className?: string
  label: string
}
export default function Label(props: LabelProps) {
  const baseStyle = 'bg-bg-tertiary'

  return <Tooltip size='sm' className={`${baseStyle} ${props.className}`} text={props.label} />
}
