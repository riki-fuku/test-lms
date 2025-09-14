import { useEffect, useRef } from 'react'

type AudioType = {
  start: HTMLAudioElement | null
  correct: HTMLAudioElement | null
  incorrect: HTMLAudioElement | null
  finish: HTMLAudioElement | null
  next: HTMLAudioElement | null
}

export const useQuizSounds = () => {
  const soundsRef = useRef<AudioType>({
    start: null,
    correct: null,
    incorrect: null,
    finish: null,
    next: null,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      soundsRef.current.start = new Audio('/audio/quiz/start_sound.mp3')
      soundsRef.current.correct = new Audio('/audio/quiz/correct_sound.mp3')
      soundsRef.current.incorrect = new Audio('/audio/quiz/incorrect_sound.mp3')
      soundsRef.current.finish = new Audio('/audio/quiz/finish_sound.mp3')
      soundsRef.current.next = new Audio('/audio/quiz/next_sound.mp3')
    }
  }, [])

  return soundsRef.current
}
