import Image from 'next/image'
import { ComponentProps } from 'rehype-react'
import { Dimensions } from '@lib/images'

interface PropertyProps {
  src: string
  className?: string[]
}

export const NextImage = (props: ComponentProps) => {
  const { node } = props
  if (!node) return null
  const imageDimensions = node.imageDimensions as Dimensions
  const { src, className: classArray } = node.properties as PropertyProps
  const className = classArray?.join(' ')
  //console.log(className)

  return (
    <>
      <div {...{ className }}>
        <Image layout="responsive" src={src} {...{ className, ...imageDimensions }} />
      </div>

      <div {...{ className }}>
        <img src={src} {...{ className }} />
      </div>
    </>
  )
}

