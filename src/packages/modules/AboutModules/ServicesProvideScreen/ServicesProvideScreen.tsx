import { VFC } from 'react'

import Image from 'next/image'

import Cone from '@images/about/cone.png'
import Cross from '@images/about/cross.png'
import Cube from '@images/about/cube.png'
import FlowerCylinder from '@images/about/flower_cylinder.png'
import Platonic from '@images/about/platonic.png'
import Sphere from '@images/about/sphere.png'
import { motionInfo, motionTitle } from '@modules/HomeModules/FirstScreen/store'
import { motion } from 'framer-motion'

import Typography from '@components/Typography'

import { useMediaXL } from '@hooks'
import useAdaptive from '@hooks/useAdaptive'

import styles from './ServicesProvideScreen.module.scss'

interface ServicesProvideScreenProps {}

const ServicesProvideScreen: VFC<ServicesProvideScreenProps> = ({}) => {
  const { matchDownXl } = useMediaXL()
  const { isMobile } = useAdaptive()

  return (
    <div className={styles.services_provide_screen}>

    </div>
  )
}

export default ServicesProvideScreen
