import type { Graduate } from '@/features/user/components/student/CareerPathListItem'
import { useEffect, useState } from 'react'

export default function CareerPathChart(props: { graduates: Graduate[] }) {
  const [chartItems, setChartItems] = useState<{ tag: string; count: number }[]>([])
  const [maxCount, setMaxCount] = useState<number>(0)
  const { graduates } = props

  useEffect(() => {
    const flatTags = [...graduates.flatMap((graduate) => graduate.tags.flatMap((tag) => tag))]
    const Tags = new Set(flatTags)
    const chartItems = Array.from(Tags).map((tag) => {
      const count = flatTags.filter((flatTag) => flatTag === tag).length
      return { tag, count }
    })
    chartItems.sort((a, b) => b.count - a.count)
    setChartItems(chartItems)
    setMaxCount(Math.max(...chartItems.map((item) => item.count)))
  }, [])

  function Bar(props: { count: number }) {
    const width = Math.floor((props.count / maxCount) * 100)
    return (
      <div className='flex w-full gap-2.5'>
        <div
          className={`h-7 w-${width}/12 rounded bg-gradient-to-r from-sub-color to-main-color`}
          style={{ width: `${width}%` }}
        ></div>
        <p className='flex w-10 items-center'>
          {props.count}
          <span className='text-xs'>名</span>
        </p>
      </div>
    )
  }

  function BarChart() {
    return (
      <div className='flex flex-col gap-5 text-main-color'>
        {chartItems.map((item, index) => (
          <div key={index} className='flex items-center gap-2.5'>
            <div className='min-w-40 text-nowrap text-md'>{item.tag}</div>
            <Bar count={item.count} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-5'>
      <BarChart />
    </div>
  )
}
