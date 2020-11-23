import { Tag } from '@tryghost/content-api'
import { GetStaticProps, GetStaticPaths } from 'next'
import { HeaderTag, Layout, PostView } from '@components'
import { SEO } from '@meta'

import { getTagBySlug, getAllTags, getAllSettings, getPostsByTag, GhostSettings, GhostPostOrPage, GhostPostsOrPages } from '@lib/ghost'
import { resolveUrl } from '@utils/routing'

/**
 * Tag page (/tag/:slug)
 *
 * Loads all posts for the requested tag incl. pagination.
 *
 */

interface CmsData {
  tag: Tag
  posts: GhostPostsOrPages
  previewPosts?: GhostPostsOrPages
  prevPost?: GhostPostOrPage
  nextPost?: GhostPostOrPage
  settings: GhostSettings
}

interface TagIndexProps {
  cmsData: CmsData
}

const TagIndex = ({ cmsData }: TagIndexProps) => {
  const { tag, posts, settings } = cmsData
  const { meta_title, meta_description } = tag

  return (
    <>
      <SEO settings={settings} {...{ meta_title, meta_description }} />
      <Layout
        settings={settings}
        tags={[tag]}
        header={<HeaderTag {...{ settings, tag }} />}
      >
        <PostView posts={posts} />
      </Layout>
    </>
  )
}

export default TagIndex

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!(params && params.slug && Array.isArray(params.slug))) throw Error('getStaticProps: wrong parameters.')
  const [slug] = params.slug.reverse()

  const tag = await getTagBySlug(slug)
  const posts = await getPostsByTag(slug)
  const settings = await getAllSettings()

  return {
    props: {
      cmsData: {
        tag,
        posts,
        settings,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getAllTags()

  const paths = tags
    .map(({ slug, url }) => resolveUrl({ slug, url }))
    .filter(path => path.startsWith(`/tag/`))

  return {
    paths,
    fallback: false,
  }
}
