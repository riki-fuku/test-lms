import React, { createContext, useContext, useState } from 'react'

type ValidateType = {
  hasLastName: boolean | null
  hasFirstName: boolean | null
  hasNickName: boolean | null
  isNickNameAvailable: boolean | null
  isNickNameNotExist: boolean | null
  isNickNameInRange: boolean | null
  hasBirthday: boolean | null
  hasMeetingDate: boolean | null
}

type ProfileContextType = {
  firstName: string | null
  lastName: string | null
  nickName: string | null
  birthday: Date | null
  file: File | null
  image: string | null
  selfIntroduction: string | null
  firstMeetingDateTime: string | null
  employeeId: string | null

  setFirstName: (firstName: string | null) => void
  setLastName: (lastName: string | null) => void
  setNickName: (nickName: string | null) => void
  setBirthday: (birthday: Date | null) => void
  setFile: (file: File | null) => void
  setImage: (image: string | null) => void
  setSelfIntroduction: (selfIntroduction: string | null) => void
  setFirstMeetingDateTime: (firstMeetingDate: string | null) => void
  setEmployeeId: (employeeId: string | null) => void
}

const ProfileContext = createContext<ProfileContextType>({
  firstName: null,
  lastName: null,
  nickName: null,
  birthday: null,
  selfIntroduction: null,
  firstMeetingDateTime: null,
  file: null,
  image: null,
  employeeId: null,

  setFirstName: () => {},
  setLastName: () => {},
  setNickName: () => {},
  setBirthday: () => {},
  setFile: () => {},
  setImage: () => {},
  setSelfIntroduction: () => {},
  setFirstMeetingDateTime: () => {},
  setEmployeeId: () => {},
})

export function useProfileContext() {
  return useContext(ProfileContext)
}

type ProfileProviderProps = {
  children: React.ReactNode
}

export function ProfileProvider({ children }: ProfileProviderProps) {
  const [firstName, setFirstName] = useState<string | null>(null)
  const [lastName, setLastName] = useState<string | null>(null)
  const [nickName, setNickName] = useState<string | null>(null)
  const [birthday, setBirthday] = useState<Date | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [selfIntroduction, setSelfIntroduction] = useState<string | null>(null)
  const [firstMeetingDateTime, setFirstMeetingDateTime] = useState<string | null>(null)
  const [employeeId, setEmployeeId] = useState<string | null>(null)

  return (
    <ProfileContext.Provider
      value={{
        firstName,
        lastName,
        nickName,
        birthday,
        file,
        image,
        selfIntroduction,
        firstMeetingDateTime,
        employeeId,

        setFirstName,
        setLastName,
        setNickName,
        setBirthday,
        setFile,
        setImage,
        setSelfIntroduction,
        setFirstMeetingDateTime,
        setEmployeeId,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}
