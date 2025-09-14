'use client'

import Image from '@/components/ui/Image'
import StepBar from '@/components/ui/StepBar'
import { MAZIDESIGN_WORKSPACE_NAME } from '@/config'
import { SideBarContext } from '@/features/register/hooks/useSideBar'
import { useActorStore } from '@/store/actor-store'
import { useContext } from 'react'

export default function SideBar({ steps }: { steps: string[] }) {
  const sidebar = useContext(SideBarContext)
  const { actor } = useActorStore((state) => state)

  return (
    <>
      {/* pcサイズ */}
      <div className='hidden h-full w-72 bg-bg-tertiary p-8 lg:block'>
        <div className='relative h-6 lg:w-full'>
          {actor &&
            (MAZIDESIGN_WORKSPACE_NAME === actor?.activeWorkspace.workspace?.name ? (
              <Image src='/images/mazidesign_logo_white.png' alt='ロゴ' fill />
            ) : (
              <Image src='/images/logo_white.svg' alt='ロゴ' fill />
            ))}
        </div>
        <div className='mt-14'>
          <StepBar steps={steps} direction='vertical' currentStep={sidebar.currentStep} />
        </div>
      </div>
      {/* mobileサイズ */}
      <div className='block w-full p-5 text-left lg:hidden'>
        <div className='relative'>
          {actor &&
            (MAZIDESIGN_WORKSPACE_NAME === actor?.activeWorkspace.workspace?.name ? (
              <Image src='/images/mazidesign_logo.png' alt='ロゴ' width={150} height={12} />
            ) : (
              <Image src='/images/logo.svg' alt='ロゴ' width={150} height={12} />
            ))}
        </div>
        <div className='mt-8'>
          <StepBar steps={steps} direction='horizontal' currentStep={sidebar.currentStep} />
        </div>
      </div>
    </>
  )
}
