import InputRadio from '@/components/ui/InputRadio'

type TaskProps = {
  message: string
  todos: string[]
}

export default function Task({ message, todos }: TaskProps) {
  const handleClick = (checked: boolean, todo: string) => {}

  return (
    <div className='flex flex-col gap-5'>
      <div className='border-b pb-2.5'>
        <p>{message}</p>
      </div>
      {todos.map((todo, index) => (
        <InputRadio key={index} label={todo} onClick={(checked) => handleClick(checked, todo)} />
      ))}
    </div>
  )
}
