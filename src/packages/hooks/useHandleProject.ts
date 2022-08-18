import { ChangeEvent, MouseEvent } from 'react'

import { useRouter } from 'next/dist/client/router'

import { CategoriesRo } from '@services/categories/types'
import Shots from '@services/shots/Shots'
import {
  ShotsDto,
  ShotsPicturesDto,
  ShotsTypeEnum,
} from '@services/shots/types'

export type ProjectProps = Omit<ShotsDto, 'id' | 'picture'> & {
  id?: string
}

export const picturesInitCreate = {
  picture: null,
}

export const initStateCreate: ProjectProps = {
  shotUrl: '',
  title: '',
  categories: [],
  type: ShotsTypeEnum.COMPLETE,
}

export default function useHandleProject(
  setProject,
  setPictures,
  project: ProjectProps,
  pictures: ShotsPicturesDto,
) {
  const router = useRouter()

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e

    setProject((prevCreate) => ({ ...prevCreate, [name]: value }))
  }

  const handleCategories = (tag: CategoriesRo) => {
    setProject((prevCreate) => {
      const findIndex = prevCreate.categories.findIndex(
        (category) => category.id === tag.id,
      )

      const { categories } = prevCreate

      return {
        ...prevCreate,
        categories:
          findIndex > -1
            ? [
                ...[...categories].splice(0, findIndex),
                ...[...categories].splice(findIndex + 1),
              ]
            : [...categories, tag],
      }
    })
  }

  const handleType = (type: ShotsTypeEnum) => {
    setProject((prevCreate) => ({
      ...prevCreate,
      type,
    }))
  }

  const handleChangePicture = (file: File, name: string) => {
    setPictures((prevPictures) => ({
      ...prevPictures,
      [name]: file,
    }))
  }

  const handleCreate = async (evt: React.FormEvent) => {
    evt.preventDefault()

    try {
      const formData = new FormData()

      formData.append('files', pictures.picture)

      const {
        data: { locations },
      } = await Shots.uploadShotPicture(formData)

      const {
        data: { id, title },
      } = await Shots.uploadShot({
        ...project,
        picture: locations[0]?.location || '',
      })

      alert(`Проект с id -> ${id} и названием ${title} успешно создан`)
      setProject(initStateCreate)
      setPictures(picturesInitCreate)
    } catch (error) {
      alert(error)
    }
  }

  const handleSave = async (evt: React.FormEvent) => {
    evt.preventDefault()

    try {
      const updatePictures = await Promise.all(
        Object.keys(pictures)
          .map((key) => {
            if (!(typeof pictures[key] === 'string'))
              return { name: key, file: pictures[key] }
          })
          .filter(Boolean),
      )

      const formData = new FormData()

      updatePictures.forEach(({ file }) => formData.append('files', file))

      const {
        data: { locations },
      } = formData.getAll('files').length
        ? await Shots.uploadShotPicture(formData)
        : { data: { locations: [] } }

      const { id, ...prj } = project

      const {
        data: { title, picture, shotUrl, categories, type },
      } = await Shots.updateShot(id, {
        ...prj,
        ...(locations.length &&
          updatePictures
            .map(({ name }, index) => ({
              [name]: locations[index].location,
            }))
            .reduce((acc, a) => {
              return { ...acc, ...a }
            }, {})),
      })

      alert(`Проект с id -> ${id} и названием ${title} успешно обновлен`)
      setProject({ title, shotUrl, categories, type } as ProjectProps)
      setPictures({ picture })
    } catch (error) {
      alert(error)
    }
  }

  const handleRemove = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault()

    try {
      await Shots.removeShot(project.id)

      router.push('/admin/projects')
    } catch (error) {
      alert(error)
    }
  }

  return {
    handleCategories,
    handleChangePicture,
    handleChangeInput,
    handleCreate,
    handleSave,
    handleType,
    handleRemove,
  }
}
