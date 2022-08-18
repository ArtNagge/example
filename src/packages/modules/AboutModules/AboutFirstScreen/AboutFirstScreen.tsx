import { memo, VFC } from 'react'

import FirstScreen from '@modules/HomeModules/FirstScreen'

import {
  FIRSTSCREEN_DESC,
  FIRSTSCREEN_INFO,
  FIRSTSCREEN_LINK_NAME,
  FIRSTSCREEN_TITLE,
} from './store'

const AboutFirstScreen: VFC = ({}) => (
  <FirstScreen
    linkName={FIRSTSCREEN_LINK_NAME}
    title={FIRSTSCREEN_TITLE}
    info={FIRSTSCREEN_INFO}
    description={FIRSTSCREEN_DESC}
    link="/cases"
  />
)

export default memo(AboutFirstScreen)
