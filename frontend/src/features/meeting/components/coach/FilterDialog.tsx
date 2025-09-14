import { useEffect, useState } from 'react'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import InputDate from '@/components/ui/InputDate'
import type { FilterOptions } from '@/features/meeting/types/CoachMeetingListTypes'
import cn from '@/hooks/cn'

type FilterDialogProps = {
  show: boolean
  onFilterClick(filters: FilterOptions): void
}

export default function FilterDialog(props: FilterDialogProps) {
  const [show, setShow] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    name: null,
    startDate: null,
    endDate: null,
  })

  useEffect(() => {
    setShow(props.show)
  }, [props.show])

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setFilters({ ...filters, name: e.target.value })
  }

  function handleChangeStartDate(e: React.ChangeEvent<HTMLInputElement>) {
    setFilters({ ...filters, startDate: e.target.value })
  }

  function handleChangeEndDate(e: React.ChangeEvent<HTMLInputElement>) {
    setFilters({ ...filters, endDate: e.target.value })
  }

  function handleFilterClick() {
    setShow(false)
    props.onFilterClick(filters)
  }

  return (
    <div
      className={cn(
        'absolute right-0 z-10 w-80 rounded border bg-white px-3 py-5',
        show ? 'block' : 'hidden',
      )}
      onClick={() => {}}
    >
      <div className='flex flex-col gap-2'>
        <p>生徒名</p>
        <Input
          className='h-12'
          placeholder='テキストを入力'
          value={filters.name}
          onChange={handleChangeName}
        />
        <p>日時</p>
        <InputDate type='date' className='h-12 rounded' onChange={handleChangeStartDate} />
        <div className='flex items-center justify-center'>
          <p className='rotate-90'>〜</p>
        </div>
        <InputDate type='date' className='h-12 rounded' onChange={handleChangeEndDate} />
      </div>
      <div className='flex items-center justify-center'>
        <Button className='mt-2 w-full' onClick={handleFilterClick}>
          絞り込み
        </Button>
      </div>
    </div>
  )
}
