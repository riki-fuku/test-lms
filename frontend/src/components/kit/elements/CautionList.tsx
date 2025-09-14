interface CautionListProps {
  title: string
  items: string[]
}

export function CautionList({ title, items }: CautionListProps) {
  return (
    <div className='rounded-md border-3 border-bg-primary p-2'>
      <h1 className='text-lg font-bold text-danger'>{title}</h1>
      <ol className='list-decimal pl-5'>
        {items.map((item, index) => (
          <li className='text-danger' key={index}>
            {item}
          </li>
        ))}
      </ol>
    </div>
  )
}
