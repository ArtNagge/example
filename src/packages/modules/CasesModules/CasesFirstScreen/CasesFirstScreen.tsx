import { memo, useContext, VFC } from 'react'

import { motionInfo, motionTitle } from '@modules/HomeModules/FirstScreen/store'
import { motion } from 'framer-motion'

import { MouseContext } from '@components/MouseContext'
import Typography from '@components/Typography'

import useAdaptive from '@hooks/useAdaptive'

import { ShotsTypeEnum } from '@services/shots/types'

import styles from './CasesFirstScreen.module.scss'
import { arrow } from './icons'
import {
  ALL_CASES,
  FIRSTSCREEN_DESC,
  FIRSTSCREEN_LINK_NAME,
  LIVE_CASES,
} from './store'

type CasesFirstScreenProps = {
  shotsType: ShotsTypeEnum
  setShotsType: (value: ShotsTypeEnum) => void
}

const CasesFirstScreen: VFC<CasesFirstScreenProps> = ({
  shotsType,
  setShotsType,
}) => {
  const { cursorChangeHandler } = useContext(MouseContext)
  const { isMobile } = useAdaptive()

  return (
    <div className={styles.base}>
      <motion.div {...motionTitle}>
        <div className={styles.base_title}>
          <Typography
            component="h1"
            variant="head1Large"
            color={
              shotsType === ShotsTypeEnum.LIVE
                ? 'label-primary'
                : 'label-tertiary'
            }
            onMouseEnter={() => cursorChangeHandler('hovered')}
            onMouseLeave={() => cursorChangeHandler('')}
            onClick={() => setShotsType(ShotsTypeEnum.LIVE)}>
            {LIVE_CASES}
          </Typography>
          <b>/</b>
          <Typography
            component="h1"
            variant="head1Large"
            color={
              shotsType === ShotsTypeEnum.COMPLETE
                ? 'label-primary'
                : 'label-tertiary'
            }
            onMouseEnter={() => cursorChangeHandler('hovered')}
            onMouseLeave={() => cursorChangeHandler('')}
            onClick={() => setShotsType(ShotsTypeEnum.COMPLETE)}>
            {ALL_CASES}
          </Typography>
        </div>
        <Typography
          variant="text2"
          component="span"
          className={styles.base_desc}
          color="label-secondary">
          {FIRSTSCREEN_DESC}
        </Typography>
      </motion.div>
      <motion.div className={styles.base_footer} {...motionInfo}>
        <Typography
          className={styles.base_about}
          {...(isMobile && {
            variant: 'subtitle3',
          })}
          color="label-tertiary">
          {arrow} {FIRSTSCREEN_LINK_NAME}
        </Typography>
      </motion.div>
    </div>
  )
}

export default memo(CasesFirstScreen)
