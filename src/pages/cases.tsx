import { useState } from 'react'

import Head from 'next/head'

import CasesFirstScreen from '@modules/CasesModules/CasesFirstScreen'
import ShotsListScreen from '@modules/CasesModules/ShotsListScreen'

import { ShotsTypeEnum } from '@services/shots/types'

export default function CasesPage() {
  const [shotsType, setShotsType] = useState(ShotsTypeEnum.LIVE)

  return (
    <>
      <Head>
        <title>Cases page</title>
      </Head>
      <CasesFirstScreen {...{ shotsType, setShotsType }} />
      <ShotsListScreen {...{ shotsType }} />
    </>
  )
}
