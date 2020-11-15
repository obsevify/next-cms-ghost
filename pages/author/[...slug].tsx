import { Author, PostOrPage, PostsOrPages } from '@tryghost/content-api'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Layout, PostView, HeaderAuthor } from '@components'

import { resolveUrl } from '@utils/routing'
import { SEO, authorSameAs } from '@meta/seo'


// Import CMS data
import { getAuthorBySlug, getAllAuthors, getAllSettings, getPostsByAuthor, GhostSettings } from '@lib/ghost'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!(params && params.slug && Array.isArray(params.slug))) throw Error('getStaticProps: wrong parameters.')
  const [slug] = params.slug.reverse()

  const author = await getAuthorBySlug(slug)
  const posts = await getPostsByAuthor(slug)
  const settings = await getAllSettings()

  return {
    props: {
      cmsData: {
        author,
        posts,
        settings,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const authors = await getAllAuthors()

  const paths = authors
    .map(({ slug, url }) => resolveUrl({ slug, url: url || undefined }))
    .filter(path => path.startsWith(`/author/`))

  return {
    paths,
    fallback: false,
  }
}

/**
 * Author page (/author/:slug)
 *
 * Loads all posts for the requested author incl. pagination.
 *
 */
interface CmsData {
  author: Author
  posts: PostsOrPages
  previewPosts?: PostsOrPages
  prevPost?: PostOrPage
  nextPost?: PostOrPage
  settings: GhostSettings
}

interface AuthorIndexProps {
  cmsData: CmsData
}

const AuthorIndex = ({ cmsData }: AuthorIndexProps) => {
  const { author, posts, settings } = cmsData
  const { name, bio, cover_image, profile_image } = author
  const description = bio || undefined
  const imageUrl = cover_image || profile_image || undefined
  const sameAs = authorSameAs(author)

  return (
    <>
      <SEO {...{ settings, description, imageUrl, sameAs, title: name }} />
      <Layout header={<HeaderAuthor {...{ settings, author }} />}
        {...{ settings, author }}
      >
        <PostView posts={posts} />
      </Layout>
    </>
  )
}

export default AuthorIndex
