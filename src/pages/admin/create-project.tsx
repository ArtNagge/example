import { useState } from 'react'

import Head from 'next/head'

import ProjectForm from '@modules/AdminModules/Login/ProjectForm'

import useHandleProject, {
  initStateCreate,
  picturesInitCreate,
  ProjectProps,
} from '@hooks/useHandleProject'

import { ShotsPicturesDto } from '@services/shots/types'

export default function AdminPageCreate() {
  const [pictures, setPictures] = useState<ShotsPicturesDto>(picturesInitCreate)

  const [project, setProject] = useState<ProjectProps>(initStateCreate)

  const {
    handleCategories,
    handleChangePicture,
    handleChangeInput,
    handleCreate,
    handleType,
  } = useHandleProject(setProject, setPictures, project, pictures)

  return (
    <>
      <Head>
        <title>Create Project</title>
      </Head>
      <ProjectForm
        project={project}
        pictures={pictures}
        handleType={handleType}
        handleSave={handleCreate}
        handleCategories={handleCategories}
        handleChangePicture={handleChangePicture}
        handleChangeInput={handleChangeInput}
      />
    </>
  )
}
