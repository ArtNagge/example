import { VFC } from 'react'

import Link from 'next/link'

import Burger from '@components/Burger'
import Typography from '@components/Typography'

import styles from '../Header.module.scss'

interface MobileMenuProps {
  burgerChangeHandler?: (value: boolean) => void
}

const MobileMenu: VFC<MobileMenuProps> = ({ burgerChangeHandler }) => {
  return (
    <div className={styles.header_menu}>
      <Link scroll={false} href="/cases" passHref>
        <Typography variant="subtitle3" color="label-secondary">
          cases
        </Typography>
      </Link>
      <Link scroll={false} href="/contact" passHref>
        <Typography variant="subtitle3" color="label-primary">
          contact
        </Typography>
      </Link>

      <Burger changeHandler={burgerChangeHandler} />
    </div>
  )
}

export default MobileMenu
