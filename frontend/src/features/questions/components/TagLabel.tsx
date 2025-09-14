import Label from '@/features/questions/components/Label'

type TagLabelProps = {
  className?: string
  label: string
}

export default function TagLabel(props: TagLabelProps) {
  const baseStyle = 'bg-bg-primary text-text-primary'

  return <Label label={props.label} className={`${baseStyle} ${props.className}`} />
}
