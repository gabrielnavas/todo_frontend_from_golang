import wrapper from '../store'
import withReduxSaga from 'next-redux-saga'

import Head from 'next/head'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'

import theme from '../theme'
import createEmotionCache from '../createEmotionCache'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp (props: any) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

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
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default wrapper.withRedux(withReduxSaga(MyApp))
