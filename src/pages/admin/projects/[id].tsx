import { useEffect, useState, VFC } from 'react'
import { useSelector } from 'react-redux'

import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'

import ProjectForm from '@modules/AdminModules/Login/ProjectForm'
import { fetchShotsById } from '@store/shots'
import { RootState, useAppDispatch } from '@store/store'

import useHandleProject, {
  initStateCreate,
  picturesInitCreate,
  ProjectProps,
} from '@hooks/useHandleProject'

import { ShotsPicturesDto } from '@services/shots/types'

const AdminPageProjectId: VFC = () => {
  const router = useRouter()
  const { id } = router.query

  const dispatch = useAppDispatch()
  const shotsInfo = useSelector(
    (state: RootState) => state.shotsReducer?.info?.base,
  )

  const [pictures, setPictures] = useState<ShotsPicturesDto>(picturesInitCreate)
  const [project, setProject] = useState<ProjectProps>(initStateCreate)

  const {
    handleCategories,
    handleChangePicture,
    handleChangeInput,
    handleSave,
    handleRemove,
    handleType,
  } = useHandleProject(setProject, setPictures, project, pictures)

  useEffect(() => {
    dispatch(fetchShotsById(String(id)))
  }, [dispatch, id])

  useEffect(() => {
    if (shotsInfo) {
      const { categories, title, shotUrl, picture, id, type } = shotsInfo

      setProject({ categories, title, shotUrl, id, type })
      setPictures({ picture })
    }
  }, [shotsInfo])

  return (
    <>
      <Head>
        <title>{shotsInfo?.title}</title>
      </Head>
      <ProjectForm
        project={project}
        pictures={pictures}
        handleType={handleType}
        handleSave={handleSave}
        handleRemove={handleRemove}
        handleCategories={handleCategories}
        handleChangeInput={handleChangeInput}
        handleChangePicture={handleChangePicture}
      />
    </>
  )
}
export default AdminPageProjectId
