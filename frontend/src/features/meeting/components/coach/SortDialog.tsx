import Button from '@/components/ui/Button'
import type { SortOptions } from '@/features/meeting/types/CoachMeetingListTypes'
import cn from '@/hooks/cn'
import { useEffect, useState } from 'react'

type SortDialogProps = {
  show: boolean
  onSortClick(filters: SortOptions): void
}

export default function SortDialog(props: SortDialogProps) {
  const [show, setShow] = useState(false)
  const [sorts, setSorts] = useState<SortOptions>({
    name: null,
    date: null,
    count: null,
  })

  useEffect(() => {
    setShow(props.show)
  }, [props.show])

  function handleChangeSelect(key: keyof SortOptions, value: string) {
    setSorts({ ...sorts, [key]: value })
  }

  function handleClickSort() {
    props.onSortClick(sorts)
    setShow(false)
  }

  function SortSelect(key: keyof SortOptions) {
    return (
      <select
        className={cn(
          'h-12 w-24 rounded border px-1',
          !sorts[key] && 'text-form-gray focus:outline-none focus:drop-shadow',
        )}
        value={sorts[key] ?? ''}
        onChange={(e) => {
          handleChangeSelect(key, e.target.value)
        }}
      >
        <option value=''>選択</option>
        <option value='昇順'>昇順</option>
        <option value='降順'>降順</option>
      </select>
    )
  }

  return (
    <div
      className={cn(
        'absolute right-0 z-10 flex flex-col gap-2 rounded border bg-white px-3 py-5',
        show ? 'block' : 'hidden',
      )}
      onClick={() => {}}
    >
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <p>生徒名</p>
          {SortSelect('name')}
        </div>
        <div className='flex items-center justify-between'>
          <p>日時</p>
          {SortSelect('date')}
        </div>
        <div className='flex items-center justify-between'>
          <p>面談回数</p>
          {SortSelect('count')}
        </div>
      </div>
      <div className='mt-5 flex justify-center'>
        <Button onClick={handleClickSort}>並べ替え</Button>
      </div>
    </div>
  )
}
