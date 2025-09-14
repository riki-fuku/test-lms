import { useEffect, useRef } from 'react'

type AudioType = {
  finish: HTMLAudioElement | null
}

export const useTimerSounds = () => {
  const soundsRef = useRef<AudioType>({
    finish: null,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      soundsRef.current.finish = new Audio('/audio/timer/finish_sound.mp3')
    }
  }, [])

  return soundsRef.current
}
