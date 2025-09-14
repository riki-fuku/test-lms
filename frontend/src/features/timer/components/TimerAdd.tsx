import { useState } from 'react'
import { HiPlus } from 'react-icons/hi'

export type TimerAddProps = {
  onAdd: (value: number) => boolean
}

export default function TimerAdd({ onAdd }: TimerAddProps) {
  // 追加UIの表示・非表示
  const [canAdd, setCanAdd] = useState(false)
  const [minutes, setMinutes] = useState<number>(0)

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (onAdd(minutes)) {
      setCanAdd(false)
    }
  }

  return (
    <>
      {!canAdd && (
        <div
          className='flex cursor-pointer items-center px-3 text-form-gray'
          onClick={() => setCanAdd(true)}
        >
          <div className='flex items-center gap-2.5'>
            <HiPlus size={20} />
            <p>タイマーを追加</p>
          </div>
        </div>
      )}

      {canAdd && (
        <form className='flex justify-between' noValidate onSubmit={handleAdd}>
          <div className='flex'>
            <input
              type='number'
              min='0'
              className='mr-1 w-12 rounded border border-border-primary text-center font-bold'
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
            <label>分</label>
          </div>
          <button className='text-blue-500' type='submit'>
            追加
          </button>
        </form>
      )}
    </>
  )
}
