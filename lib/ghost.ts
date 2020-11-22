import GhostContentAPI, { Params, PostOrPage, SettingsResponse, Pagination, PostsOrPages } from '@tryghost/content-api'
import { normalizePost } from '@lib/ghost-normalize'
import { Node } from 'unist'
import { collections as config } from '@routesConfig'
import { Collections } from '@lib/collections'
import { imageDimensions } from '@lib/images'

import { contactPage } from '@appConfig'

export interface NavItem {
  url: string
  label: string
}

interface BrowseResults<T> extends Array<T> {
  meta: { pagination: Pagination };
}

export interface GhostSettings extends SettingsResponse {
  secondary_navigation?: NavItem[]
}

export interface GhostPostOrPage extends PostOrPage {
  htmlAst?: Node | null
  featureImageMeta: {
    width: number
    height: number
  } | null
}

export interface GhostPostsOrPages extends BrowseResults<GhostPostOrPage> {
}

const api = new GhostContentAPI({
  url: process.env.CMS_GHOST_API_URL || '',
  key: process.env.CMS_GHOST_API_KEY || '',
  version: 'v3',
})

const postAndPageFetchOptions: Params = {
  limit: 'all',
  include: ['tags', 'authors', 'count.posts'],
  formats: ['html', 'plaintext'],
  order: ['featured DESC', 'published_at DESC'],
}

const tagAndAuthorFetchOptions: Params = {
  limit: 'all',
  include: 'count.posts',
}

const postAndPageSlugOptions: Params = {
  limit: 'all',
  fields: 'slug'
}

const excludePostOrPageBySlug = () => {
  if (!contactPage) return ''
  return 'slug:-contact'
}

// helpers
const attachImageDimensions = async (posts: PostsOrPages): Promise<GhostPostsOrPages> => {
  const { meta } = posts
  const imageMeta = await Promise.all(
    posts.map(post => imageDimensions(post.feature_image))
  )
  const results = posts.map((post, i) => ({
    ...post,
    featureImageMeta: imageMeta[i]
  }))
  return Object.assign(results, { meta })
}

// all data
export async function getAllSettings() {
  const settings = await api.settings.browse()
  settings.url = settings?.url?.replace(/\/$/, ``)
  return settings
}

export async function getAllTags() {
  return await api.tags.browse(tagAndAuthorFetchOptions)
}

export async function getAllAuthors() {
  return await api.authors.browse(tagAndAuthorFetchOptions)
}

export async function getAllPosts() {
  const posts = await api.posts.browse({
    ...postAndPageFetchOptions,
    filter: excludePostOrPageBySlug()
  })
  return await attachImageDimensions(posts)
}

export async function getAllPostSlugs() {
  const posts = await api.posts.browse(postAndPageSlugOptions)
  return posts.map(p => p.slug)
}

export async function getAllPages() {
  const pages = await api.pages.browse({
    ...postAndPageFetchOptions,
    filter: excludePostOrPageBySlug()
  })
  return await attachImageDimensions(pages)
}

// specific data by slug
export async function getTagBySlug(slug: string) {
  return await api.tags.read({
    ...tagAndAuthorFetchOptions,
    slug,
  })
}
export async function getAuthorBySlug(slug: string) {
  return await api.authors.read({
    ...tagAndAuthorFetchOptions,
    slug,
  })
}

export async function getPostBySlug(slug: string) {
  let result
  try {
    const post = await api.posts.read({
      ...postAndPageFetchOptions,
      slug,
    })
    const { url } = await getAllSettings()
    result = await normalizePost(post, url)
  } catch (error) {
    if (error.response?.status !== 404) throw new Error(error)
    return null
  }
  return result
}

export async function getPageBySlug(slug: string) {
  let result
  try {
    const page = await api.pages.read({
      ...postAndPageFetchOptions,
      slug,
    })
    const { url } = await getAllSettings()
    result = await normalizePost(page, url)
  } catch (error) {
    if (error.response?.status !== 404) throw new Error(error)
    return null
  }
  return result
}

// specific data by author/tag slug
export async function getPostsByAuthor(slug: string) {
  return await api.posts.browse({
    ...postAndPageFetchOptions,
    filter: `authors.slug:${slug}`,
  })
}

export async function getPostsByTag(slug: string, limit?: number, excludeId?: string) {
  const exclude = excludeId && `+id:-${excludeId}` || ``
  const posts = await api.posts.browse({
    ...postAndPageFetchOptions,
    ...limit && { limit: `${limit}` },
    filter: `tags.slug:${slug}${exclude}`,
  })
  return await attachImageDimensions(posts)
}

export async function getPosts({ limit }: { limit: number }) {
  const options = {
    ...postAndPageFetchOptions,
    limit: `${limit}`
  }
  const posts = await api.posts.browse(options)
  return await attachImageDimensions(posts)
}

// Collections
export const collections = new Collections<PostOrPage>(config)
