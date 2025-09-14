import type { LocalStoragePrevCurriculum } from '@/features/curriculum/types/LocalStoragePrevCurriculum'
import { useEffect, useState } from 'react'

function usePreviousCurriculum() {
  const [prevCurriculum, setPrevCurriculum] = useState<LocalStoragePrevCurriculum | null>(null)

  useEffect(() => {
    const getPreviousStudyData = localStorage.getItem('prev_study_curriculum')
    setPrevCurriculum(getPreviousStudyData ? JSON.parse(getPreviousStudyData) : null)
  }, [])

  return prevCurriculum
}

export default usePreviousCurriculum
