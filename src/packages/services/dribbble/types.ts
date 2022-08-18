export class DribbbleImagesRo {
  hidpi: string
  normal: string
  one_x: string
  two_x: string
  four_x: string
  teaser: string
}

export class DribbbleRo {
  animated: boolean
  description: string
  height: number
  html_url: string
  id: number
  images: DribbbleImagesRo
  title: string
  width: number
  published_at: Date
  updated_at: Date
}
