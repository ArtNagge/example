import { memo, VFC } from 'react'

import { motion, Variants } from 'framer-motion'

import { defaultTransition } from '../FirstScreen/store'

import styles from './ExperienceScreen.module.scss'
import { text } from './icons'

const variants: Variants = {
  hide: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
}

const motionAnimate = {
  initial: 'hide',
  whileInView: 'visible',
  variants,
  transition: defaultTransition,
}

const ExperienceScreen: VFC = ({}) => (
  <motion.div className={styles.base} {...motionAnimate}>
    <div className={styles.base_content}>{text}</div>
  </motion.div>
)

export default memo(ExperienceScreen)
