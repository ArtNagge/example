import { useContext, VFC } from 'react'

import clsx from 'clsx'

import { MouseContext } from '@components/MouseContext'

import useMousePosition from '@hooks/useMousePosition'

import styles from './Cursor.module.scss'

const Cursor: VFC = () => {
  const { cursorType } = useContext(MouseContext)
  const { x, y } = useMousePosition()

  return (
    <div
      className={clsx(styles.cursor, styles[`cursor_${cursorType}`], 'cursor')}
      style={{ left: `${x}px`, top: `${y}px` }}
    />
  )
}

export default Cursor
