import { FC } from 'react'

import clsx from 'clsx'

import Typography from '@components/Typography'

import styles from './FormParams.module.scss'

export interface FormParamsProps {
  label: string
  className?: string
}

const Input: FC<FormParamsProps> = ({ label, className, children }) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.label}>
        <Typography
          component="h2"
          color="label-tertiary"
          className={styles.labelText}>
          {label}
        </Typography>
        {children}
      </div>
    </div>
  )
}

export default Input
