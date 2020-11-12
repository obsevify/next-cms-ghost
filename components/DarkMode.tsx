import { DarkModeToggle } from '@components'
import { defaultMode } from '@appConfig'

const DarkMode = () => {
  if (defaultMode === null) return null
  return <DarkModeToggle />
}

export default DarkMode
