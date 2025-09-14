import { useEffect, useRef, useState } from 'react'

import ButtonFilter from '@/components/ui/ButtonFilter'
import ButtonSort from '@/components/ui/ButtonSort'
import InputSearch from '@/components/ui/InputSearch'
import createUserTask from '@/features/backlog/api/createUserTask'
import FilterDialog from '@/features/backlog/components/FilterDialog'
import SortDialog from '@/features/backlog/components/SortDialog'
import TaskAdd from '@/features/backlog/components/TaskAdd'
import TaskList from '@/features/backlog/components/TaskList'
import { defaultTask } from '@/features/backlog/constants/defaultTask'
import type { TaskFilterOptions } from '@/features/backlog/types/TaskFilterOptions'
import type { TaskSortOptions } from '@/features/backlog/types/TaskSortOptions'
import type { UserTask } from '@/features/backlog/types/UserTask'
import cn from '@/hooks/cn'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useParams } from 'next/navigation'

const defaultFilterParameters: TaskFilterOptions = {
  taskName: null,
  taskType: null,
  sp: null,
}

const defaultSortParameters: TaskSortOptions = {
  taskName: null,
  taskType: null,
  sp: null,
  id: null,
}

type BacklogProps = {
  workspaceId: string
  projectId: string
  tasks: UserTask[]
  isDragProcess: boolean
  onCreateUserTask: () => void
  openTaskDetail: (task: UserTask, onSave: (task: UserTask) => void) => void
  closeTaskDetail: () => void
}

