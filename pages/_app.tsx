import { AppProps } from 'next/app'
import { ThemeProvider } from '@components/contexts/themeProvider'
import { defaultMode, overrideOS } from '@appConfig'

import '@styles/screen.css'
import '@styles/dark-mode.css'
import '@styles/pagination.css'
import '@styles/prism.css'
import '@styles/toc.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider {...{ defaultMode, overrideOS }} >
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
