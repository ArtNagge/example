import {
  InputHTMLAttributes,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
  VFC,
} from 'react'

import { motionTitle } from '@modules/HomeModules/FirstScreen/store'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import { MouseContext } from '@components/MouseContext'
import Typography from '@components/Typography'

import { useMediaXL } from '@hooks'

import styles from './Input.module.scss'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  required?: boolean
  label: string
  className?: string
  hideArrows?: boolean
  mask?: {
    validator?: string
    options?: Inputmask.Options
  }
}

const Input: VFC<InputProps> = ({
  label,
  value,
  size,
  mask,
  hideArrows,
  className,
  required,
  ...props
}) => {
  const { matchDownXl } = useMediaXL()
  const { cursorChangeHandler } = useContext(MouseContext)

  const inputRef = useRef<HTMLInputElement>(null)
  const [inFocus, setInFocus] = useState(false)
  const [inError, setInError] = useState(false)

  useEffect(() => {
    const tempInputRef = inputRef.current
    let _Inputmask: Inputmask.Static = null

    if (!!mask) {
      ;(async () => {
        _Inputmask = (await import('inputmask')).default
      })()
    }

    const handleFocus = () => {
      setInFocus(true)

      if (!!mask && _Inputmask) {
        _Inputmask({
          mask: mask.validator,
          ...mask.options,
          showMaskOnHover: false,
        }).mask(tempInputRef)
      }
    }

    const handleBlur = () => {
      setInFocus(false)

      if (required && !inputRef.current.value) return setInError(true)

      setInError(false)
    }

    tempInputRef?.addEventListener('focus', handleFocus)
    tempInputRef?.addEventListener('blur', handleBlur)

    return () => {
      tempInputRef?.removeEventListener('focus', handleFocus)
      tempInputRef?.removeEventListener('blur', handleBlur)
    }
  }, [mask])

  return (
    <motion.div
      {...motionTitle}
      className={clsx(
        styles.wrapper,
        {
          [styles.inFocus]: inFocus,
          [styles.inError]: inError,
        },
        className,
      )}>
      <label className={styles.label}>
        <Typography
          component="h3"
          {...(matchDownXl && { variant: 'subtitle2' })}
          color="label-tertiary"
          className={styles.labelText}>
          {label}
        </Typography>
        <input
          ref={inputRef}
          onMouseMove={() => cursorChangeHandler('hovered')}
          onMouseLeave={() => cursorChangeHandler('')}
          className={clsx({
            [styles.input]: true,
            [styles.hideArrows]: props.type === 'number' && hideArrows,
          })}
          value={value}
          {...props}
        />
        {inError && (
          <Typography
            variant="head3"
            component="span"
            color="label-red"
            className={styles.labelTextError}>
            what about this one?
          </Typography>
        )}
      </label>
    </motion.div>
  )
}

export default memo(Input)
