import { siteImage, siteUrl } from '@siteConfig'
import { resolve } from 'url'

import { imageDimensions, Dimensions } from '@lib/images'

export interface ISeoImage {
  url: string
  dimensions: Dimensions
}

interface SeoImageProps {
  imageUrl?: string | null
  imageName?: string
}

export const seoImage = async (props?: SeoImageProps): Promise<ISeoImage> => {
  const { imageUrl, imageName } = props || {}
  const url = imageUrl || resolve(siteUrl, imageName || siteImage)

  const defaultDimensions = { width: 1200, height: 800 }
  const dimensions = await imageDimensions(url) || defaultDimensions

  return { url, dimensions }
}
