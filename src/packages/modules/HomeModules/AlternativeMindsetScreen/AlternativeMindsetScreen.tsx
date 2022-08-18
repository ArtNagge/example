import { memo, useContext, VFC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import alt1 from '@images/alt-1.png'
import alt2 from '@images/alt-2.png'
import { motion } from 'framer-motion'

import Divider from '@components/Divider'
import { MouseContext } from '@components/MouseContext'
import Typography from '@components/Typography'

import { motionInfo, motionSubtitle, motionTitle } from '../FirstScreen/store'

import styles from './AlternativeMindsetScreen.module.scss'
import { arrow } from './icons'

export type AlternativeMindsetScreenProps = {
  withDivider?: boolean
}

const AlternativeMindsetScreen: VFC<AlternativeMindsetScreenProps> = ({
  withDivider,
}) => {
  const { cursorChangeHandler } = useContext(MouseContext)

  return (
    <div className={styles.base}>
      {withDivider && <Divider withDots fullContainer dots={4} />}

    </div>
  )
}

export default memo(AlternativeMindsetScreen)
