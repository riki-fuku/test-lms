export type GraphData = {
  records: GraphRecord[]
  totalTarget: number
  totalStudyData: number
  averageAchievementRatio: number
  weeklyStudyTime: number
  weeklyTargetStudyTime: number
  dailyStudyTime: number
  dailyTargetStudyTime: number
  curriculumCompletionRate: number
}

export type GraphRecord = {
  startDatetime: string
  endDatetime: string
  studyData: number
  studyDataPreviousRatio: number
  achievementRatio: number
  target: number
  targetPreviousRatio: number
}
