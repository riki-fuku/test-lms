import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function ApplicationFormTemplate({ children }: Props) {
  return <div className='mx-auto w-2/3 max-w-[800px] py-16'>{children}</div>
}
