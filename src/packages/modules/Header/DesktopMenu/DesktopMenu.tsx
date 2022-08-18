import { useContext, VFC } from 'react'

import Link from 'next/link'

import { MouseContext } from '@components/MouseContext'
import Typography from '@components/Typography'

import styles from '../Header.module.scss'

const DesktopMenu: VFC = () => {
  const { cursorChangeHandler } = useContext(MouseContext)

  return (
    <div className={styles.header_menu}>
      <Link scroll={false} href="/cases" passHref>
        <Typography
          onMouseEnter={() => cursorChangeHandler('hovered')}
          onMouseLeave={() => cursorChangeHandler('')}
          className={styles.header_menu_item}
          variant="subtitle1"
          color="label-secondary">
          cases
        </Typography>
      </Link>
      <Link scroll={false} href="/about" passHref>
        <Typography
          onMouseEnter={() => cursorChangeHandler('hovered')}
          onMouseLeave={() => cursorChangeHandler('')}
          className={styles.header_menu_item}
          variant="subtitle1"
          color="label-secondary">
          about
        </Typography>
      </Link>
      <Link scroll={false} href="/contact" passHref>
        <Typography
          onMouseEnter={() => cursorChangeHandler('hovered')}
          onMouseLeave={() => cursorChangeHandler('')}
          className={styles.header_menu_item}
          variant="subtitle1"
          color="label-primary">
          contact
        </Typography>
      </Link>
    </div>
  )
}

export default DesktopMenu
