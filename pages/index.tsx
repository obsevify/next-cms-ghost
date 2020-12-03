import { GetStaticProps, GetStaticPropsContext } from 'next'
import fs from 'fs'

import { Layout } from '@components/Layout'
import { PostView } from '@components/PostView'
import { HeaderIndex } from '@components/HeaderIndex'
import { StickyNavContainer } from '@effects/StickyNavContainer'
import { SEO } from '@meta/seo'

import { siteUrl } from '@lib/environment'
import { getAllPosts, getAllSettings, GhostPostOrPage, GhostPostsOrPages, GhostSettings } from '@lib/ghost'
import { seoImage, ISeoImage } from '@meta/seoImage'

import { generateRSSFeed } from '@utils/rss'
import { rssFeed } from '@appConfig'



/**
 * Main index page (home page)
 *
 * Loads all posts from CMS
 *
 */

interface CmsData {
  siteUrl: string
  posts: GhostPostsOrPages
  settings: GhostSettings
  seoImage: ISeoImage
  previewPosts?: GhostPostsOrPages
  prevPost?: GhostPostOrPage
  nextPost?: GhostPostOrPage
}

interface IndexProps {
  cmsData: CmsData
}

export default function Index({ cmsData }: IndexProps) {
  const { siteUrl, settings, posts, seoImage } = cmsData
  console.log(settings)
  return (
    <>
      <SEO {...{ siteUrl, settings, seoImage }} />
      <StickyNavContainer
        throttle={300}
        activeClass="fixed-nav-active"
        render={(sticky) => (
          <Layout {...{ isHome: true, siteUrl, sticky, settings }} header={<HeaderIndex {...{ siteUrl, settings }} />}>
            <PostView {...{ posts, isHome: true }} />
          </Layout>
        )}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  let settings
  let posts: GhostPostsOrPages | []

  try {
    settings = await getAllSettings()
    posts = await getAllPosts()
  } catch (error) {
    throw new Error('Index creation failed.')
  }

  if (rssFeed) {
    const rss = generateRSSFeed({ posts, settings })
    fs.writeFileSync('./public/rss.xml', rss)
  }

  const cmsData = {
    siteUrl,
    settings,
    posts,
    seoImage: await seoImage()
  }

  return {
    props: {
      cmsData,
    },
  }
}
