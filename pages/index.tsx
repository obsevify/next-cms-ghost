import { Layout, PostView, HeaderIndex } from '@components'
import { StickyNavContainer, OverlayContainer } from '@effects'
import { SEO } from '@meta'

import { getAllPosts, getAllSettings, GhostSettings } from '@lib/ghost'
import { PostOrPage, PostsOrPages } from '@tryghost/content-api'

import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts()
  const settings = await getAllSettings()

  const cmsData = {
    settings,
    posts,
  }

  return {
    props: {
      cmsData,
    },
  }
}

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost
 *
 */

interface CmsData {
  posts: PostsOrPages
  settings: GhostSettings
  previewPosts?: PostsOrPages
  prevPost?: PostOrPage
  nextPost?: PostOrPage
}

interface IndexProps {
  cmsData: CmsData
}

export default function Index({ cmsData }: IndexProps) {
  const { settings, posts } = cmsData

  return (
    <>
      <SEO settings={settings} />
      <StickyNavContainer
        throttle={300}
        activeClass="fixed-nav-active"
        render={(sticky) => (
          <OverlayContainer
            render={(overlay) => (
              <Layout {...{ sticky, overlay, settings }} isHome={true} header={<HeaderIndex {...{ overlay, settings }} />}>
                <PostView posts={posts} isHome={true} />
              </Layout>
            )}
          />
        )}
      />
    </>
  )
}
