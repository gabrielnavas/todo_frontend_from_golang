import { wrapper } from '../store'

import { PersistGate } from 'redux-persist/integration/react'

import Head from 'next/head'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'

import theme from '../theme'
import createEmotionCache from '../createEmotionCache'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useStore } from 'react-redux'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp (props: any) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const store: any = useStore<any>()

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ToastContainer />
        {
          <PersistGate
            persistor={store.__persistor}
            loading={<div>Loading</div>}>
            <Component {...pageProps} />
          </PersistGate>
        }
      </ThemeProvider>
    </CacheProvider>
  )
}

export default wrapper.withRedux(MyApp)
