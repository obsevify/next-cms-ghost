import { GetStaticProps, GetStaticPaths } from 'next'
import { Post, Page } from '@components'

import { getPostsByTag, getTagBySlug, GhostPostOrPage, GhostPostsOrPages, GhostSettings } from '@lib/ghost'

import { getPostBySlug, getPageBySlug, getAllPosts, getAllPages, getAllSettings, getAllPostSlugs } from '@lib/ghost'
import { resolveUrl } from '@utils/routing'
import { collections } from '@lib/collections'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!(params && params.slug && Array.isArray(params.slug))) throw Error('getStaticProps: wrong parameters.')
  const [slug] = params.slug.reverse()

  const settings = await getAllSettings()

  let post: GhostPostOrPage | null = null
  let page: GhostPostOrPage | null = null

  post = await getPostBySlug(slug)
  const isPost = !!post
  if (!isPost) {
    page = await getPageBySlug(slug)
  }
  if (!post && !page) throw new Error(`Expected post or page for slug: ${slug}`)

  // getTagBySlug contains count info
  if (post?.primary_tag) {
    const primaryTag = await getTagBySlug(post?.primary_tag.slug)
    post.primary_tag = primaryTag
  }
  let previewPosts: GhostPostsOrPages | never[] = []
  let prevPost: GhostPostOrPage | null = null
  let nextPost: GhostPostOrPage | null = null

  if (isPost && post?.id && post?.slug) {
    const tagSlug = post?.primary_tag?.slug
    previewPosts = tagSlug && await getPostsByTag(tagSlug, 3, post?.id) || []

    const postSlugs = await getAllPostSlugs()
    const index = postSlugs.indexOf(post?.slug)
    const prevSlug = index > 0 ? postSlugs[index - 1] : null
    const nextSlug = index < postSlugs.length - 1 ? postSlugs[index + 1] : null

    prevPost = prevSlug && await getPostBySlug(prevSlug) || null
    nextPost = nextSlug && await getPostBySlug(nextSlug) || null
  }

  return {
    props: {
      cmsData: {
        settings,
        post,
        page,
        isPost,
        previewPosts,
        prevPost,
        nextPost,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()
  const pages = await getAllPages()

  const postRoutes = posts.map(post => {
    const collectionPath = collections.getCollectionByNode(post)
    const { slug, url } = post
    return resolveUrl({ collectionPath, slug, url })
  })
  const pageRoutes = pages.map(({ slug, url }) => resolveUrl({ slug, url }))
  const paths = [...postRoutes, ...pageRoutes]

  return {
    paths,
    fallback: false,
  }
}

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */

interface CmsDataCore {
  post: GhostPostOrPage
  page: GhostPostOrPage
  settings: GhostSettings
  previewPosts?: GhostPostsOrPages
  prevPost?: GhostPostOrPage
  nextPost?: GhostPostOrPage
}

interface CmsData extends CmsDataCore {
  isPost: boolean
}

interface PostOrPageProps {
  cmsData: CmsData
}

const PostOrPageIndex = ({ cmsData }: PostOrPageProps) => {
  const { isPost } = cmsData

  if (isPost) {
    return <Post cmsData={cmsData} />
  } else {
    return <Page cmsData={cmsData} />
  }
}

export default PostOrPageIndex
