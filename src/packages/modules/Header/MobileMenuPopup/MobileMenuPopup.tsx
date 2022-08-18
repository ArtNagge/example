import { VFC } from 'react'

import Link from 'next/link'

import {
  burgerVariants,
  defaultTransition,
} from '@modules/HomeModules/FirstScreen/store'
import { motion } from 'framer-motion'

import Typography from '@components/Typography'

import styles from './MobileMenuPopup.module.scss'

type MobileMenuPopupProps = {
  isOpen: boolean
}

const MobileMenuPopup: VFC<MobileMenuPopupProps> = ({ isOpen }) => {
  return (
    <motion.div
      initial={false}
      className={styles.menu}
      animate={isOpen ? 'visible' : 'hide'}
      {...{ variants: burgerVariants, transition: defaultTransition }}>
      <div className={styles.menu_info}>
        <Link scroll={false} href="https://twitter.com/noname" passHref>
          <Typography
            target="_blank"
            className={styles.menu_item}
            variant="head1"
            color="label-secondary">
            Twitter →
          </Typography>
        </Link>
        <Link scroll={false} href="https://dribbble.com/noname" passHref>
          <Typography
            target="_blank"
            className={styles.menu_item}
            variant="head1"
            color="label-secondary">
            Dribbble →
          </Typography>
        </Link>
        <Link
          scroll={false}
          href="https://www.behance.net/noname"
          passHref>
          <Typography
            target="_blank"
            className={styles.menu_item}
            variant="head1"
            color="label-secondary">
            Behance →
          </Typography>
        </Link>
        <Link
          scroll={false}
          href="https://www.instagram.com/noname/"
          passHref>
          <Typography
            target="_blank"
            className={styles.menu_item}
            variant="head1"
            color="label-secondary">
            Instagram →
          </Typography>
        </Link>
        <Link scroll={false} href="/cases" passHref>
          <Typography
            className={styles.menu_item}
            variant="head1"
            color="label-secondary">
            Cases
          </Typography>
        </Link>
        <Link scroll={false} href="/about" passHref>
          <Typography
            className={styles.menu_item}
            variant="head1"
            color="label-secondary">
            About
          </Typography>
        </Link>
        <Link scroll={false} href="/contact" passHref>
          <Typography
            className={styles.menu_item}
            variant="head1"
            color="label-secondary">
            Contact
          </Typography>
        </Link>
        <div className={styles.menu_info_email}>
          <Typography component="span" color="label-tertiary">
            have a project in mind? contact us!
          </Typography>
          <Typography
            color="label-secondary"
            variant="head2"
            className={styles.menu_info_email_adress}
            href="mailto:noname">
            noname
          </Typography>
        </div>
      </div>
    </motion.div>
  )
}

export default MobileMenuPopup
