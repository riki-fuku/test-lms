import type { DraftTimer } from '@/features/timer/types/DraftTimer'
import type { Timer } from '@/features/timer/types/Timer'

export type TimerEditorMobileProps = {
  timers: (Timer | DraftTimer)[]
  onClickedEditIcon: () => void
  onSave: (timers: (Timer | DraftTimer)[]) => void
  onCancelButton: () => void
}

export default function TimerEditorMobile(props: TimerEditorMobileProps) {
  // const { showSnackbar } = useSnackbar()
  // let userId: string | null = null
  // const { data } = useFetchMe()
  // if (data) userId = data.id
  // const [updateTimers, setUpdateTimers] = useState<(Timer | DraftTimer)[]>([])
  // useEffect(() => {
  //   setUpdateTimers(props.timers.map((timer) => timer))
  // }, [props.timers])
  // // 編集アイコンをクリックしたときの処理
  // function handleClickedEditIcon() {
  //   props.onClickedEditIcon()
  // }
  // // タイマーの時間を変更
  // function handleChangeTimer(index: number, value: number) {
  //   setUpdateTimers((prevTimers) =>
  //     prevTimers.map((timer, i) => (i === index ? { ...timer, minutes: value } : timer)),
  //   )
  // }
  // // タイマー追加
  // function handleAddTimer(newMinutes: number) {
  //   if (!userId) return null
  //   const newTimer: DraftTimer = {
  //     user_id: userId,
  //     minutes: newMinutes,
  //   }
  //   setUpdateTimers((prevTimers) => [...prevTimers, newTimer])
  // }
  // // 保存ボタンを押したときの処理
  // function handleSave() {
  //   const isValid = updateTimers.every((timer, i) => validation(timer, i))
  //   if (isValid) {
  //     props.onSave(updateTimers)
  //   }
  // }
  // // タイマー削除
  // function handleRemoveTimer(timer: Timer | DraftTimer, timerIndex: number) {
  //   setUpdateTimers(updateTimers.filter((_, index) => index !== timerIndex))
  // }
  // // キャンセルボタンを押したら元のタイマーに戻す
  // function handleCancelButton() {
  //   props.onCancelButton()
  //   setUpdateTimers(props.timers.map((timer) => timer))
  // }
  // // 保存時のバリデーション
  // function validation(timer: Timer | DraftTimer, index: number) {
  //   if (!timer.minutes) {
  //     showSnackbar('学習時間を入力してください', 'warning')
  //     return false
  //   }
  //   if (timer.minutes < 1) {
  //     showSnackbar('学習時間は1分以上で入力してください', 'warning')
  //     return false
  //   }
  //   const isTimerExists = updateTimers.some(
  //     (updateTimer, j) => updateTimer.minutes === timer.minutes && j !== index,
  //   )
  //   if (isTimerExists) {
  //     showSnackbar('同じ時間のタイマーは作成できません', 'warning')
  //     return false
  //   }
  //   return true
  // }
  // return (
  //   <>
  //     <div className='flex flex-col gap-5'>
  //       <div className='flex justify-between pr-3'>
  //         <p className='text-xl font-bold'>タイマーを編集</p>
  //         <div className='flex w-12 items-center justify-center' onClick={handleClickedEditIcon}>
  //           <RiPencilFill size={20} />
  //         </div>
  //       </div>
  //       <ul>
  //         {updateTimers.map((timer, index) => (
  //           <li
  //             key={index}
  //             className='flex items-center justify-between border-b border-border-primary p-3'
  //           >
  //             <p>
  //               <input
  //                 type='number'
  //                 min='0'
  //                 className='mr-1 w-16 rounded border border-border-primary text-center text-xl'
  //                 value={timer.minutes}
  //                 onChange={(e) => handleChangeTimer(index, Number(e.target.value))}
  //               />
  //               <label className='text-sm'>分</label>
  //             </p>
  //             <div
  //               className='flex size-12 items-center justify-center text-warn-red'
  //               onClick={() => handleRemoveTimer(timer, index)}
  //             >
  //               <BsTrash size={20} />
  //             </div>
  //           </li>
  //         ))}
  //       </ul>
  //       <div>
  //         <TimerAdd timers={updateTimers} onAddTimer={handleAddTimer} />
  //       </div>
  //       <div className='flex justify-center gap-5'>
  //         <Button className='h-12 flex-1' intent='secondary' onClick={handleCancelButton}>
  //           キャンセル
  //         </Button>
  //         <Button className='h-12 flex-1' onClick={handleSave}>
  //           保存
  //         </Button>
  //       </div>
  //     </div>
  //   </>
  // )
}
