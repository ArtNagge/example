import { memo, useEffect, useState, VFC } from 'react'

import { motionInfo } from '@modules/HomeModules/FirstScreen/store'
import {
  useShotsComplete,
  useShotsCompleteCount,
  useShotsIsRequest,
  useShotsLive,
  useShotsLiveCount,
} from '@store/selectors/shots'
import { fetchShots, fetchShotsByFilter } from '@store/shots'
import { useAppDispatch } from '@store/store'
import { motion } from 'framer-motion'

import Button from '@components/Button'
import ProjectCard from '@components/ProjectCard'

import { ShotsTypeEnum } from '@services/shots/types'

import styles from './ShotsListScreen.module.scss'

type ShotsListScreenProps = {
  shotsType: ShotsTypeEnum
}

const limit = 5

const ShotsListScreen: VFC<ShotsListScreenProps> = ({ shotsType }) => {
  const [offset, setOffset] = useState(0)
  const dispatch = useAppDispatch()
  const shotsLive = useShotsLive()
  const shotsLiveCount = useShotsLiveCount()
  const shotsComplete = useShotsComplete()
  const shotsCompleteCount = useShotsCompleteCount()
  const isRequest = useShotsIsRequest()

  useEffect(() => {
    dispatch(fetchShots(shotsType, { type: shotsType, offset: 0, limit }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, shotsType])

  useEffect(() => {
    if (offset)
      dispatch(
        fetchShotsByFilter(shotsType, { type: shotsType, offset, limit }),
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset])

  useEffect(() => setOffset(0), [shotsType])

  const handleOffset = () => setOffset((prevOffset) => prevOffset + limit)

  const shots = shotsType === ShotsTypeEnum.LIVE ? shotsLive : shotsComplete
  const viewMore =
    shotsType === ShotsTypeEnum.LIVE
      ? shotsLive.length < shotsLiveCount
      : shotsComplete.length < shotsCompleteCount

  return (
    <div className={styles.base}>
      {shots.map((shot) => (
        <ProjectCard key={shot.id} {...shot} />
      ))}
      {viewMore && (
        <motion.div {...motionInfo}>
          <Button loading={isRequest} onClick={handleOffset}>
            load more
          </Button>
        </motion.div>
      )}
    </div>
  )
}

export default memo(ShotsListScreen)
