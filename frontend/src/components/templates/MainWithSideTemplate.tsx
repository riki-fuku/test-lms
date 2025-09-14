import SideLayout from '@/components/elements/SideLayout'

export default function MainWithSideTemplate({
  mainContent,
  sideContent,
}: {
  mainContent: React.ReactNode
  sideContent: React.ReactNode
}) {
  return (
    <div className='mx-0 w-full max-w-pc gap-5 lg:mx-auto lg:flex'>
      <div className='w-full bg-white lg:w-9/12'>{mainContent}</div>
      <div className='w-full lg:w-3/12'>
        <SideLayout>{sideContent}</SideLayout>
      </div>
    </div>
  )
}
