import { HiPlus } from 'react-icons/hi'

type TaskAddProps = {
  type: 'sprint' | 'backlog'
  onClick: () => void
}

export default function TaskAdd({ type, onClick }: TaskAddProps) {
  return (
    <>
      <div className='inline-block'>
        <div
          className='flex h-12 cursor-pointer items-center px-2 text-form-gray'
          onClick={() => onClick()}
        >
          <HiPlus className='mr-1 size-5' />
          {type === 'sprint' ? 'スプリントにタスクを追加' : 'タスクを追加'}
        </div>
      </div>
    </>
  )
}