export default function Backlog({
  workspaceId,
  projectId,
  tasks,
  isDragProcess,
  onCreateUserTask,
  openTaskDetail,
  closeTaskDetail,
}: BacklogProps) {
  const { showSnackbar } = useSnackbar()
  const [filteredAndSortedBacklog, setFilteredAndSortedBacklog] = useState<UserTask[]>([])
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [isSortDialogOpen, setIsSortDialogOpen] = useState(false)
  const [isFilterActive, setIsFilterActive] = useState(false)
  const [isSortActive, setIsSortActive] = useState(false)
  const [isSortChecked, setIsSortChecked] = useState(false)
  const [filterParameters, setFilterParameters] =
    useState<TaskFilterOptions>(defaultFilterParameters)
  const [sortParameters, setSortParameters] = useState<TaskSortOptions>(defaultSortParameters)
  const [keyword, setSearchString] = useState('')
  const [displayTasks, setDisplayTasks] = useState<UserTask[]>([])
  const [taskCount, setTaskCount] = useState(0)
  const [searchBacklogResult, setSearchBacklogResult] = useState<UserTask[]>([])
  const pathParams = useParams()
  const projectUserId = Array.isArray(pathParams.userId) ? pathParams.userId[0] : pathParams.userId
  const [isCreating, setIsCreating] = useState<boolean>(false)

  const filterDialogRef = useRef(null)
  useOutsideClick(filterDialogRef, () => setIsFilterDialogOpen(false))

  const sortDialogRef = useRef(null)
  useOutsideClick(sortDialogRef, () => setIsSortDialogOpen(false))

  useEffect(() => {
    let backlogTasks = displayTasks

    backlogTasks = filterTasks(filterParameters, backlogTasks)
    backlogTasks = sortTasks(sortParameters, backlogTasks)
    backlogTasks = searchTasks(keyword, backlogTasks)

    setFilteredAndSortedBacklog(backlogTasks)
    keyword && setSearchBacklogResult(backlogTasks)
  }, [filterParameters, sortParameters, keyword, displayTasks])

  useEffect(() => {
    const isFilterActive = Object.values(filterParameters).some((filter) => filter)
    setIsFilterActive(isFilterActive)
  }, [filterParameters])

  useEffect(() => {
    const isSortActive = Object.entries(sortParameters).some(
      ([key, value]) => key !== 'id' && value,
    )
    setIsSortActive(isSortActive)
  }, [sortParameters])

  useEffect(() => {
    setDisplayTasks(tasks)
    setTaskCount(tasks.length)
  }, [tasks])

  useEffect(() => {
    displayTasks && setTaskCount(displayTasks.length)
  }, [displayTasks])

  const filterTasks = (filterParameters: TaskFilterOptions, tasks: UserTask[]) => {
    return [...tasks].filter((task) => {
      return (
        (filterParameters.taskName ? task.summary.includes(filterParameters.taskName) : true) &&
        (filterParameters.taskType !== null
          ? filterParameters.taskType.value === task.type
          : true) &&
        (filterParameters.sp !== null ? task.estimate === filterParameters.sp : true)
      )
    })
  }

  const sortTasks = (sortParameters: TaskSortOptions, tasks: UserTask[]) => {
    const sortedTasks = [...tasks]

    sortedTasks.sort((a, b) => {
      switch (sortParameters.taskName) {
        case '昇順':
          return a.summary.localeCompare(b.summary)
        case '降順':
          return b.summary.localeCompare(a.summary)
        default:
          return 0
      }
    })

    sortedTasks.sort((a, b) => {
      switch (sortParameters.sp) {
        case '昇順':
          return (a.estimate ?? 0) - (b.estimate ?? 0)
        case '降順':
          return (b.estimate ?? 0) - (a.estimate ?? 0)
        default:
          return 0
      }
    })

    sortedTasks.sort((a, b) => {
      switch (sortParameters.taskType) {
        case '昇順':
          return a.type - b.type
        case '降順':
          return b.type - a.type
        default:
          return 0
      }
    })

    // sortedTasks.sort((a, b) => {
    //   switch (sortParameters.id) {
    //     case '昇順':
    //       return a.id - b.id
    //     case '降順':
    //       return b.id - a.id
    //     default:
    //       return 0
    //   }
    // })

    return sortedTasks
  }

  const searchTasks = (keyword: string, tasks: UserTask[]) => {
    return tasks.filter((task) => task.summary.includes(keyword))
  }

  const addTask = async (task: UserTask) => {
    if (isCreating) return
    setIsCreating(true)
    const requestBody = {
      userSprintId: null,
      status: task.status,
      type: task.type,
      summary: task.summary,
      description: task.description,
      estimate: task.estimate,
      order: null,
    }
    try {
      await createUserTask(workspaceId, projectUserId, projectId, requestBody)
      onCreateUserTask()
      showSnackbar('タスクを作成しました', 'success')
    } catch (error) {
      showSnackbar('タスク作成に失敗しました', 'error')
      console.error(error)
    } finally {
      setIsCreating(false)
      closeTaskDetail()
    }
  }

  const handleFilterChange = (filterParameters: TaskFilterOptions) => {
    setFilterParameters(filterParameters)
    setIsFilterDialogOpen(false)
    setIsSortChecked(false)
  }

  const handleSortChange = (sortParameters: TaskSortOptions) => {
    setSortParameters(sortParameters)
    setIsSortDialogOpen(false)
    setIsSortChecked(false)
  }

  // const handleIDSort = (checked: boolean) => {
  //   setIsSortChecked(checked)
  //   if (!checked) return
  //   setSortParameters({ taskName: null, taskType: null, sp: null, id: '昇順' })
  // }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
    const searchBacklogResult = [...filteredAndSortedBacklog].filter((task) =>
      task.summary.includes(e.target.value),
    )
    setSearchBacklogResult(searchBacklogResult)
  }

  const handleSearchClear = () => {
    setSearchString('')
    setSearchBacklogResult([])
  }

  const handleClickTaskAdd = () => {
    openTaskDetail(defaultTask, addTask)
  }

  const filterTagStyle =
    'bg-white text-text-blue-primary border border-main-color rounded py-1 px-2 text-xs'
  const sortTagStyle = 'bg-white text-sub-color border border-sub-color rounded py-1 px-2 text-xs'

  return (
    <details>
      <summary className='mb-3 items-center gap-2'>
        <p className='mr-2 inline font-bold'>タスク一覧</p>
        <p className='inline text-sm text-text-secondary'>{taskCount}件の課題</p>
      </summary>
      <div>
        <div className='flex justify-end'>
          <div className='flex justify-between gap-5'>
            {/* <InputRadio label='追加した順に並べ替え' checked={isSortChecked} onClick={handleIDSort} /> */}
            <InputSearch
              placeholder='検索'
              className='rounded-md'
              value={keyword}
              onChange={handleSearchChange}
              onClear={handleSearchClear}
            />
            <div className='relative'>
              <ButtonFilter active={isFilterActive} onClick={() => setIsFilterDialogOpen(true)} />
              <div ref={filterDialogRef}>
                <FilterDialog show={isFilterDialogOpen} onFilterClick={handleFilterChange} />
              </div>
            </div>
            <div>
              <ButtonSort active={isSortActive} onClick={() => setIsSortDialogOpen(true)} />
              <div ref={sortDialogRef}>
                <SortDialog show={isSortDialogOpen} onSortClick={handleSortChange} />
              </div>
            </div>
          </div>
        </div>

        <div className='mb-2 flex gap-2'>
          {sortParameters.taskName && (
            <div className={cn(sortTagStyle)}>タスク名：{sortParameters.taskName}</div>
          )}
          {sortParameters.taskType && (
            <div className={cn(sortTagStyle)}>タイプ：{sortParameters.taskType}</div>
          )}
          {sortParameters.sp && <div className={cn(sortTagStyle)}>SP：{sortParameters.sp}</div>}
          {filterParameters.taskName && (
            <div className={cn(filterTagStyle)}>タスク名：{filterParameters.taskName}</div>
          )}
          {filterParameters.taskType && (
            <div className={cn(filterTagStyle)}>タイプ：{filterParameters.taskType.label}</div>
          )}
          {filterParameters.sp !== null && (
            <div className={cn(filterTagStyle)}>SP：{filterParameters.sp}</div>
          )}
        </div>

        <div className='text-sm'>
          {keyword && '"' + keyword + '"の検索結果 ' + searchBacklogResult.length + '件'}
        </div>
        <TaskList
          id='backlog'
          workspaceId={workspaceId}
          projectId={projectId}
          tasks={displayTasks}
          filteredAndSortedTasks={filteredAndSortedBacklog}
          isDragProcess={isDragProcess}
          onUpdateUserTask={onCreateUserTask}
          openTaskDetail={openTaskDetail}
          closeTaskDetail={closeTaskDetail}
        />
        <TaskAdd type='backlog' onClick={handleClickTaskAdd} />
      </div>
    </details>
  )
}
