import { GetStaticProps, GetStaticPaths } from 'next'
import { Post } from '@components/Post'
import { Page } from '@components/Page'

import { getPostsByTag, getTagBySlug, GhostPostOrPage, GhostPostsOrPages, GhostSettings } from '@lib/ghost'

import { getPosts, getPostBySlug, getPageBySlug, getAllPosts, getAllPages, getAllSettings, getAllPostSlugs } from '@lib/ghost'
import { resolveUrl } from '@utils/routing'
import { collections } from '@lib/collections'

import { processEnv } from '@lib/processEnv'
import { customPage } from '@appConfig'
import { ContactPage, defaultPage } from '@lib/contactPageDefaults'
import { imageDimensions } from '@lib/images'

import { Contact } from '@components/ContactPage'
import { ISeoImage, seoImage } from '@meta/seoImage'

/**
 *
 * Renders a single post or page and loads all content.
 *
 */

interface CmsDataCore {
  post: GhostPostOrPage
  page: GhostPostOrPage
  contactPage: ContactPage
  settings: GhostSettings
  seoImage: ISeoImage
  previewPosts?: GhostPostsOrPages
  prevPost?: GhostPostOrPage
  nextPost?: GhostPostOrPage
}

interface CmsData extends CmsDataCore {
  isPost: boolean,
}

interface PostOrPageProps {
  cmsData: CmsData
}

const PostOrPageIndex = ({ cmsData }: PostOrPageProps) => {
  const { isPost, contactPage } = cmsData

  if (isPost) {
    return <Post {...{ cmsData }} />
  } else if (!!contactPage) {
    const { contactPage, previewPosts, settings, seoImage } = cmsData
    return <Contact cmsData={{ page: contactPage, previewPosts, settings, seoImage }} />
  } else {
    return <Page cmsData={cmsData} />
  }
}

export default PostOrPageIndex

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!(params && params.slug && Array.isArray(params.slug))) throw Error('getStaticProps: wrong parameters.')
  const [slug] = params.slug.reverse()

  const settings = await getAllSettings()

  let post: GhostPostOrPage | null = null
  let page: GhostPostOrPage | null = null
  let contactPage: ContactPage | null = null

  post = await getPostBySlug(slug)
  const isPost = !!post
  if (!isPost) {
    page = await getPageBySlug(slug)
  } else if (post?.primary_tag) {
    const primaryTag = await getTagBySlug(post?.primary_tag.slug)
    post.primary_tag = primaryTag
  }

  // Add custom contact page
  let isContactPage = false
  if (processEnv.contactPage) {
    contactPage = { ...defaultPage, ...customPage }
    isContactPage = contactPage?.slug === slug
    if (!isContactPage) contactPage = null

    const url = contactPage?.feature_image
    if (!contactPage?.featureImage && contactPage && url) {
      const dimensions = await imageDimensions(url)
      if (dimensions) contactPage.featureImage = { url, dimensions }
    }
  }
  if (!post && !page && !isContactPage) throw new Error(`Expected post or page for slug: ${slug}`)

  let previewPosts: GhostPostsOrPages | never[] = []
  let prevPost: GhostPostOrPage | null = null
  let nextPost: GhostPostOrPage | null = null

  if (isContactPage) {
    previewPosts = await getPosts({ limit: 3 })
  } else if (isPost && post?.id && post?.slug) {
    const tagSlug = post?.primary_tag?.slug
    previewPosts = tagSlug && await getPostsByTag(tagSlug, 3, post?.id) || []

    const postSlugs = await getAllPostSlugs()
    const index = postSlugs.indexOf(post?.slug)
    const prevSlug = index > 0 ? postSlugs[index - 1] : null
    const nextSlug = index < postSlugs.length - 1 ? postSlugs[index + 1] : null

    prevPost = prevSlug && await getPostBySlug(prevSlug) || null
    nextPost = nextSlug && await getPostBySlug(nextSlug) || null
  }

  const siteUrl = settings.processEnv.siteUrl
  const imageUrl = (post || contactPage || page)?.feature_image || undefined
  const image = await seoImage({ siteUrl, imageUrl })

  return {
    props: {
      cmsData: {
        settings,
        post,
        page,
        contactPage,
        isPost,
        seoImage: image,
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

  const postRoutes = (posts as GhostPostsOrPages).map(post => {
    const collectionPath = collections.getCollectionByNode(post)
    const { slug, url } = post
    return resolveUrl({ collectionPath, slug, url })
  })

  let contactPageRoute: string | null = null
  if (processEnv.contactPage) {
    const contactPage = { ...defaultPage, ...customPage }
    const { slug, url } = contactPage
    contactPageRoute = resolveUrl({ slug, url })
  }

  const customRoutes = contactPageRoute && [contactPageRoute] || []
  const pageRoutes = (pages as GhostPostsOrPages).map(({ slug, url }) => resolveUrl({ slug, url }))
  const paths = [...postRoutes, ...pageRoutes, ...customRoutes]

  return {
    paths,
    fallback: false,
  }
}
