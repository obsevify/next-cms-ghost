import React from 'react'

import { PostItems } from '@components/PostItems'
import { GhostPostsOrPages, GhostSettings } from '@lib/ghost'

interface PostViewProps {
  settings: GhostSettings
  posts: GhostPostsOrPages
  isHome?: boolean
}

export class PostView extends React.Component<PostViewProps> {
  posts: GhostPostsOrPages
  isHome?: boolean

  constructor(props: PostViewProps) {
    super(props)
    this.posts = props.posts
    this.isHome = props.isHome
  }

  render() {
    return (
      <div className="inner posts">
        <div className="post-feed">
          <PostItems {...this.props } />
        </div>
      </div>
    )
  }
}
