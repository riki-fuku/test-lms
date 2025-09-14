import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { SiChartdotjs } from 'react-icons/si'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

type RadarChartProps = {
  data: number[]
}

export default function RadarChart(props: RadarChartProps) {
  const data = {
    labels: [
      'コミュニケーション能力',
      '自己管理能力',
      '技術力',
      '論理的思考力',
      'ITに関する知識',
      '自己解決力',
    ],
    datasets: [
      {
        data: props.data,
        backgroundColor: 'rgba(50, 140, 230, 0.3)',
        borderWidth: 0,
        pointRadius: 0,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    layout: {
      padding: 0,
    },
    scales: {
      r: {
        min: 0,
        max: 5,
        ticks: {
          display: false,
          stepSize: 1,
          count: 6,
        },
        grid: {
          lineWidth: 1,
          color: '#efefef',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className='h-full'>
      <div className='flex items-center gap-1'>
        <SiChartdotjs size={20} />
        <p className='font-bold'>カルテデータ</p>
      </div>
      <div className='h-64'>
        <Radar data={data} options={options} />
      </div>
    </div>
  )
}
