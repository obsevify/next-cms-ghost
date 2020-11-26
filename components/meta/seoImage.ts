import { siteImage, siteUrl } from '@siteConfig'
import url from 'url'

import { imageDimensions } from '@lib/images'

export interface ISeoImage {
  url: string
  width: number
  height: number
}

interface SeoImageProps {
  imageUrl?: string | null
  imageName?: string
}

export const seoImage = async (props?: SeoImageProps): Promise<ISeoImage> => {
  const {imageUrl, imageName } = props || {}
  const imgUrl = imageUrl || url.resolve(siteUrl, imageName || siteImage)

  const defaultDimensions =  { width: 1200, height: 800}
  const { width, height } = await imageDimensions(imgUrl) || defaultDimensions

  return {
    url: imgUrl,
    width,
    height
  }
}
