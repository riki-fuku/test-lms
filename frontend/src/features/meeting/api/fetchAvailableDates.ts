import type { AvailableDate } from '@/features/meeting/types/AvailableDate'
import dayjs from '@/lib/dayjs'

// コーチアカウントに対して予約可能な日時を取得する関数
export default function fetchAvailableDates(): AvailableDate[] {
  // dayjsを使用してランダムな時間を生成する関数
  function randomTime(date: Date) {
    return dayjs(date)
      .hour(Math.floor(Math.random() * (24 - 8 + 1)) + 8) // 8時~24時の間でランダムに生成
      .minute(Math.floor(Math.random() * 2) * 30) // 0分と30分のみでランダムに生成
      .second(0)
      .millisecond(0)
  }

  // 初回面談可能日のダミーオブジェクト。本日の２日後から７日間をBEで抽出して受け取る想定。
  const baseDate = dayjs().add(2, 'day')
  const meetingDates = Array.from({ length: 7 }, (_, i) => {
    const date = baseDate.add(i, 'day').toDate()
    return {
      date: {
        value: date,
        times: Array.from({ length: Math.random() * 12 * 2 }, (_, j) =>
          randomTime(date).toDate(),
        ).sort((a, b) => a.getTime() - b.getTime()),
      },
    }
  })

  return meetingDates
}
