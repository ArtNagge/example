import { memo, ReactNode, useContext, VFC } from 'react'

import Link from 'next/link'

import { motion } from 'framer-motion'

import { MouseContext } from '@components/MouseContext'
import Typography from '@components/Typography'

import useAdaptive from '@hooks/useAdaptive'

import styles from './FirstScreen.module.scss'
import { arrow } from './icons'
import { motionInfo, motionSubtitle, motionTitle } from './store'

type FirstScreenProps = {
  title: ReactNode | string
  description?: ReactNode | string
  info: ReactNode | string
  linkName: string
  link: string
}

const FirstScreen: VFC<FirstScreenProps> = ({
  title,
  info,
  link,
  linkName,
  description,
}) => {
  const { cursorChangeHandler } = useContext(MouseContext)
  const { isMobile } = useAdaptive()

  return (
    <div className={styles.base}>
      <motion.div className={styles.base_title} {...motionTitle}>
        <Typography component="h1" variant="head1Large" color="label-primary">
          {title}
        </Typography>
      </motion.div>
      <motion.div className={styles.base_desc} {...motionSubtitle}>
        <Typography variant="text2" component="span" color="label-secondary">
          {description}
        </Typography>
      </motion.div>
      <div className={styles.base_footer}>
        <motion.div className={styles.base_footer_motion} {...motionInfo}>
          <Typography
            className={styles.base_subtitle}
            component="p"
            {...(isMobile && {
              variant: 'subtitle3',
            })}
            color="label-tertiary">
            {info}
          </Typography>
          <Link scroll={false} href={link} passHref>
            <Typography
              onMouseMove={() => cursorChangeHandler('hovered')}
              onMouseLeave={() => cursorChangeHandler('')}
              className={styles.base_about}
              {...(isMobile && {
                variant: 'subtitle3',
              })}
              color="label-tertiary">
              {linkName} {arrow}
            </Typography>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default memo(FirstScreen)
