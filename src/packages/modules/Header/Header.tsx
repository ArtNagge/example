import { useContext, useEffect, useState, VFC } from 'react'

import Link from 'next/link'

import { setHeaderScroll } from '@store/header'
import { TScrollState } from '@store/header/types'
import { useHeaderScroll } from '@store/selectors/header'
import { useAppDispatch } from '@store/store'
import clsx from 'clsx'

import { MouseContext } from '@components/MouseContext'

import useAdaptive from '@hooks/useAdaptive'

import DesktopMenu from './DesktopMenu'
import styles from './Header.module.scss'
import { logo } from './icons'
import MobileMenu from './MobileMenu'
import MobileMenuPopup from './MobileMenuPopup'

const Header: VFC = () => {
  const [lastScrollY, setLastScrollY] = useState(0)
  const [burger, setBurger] = useState(false)

  const { cursorChangeHandler } = useContext(MouseContext)
  const dispatch = useAppDispatch()
  const { isDesktop, isMobile } = useAdaptive()
  const scroll = useHeaderScroll()

  useEffect(() => {
    document.body.style.overflow = burger ? 'hidden' : 'auto'
  }, [burger])

  useEffect(() => {
    const updateScrollDir = () => {
      const scrollY = window.pageYOffset >= 0 ? window.pageYOffset : 0
      const direction: TScrollState = (() => {
        if (scrollY <= 0) return 'noScrolling'
        if (scrollY >= lastScrollY) return 'scrollingDown'
        return 'scrollingUp'
      })()

      dispatch(setHeaderScroll(direction))

      setLastScrollY(scrollY)
    }

    window.addEventListener('scroll', updateScrollDir)
    return () => {
      window.removeEventListener('scroll', updateScrollDir)
    }
  }, [dispatch, lastScrollY])

  return (
    <header
      className={clsx({
        [styles.header]: true,
        [styles[scroll]]: true,
        [styles.headerOpened]: burger && isMobile,
      })}>
      <Link scroll={false} href="/" passHref>
        <a
          onMouseEnter={() => cursorChangeHandler('hovered')}
          onMouseLeave={() => cursorChangeHandler('')}
          className={styles.header_logo}>
          {logo}
        </a>
      </Link>
      {isDesktop ? (
        <DesktopMenu />
      ) : (
        <MobileMenu burgerChangeHandler={setBurger} />
      )}
      {!isDesktop && <MobileMenuPopup isOpen={burger} />}
    </header>
  )
}

export default Header
