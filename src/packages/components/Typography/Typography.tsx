import {
  AnchorHTMLAttributes,
  AriaRole,
  CSSProperties,
  DOMAttributes,
  forwardRef,
  memo,
  MouseEvent,
} from 'react'

import clsx from 'clsx'

import { TColor } from '../../types'

import { TTypographyComponent, TTypographyVariant } from './types'
import classes from './Typography.module.scss'

interface TypographyProps
  extends Pick<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'target' | 'rel'
  > {
  className?: string
  variant?: TTypographyVariant
  component?: TTypographyComponent
  disabled?: boolean
  color?: TColor
  style?: CSSProperties
  role?: AriaRole
  tabIndex?: number
  onClick?: (e: MouseEvent<HTMLElement>) => void
}

const Typography = forwardRef<
  HTMLElement,
  TypographyProps & DOMAttributes<HTMLElement>
>(
  (
    {
      className = '',
      variant,
      component = 'p',
      color = '',
      href,
      target,
      ...props
    },
    ref,
  ) => {
    const CustomTag = `${href ? 'a' : component}`
    const componentVariantMap: Record<
      TypographyProps['component'],
      TypographyProps['variant']
    > = {
      h1: 'head1',
      h2: 'head2',
      h3: 'head3',
      p: 'subtitle2',
      span: 'subtitle1',
      div: 'subtitle2',
      a: 'subtitle2',
    }

    return (
      <CustomTag
        // @ts-ignore
        className={clsx(
          classes.typography,
          classes[variant ?? componentVariantMap[component]],
          classes[color],
          className,
          {
            [classes.link]: !!href,
          },
        )}
        {...{ target, href }}
        {...props}
      />
    )
  },
)

Typography.displayName = 'Typography'

export default memo(Typography)
