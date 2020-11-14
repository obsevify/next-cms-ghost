import React from 'react'

import { PostItems } from '@components'
import { GhostPostsOrPages } from '@lib/ghost'

interface PostViewProps {
  posts: GhostPostsOrPages
  isHome?: boolean
}

class PostView extends React.Component<PostViewProps> {
  posts: GhostPostsOrPages
  isHome?: boolean

  constructor(props: PostViewProps) {
    super(props)
    this.posts = props.posts
    this.isHome = props.isHome
  }

  render() {
    const { posts, isHome } = this.props

    return (
      <div className="inner posts">
        <div className="post-feed">
          <PostItems posts={posts} isHome={isHome} />
        </div>
      </div>
    )
  }
}

export default PostView
