import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import Layout from '../components/layout'

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App