// DTO

export enum ShotsTypeEnum {
  'LIVE' = 'live',
  'COMPLETE' = 'complete',
}

export class ShotsFilterDto {
  categories?: string[] | string
  type?: ShotsTypeEnum
  offset?: number
  limit?: number
}

export class ShotsPicturesDto {
  picture: File | string
}

export class ShotsDto implements Readonly<ShotsDto> {
  picture: string
  title: string
  shotUrl: string
  created_at?: string
  type?: ShotsTypeEnum
  categories: CategoriesCreateRo[]
}

export class ShotsUpdateDto {
  picture?: string
  title?: string
  shotUrl?: string
  categories?: CategoriesCreateRo[]
}

// RO

export class CategoriesCreateRo implements Readonly<CategoriesCreateRo> {
  id: string
  name: string
}

export class ShotsRo extends ShotsDto {
  id: string
}

export class ShotsListAndCountRo {
  data: ShotsRo[]
  count: number
}

export class ShotPicturesUploadRo {
  locations: ShotPictureUploadRo[]
}

export class ShotPictureUploadRo {
  location: string
}
