'use client'

import Button from '@/components/ui/Button'
import InputSelect from '@/components/ui/InputSelect'
import deleteUserTask from '@/features/backlog/api/deleteUserTask'
import duplicateUserTasksFromTemplates from '@/features/backlog/api/duplicateUserTasksFromTemplates'
import restoreUserTasks from '@/features/backlog/api/restoreUserTasks'
import updateUserSprint from '@/features/backlog/api/updateUserSprint'
import updateUserTaskOrder from '@/features/backlog/api/updateUserTaskOrder'
import Backlog from '@/features/backlog/components/Backlog'
import Sprint from '@/features/backlog/components/Sprint'
import SprintHistoryTable from '@/features/backlog/components/SprintHistoryTable'
import TaskDetail from '@/features/backlog/components/TaskDetail'
import TaskItem from '@/features/backlog/components/TaskItem'
import TaskTrash from '@/features/backlog/components/TaskTrash'
import TotalProgress from '@/features/backlog/components/totalProgress/TotalProgress'
import { defaultTask } from '@/features/backlog/constants/defaultTask'
import useFetchLatestUserSprint from '@/features/backlog/hooks/useFetchLatestUserSprint'
import useFetchUserProjects from '@/features/backlog/hooks/useFetchUserProjects'
import useFetchUserSprints from '@/features/backlog/hooks/useFetchUserSprints'
import useFetchUserTasks from '@/features/backlog/hooks/useFetchUserTasks'
import type { Option } from '@/features/backlog/types/Option'
import { DONE } from '@/features/backlog/types/TaskStatus'
import { BUG } from '@/features/backlog/types/TaskType'
import type { UserProject } from '@/features/backlog/types/UserProject'
import { ACTIVE, CLOSED, type UserSprint } from '@/features/backlog/types/UserSprint'
import type { UserTask } from '@/features/backlog/types/UserTask'
import { useSnackbar } from '@/hooks/useSnackbar'
import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove } from '@dnd-kit/sortable'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

type PrevTasks = {
  backlogTasks: UserTask[]
  latestSprint: UserSprint
  historySprints: UserSprint[]
  activeColumn: string | null
}

type BacklogContainerProps = {
  isUser: boolean
  loginUser: boolean
  workspaceId: string
}

