import Button from '@/components/ui/Button'
import deleteTimers from '@/features/timer/api/deleteTimers'
import updateOrCreateTimers from '@/features/timer/api/updateOrCreateTimers'
import TimerAdd from '@/features/timer/components/TimerAdd'
import useFetchMyTimers from '@/features/timer/hooks/useFetchMyTimers'
import type { DraftTimer } from '@/features/timer/types/DraftTimer'
import type { Timer } from '@/features/timer/types/Timer'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useUserStore } from '@/store/user-store'
import { useState } from 'react'
import { GoPencil } from 'react-icons/go'
import { LiaTrashAlt } from 'react-icons/lia'

export type TimerEditorProps = {
  onClickEditIcon: () => void
  onCancelButton: () => void
  onSave: () => void
}

export default function TimerEditor({ onClickEditIcon, onCancelButton, onSave }: TimerEditorProps) {
  const { showSnackbar } = useSnackbar()

  const user = useUserStore((state) => state.user)
  const { data, mutate } = useFetchMyTimers()
  const timers = data ?? []

  const [draftTimers, setDraftTimers] = useState<(Timer | DraftTimer)[]>(timers)

  // 編集アイコンをクリックしたときの処理
  const handleClickedEditIcon = () => {
    onClickEditIcon()
  }

  // タイマーの時間を変更
  const handleChangeTimer = (index: number, value: number) => {
    setDraftTimers((prev) =>
      prev.map((timer, i) => (i === index ? { ...timer, minutes: value } : timer)),
    )
  }

  // タイマー追加
  const handleAddTimer = (minutes: number): boolean => {
    if (!user) return false

    const newTimer: DraftTimer = {
      user_id: user.id,
      minutes,
    }

    if (!validationTimer(newTimer)) {
      return false
    }

    setDraftTimers((prev) => [...prev, newTimer])
    return true
  }

  // 保存ボタンを押したときの処理
  const handleSave = async () => {
    const promises = []
    if (!user) return console.error('ユーザーが存在しません')

    const uniqueMinutes = new Set(draftTimers.map((timer) => timer.minutes))
    if (uniqueMinutes.size !== draftTimers.length) {
      showSnackbar('同じ時間のタイマーは作成できません', 'warning')
      return
    }

    // 削除されたタイマーを取得
    const deletedTimers = timers.filter(
      (timer) => !draftTimers.some((dTimer) => 'id' in dTimer && dTimer.id === timer.id),
    )
    const deletedTimerIds = deletedTimers.map((timer) => timer.id)
    if (deletedTimerIds.length > 0) {
      promises.push(deleteTimers({ timerIds: deletedTimerIds }))
    }

    if (draftTimers.length > 0) {
      promises.push(
        updateOrCreateTimers({
          timers: draftTimers,
          userId: user.id,
        }),
      )
    }

    await Promise.all(promises)

    showSnackbar('タイマーを更新しました', 'success')
    mutate()
    onSave()
  }

  // タイマー削除
  const handleRemoveTimer = (timer: Timer | DraftTimer, timerIndex: number) => {
    setDraftTimers(draftTimers.filter((_, index) => index !== timerIndex))
  }

  // キャンセルボタンを押したら元のタイマーに戻す
  const handleCancelButton = () => {
    onCancelButton()
    setDraftTimers(timers)
  }

  const validationTimer = (timer: Timer | DraftTimer) => {
    if (!timer.minutes || timer.minutes < 1) {
      showSnackbar('学習時間を入力してください', 'warning')
      return false
    }

    if (draftTimers.map((t) => t.minutes).includes(timer.minutes)) {
      showSnackbar('同じ時間のタイマーは作成できません', 'warning')
      return false
    }

    if (timer.minutes > 60) {
      showSnackbar('タイマーは60分以内で設定してください', 'warning')
      return false
    }

    if (timer.minutes % 1 !== 0) {
      showSnackbar('タイマーは整数値で設定してください', 'warning')
      return false
    }

    return true
  }

  return (
    <>
      <div className='flex flex-col gap-5 p-5'>
        <div className='flex justify-between'>
          <p className='font-bold'>タイマーを編集</p>
          <button onClick={handleClickedEditIcon}>
            <GoPencil color='blue' />
          </button>
        </div>
        <ul>
          {draftTimers.map((timer, index) => (
            <li
              key={index}
              className='flex items-center justify-between border-b border-border-primary py-3'
            >
              <p>
                <input
                  type='number'
                  min='0'
                  className='mr-1 w-12 rounded border border-border-primary text-center font-bold'
                  value={timer.minutes}
                  onChange={(e) => handleChangeTimer(index, Number(e.target.value))}
                />
                <label className='text-sm'>分</label>
              </p>
              <button onClick={() => handleRemoveTimer(timer, index)}>
                <LiaTrashAlt color='red' />
              </button>
            </li>
          ))}
        </ul>

        <TimerAdd onAdd={handleAddTimer} />

        <div className='flex justify-between'>
          <Button onClick={handleSave} size='sm'>
            保存
          </Button>
          <Button intent='secondary' onClick={handleCancelButton} size='sm'>
            キャンセル
          </Button>
        </div>
      </div>
    </>
  )
}
