import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import cn from '@/hooks/cn'

export default function AddTemplate({ onCancel }: { onCancel: () => void }) {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-1'>
        <p>定型文のタイトル</p>
        <Input placeholder='定型文のタイトルを入力' className='h-12' />
      </div>
      <div className='flex flex-col gap-1'>
        <p>定型文の内容</p>
        <Textarea placeholder='定型文を入力' className='h-48' />
      </div>
      <div className={cn('flex items-center gap-5')}>
        <Button intent='secondary' className='h-12 w-full' onClick={() => onCancel()}>
          キャンセル
        </Button>
        <Button className='h-12 w-full'>保存</Button>
      </div>
    </div>
  )
}