export default function BacklogContainer({
  isUser,
  loginUser,
  workspaceId,
}: BacklogContainerProps) {
  const { showSnackbar } = useSnackbar()
  const pathParams = useParams()
  const projectUserId = Array.isArray(pathParams.userId) ? pathParams.userId[0] : pathParams.userId
  const isMounted = useRef(false)
  const {
    data: allProjectsData,
    isLoading: allProjectsLoading,
    mutate: allProjectsMutate,
  } = useFetchUserProjects(
    workspaceId,
    projectUserId,
    {
      guardType: isUser ? 'user' : 'employee',
    },
    {
      revalidateOnFocus: false,
    },
  )
  const allProjects: UserProject[] = useMemo(() => {
    return allProjectsData ?? []
  }, [allProjectsData])
  const [userProjectOptions, setUserProjectOptions] = useState<Option[]>([])
  const [selectedUserProject, setSelectedUserProject] = useState<Option>({ value: '', label: '' })

  const {
    data: latestSprintData,
    isLoading: latestSprintLoading,
    mutate: latestSprintMutate,
  } = useFetchLatestUserSprint(workspaceId, projectUserId, selectedUserProject.value, {
    revalidateOnFocus: false,
  })
  const latestSprint: UserSprint | undefined = useMemo(() => {
    return latestSprintData
  }, [latestSprintData])

  const {
    data: historySprintsData,
    isLoading: historySprintsLoading,
    mutate: historySprintsMutate,
  } = useFetchUserSprints(
    workspaceId,
    projectUserId,
    selectedUserProject.value,
    { status: CLOSED },
    {
      revalidateOnFocus: false,
    },
  )
  const historySprints: UserSprint[] = useMemo(() => {
    return historySprintsData ?? []
  }, [historySprintsData])

  const {
    data: backlogTasksData,
    isLoading: backlogTasksLoading,
    mutate: backlogTasksMutate,
  } = useFetchUserTasks(
    workspaceId,
    projectUserId,
    selectedUserProject.value,
    {
      related: false,
      trashed: false,
    },
    {
      revalidateOnFocus: false,
    },
  )
  const backlogTasks: UserTask[] = useMemo(() => {
    return backlogTasksData ?? []
  }, [backlogTasksData])

  const {
    data: trashedTasksData,
    isLoading: trashedTasksLoading,
    mutate: trashedTasksMutate,
  } = useFetchUserTasks(
    workspaceId,
    projectUserId,
    selectedUserProject.value,
    {
      related: null,
      trashed: true,
    },
    {
      revalidateOnFocus: false,
    },
  )
  const trashedTasks: UserTask[] = useMemo(() => {
    return trashedTasksData ?? []
  }, [trashedTasksData])

  const [totalCount, setTotalCount] = useState<number>(0)
  const [completedCount, setCompletedCount] = useState<number>(0)
  const [bugCount, setBugCount] = useState<number>(0)
  const [averageCount, setAverageCount] = useState<number>(0)
  const [overlayTask, setOverlayTask] = useState<UserTask>()
  const [prevTasks, setPrevTasks] = useState<PrevTasks>()
  const [isDragProcess, setIsDragProcess] = useState<boolean>(false)
  const sensors = useSensors(
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  )
  const [isOpenTrash, setIsOpenTrash] = useState<boolean>(false)
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState<boolean>(false)
  const [taskDetailProps, setTaskDetailProps] = useState<{
    task: UserTask
    onSave: (task: UserTask) => void
  }>({
    task: defaultTask,
    onSave: () => null,
  })

  // プロジェクト整形
  useEffect(() => {
    if (!allProjects.length || !workspaceId || !loginUser || isMounted.current) {
      return
    }
    isMounted.current = true
    const projectOptions = convertUserProjectToOptions(allProjects)
    if (!projectOptions.length) return
    setUserProjectOptions(projectOptions)
    setSelectedUserProject(projectOptions[0])
  }, [allProjects, workspaceId, loginUser])

  // スプリント、タスク一覧をuseStateに格納
  const [displayLatestSprint, setDisplayLatestSprint] = useState<UserSprint>()
  useEffect(() => {
    setDisplayLatestSprint(latestSprint)
  }, [latestSprint])

  const [displayHistorySprints, setDisplayHistorySprints] = useState<UserSprint[]>([])
  useEffect(() => {
    setDisplayHistorySprints(historySprints)
  }, [historySprints])

  const [displayBacklogTasks, setDisplayBacklogTasks] = useState<UserTask[]>([])
  useEffect(() => {
    setDisplayBacklogTasks(backlogTasks)
  }, [backlogTasks])

  useEffect(() => {
    calcTotalProgress(displayLatestSprint?.userTasks ?? [], displayBacklogTasks, historySprints)
  }, [displayLatestSprint, displayBacklogTasks, historySprints])

  const calcTotalProgress = (
    sprintTasks: UserTask[],
    backlogTasks: UserTask[],
    sprintHistories: UserSprint[],
  ) => {
    const historyTasks: UserTask[] = sprintHistories.flatMap((history) => history.userTasks || [])
    const allTasks: UserTask[] = [...sprintTasks, ...backlogTasks, ...historyTasks]
    const totalSP = getTasksSp(allTasks)
    setTotalCount(totalSP)
    const bugCount = allTasks.filter((task) => task.type === BUG).length
    setBugCount(bugCount)
    const completedSP = getTasksSp(allTasks.filter((task) => task.status === DONE))
    setCompletedCount(completedSP)
    const average =
      getElapsedDate() === 0 ? completedSP : Math.round((completedSP / getElapsedDate()) * 10) / 10
    setAverageCount(average)
  }

  const duplicateUserTasks = async () => {
    if (!workspaceId || !projectUserId || !selectedUserProject) return
    try {
      await duplicateUserTasksFromTemplates(workspaceId, projectUserId, selectedUserProject.value)
      allProjectsMutate()
      refreshSprintsAndTasks()
      showSnackbar('タスクを複製しました', 'success')
    } catch (error) {
      console.error(error)
      showSnackbar('タスク複製に失敗しました', 'error')
    }
  }

  const isAssigned: () => boolean = () => {
    if (!loginUser || !selectedUserProject.value) return false
    const isAssigned = allProjects.find(
      (project) => project.id === selectedUserProject.value,
    )?.isAssigned

    return !!isAssigned
  }

  const getElapsedDate = () => {
    const today = new Date()
    const firstDate = displayLatestSprint?.startDate
      ? new Date(displayLatestSprint.startDate)
      : new Date()
    return Math.floor((today.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24))
  }

  const convertUserProjectToOptions = (userProjects: UserProject[]) => {
    const options: Option[] = userProjects.map((project) => ({
      label: project.name,
      value: project.id,
    }))
    return options
  }

  const getTasksSp = (tasks: UserTask[]) => {
    return tasks.reduce((acc, task) => acc + (task.estimate ?? 0), 0)
  }

  const handleUserProjectChange = (option: Option | null): void => {
    if (selectedUserProject === option) return
    if (!option) {
      setSelectedUserProject({ value: '', label: '' })
      return
    }
    setSelectedUserProject(option)
  }

  const handleOpenTrash = () => {
    setIsTaskDetailOpen(false)
    setIsOpenTrash(true)
  }

  const openTaskDetail = (task: UserTask, onSave: (task: UserTask) => void) => {
    if (!task) return
    setTaskDetailProps({
      task,
      onSave,
    })
    setIsTaskDetailOpen(true)
  }

  const softDeleteTask = async (deletedTask: UserTask) => {
    if (!workspaceId || !projectUserId || !selectedUserProject || !deletedTask) return
    try {
      await deleteUserTask(workspaceId, projectUserId, selectedUserProject.value, deletedTask.id, {
        force: false,
      })
      refreshSprintsAndTasks()
      showSnackbar('タスクを削除しました', 'success')
    } catch (error) {
      console.error(error)
      showSnackbar('タスクの削除に失敗しました', 'error')
    }
  }

  const hardDeleteTasks = async (taskIds: string[]) => {
    if (!workspaceId || !projectUserId || !selectedUserProject || !taskIds.length) return
    const requests = taskIds.map((id) =>
      deleteUserTask(workspaceId, projectUserId, selectedUserProject.value, id, { force: true }),
    )
    try {
      await Promise.all(requests)
      refreshSprintsAndTasks()
      showSnackbar('タスクを完全に削除しました', 'success')
    } catch (error) {
      console.error(error)
      showSnackbar('タスクの削除に失敗しました', 'error')
    }
  }

  const restoreTasks = async (taskIds: string[]) => {
    if (!workspaceId || !projectUserId || !selectedUserProject || !taskIds.length) return

    try {
      await restoreUserTasks(workspaceId, projectUserId, selectedUserProject.value, { taskIds })
      refreshSprintsAndTasks()
      showSnackbar('タスクを復元しました', 'success')
    } catch (error) {
      console.error(error)
      showSnackbar('タスクの復元に失敗しました', 'error')
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    if (isUser) return

    setIsDragProcess(true)
    const { active } = event
    const allHistoryTasks = displayHistorySprints.flatMap((sprint) => sprint.userTasks || [])
    const sprintTasks = displayLatestSprint?.userTasks ?? []
    const allTask = [...sprintTasks, ...displayBacklogTasks, ...allHistoryTasks]
    const task = allTask.find((task) => task.id === active.id)
    setOverlayTask(task)
    const activeId = String(active.id)
    const activeColumn = findColumn(activeId)
    setPrevTasks({
      backlogTasks: structuredClone(displayBacklogTasks),
      latestSprint: structuredClone(displayLatestSprint as UserSprint),
      historySprints: structuredClone(displayHistorySprints),
      activeColumn,
    })
  }

  const handleDragOver = (event: DragOverEvent) => {
    if (isUser) return

    if (prevTasks?.activeColumn === 'history') return
    const { active, over } = event
    const activeId = String(active.id)
    const overId = over ? String(over.id) : null
    const activeColumn = findColumn(activeId)
    const overColumn = findColumn(overId)
    if (!activeColumn || !overColumn || activeColumn === overColumn || overColumn === 'history') {
      return
    }
    moveTask(activeId, activeColumn)
  }

  const moveTask = (taskId: string, fromColumn: string) => {
    let updatedBacklogTasks = [...displayBacklogTasks]
    const latestSprintTasks = displayLatestSprint?.userTasks ?? []
    let updatedSprintTasks = [...latestSprintTasks]

    if (fromColumn === 'backlog') {
      const task = displayBacklogTasks.find((task) => String(task.id) === taskId)
      updatedBacklogTasks = displayBacklogTasks.filter((task) => String(task.id) !== taskId)
      if (task) updatedSprintTasks = latestSprintTasks.concat(task)
    }
    if (fromColumn === 'sprint') {
      const task = latestSprintTasks.find((task) => String(task.id) === taskId)
      updatedSprintTasks = latestSprintTasks.filter((task) => String(task.id) !== taskId)
      if (task) updatedBacklogTasks = displayBacklogTasks.concat(task)
    }

    setDisplayBacklogTasks(updatedBacklogTasks)
    setDisplayLatestSprint({
      ...(displayLatestSprint as UserSprint),
      userTasks: updatedSprintTasks,
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if (isUser) return

    setOverlayTask(undefined)
    const { active, over } = event
    const activeId = String(active.id)
    const overId = over ? String(over.id) : null
    const activeColumn = findColumn(activeId)
    const overColumn = findColumn(overId)
    if (
      !activeColumn ||
      !overColumn ||
      ((activeColumn === 'backlog' || activeColumn === 'sprint') && overColumn === 'history') ||
      (activeColumn === 'history' && overColumn !== 'history')
    ) {
      rollbackAllTasks()
      return
    }
    if (activeColumn === 'backlog') {
      if (overId === 'backlog') {
        sendUpdateOrderRequest(activeId, null, 0)
      } else {
        const activeIndex = displayBacklogTasks.findIndex((task) => String(task.id) === activeId)
        const overIndex = displayBacklogTasks.findIndex((task) => String(task.id) === overId)
        if (activeIndex !== overIndex || prevTasks?.activeColumn !== activeColumn) {
          const newBacklogTasks = arrayMove(displayBacklogTasks, activeIndex, overIndex)
          setDisplayBacklogTasks(newBacklogTasks)
          let newOrder
          if (prevTasks?.activeColumn === activeColumn) {
            newOrder = displayBacklogTasks[overIndex]?.order ?? 0
          } else {
            newOrder = prevTasks?.backlogTasks[overIndex - 1]?.order ?? 0
            if (overIndex !== 0) {
              newOrder++
            }
          }
          sendUpdateOrderRequest(activeId, null, newOrder)
        } else {
          setIsDragProcess(false)
        }
      }
    } else if (activeColumn === 'sprint') {
      if (overId === 'sprint') {
        sendUpdateOrderRequest(activeId, displayLatestSprint?.id ?? null, 0)
      } else {
        const latestSprintTasks = displayLatestSprint?.userTasks ?? []
        const activeIndex = latestSprintTasks.findIndex((task) => String(task.id) === activeId)
        const overIndex = latestSprintTasks.findIndex((task) => String(task.id) === overId)
        if (activeIndex !== overIndex || prevTasks?.activeColumn !== activeColumn) {
          const newSprintTasks = arrayMove(latestSprintTasks, activeIndex, overIndex)
          setDisplayLatestSprint({
            ...(displayLatestSprint as UserSprint),
            userTasks: newSprintTasks,
          })
          let newOrder
          if (prevTasks?.activeColumn === activeColumn) {
            newOrder = latestSprintTasks[overIndex]?.order ?? 0
          } else {
            const prevLatestSprintTasks = prevTasks?.latestSprint.userTasks ?? []
            newOrder = prevLatestSprintTasks[overIndex - 1]?.order ?? 0
            if (overIndex !== 0) {
              newOrder++
            }
          }
          sendUpdateOrderRequest(activeId, displayLatestSprint?.id ?? null, newOrder)
        } else {
          setIsDragProcess(false)
        }
      }
    } else if (activeColumn === 'history') {
      if (activeId !== overId) {
        let newOrder = -1
        let sprintId = null
        const newHistoriesData = displayHistorySprints.map((sprint) => {
          const activeIndex =
            sprint.userTasks?.findIndex((task) => String(task.id) === activeId) ?? -1
          const overIndex = sprint.userTasks?.findIndex((task) => String(task.id) === overId) ?? -1
          if (activeIndex !== -1 && sprint.userTasks) {
            newOrder = sprint.userTasks[overIndex]?.order ?? -1
            sprint.userTasks = arrayMove(sprint.userTasks ?? [], activeIndex, overIndex)
            sprintId = sprint.id
            return sprint
          } else {
            return sprint
          }
        })
        if (newOrder === -1 || !sprintId) {
          rollbackAllTasks()
          return
        }
        setDisplayHistorySprints(newHistoriesData)
        sendUpdateOrderRequest(activeId, sprintId, newOrder)
      } else {
        setIsDragProcess(false)
      }
    }
  }

  const rollbackAllTasks = () => {
    if (!prevTasks) return
    setDisplayLatestSprint(structuredClone(prevTasks.latestSprint))
    setDisplayBacklogTasks(structuredClone(prevTasks.backlogTasks))
    setDisplayHistorySprints(structuredClone(prevTasks.historySprints))
    setPrevTasks(undefined)
    setIsDragProcess(false)
  }

  const sendUpdateOrderRequest = async (
    taskId: string,
    userSprintId: string | null,
    order: number,
  ) => {
    if (!workspaceId || !projectUserId || !selectedUserProject) return
    const requestBody = {
      userSprintId,
      order,
    }
    try {
      await updateUserTaskOrder(
        workspaceId,
        projectUserId,
        selectedUserProject.value,
        taskId,
        requestBody,
      )
    } catch (error) {
      console.error(error)
      showSnackbar('並び替えに失敗しました', 'error')
    } finally {
      setIsDragProcess(false)
      refreshSprintsAndTasks()
    }
  }

  const findColumn = (id: string | null) => {
    if (!id) return null
    if (id === 'sprint' || id === 'backlog' || id === 'history') return id
    if (displayBacklogTasks.findIndex((task) => String(task.id) === id) !== -1) return 'backlog'
    if (displayLatestSprint?.userTasks?.findIndex((task) => String(task.id) === id) !== -1)
      return 'sprint'
    return 'history'
  }

  const handleStartSprint = async () => {
    if (!workspaceId || !projectUserId || !selectedUserProject || !displayLatestSprint) return
    try {
      await updateUserSprint(
        workspaceId,
        projectUserId,
        selectedUserProject.value,
        displayLatestSprint.id,
        {
          status: ACTIVE,
        },
      )
      refreshSprintsAndTasks()
      showSnackbar('スプリントを開始しました', 'success')
    } catch (error) {
      console.error(error)
      showSnackbar('スプリント開始に失敗しました', 'error')
    }
  }

  const handleEndSprint = async () => {
    if (!workspaceId || !projectUserId || !selectedUserProject || !displayLatestSprint) return
    try {
      await updateUserSprint(
        workspaceId,
        projectUserId,
        selectedUserProject.value,
        displayLatestSprint.id,
        {
          status: CLOSED,
        },
      )
      refreshSprintsAndTasks()
      showSnackbar('スプリントを終了しました', 'success')
    } catch (error) {
      console.error(error)
      showSnackbar('スプリント終了に失敗しました', 'error')
    }
  }

  const refreshSprintsAndTasks = () => {
    latestSprintMutate()
    historySprintsMutate()
    backlogTasksMutate()
    if (!isUser) trashedTasksMutate()
  }

  if (allProjectsLoading) return <div>Loading...</div>

  if (workspaceId && projectUserId && !allProjectsLoading && !allProjectsData?.length) {
    return <div>{isUser ? '取り組んでいる模擬案件はありません' : '模擬案件がありません'}</div>
  }

  return (
    <div className='flex flex-col gap-6 bg-white p-5'>
      {!isOpenTrash ? (
        <>
          <div className='flex items-center gap-4'>
            <div className='w-fit min-w-60 text-lg font-bold'>
              <InputSelect
                options={userProjectOptions}
                item={selectedUserProject ?? undefined}
                onChange={handleUserProjectChange}
              />
            </div>
            {!isAssigned() && !isUser && !!allProjects.length && (
              <Button onClick={duplicateUserTasks}>模擬案件を開始</Button>
            )}
          </div>
          {isAssigned() && (
            <>
              <TotalProgress
                completedSP={completedCount}
                totalSP={totalCount}
                AverageSP={averageCount}
                bugCount={bugCount}
                trashedTasks={isUser ? undefined : trashedTasks}
                openTrash={handleOpenTrash}
              />
              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <Sprint
                  workspaceId={workspaceId}
                  projectId={selectedUserProject.value}
                  sprint={displayLatestSprint}
                  isUser={isUser}
                  isDragProcess={isDragProcess}
                  onCreateUserTask={refreshSprintsAndTasks}
                  openTaskDetail={openTaskDetail}
                  closeTaskDetail={() => setIsTaskDetailOpen(false)}
                  onStartSprint={handleStartSprint}
                  onEndSprint={handleEndSprint}
                />
                <Backlog
                  workspaceId={workspaceId}
                  projectId={selectedUserProject.value}
                  tasks={displayBacklogTasks}
                  isDragProcess={isDragProcess}
                  onCreateUserTask={refreshSprintsAndTasks}
                  openTaskDetail={openTaskDetail}
                  closeTaskDetail={() => setIsTaskDetailOpen(false)}
                />
                <SprintHistoryTable
                  workspaceId={workspaceId}
                  projectId={selectedUserProject.value}
                  sprints={displayHistorySprints}
                  isDragProcess={isDragProcess}
                  onUpdateUserTask={refreshSprintsAndTasks}
                  openTaskDetail={openTaskDetail}
                  closeTaskDetail={() => setIsTaskDetailOpen(false)}
                />
                <DragOverlay
                  style={{ backgroundColor: 'white' }}
                  dropAnimation={{
                    sideEffects: defaultDropAnimationSideEffects({
                      styles: {
                        active: {},
                        dragOverlay: {
                          opacity: '0',
                        },
                      },
                    }),
                  }}
                >
                  {overlayTask && (
                    <TaskItem
                      task={overlayTask}
                      isHistory={prevTasks?.activeColumn === 'history' ? true : false}
                      isDragProcess={isDragProcess}
                      onClick={() => null}
                    />
                  )}
                </DragOverlay>
              </DndContext>
            </>
          )}
          {isTaskDetailOpen && (
            <TaskDetail
              workspaceId={workspaceId}
              projectId={selectedUserProject.value}
              task={taskDetailProps.task}
              isUser={isUser}
              onCancel={() => setIsTaskDetailOpen(false)}
              onSave={taskDetailProps.onSave}
              onSoftDeleteTask={softDeleteTask}
            />
          )}
        </>
      ) : (
        <TaskTrash
          workspaceId={workspaceId}
          projectId={selectedUserProject.value}
          isUser={isUser}
          tasks={trashedTasks}
          closeTrash={() => setIsOpenTrash(false)}
          onHardDelete={hardDeleteTasks}
          onRestore={restoreTasks}
        />
      )}
    </div>
  )
}
