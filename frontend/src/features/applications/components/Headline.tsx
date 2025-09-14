import FormTag from '@/components/ui/FormTag'

type HeadlineProps = {
  text: string
  required?: boolean
}

export default function Headline({ text, required }: HeadlineProps) {
  return (
    <div className=''>
      <div className='flex items-center gap-1 p-2'>
        <h2 className='font-bold lg:text-xl'>{text}</h2>
        {required && <FormTag required={required} />}
      </div>
      <div className='h-0.5 w-full bg-gradient-to-r from-sub-color to-main-color'></div>
    </div>
  )
}
