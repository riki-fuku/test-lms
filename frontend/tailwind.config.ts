import { heroui } from '@heroui/react'
import type { Config } from 'tailwindcss'
import breakpoints from './src/constants/breakpoint'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/*/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        ...breakpoints,
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        slideIn: 'slideIn 0.2s',
        slideInLeft: 'slideInLeft 0.2s',
        slideOut: 'slideOut 0.2s both',
      },
      keyframes: {
        slideIn: {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        slideInLeft: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        slideOut: {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(100%)',
            opacity: '1',
          },
        },
      },
      fontSize: {
        xxs: '0.5rem' /* 8px */,
        xs: '0.625rem' /* 10px */,
        sm: '0.75rem' /* 12px */,
        md: '0.875rem' /* 14px */,
      },
      colors: {
        'main-color': '#328CE6',
        'sub-color': '#14BBBB',
        /* text */
        'text-primary': '#424242',
        'text-secondary': '#8C8C8C',
        'text-disable': '#D9D9D9',
        'text-blue-primary': '#328CE6',
        'text-red-primary': '#E90000',
        'text-green-primary': '#00B900',
        /* background */
        'bg-primary': '#F5F5F5',
        'bg-secondary': '#EFEFEF',
        'bg-tertiary': '#8C8C8C',
        'bg-red-primary': '#FFE4E4',
        'bg-blue-primary': '#E7F3FF',
        'bg-green-primary': '#C9F6F6',
        /* bg-hover */
        'bg-hover-primary': '#F9F9F9',
        'bg-hover-secondary': '#D9D9D9',
        /* form */
        'form-gray': '#D9D9D9',
        /* border */
        'border-primary': '#EFEFEF',
        'border-secondary': '#8C8C8C',
        'border-blue-primary': '#E7F3FF',
        'border-red-primary': '#E90000',

        'yellow-primary': '#EED600',
        'green-primary': '#00B900',

        'warn-red': '#E90000',

        'rank-gold': '#DED954',
        'rank-silver': '#C0C0C0',
        'rank-bronze': '#B86F2B',

        'slack-link': '#88388A',

        'qa-bg-color': '#C9F6F6',
        /* 4択問題の選択肢の色 */
        'choice-qa-correct': '#328CE6',
        'choice-qa-incorrect': '#E90000',

        // 以下の色は削除予定
        main_blue: '#328CE6',
        normalText: '#424242',
        mainColor: '#328CE6',
        subColor: '#14BBBB',
        f5: '#F5F5F5',
        weakBlack: '#8c8c8c',
        weakGrey: '#EFEFEF',
        warn: '#E90000',
      },
      maxWidth: {
        pc: '94.5rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
}
export default config
