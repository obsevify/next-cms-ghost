import { Commento } from '@components/Commento'

interface CommentsProps {
  id: string
}

export const Comments = ({ id }: CommentsProps) => (
  <section>
    <Commento id={id} />
  </section>
)
