import { FC, memo, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import clsx from 'clsx'

import Typography from '@components/Typography'

import { ShotsPicturesDto } from '@services/shots/types'

import styles from './Uploader.module.scss'

export interface UploaderProps {
  size: string
  value: File | string
  name: keyof ShotsPicturesDto
  handlerUpload: (file: File, name: keyof ShotsPicturesDto) => void
  classes?: string
}

const Uploader: FC<UploaderProps> = ({
  size,
  classes,
  name,
  handlerUpload,
  value,
}) => {
  const [picture, setPicture] = useState<File | string>()
  const refInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPicture(value)
  }, [value])

  const handleChange = () => {
    const [file] = refInput.current.files

    if (file) handlerUpload(file, name)
  }

  return (
    <label
      className={clsx(styles.uploader, classes, {
        [styles.uploader]: true,
      })}>
      <input
        accept="image/*"
        ref={refInput}
        type="file"
        onChange={handleChange}
      />
      <div className={styles.uploader_container}>
        {picture ? (
          <Image
            src={
              typeof picture === 'string'
                ? picture
                : URL.createObjectURL(picture)
            }
            layout="fill"
            alt="image"
          />
        ) : (
          <>
            <Typography
              component="h2"
              color="label-tertiary"
              className={styles.uploader_heading}>
              add a photo
            </Typography>
            <Typography component="p" color="label-quaternary">
              {size}
            </Typography>
          </>
        )}
      </div>
    </label>
  )
}

export default memo(Uploader)
