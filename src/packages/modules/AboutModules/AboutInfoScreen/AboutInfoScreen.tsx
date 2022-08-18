import { VFC } from 'react'

import Image from 'next/image'

import cases4Real from '@images/about/cases4Real.png'
import gamblingPlatform from '@images/about/gamblingPlatform.png'
import {
  motionInfo,
  motionSubtitle,
  motionTitle,
} from '@modules/HomeModules/FirstScreen/store'
import { motion } from 'framer-motion'

import Typography from '@components/Typography'

import { useMediaXL } from '@hooks'

import styles from './AboutInfoScreen.module.scss'

interface AboutInfoScreenProps {}

const AboutInfoScreen: VFC<AboutInfoScreenProps> = ({}) => {
  const { matchDownXl } = useMediaXL()

  return (
    <div className={styles.about_info}>
      <motion.div className={styles.about_info_screen} {...motionInfo}>
      </motion.div>
    </div>
  )
}

export default AboutInfoScreen
