import { DarkModeToggle } from '@components/DarkModeToggle'
import { defaultMode } from '@appConfig'

export const DarkMode = () => {
  if (defaultMode === null) return null
  return <DarkModeToggle />
}
