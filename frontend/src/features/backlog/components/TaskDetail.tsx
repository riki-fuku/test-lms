import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Image from '@/components/ui/Image'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import type { CreateUserTaskCommentBody } from '@/features/backlog/api/createUserTaskComment'
import createUserTaskComment from '@/features/backlog/api/createUserTaskComment'
import TaskCommentList from '@/features/backlog/components/TaskCommentList'
import TaskStatusSelect from '@/features/backlog/components/TaskStatusSelect'
import TaskTypeSelect from '@/features/backlog/components/TaskTypeSelect'
import { defaultTask } from '@/features/backlog/constants/defaultTask'
import { useFetchUserTask } from '@/features/backlog/hooks/useFetchUserTask'
import useFetchUserTaskStatuses from '@/features/backlog/hooks/useFetchUserTaskStatuses'
import useFetchUserTaskTypes from '@/features/backlog/hooks/useFetchUserTaskTypes'
import type { TaskStatus } from '@/features/backlog/types/TaskStatus'
import type { TaskType } from '@/features/backlog/types/TaskType'
import { BUG } from '@/features/backlog/types/TaskType'
import type { UserTask } from '@/features/backlog/types/UserTask'
import { getStatusName } from '@/features/backlog/utils/getStatusName'
import { getTypeName } from '@/features/backlog/utils/getTypeName'
import cn from '@/hooks/cn'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useEmployeeStore } from '@/store/employee-store'
import { useUserStore } from '@/store/user-store'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { BiSmile } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { GrImage } from 'react-icons/gr'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { RiQuestionFill, RiSendPlaneFill } from 'react-icons/ri'

type TaskDetailProps = {
  workspaceId: string
  projectId: string
  task: UserTask
  isUser: boolean
  isTrashed?: boolean
  onCancel: () => void
  onSave: (task: UserTask) => void
  onSoftDeleteTask?: (task: UserTask) => void
  onHardDelete?: (taskIds: string[]) => void
  onRestore?: (taskIds: string[]) => void
}

