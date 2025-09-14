'use client'

import Avatar from '@/components/ui/Avatar'
import cn from '@/hooks/cn'
import { useEffect, useState } from 'react'
type Step = {
  name: string
  completed: boolean
}

type StepBarProps = {
  steps: string[]
  direction: 'horizontal' | 'vertical'
  currentStep: number
}

export default function StepBar(props: StepBarProps) {
  const [steps, setSteps] = useState<Step[]>([])

  useEffect(() => {
    const steps = props.steps.map((step, index) => {
      return {
        name: step,
        completed: index < props.currentStep,
      }
    })
    setSteps(steps)
  }, [props.steps, props.currentStep])

  function completedBackgroundColor(step: Step) {
    return step.completed ? 'bg-gradient-to-r from-sub-color to-main-color' : 'bg-form-gray'
  }

  function currentFontStyle(index: number) {
    return props.currentStep === index + 1 && 'text-main-color font-bold lg:text-white'
  }

  function HorizontalStepBar() {
    return (
      <div className='flex items-center justify-center'>
        {steps.map((step, index) => (
          <div className={cn('flex w-24 flex-col items-center gap-2')} key={index}>
            <div className='relative w-full'>
              {index !== 0 && (
                <div
                  className={cn(
                    'absolute left-0 top-1/2 -z-10 h-0.5 w-full -translate-x-1/2',
                    completedBackgroundColor(step),
                  )}
                ></div>
              )}
              <Avatar
                size='sm'
                className={cn('m-auto bg-form-gray', completedBackgroundColor(step))}
              >
                <span className='font-bold text-white'>{index + 1}</span>
              </Avatar>
            </div>
            <p className={cn('text-xs text-form-gray lg:text-base', currentFontStyle(index))}>
              {step.name}
            </p>
          </div>
        ))}
      </div>
    )
  }

  function VerticalStepBar() {
    return (
      <div className='flex flex-col'>
        {steps.map((step, index) => (
          <div className='flex items-end' key={index}>
            <div className='mr-2 flex flex-col items-center'>
              {index !== 0 && (
                <div className={cn('h-8 w-px bg-white', completedBackgroundColor(step))}></div>
              )}
              <Avatar size='sm' className={cn('bg-form-gray', completedBackgroundColor(step))}>
                <span className='font-bold text-white'>{index + 1}</span>
              </Avatar>
            </div>
            <p className={cn('leading-8 text-form-gray', currentFontStyle(index))}>{step.name}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {props.direction === 'horizontal' && <HorizontalStepBar />}
      {props.direction === 'vertical' && <VerticalStepBar />}
    </>
  )
}
