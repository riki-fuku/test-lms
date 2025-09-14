import { Chip } from '@heroui/react'

type Props = {
  title: string
  required?: boolean
}

export function ApplicationHeading({ title, required }: Props) {
  return (
    <div className='flex w-full items-center gap-2 border-b-4 px-3 py-2'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      {required && (
        <Chip color='danger' size='sm' radius='sm' className='text-md'>
          必須
        </Chip>
      )}
    </div>
  )
}
