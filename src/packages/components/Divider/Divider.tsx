import { VFC } from 'react'

import { motionTitle } from '@modules/HomeModules/FirstScreen/store'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import styles from './Divider.module.scss'

type DividerProps = {
  fullContainer?: boolean
  withDots?: boolean
  reverse?: boolean
  dots?: 2 | 4
}

const Divider: VFC<DividerProps> = ({
  fullContainer,
  withDots,
  reverse,
  dots = 2,
}) => (
  <motion.div
    className={clsx({
      [styles.divider]: true,
      [styles.divider_full]: fullContainer,
      [styles.divider_reverse]: reverse,
    })}
    {...motionTitle}>
    <div className={styles.divider_line} />
    {withDots &&
      Array.from({ length: dots }, (_, index) => (
        <div
          key={index}
          className={clsx({
            [styles.divider_dot]: true,
            [styles[`divider_dot_${dots}`]]: true,
          })}
        />
      ))}
  </motion.div>
)

export default Divider
