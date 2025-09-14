import dayjs from '@/lib/dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export default function useDateTools() {
  // Dateが土曜日であるかを確認
  function isSaturday(value: Date | string): boolean {
    return dayjs(value).tz().toDate().getDay() === 6
  }

  // Dateが日曜日であるかを確認
  function isSunday(value: Date | string): boolean {
    return dayjs(value).tz().toDate().getDay() === 0
  }

  function isToday(value: Date): boolean {
    return dayjs(value).tz().isSame(dayjs.tz(), 'day')
  }

  function formatDate(value: Date | string, format = 'YYYY-MM-DD'): string {
    return dayjs(value).tz().format(format)
  }

  function formatDateTime(value: Date | string): string {
    return dayjs(value).tz().format('YYYY-MM-DD HH:mm')
  }

  function formatTime(value: Date | string): string {
    return dayjs(value).tz().format('HH:mm')
  }

  function getDayOfWeekJP(value: Date | string): string {
    return ['日', '月', '火', '水', '木', '金', '土'][dayjs(value).tz().toDate().getDay()]
  }

  function isSameDay(a: Date | string, b: Date | string) {
    return dayjs(a).tz().isSame(b, 'day')
  }

  function isSameDateTime(a: Date | string, b: Date | string) {
    return dayjs(a).tz().isSame(dayjs(b).tz(), 'day')
  }

  function getElapsedTime(date: Date) {
    const today = new Date()
    const elapsedYear = today.getFullYear() - date.getFullYear()
    if (elapsedYear > 1) {
      return `${elapsedYear} 年前`
    }
    const months =
      elapsedYear === 0
        ? today.getMonth() - date.getMonth()
        : today.getMonth() + 12 - date.getMonth()
    if (months > 0) {
      return `${months} ヶ月前`
    }
    const days = today.getDate() - date.getDate()
    if (days > 0) {
      return `${days} 日前`
    }
    const hours = today.getHours() - date.getHours()
    if (hours > 0) {
      return `${hours} 時間前`
    }
    const minutes = today.getMinutes() - date.getMinutes()
    return `${minutes} 分前`
  }

  function formatAdditionalMeetingDate(date: Date) {
    return dayjs(date).tz().format('YYYY年MM月DD日')
  }

  function getSprintFormattedDate(dateString: string | undefined) {
    if (!dateString) return ''
    return dayjs(dateString).tz().format('M月D日')
  }

  return {
    isSaturday,
    isSunday,
    isToday,
    formatDate,
    formatDateTime,
    formatTime,
    getDayOfWeekJP,
    isSameDay,
    isSameDateTime,
    getElapsedTime,
    formatAdditionalMeetingDate,
    getSprintFormattedDate,
  }
}
