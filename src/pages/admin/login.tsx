import { useEffect } from 'react'

import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'

import Login from '@modules/AdminModules/Login'
import { useIsAuth } from '@store/selectors/auth'

export default function AdminPageLogin() {
  const isAuth = useIsAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuth) router.push('/admin')
  }, [isAuth, router])

  return (
    <>
      <Head>
        <title>Admin panel</title>
      </Head>
      <Login />
    </>
  )
}
