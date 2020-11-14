import { GetStaticProps } from 'next'
import fs from 'fs'

import { Layout, PostView, HeaderIndex } from '@components'
import { StickyNavContainer, OverlayContainer } from '@effects'
import { SEO } from '@meta'

import { getAllPosts, getAllSettings, GhostPostOrPage, GhostPostsOrPages, GhostSettings } from '@lib/ghost'

import { generateRSSFeed } from '@utils/rss'
import { rssFeed } from '@appConfig'

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts()
  const settings = await getAllSettings()

  if (rssFeed) {
    const rss = generateRSSFeed({ posts, settings })
    fs.writeFileSync('./public/rss.xml', rss)
  }

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
  posts: GhostPostsOrPages
  settings: GhostSettings
  previewPosts?: GhostPostsOrPages
  prevPost?: GhostPostOrPage
  nextPost?: GhostPostOrPage
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
