import { useEffect } from 'react'

import Head from 'next/head'

import AlternativeMindsetScreen from '@modules/HomeModules/AlternativeMindsetScreen'
import DatingScreen from '@modules/HomeModules/DatingScreen'
import ExperienceScreen from '@modules/HomeModules/ExperienceScreen'
import FirstScreen from '@modules/HomeModules/FirstScreen'
import OurProjects from '@modules/HomeModules/OurProjects'
import { fetchShots } from '@store/shots'
import { useAppDispatch } from '@store/store'

import { ShotsTypeEnum } from '@services/shots/types'

const FIRSTSCREEN_TITLE = (
  <>
    we’re making
    <br />
    your — next
    <br />
    dream gaming project
  </>
)
const FIRSTSCREEN_INFO = (
  <>
    we trying to make the best gaming <br />
    interfaces you can even imagine.
  </>
)

const FIRSTSCREEN_LINK_NAME = 'about us'

export default function HomePage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      fetchShots(ShotsTypeEnum.LIVE, { type: ShotsTypeEnum.LIVE, limit: 5 }),
    )
  }, [dispatch])

  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <FirstScreen
        linkName={FIRSTSCREEN_LINK_NAME}
        title={FIRSTSCREEN_TITLE}
        info={FIRSTSCREEN_INFO}
        link="/about"
      />
      <ExperienceScreen />
      <DatingScreen />
      <AlternativeMindsetScreen withDivider />
      <OurProjects withDivider />
    </>
  )
}
