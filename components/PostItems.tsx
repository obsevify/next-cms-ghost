import { PostCard } from '@components'
import { GhostPostsOrPages } from '@lib/ghost'

interface PostItemsProps {
  posts: GhostPostsOrPages
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
