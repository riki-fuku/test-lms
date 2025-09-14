import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import Input from '@/components/ui/Input'
import SideLayout from '@/features/questions/components/SideLayout'

type UpdateSectionSideProps = {
  isPublic: boolean
  order: number
  className?: string
  onUpdateSection: () => void
  onChangeIsPublic: (isPublic: boolean) => void
  onChangeOrder: (order: number) => void
}

export default function UpdateSectionSide({
  isPublic,
  order,
  className,
  onUpdateSection,
  onChangeIsPublic,
  onChangeOrder,
}: UpdateSectionSideProps) {
  return (
    <SideLayout className={className}>
      <div className='flex flex-col gap-8'>
        <Button className='hidden w-full lg:block' size='md' onClick={onUpdateSection}>
          更新
        </Button>
      </div>

      <Divider className='hidden lg:block' />

      <div className='flex flex-col gap-2'>
        <label htmlFor='isPublic'>表示状態</label>
        <select
          id='isPublic'
          value={isPublic ? '1' : '0'}
          onChange={(e) => onChangeIsPublic(e.target.value === '1')}
          className='h-10 rounded border border-form-gray bg-white !px-2.5 hover:drop-shadow '
        >
          <option value='1'>公開中</option>
          <option value='0'>非公開</option>
        </select>
        <label>表示順</label>
        <Input
          type='number'
          value={String(order)}
          onChange={(e) => onChangeOrder(Number(e.target.value))}
        />
      </div>

      <Divider className='hidden lg:block' />
    </SideLayout>
  )
}
