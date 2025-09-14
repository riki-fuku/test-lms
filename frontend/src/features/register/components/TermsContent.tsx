import { useCallback, useRef } from 'react'

type TermsContentProps = {
  workspaceName?: string
  termsText: string
  onScrollEnd: () => void
}

export default function TermsContent({ workspaceName, termsText, onScrollEnd }: TermsContentProps) {
  const observer = useRef<IntersectionObserver | null>(null)
  const lastElementRef = useCallback(
    (node: Element | null) => {
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          onScrollEnd()
        }
      })

      if (node) observer.current.observe(node)
    },
    [onScrollEnd],
  )

  return (
    <>
      <div className='mb-8 h-96 w-full overflow-scroll rounded-md border-8 border-form-gray px-3 py-5 lg:px-5 lg:py-8'>
        <p className='font-bold lg:text-2xl'>{workspaceName}規約</p>
        <div className='whitespace-pre-wrap text-md'>{termsText}</div>
        <div ref={lastElementRef}></div>
      </div>
    </>
  )
}
