import { memo, useContext, VFC } from 'react'

import Link from 'next/link'

import { motion } from 'framer-motion'

import { MouseContext } from '@components/MouseContext'
import Typography from '@components/Typography'

import { motionSubtitle, motionTitle } from '../FirstScreen/store'

import styles from './DatingScreen.module.scss'
import { brush, headphones, noname, who_are_we } from './icons'

const DatingScreen: VFC = ({}) => {
  const { cursorChangeHandler } = useContext(MouseContext)

  return (
    <div className={styles.base}>
      <motion.div className={styles.base_info} {...motionTitle}>
        <div className={styles.base_info_who_are_we}>{who_are_we}</div>
        <div className={styles.base_info_nonamel}>{noname}</div>
      </motion.div>
      <motion.div className={styles.base_description} {...motionSubtitle}>
        <Typography
          className={styles.base_description_text}
          component="p"
          variant="text2"
          color="label-secondary">
          noname
        </Typography>
        <Link scroll={false} href="/contact" passHref>
          <Typography
            className={styles.base_description_link}
            variant="head3"
            onMouseMove={() => cursorChangeHandler('hovered')}
            onMouseLeave={() => cursorChangeHandler('')}
            color="label-secondary"
            target="_blank">
            let’s connect →
          </Typography>
        </Link>
      </motion.div>
    </div>
  )
}

export default memo(DatingScreen)
