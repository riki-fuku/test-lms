import type { StudyProgress } from '@/features/timerLog/types/StudyProgress'
import dayjs from 'dayjs'

export default function fetchStudyProgresses() {
  const progresses: StudyProgress[] = [...Array(90)].map((_, i) => {
    return {
      date: dayjs().add(i, 'd').format('YYYY年M月D日'),
      study_time: Math.floor(Math.random() * 25), // 0から24までの数値をランダムで出力
    }
  })
  return progresses
}
