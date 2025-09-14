import Button from '@/components/ui/Button'
import FormTag from '@/components/ui/FormTag'
import type { Option } from '@/components/ui/InputSelect'
import InputSelect from '@/components/ui/InputSelect'
import Textarea from '@/components/ui/Textarea'
import { useEffect, useState } from 'react'

export type FormData = {
  reason: string
  reasonDetail: string
}

type MeetingCancelFormProps = {
  onSubmit: (data: FormData) => void
  onBack: () => void
}

export default function MeetingCancelForm(props: MeetingCancelFormProps) {
  const options: Option<string>[] = [
    { label: '体調不良のため', value: '体調不良のため' },
    { label: '仕事のため', value: '仕事のため' },
    { label: '急用ができたため', value: '急用ができたため' },
    { label: 'その他', value: 'その他' },
  ]
  const [reason, setReason] = useState<Option<string> | null>(null)
  const [reasonDetail, setReasonDetail] = useState('')
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (reason && reasonDetail) {
      setDisabled(false)
    }
  }, [reason, reasonDetail])

  function handleSelectChange(item: Option<string> | null) {
    setReason(item)
  }

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setReasonDetail(e.target.value)
  }

  function handleBack() {
    props.onBack()
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (reason) {
      props.onSubmit({
        reason: reason.value,
        reasonDetail,
      })
    }

    setReason(null)
    setReasonDetail('')
  }

  const formStyle = 'flex flex-col gap-2 lg:grid lg:grid-cols-5'
  const labelStyle = 'flex items-center gap-1 text-md lg:col-span-2'
  const formPartsStyle = 'col-span-3 col-start-3'

  return (
    <div className='flex flex-col gap-10'>
      <h2 className='text-center text-xl font-bold lg:text-3xl'>面談キャンセルリクエスト</h2>

      <div className='rounded border p-5'>
        <p className='font-bold lg:text-xl'>確認事項</p>
        <p className='mt-2 text-md lg:text-base'>
          コーチがキャンセルリクエストに合意した場合に面談キャンセルが成立します。合意がない場合、予定通り面談は実施されます。キャンセル成立後は速やかに次回の面談予約を行ってください。
        </p>
      </div>

      <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-8'>
          <div className={formStyle}>
            <div className={labelStyle}>
              <label>キャンセル理由</label>
              <FormTag required />
            </div>
            <div className={formPartsStyle}>
              <InputSelect
                options={options}
                placeholder='キャンセル理由を選択してください'
                onChange={handleSelectChange}
                item={reason}
              />
            </div>
          </div>

          <div className={formStyle}>
            <div className='col-span-2 py-2'>
              <div className={labelStyle}>
                <label>キャンセル理由の詳細</label>
                <FormTag required />
              </div>
            </div>
            <div className={formPartsStyle}>
              <Textarea
                className='h-24'
                placeholder='キャンセル理由の詳細を入力してください'
                onChange={handleTextChange}
                value={reasonDetail}
              />
              <p className='text-right text-xs text-text-secondary'>{reasonDetail.length}/1000</p>
            </div>
          </div>
        </div>

        <div className='m-auto flex w-full shrink-0 gap-5 lg:w-fit'>
          <Button intent='secondary' type='button' onClick={handleBack} className='hidden lg:block'>
            戻る
          </Button>
          <Button type='submit' disabled={disabled} className='w-full'>
            リクエストを送信
          </Button>
        </div>
      </form>
    </div>
  )
}
