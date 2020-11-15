import { GetStaticProps, GetStaticPaths } from 'next'
import { Post, Page } from '@components'

import { PostOrPage } from '@tryghost/content-api'
import { GhostPostOrPage, GhostSettings } from '@lib/ghost'

import { getPostBySlug, getPageBySlug, getAllPosts, getAllPages, getAllSettings } from '@lib/ghost'
import { resolveUrl } from '@utils/routing'
import { collections } from '@lib/collections'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!(params && params.slug && Array.isArray(params.slug))) throw Error('getStaticProps: wrong parameters.')
  const [slug] = params.slug.reverse()

  const settings = await getAllSettings()

  // ? Can we get detect page or post from params instead?
  let post = null
  let page = null
  try {
    post = await getPostBySlug(slug)
  } catch {
    page = await getPageBySlug(slug)
  }

  return {
    props: {
      cmsData: {
        settings,
        post,
        page,
        isPost: !!post,
        previewPosts: [],
        prevPost: null,
        nextPost: null,
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
  return {
    paths: [...postRoutes, ...pageRoutes],
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
  previewPosts?: PostOrPage[]
  prevPost?: PostOrPage
  nextPost?: PostOrPage
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
