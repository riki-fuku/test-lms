'use client'

import { Input } from '@/components/kit'
import { RadioGroup } from '@/components/kit/forms'
import { Radio } from '@heroui/react'
import { useController, type Control } from 'react-hook-form'
import type { FormValues } from './SuspendApplicationForm'

const options = [
  {
    label: 'FAQを見て知った',
    value: 'FAQを見て知った',
  },
  {
    label: '無料カウンセリング時に知った',
    value: '無料カウンセリング時に知った',
  },
  {
    label: 'コーチから案内された',
    value: 'コーチから案内された',
  },
  {
    label: '運営から案内された',
    value: '運営から案内された',
  },
]

type Props = {
  control: Control<FormValues>
}

export function ReasonRadioGroup({ control }: Props) {
  const reason = useController({ name: 'reason', control })
  const otherReason = useController({ name: 'otherReason', control })

  return (
    <RadioGroup
      aria-label='reason'
      onValueChange={(value) => {
        reason.field.onChange(value)
      }}
      defaultValue={reason.field.value}
      isInvalid={!!reason.fieldState.error}
      errorMessage={reason.fieldState.error?.message}
    >
      {options.map((option) => (
        <Radio key={option.value} value={option.value}>
          {option.label}
        </Radio>
      ))}
      <div className='flex items-center gap-2'>
        <Radio value='その他' className='shrink-0'>
          その他
        </Radio>

        <Input
          type='text'
          value={otherReason.field.value}
          onChange={(e) => {
            otherReason.field.onChange(e.target.value)
          }}
          placeholder='詳細を記入してください'
          disabled={reason.field.value !== 'その他'}
          isInvalid={!!otherReason.fieldState.error}
          errorMessage={otherReason.fieldState.error?.message}
        />
      </div>
    </RadioGroup>
  )
}
