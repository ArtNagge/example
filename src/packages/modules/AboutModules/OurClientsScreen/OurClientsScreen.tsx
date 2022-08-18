import { VFC } from 'react'

import { motionInfo } from '@modules/HomeModules/FirstScreen/store'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Divider from '@components/Divider'
import Typography from '@components/Typography'

import { useMediaXL } from '@hooks'

import 'swiper/css'

import { arrow } from './icons'
import styles from './OurClientsScreen.module.scss'

interface OurClientsScreenProps {}

const OurClientsScreen: VFC<OurClientsScreenProps> = ({}) => {
  const { matchDownXl } = useMediaXL()

  return (
    <div className={styles.our_clients_screen}>
      <motion.div className={styles.our_clients_screen_wrapper} {...motionInfo}>
        <Swiper
          loop
          modules={[Navigation, Pagination]}
          navigation={{ nextEl: '.rightArrow', prevEl: '.leftArrow' }}
          slidesPerView={1}
          pagination={{ clickable: true }}>
          <div className={styles.our_clients_screen_arrows}>
            <div
              className={clsx(
                'leftArrow',
                styles.our_clients_screen_arrows_leftArrow,
              )}>
              {arrow}
            </div>
            <div
              className={clsx(
                'rightArrow',
                styles.our_clients_screen_arrows_rightArrow,
              )}>
              {arrow}
            </div>
          </div>
        </Swiper>
      </motion.div>
      <Divider fullContainer />
    </div>
  )
}

export default OurClientsScreen
