import FormTag from '@/components/ui/FormTag'
import RhfInput from '@/components/ui/RhfInput'
import type { Control, FieldValues } from 'react-hook-form'

type CardInfoInputsProps = {
  control: Control<FieldValues>
  onChange?: () => void
}

export default function CardInfoInputs(props: CardInfoInputsProps) {
  return (
    <>
      <div className='flex flex-col gap-4'>
        <div>
          <div className='flex items-center gap-5'>
            <p className='text-md text-text-secondary'>カード番号</p>
            <FormTag required />
          </div>
          <RhfInput
            className='h-12'
            placeholder='XXXX XXXX XXXX XXXX'
            type='text'
            name='cardNumber'
            control={props.control}
            rules={{ required: 'カード番号を入力してください' }}
            onChange={props.onChange}
          />
        </div>

        <div>
          <div className='flex items-center gap-5'>
            <p className='text-md text-text-secondary'>カード名義</p>
            <FormTag required />
          </div>
          <RhfInput
            className='h-12'
            placeholder='KAITO YAMADA'
            type='text'
            name='cardHolderName'
            control={props.control}
            rules={{ required: 'カード名義を入力してください' }}
            onChange={props.onChange}
          />
        </div>

        <div>
          <div className='flex items-center gap-5'>
            <p className='text-md text-text-secondary'>有効期限</p>
            <FormTag required />
          </div>
          <div className='flex items-center gap-2'>
            <RhfInput
              className='h-12'
              placeholder='05'
              type='text'
              name='cardExpirationMonth'
              control={props.control}
              rules={{
                required: '有効期限（月）を入力してください',
                pattern: {
                  value: /^(0[1-9]|1[0-2])$/,
                  message: '不適切な形式です。',
                },
              }}
              onChange={props.onChange}
            />
            <p>/</p>
            <RhfInput
              className='h-12'
              placeholder='26'
              type='text'
              name='cardExpirationYear'
              control={props.control}
              rules={{
                required: '有効期限（年）を入力してください',
                pattern: {
                  value: /^([0-9]{2})$/,
                  message: '不適切な形式です。',
                },
              }}
              onChange={props.onChange}
            />
          </div>
        </div>

        <div>
          <div className='flex items-center gap-5'>
            <p className='text-md text-text-secondary'>セキュリティコード</p>
            <FormTag required />
          </div>
          <RhfInput
            className='h-12'
            placeholder='110'
            type='text'
            name='cardSecurityCode'
            control={props.control}
            rules={{
              required: 'セキュリティコードを入力してください',
              pattern: {
                value: /^\d{1,4}$/,
                message: '不適切な形式です。',
              },
            }}
            onChange={props.onChange}
          />
        </div>
      </div>
    </>
  )
}
