import { memo, VFC } from 'react'

import Link from 'next/link'

import { useAppSelector } from '@store/store'
import { motion } from 'framer-motion'

import Button from '@components/Button'
import Divider from '@components/Divider'
import ProjectCard from '@components/ProjectCard'
import Typography from '@components/Typography'

import { motionInfo, motionTitle } from '../FirstScreen/store'

import { dot } from './icons'
import styles from './OurProjects.module.scss'

export type OurProjectsProps = {
  withDivider?: boolean
}

const OurProjects: VFC<OurProjectsProps> = ({ withDivider }) => {
  const shots = useAppSelector((state) => state.shotsReducer.list.live.data)

  return (
    <div className={styles.base}>
      {withDivider && <Divider withDots reverse fullContainer dots={2} />}

    </div>
  )
}

export default memo(OurProjects)
