import { PostsOrPages } from '@tryghost/content-api'
import { PostCard } from '@components'

interface PostItemsProps {
  posts: PostsOrPages
  isHome?: boolean
}

const PostItems = ({ posts, isHome }: PostItemsProps) => (
  <>
    {posts.map((post, i) => (
      <PostCard key={i} post={post} num={i} isHome={isHome} />
    ))}
  </>
)

export default PostItems
