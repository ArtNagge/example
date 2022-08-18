import { FC } from 'react'
import { useEffect } from 'react'

import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'

import Footer from '@modules/Footer'
import Header from '@modules/Header'
import { initAuthLogin } from '@store/auth'
import { useAppDispatch } from '@store/store'

import Auth from '@services/auth/Auth'
import { AuthRo } from '@services/auth/types'

import styles from './admin.module.scss'

interface DefaultLayoutProps {
  auth?: AuthRo
  isAuth: boolean
}

export const DefaultAdminLayout: FC<DefaultLayoutProps> = ({
  children,
  auth,
  isAuth,
}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    Auth.checkTokens()
      .then(() => {
        const [lastPath] = router.asPath.split('/').slice(-1)
        const isLoginPath = lastPath === 'login'

        if (isLoginPath) router.push('/admin')
      })
      .catch(() => router.push('/admin/login'))

    if (isAuth) dispatch(initAuthLogin(auth))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Header />
      <div className={styles.admin}>{children}</div>
      <Footer />
    </>
  )
}
