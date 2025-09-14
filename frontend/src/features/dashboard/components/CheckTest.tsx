import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'

export default function CheckTest() {
  return (
    <div className='flex flex-col gap-5'>
      <p>テストの提出先はこちら</p>
      <p className='text-xxs text-warn-red'>
        ※仕事の納品を再現するため、再提出は受け付けておりません。念密なチェックを行なってからご提出ください。
      </p>
      <Textarea className='h-16' placeholder='Githubのリンクを送信してください' />
      <Button className='h-12'>提出</Button>
    </div>
  )
}
