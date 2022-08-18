import { memo, useContext, VFC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import {
  motionSubtitle,
  motionTitle,
} from '@modules/HomeModules/FirstScreen/store'
import { getYear } from 'date-fns'
import { motion } from 'framer-motion'

import { MouseContext } from '@components/MouseContext'
import Typography from '@components/Typography'

import { ShotsRo } from '@services/shots/types'

import styles from './ProjectCard.module.scss'

type ProjectCardProps = ShotsRo & {
  link?: string
  target?: '_blank' | '_parent'
}

const ProjectCard: VFC<ProjectCardProps> = ({
  picture,
  title,
  categories,
  shotUrl,
  link,
  created_at,
  target = '_blank',
}) => {
  const { cursorChangeHandler } = useContext(MouseContext)

  return (
    <div className={styles.project}>
      <div className={styles.project_info}>
        <motion.div className={styles.project_info_tags} {...motionTitle}>
          <Typography
            className={styles.project_info_tags_item}
            component="span"
            variant="subtitle3"
            color="label-tertiary">
            {getYear(new Date(created_at))}
          </Typography>
          {categories.length > 0 &&
            categories.map((category) => (
              <Typography
                key={category.id}
                component="span"
                variant="subtitle3"
                className={styles.project_info_tags_item}
                color="label-tertiary">
                {category.name}
              </Typography>
            ))}
        </motion.div>
        <motion.div
          onMouseEnter={() => cursorChangeHandler('hovered')}
          onMouseLeave={() => cursorChangeHandler('')}
          className={styles.project_info_title}
          {...motionTitle}>
          <Link scroll={false} href={link || shotUrl} passHref>
            <Typography
              component="h2"
              className={styles.project_info_title_text}
              variant="head1Large"
              color="label-secondary">
              {title}
            </Typography>
          </Link>
        </motion.div>
        {picture && (
          <Link scroll={false} href={link || shotUrl} passHref>
            <motion.a
              target={target}
              className={styles.project_info_image}
              {...motionSubtitle}>
              <Image
                onMouseEnter={() => cursorChangeHandler('hovered')}
                onMouseLeave={() => cursorChangeHandler('')}
                src={picture}
                layout="fill"
                loading="eager"
                alt="project_image"
              />
            </motion.a>
          </Link>
        )}
      </div>
    </div>
  )
}

export default memo(ProjectCard)
