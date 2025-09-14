import fetchCurriculum from '@/features/curriculum/api/fetchCurriculum'
import fetchSection from '@/features/curriculum/api/fetchSection'
import recordCurriculumProgress from '@/features/curriculum/api/recordCurriculumProgress'
import type { Curriculum } from '@/features/curriculum/types/Curriculum'
import type { LocalStoragePrevCurriculum } from '@/features/curriculum/types/LocalStoragePrevCurriculum'
import type { Section } from '@/features/curriculum/types/Section'
import type { User } from '@/features/user/types/User'
import { useEffect, useRef, useState } from 'react'

export default function useCurriculumData(
  curriculumId: string,
  sectionId: string,
  user: Pick<User, 'id'> | null,
  workspaceId: string,
) {
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null)
  const [section, setSection] = useState<Section | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isFirstRenderRef = useRef(true)
  const sectionWrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const [curriculumData, sectionData] = await Promise.all([
        fetchCurriculum(workspaceId, curriculumId),
        fetchSection(workspaceId, sectionId),
      ])

      setCurriculum(curriculumData)
      setSection(sectionData)
      setIsLoading(false)

      if (isFirstRenderRef.current) {
        isFirstRenderRef.current = false
        if (user && !sectionData.learned) {
          handleRecordProgress(curriculumData, sectionData)
        }
      }
    }

    fetchData()

    // 画面遷移時にスクロール位置をトップに戻す
    sectionWrapper.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [curriculumId, sectionId])

  const handleRecordProgress = async (curriculumData: Curriculum, sectionData: Section) => {
    if (!user) return
    const res = await recordCurriculumProgress(workspaceId, {
      userId: user.id,
      sectionId: sectionData.id,
    })

    if (!curriculumData.chapters) return

    const updatedCurriculum = {
      ...curriculumData,
      chapters: curriculumData.chapters.map((chapter) => {
        if (!chapter.sections) return chapter
        return {
          ...chapter,
          sections: chapter.sections.map((sec) => {
            if (sec.id === res.section_id) {
              return { ...sec, learned: true }
            }
            return sec
          }),
        }
      }),
    }

    saveProgressToLocalStorage(
      updatedCurriculum,
      sectionData.chapterId,
      sectionData.id,
      sectionData.title,
    )
    setCurriculum(updatedCurriculum)
  }

  // ローカルストレージに前回の学習データを保存する関数
  const saveProgressToLocalStorage = (
    curriculum: Curriculum,
    chapterId: string,
    sectionId: string,
    description: string,
  ) => {
    const initialCurriculum: LocalStoragePrevCurriculum = {
      curriculumId: curriculum.id,
      workspaceId,
      chapterId,
      sectionId,
      description,
      title: curriculum.title,
      eyeCatchUrl: curriculum.eyeCatchUrl,
      order: curriculum.order,
      progress: curriculum.progress,
    }

    localStorage.setItem('prev_study_curriculum', JSON.stringify(initialCurriculum))
  }

  useEffect(() => {
    if (curriculum && section) {
      saveProgressToLocalStorage(curriculum, section.chapterId, section.id, section.title)
    }
  }, [curriculum, section])

  return { curriculum, section, sectionWrapper, isLoading }
}
