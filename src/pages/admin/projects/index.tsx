import { useEffect } from 'react'

import Head from 'next/head'

import { useShotsComplete } from '@store/selectors/shots'
import { fetchShots } from '@store/shots'
import { useAppDispatch } from '@store/store'

import ProjectCard from '@components/ProjectCard'

import { ShotsTypeEnum } from '@services/shots/types'

export default function AdminPageProjects() {
  const dispatch = useAppDispatch()
  const shots = useShotsComplete()

  useEffect(() => {
    dispatch(fetchShots(ShotsTypeEnum.COMPLETE))
  }, [dispatch])

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      {shots.map((shot) => (
        <div key={shot.id} style={{ width: '100%', marginBottom: '140px' }}>
          <ProjectCard {...shot} link={`/admin/projects/${shot.id}`} />
        </div>
      ))}
    </>
  )
}
