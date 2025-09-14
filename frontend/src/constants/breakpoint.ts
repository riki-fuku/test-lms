const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  maxLg: { max: '1024px' },
} as const

type FilteredBreakpoint = Exclude<keyof typeof breakpoints, 'maxLg'>

export const getBreakpointValue = (breakpoint: FilteredBreakpoint): number => {
  const value = breakpoints[breakpoint].replace('px', '')
  return parseInt(value, 10)
}
export default breakpoints
