import { PostCard } from '@components/PostCard'
import { GhostPostsOrPages } from '@lib/ghost'

interface PostItemsProps {
  posts: GhostPostsOrPages
  isHome?: boolean
}

export const PostItems = ({ posts, isHome }: PostItemsProps) => (
  <>
    {posts.map((post, i) => (
      <PostCard key={i} post={post} num={i} isHome={isHome} />
    ))}
  </>
)
