import { ChangeEvent, MouseEvent, useEffect, VFC } from 'react'
import { useSelector } from 'react-redux'

import { fetchCategoriesIfNeeded } from '@store/categories'
import { RootState, useAppDispatch } from '@store/store'

import Button from '@components/Button'
import FormParams from '@components/FormParams'
import Input from '@components/Input'
import Typography from '@components/Typography'
import Uploader from '@components/Uploader'

import { useMediaXL } from '@hooks'
import { ProjectProps } from '@hooks/useHandleProject'

import { CategoriesRo } from '@services/categories/types'
import { ShotsPicturesDto, ShotsTypeEnum } from '@services/shots/types'

import styles from './project-form.module.scss'
import { TYPES_LIST } from './store'

interface ProjectFormProps {
  project: ProjectProps
  pictures: ShotsPicturesDto
  handleChangePicture(file: File, name: string): void
  handleCategories(tag: CategoriesRo): void
  handleRemove?(e: MouseEvent<HTMLButtonElement>): void
  handleChangeInput(e: ChangeEvent<HTMLInputElement>): void
  handleSave(e: React.FormEvent): void
  handleType(type: ShotsTypeEnum): void
}

const ProjectForm: VFC<ProjectFormProps> = ({
  project: { categories, type: projectType, shotUrl, title },
  pictures: { picture },
  handleChangePicture,
  handleCategories,
  handleChangeInput,
  handleSave,
  handleRemove,
  handleType,
}) => {
  const { matchDownXl } = useMediaXL()
  const dispatch = useAppDispatch()
  const categoriesList = useSelector(
    (state: RootState) => state.categoriesReducer.list,
  )

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded())
  }, [dispatch])

  return (
    <div className={styles.create_shot}>
      <form className={styles.create_shot_form} onSubmit={handleSave}>
        <Typography
          className={styles.create_shot_head}
          component="h1"
          color="label-secondary">
          Add a new project
        </Typography>
        <Input
          label="behance link"
          name="shotUrl"
          placeholder="behance.net/project"
          onChange={handleChangeInput}
          value={shotUrl}
        />
        <Input
          label="project name"
          name="title"
          placeholder="my little ponny"
          onChange={handleChangeInput}
          value={title}
        />
        <FormParams label="tags" className={styles.create_shot_tags}>
          {categoriesList?.map((category) => (
            <Button
              type="button"
              className={styles.create_shot_tags_button}
              active={!!categories.find((tag) => tag.id === category.id)}
              onClick={() => handleCategories(category)}
              key={category.id}>
              {category.name}
            </Button>
          ))}
        </FormParams>
        <FormParams label="type" className={styles.create_shot_tags}>
          {TYPES_LIST.map((type) => (
            <Button
              type="button"
              className={styles.create_shot_tags_button}
              active={type.value === projectType}
              onClick={() => handleType(type.value)}
              key={type.value}>
              {type.name}
            </Button>
          ))}
        </FormParams>
        <Uploader
          value={picture}
          handlerUpload={handleChangePicture}
          name="picture"
          size="JPEG, 1920*480"
          classes={styles.create_shot_uploader}
        />
        <div className={styles.create_shot_buttons}>
          <Button flex={matchDownXl} type="submit">
            post project
          </Button>
          {handleRemove && (
            <Button
              onClick={handleRemove}
              flex={matchDownXl}
              color="bg-red"
              type="button">
              delete project
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
