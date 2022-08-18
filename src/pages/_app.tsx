import { Provider } from 'react-redux'

import type { AppContext, AppProps } from 'next/app'
import nextCookie from 'next-cookies'

import Cursor from '@modules/Cursor'
import Footer from '@modules/Footer'
import { store } from '@store/store'
import { AnimatePresence } from 'framer-motion'

import MouseContextProvider from '@components/MouseContext'

import { AuthRo } from '@services/auth/types'

import '@styles/include/_globals.scss'

import { DefaultAdminLayout } from '../layout/admin-default'
import { DefaultLayout } from '../layout/default'

type AppProps = AppProps & {
  auth?: AuthRo
  isAuth: boolean
  isAdmin: boolean
}

const App = ({
  Component,
  pageProps,
  auth,
  isAuth,
  isAdmin,
  router,
}: AppProps) => {
  const { route } = router
  const Layout = isAdmin ? DefaultAdminLayout : DefaultLayout

  return (
    <Provider store={store}>
      <MouseContextProvider>
        <Cursor />
        <Layout {...(isAdmin && { auth, isAuth })}>
          <AnimatePresence
            exitBeforeEnter
            onExitComplete={() => window.scrollTo(0, 0)}>
            <Component {...pageProps} key={route} />
            <Footer />
          </AnimatePresence>
        </Layout>
      </MouseContextProvider>
    </Provider>
  )
}

App.getInitialProps = async ({ ctx }: AppContext) => {
  const [firstPath] = ctx.asPath.split('/').filter(Boolean)
  const isAdmin = firstPath === 'admin'
  const { accessToken, refreshToken } = nextCookie(ctx)
  const isAuth = !!(accessToken && refreshToken)

  return {
    ...(isAuth && { isAuth, auth: { accessToken, refreshToken } }),
    isAdmin,
  }
}

export default App
