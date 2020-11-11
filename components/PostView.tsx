import React from 'react'

import { PostItems } from '@components'
import { PostsOrPages } from '@tryghost/content-api'

interface PostViewProps {
  posts: PostsOrPages
  isHome?: boolean
}

class PostView extends React.Component<PostViewProps> {
  posts: PostsOrPages
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