export default function TaskDetail({
  workspaceId,
  projectId,
  task,
  isUser,
  isTrashed,
  onCancel,
  onSave,
  onSoftDeleteTask,
  onHardDelete,
  onRestore,
}: TaskDetailProps) {
  const user = useUserStore((state) => state.user)
  const employee = useEmployeeStore((state) => state.employee)
  const loginUser = user ?? employee
  const pathParams = useParams()
  const projectUserId = Array.isArray(pathParams.userId) ? pathParams.userId[0] : pathParams.userId
  const [displayTask, setDisplayTask] = useState<UserTask>(task)
  const [commentTextarea, setCommentTextarea] = useState<string>('')
  const [isOpenSPDescription, setIsOpenSPDescription] = useState(false)
  const [isOpenDescription, setIsOpenDescription] = useState(false)
  const [isOpenComments, setIsOpenComments] = useState(false)
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const { data: taskStatusList } = useFetchUserTaskStatuses({
    revalidateOnFocus: false,
  })
  const { data: taskTypeList } = useFetchUserTaskTypes({
    revalidateOnFocus: false,
  })
  const { showSnackbar } = useSnackbar()

  const {
    data: taskData,
    isLoading: taskLoading,
    mutate: taskMutate,
  } = useFetchUserTask(workspaceId, projectUserId, projectId, task.id, {
    revalidateOnFocus: false,
  })
  const taskOrigin: UserTask = useMemo(() => {
    return taskData ?? []
  }, [taskData])

  useEffect(() => {
    if (taskLoading || task.id === defaultTask.id) {
      return
    }
    setDisplayTask(taskOrigin)
  }, [taskOrigin])

  // const getElapsedTime = (date: string) => {
  //   const today = new Date()
  //   const actionDate = new Date(date)
  //   const elapsedYear = today.getFullYear() - actionDate.getFullYear()
  //   if (elapsedYear > 1) {
  //     return `${elapsedYear} 年前`
  //   }
  //   const months =
  //     elapsedYear === 0
  //       ? today.getMonth() - actionDate.getMonth()
  //       : today.getMonth() + 12 - actionDate.getMonth()
  //   if (months > 0) {
  //     return `${months} ヶ月前`
  //   }
  //   const days = today.getDate() - actionDate.getDate()
  //   if (days > 0) {
  //     return `${days} 日前`
  //   }
  //   const hours = today.getHours() - actionDate.getHours()
  //   if (hours > 0) {
  //     return `${hours} 時間前`
  //   }
  //   const minutes = today.getMinutes() - actionDate.getMinutes()
  //   return `${minutes} 分前`
  // }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayTask({ ...displayTask, summary: e.target.value })
  }

  const handleChangeSp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayTask({ ...displayTask, estimate: Number(e.target.value) })
  }

  const handleChangeType = (taskType: TaskType | null) => {
    if (isUser) {
      setDisplayTask({ ...displayTask, type: 2 })
    } else if (taskType) {
      setDisplayTask({ ...displayTask, type: taskType.value })
    }
  }

  const handleChangeStatus = (taskStatus: TaskStatus) => {
    setDisplayTask({ ...displayTask, status: taskStatus.value })
  }

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDisplayTask({ ...displayTask, description: e.target.value })
  }

  const handleSaveClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isSaving) return
    if (!displayTask.summary) {
      showSnackbar('タイトルを入力してください', 'warning')
      return
    }
    setIsSaving(true)
    await onSave(displayTask)
    setIsSaving(false)
  }

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onCancel()
  }

  const handleChangeCommentTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentTextarea(e.target.value)
  }

  const handleClickTrash = async () => {
    if (!onSoftDeleteTask) return
    await onSoftDeleteTask(task)
    onCancel()
  }

  const handleDeleteClick = async () => {
    if (!onHardDelete) return
    await onHardDelete([task.id])
    onCancel()
  }

  const handleRestoreClick = async () => {
    if (!onRestore) return
    await onRestore([task.id])
    onCancel()
  }

  const handleClickSendPlane = async () => {
    if (isPostingComment || !commentTextarea || !loginUser || !projectId) return
    setIsPostingComment(true)
    const requestBody: CreateUserTaskCommentBody = {
      content: commentTextarea,
      guardType: isUser ? 'user' : 'employee',
    }
    try {
      await createUserTaskComment(workspaceId, projectUserId, projectId, task.id, requestBody)
      setCommentTextarea('')
      taskMutate()
      showSnackbar('コメントを作成しました', 'success')
    } catch (error) {
      showSnackbar('コメント作成に失敗しました', 'error')
      console.error(error)
    } finally {
      setIsPostingComment(false)
    }
  }

  if (taskLoading && task.id !== defaultTask.id)
    return (
      <div className='fixed right-0 top-14 z-10 flex h-full w-96 border bg-white px-5 py-10'>
        ...loading
      </div>
    )

  return (
    <div className='fixed right-0 top-14 z-10 flex h-full w-96 flex-col gap-8 overflow-y-scroll border bg-white px-5 py-10'>
      <>
        <IoClose
          className='absolute right-3 top-3 size-8 cursor-pointer text-text-secondary'
          onClick={onCancel}
        />
        <form className='flex w-full flex-col gap-5'>
          <Input
            className='h-12 w-full border-none text-lg font-bold'
            value={displayTask.summary}
            placeholder='タスクのタイトルを入力'
            onChange={handleChangeTitle}
          />
          <div className='flex flex-col gap-2.5'>
            <p className='text-md text-text-primary'>タイプ</p>
            <TaskTypeSelect
              className='rounded border'
              selectedType={{
                value: displayTask.type,
                label: getTypeName(taskTypeList, displayTask.type),
              }}
              onChange={handleChangeType}
            />
          </div>
          <div className='flex flex-col gap-2.5'>
            <div className='relative flex items-center gap-2.5 text-md'>
              <p>SP</p>
              <RiQuestionFill
                className='text-text-secondary'
                onMouseEnter={() => setIsOpenSPDescription(true)}
                onMouseLeave={() => setIsOpenSPDescription(false)}
              />
              {isOpenSPDescription && (
                <div className='absolute left-0 top-7 z-10 w-full border bg-bg-primary p-2 text-md leading-4'>
                  SP（ストーリーポイント）は工数の見積もりをする上で重要な役割を果たします。コーチと相談の上で入力しましょう
                </div>
              )}
            </div>
            <Input
              className='h-12 w-full'
              value={String(displayTask.estimate)}
              readonly={isUser}
              placeholder='SPを入力'
              onChange={handleChangeSp}
            />
          </div>
          <div className='flex flex-col gap-2.5'>
            <p className='text-md text-text-primary'>ステータス</p>
            <TaskStatusSelect
              className='rounded border'
              selectedStatus={{
                value: displayTask.status,
                label: getStatusName(taskStatusList, displayTask.status),
              }}
              readonly={false}
              onChange={handleChangeStatus}
            />
          </div>
          <div className='flex flex-col gap-2.5'>
            <div className='w-content relative flex items-center gap-2.5 text-md'>
              <p>説明</p>
              <RiQuestionFill
                className='text-text-secondary'
                onMouseEnter={() => setIsOpenDescription(true)}
                onMouseLeave={() => setIsOpenDescription(false)}
              />
              {isOpenDescription && (
                <div className='absolute left-0 top-7 z-10 w-full border bg-bg-primary p-2 text-md leading-4'>
                  説明はタスクにおける決定事項やタスクの詳細内容をメモする場所です。
                </div>
              )}
            </div>
            <Textarea
              className='h-48 w-full text-sm'
              placeholder='このタスクの内容を入力'
              value={displayTask.description ? displayTask.description : undefined}
              readonly={isUser}
              onChange={handleChangeDescription}
            />
          </div>
          <div className='w-full border-b'></div>
          {isTrashed !== true ? (
            <div className='flex items-center gap-2'>
              <Button
                className='h-12 w-full'
                size='sm'
                intent='secondary'
                onClick={handleCancelClick}
              >
                キャンセル
              </Button>
              <Button
                className='h-12 w-full'
                size='sm'
                onClick={handleSaveClick}
                disabled={isSaving}
              >
                保存
              </Button>
              {!isUser && task.type === BUG ? (
                <div className='flex w-full items-center justify-end pr-3'>
                  <BsTrash
                    className='cursor-pointer'
                    size={20}
                    color='red'
                    onClick={handleClickTrash}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Button
                type='button'
                className='h-12 w-full'
                size='sm'
                intent='secondary'
                onClick={handleDeleteClick}
              >
                完全に削除
              </Button>
              <Button type='button' className='h-12 w-full' size='sm' onClick={handleRestoreClick}>
                復元する
              </Button>
            </div>
          )}
        </form>
        <div className='w-full border-b'></div>

        <p className='text-lg font-bold'>コメント</p>
        <div>
          <div>
            {displayTask.comments && (
              <div
                className={cn('mb-4 flex cursor-pointer items-center gap-2.5')}
                onClick={() => setIsOpenComments(!isOpenComments)}
              >
                {displayTask.comments.length >= 3 ? (
                  <p>過去{displayTask.comments.length}件のコメントを表示</p>
                ) : (
                  <p>コメント</p>
                )}
                {isOpenComments ? (
                  <IoIosArrowUp className='size-4 stroke-2' />
                ) : (
                  <IoIosArrowDown className='size-4 stroke-2' />
                )}
              </div>
            )}
            {isOpenComments && <TaskCommentList comments={displayTask.comments} />}
            <div className='flex gap-2'>
              <Avatar className='bg-white' size='xs'>
                {loginUser?.avatar ? (
                  <Image src={loginUser?.avatar} alt='Avatar' fill />
                ) : (
                  <FaUserCircle className='size-full fill-text-secondary text-weakBlack' />
                )}
              </Avatar>
              <p className='text-sm'>{loginUser?.name ?? ''}</p>
            </div>
          </div>
          <div>
            <Textarea
              className='h-24 border-none text-sm'
              placeholder='タスクへのコメントを入力して下さい。'
              value={commentTextarea}
              onChange={handleChangeCommentTextarea}
            />
          </div>

          <div className='flex items-center justify-between border-b p-4'>
            <div className='flex items-center gap-8'>
              <GrImage className='size-5 text-text-secondary' />
              <BiSmile className='size-5 text-text-secondary' />
            </div>
            <RiSendPlaneFill
              className='size-5 cursor-pointer text-main-color'
              onClick={handleClickSendPlane}
            />
          </div>
        </div>
      </>
    </div>
  )
}
