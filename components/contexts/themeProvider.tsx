import { createContext, useContext, ReactElement, useState, useEffect } from 'react'

export interface ThemeProviderValues {
  dark: 'dark' | 'light' | null
  toggleDark: () => void
}

const defaultValues = {
  dark: null,
  toggleDark: () => null
}

const ThemeContext = createContext<ThemeProviderValues>(defaultValues)
export const useTheme = (): ThemeProviderValues => useContext(ThemeContext)

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
const supportsDarkMode = () => window.matchMedia(`(prefers-color-scheme: dark)`).matches === true

const supportsLightMode = () => window.matchMedia(`(prefers-color-scheme: light)`).matches === true

const getLocalStoragelsDark = () => {
  const mode = localStorage.getItem(`dark`)
  if (!mode) return null
  return mode === 'dark' ? 'dark' : 'light'
}

type DarkMode = 'dark' | 'light' | null

interface DefaultModeProps {
  defaultMode: DarkMode
  overrideOS: boolean
}

const getDefaultMode = ({ defaultMode, overrideOS }: DefaultModeProps) => {
  const lsDark = getLocalStoragelsDark()
  if (lsDark !== null) {
    return lsDark
  } else if (overrideOS) {
    return defaultMode
  } else if (supportsDarkMode()) {
    return 'dark'
  } else if (supportsLightMode()) {
    return 'light'
  } else {
    return defaultMode
  }
}

interface SitesProviderProps extends DefaultModeProps {
  children: React.ReactNode
}

export const ThemeProvider = ({ defaultMode, overrideOS, children }: SitesProviderProps): ReactElement => {
  const [dark, setDark] = useState<DarkMode>(null)

  useEffect(() => {
    const dark = getDefaultMode({ defaultMode, overrideOS })
    setDark(dark)
  }, [defaultMode, overrideOS])

  const toggleDark = () => {
    if (dark === null) return
    const toggle = dark === 'dark' ? 'light' : 'dark'
    localStorage.setItem(`dark`, toggle)
    setDark(toggle)
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  )
}
