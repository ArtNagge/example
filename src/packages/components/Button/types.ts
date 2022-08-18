import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

import { TTypographyVariant } from '@components/Typography/types'

import { TColor } from '../../types'

export interface IButton
  extends Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'> {
  variant?: TTypographyVariant
  color?: TColor
  flex?: boolean
  active?: boolean
  loading?: boolean
}

type AnchorButtonProps = IButton & AnchorHTMLAttributes<HTMLAnchorElement>
type NativeButtonProps = IButton & ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = Partial<AnchorButtonProps | NativeButtonProps>
