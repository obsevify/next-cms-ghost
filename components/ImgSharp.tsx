interface ImgSharpProps {
  srcImg: string
  srcClass?: string
  title?: string
}

const ImgSharp = ({ srcClass, srcImg, title }: ImgSharpProps) => (
  <img className={srcClass} src={srcImg} alt={title} />
)

export default ImgSharp
