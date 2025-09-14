'use client'

import updateOrCreate from '@/features/userExam/api/updateOrCreate'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useState } from 'react'

type ScoreInputProps = {
  workspaceId: string
  initialScore: string
  userExamID: string
  examID: string
}

export default function ScoreInput({
  workspaceId,
  initialScore,
  userExamID,
  examID,
}: ScoreInputProps) {
  const formattedInitialScore = formatScore(initialScore)
  const [score, setScore] = useState(formattedInitialScore)
  const { showError, showSuccess } = useSnackbar()

  function formatScore(score: string) {
    if (score === '0') {
      return score
    }
    return score.replace(/^0+(?!\.)|\.0+$/g, '').replace(/(\.\d*?[1-9])0+$/, '$1')
  }

  const handleUpdateScore = async (examId: string, userId: string, score: string) => {
    try {
      await updateOrCreate(workspaceId, { examId, userId, score })
      showSuccess('スコアの登録に成功しました')
    } catch (error) {
      showError('スコアの登録に失敗しました')
      setScore(formattedInitialScore)
    }
  }

  return (
    <>
      <input
        value={score}
        onChange={(e) => {
          setScore(formatScore(e.target.value))
        }}
        onBlur={() => handleUpdateScore(examID, userExamID, score)}
        type='text'
        className='w-14 text-center'
      />
      <span className='text-sm'>%</span>
    </>
  )
}
