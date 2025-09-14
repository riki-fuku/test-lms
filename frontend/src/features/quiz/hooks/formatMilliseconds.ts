export default function formatMilliseconds(ms: number) {
  if (ms < 0) {
    return '00:00.00'
  }

  const msec = Math.floor((ms % 1000) / 10)
  const seconds = `0${Math.floor(ms / 1000) % 60}`.slice(-2)
  const minutes = `0${Math.floor(ms / 60000) % 60}`.slice(-2)

  return `${minutes}:${seconds}.${msec.toString().padStart(2, '0')}`
}
