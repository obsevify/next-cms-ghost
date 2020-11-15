import { Commento } from '@components'

interface CommentsProps {
  id: string
}

const Comments = ({ id }: CommentsProps) => (
  <section>
    <Commento id={id} />
  </section>
)

export default Comments
