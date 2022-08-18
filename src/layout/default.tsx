import { FC } from 'react'

import Head from 'next/head'

import Header from '@modules/Header'

import styles from './default.module.scss'

interface DefaultLayoutProps {}

export const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
    </>
  )
}
