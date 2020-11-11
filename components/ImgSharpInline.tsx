import { ComponentProps } from 'rehype-react'

//export interface ImgSharpInlineProps extends Node {
//  className: string
//  alt: string
//}

const ImgSharpInline = (props: ComponentProps) => {
  console.log(props.node)

  const className = props.node?.className as string
  const alt = props.node?.alt as string

  return (
    <img className={className} alt={alt} />
  )
}

export default ImgSharpInline
