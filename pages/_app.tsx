import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import { AuthContextProvider } from '../utils/contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
