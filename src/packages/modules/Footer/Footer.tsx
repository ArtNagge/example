import { useContext, VFC } from 'react'

import Link from 'next/link'

import {
  motionInfo,
  motionSubtitle,
  motionTitle,
} from '@modules/HomeModules/FirstScreen/store'
import { getYear } from 'date-fns'
import { motion } from 'framer-motion'

import Divider from '@components/Divider'
import { MouseContext } from '@components/MouseContext'
import Typography from '@components/Typography'

import styles from './Footer.module.scss'
import { arrowTop, logo } from './icons'

type FooterProps = {}

const Footer: VFC<FooterProps> = () => {
  const { cursorChangeHandler } = useContext(MouseContext)

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <Divider />
      <footer className={styles.base}>

      </footer>
    </>
  )
}

export default Footer
