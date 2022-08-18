import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  createElement,
  forwardRef,
  useContext,
} from 'react'

import clsx from 'clsx'

import { MouseContext } from '@components/MouseContext'
import Typography from '@components/Typography'

import classes from './Button.module.scss'
import { loader } from './icons'
import { ButtonProps } from './types'

type ButtonType = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'subtitle1',
      color = 'label-secondary',
      href,
      target,
      flex,
      children,
      className,
      active,
      loading,
      ...props
    },
    ref,
  ) => {
    const { cursorChangeHandler } = useContext(MouseContext)
    const btnProps = {
      className: clsx('button', className, classes.button, {
        [classes.flex]: flex,
        [classes.active]: active,
        [classes.loading]: loading,
        [classes[`button_${color}`]]: true,
      }),
      ...(href && {
        href,
        target,
      }),
      ...props,
    } as ButtonType

    const btnContent = (
      <>
        {loading ? (
          <div className={clsx(classes.loader)}>{loader}</div>
        ) : (
          children && (
            <Typography
              variant={variant}
              color={color}
              className={clsx('button__text', classes.text)}>
              {children}
            </Typography>
          )
        )}
      </>
    )

    return createElement(
      href ? 'a' : 'button',
      {
        ...btnProps,
        ref,
        onMouseEnter: () => cursorChangeHandler('hovered'),
        onMouseLeave: () => cursorChangeHandler(''),
      },
      btnContent,
    )
  },
)

Button.displayName = 'Button'

export default Button
