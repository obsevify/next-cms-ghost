import { AppProps } from 'next/app'

import '@styles/screen.css'
import '@styles/fluid.css'
import '@styles/dark-mode.css'
import '@styles/pagination.css'
import '@styles/prism.css'
import '@styles/toc.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default App
