import GhostContentAPI, { Params, PostOrPage, SettingsResponse, Pagination } from '@tryghost/content-api'
import { normalizePost } from '@lib/ghost-normalize'
import { Node } from 'unist'
import { collections as config } from '@routesConfig'
import { Collections } from '@lib/collections'
import { imageDimensions } from '@lib/ghost-normalize'

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
  featureImageMeta?: {
    width: number
    height: number
  }
}

export interface GhostPostsOrPages extends BrowseResults<GhostPostOrPage> {
  htmlAst?: Node | null
  featureImageMeta?: {
    width: number
    height: number
  }
}

const api = new GhostContentAPI({
  url: process.env.CMS_GHOST_API_URL || '',
  key: process.env.CMS_GHOST_API_KEY || '',
  version: 'v3',
})

const postAndPageFetchOptions: Params = {
  limit: 'all',
  include: ['tags', 'authors'],
  formats: ['html', 'plaintext'],
}

const tagAndAuthorFetchOptions: Params = {
  limit: 'all',
  include: 'count.posts',
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
  const posts = await api.posts.browse(postAndPageFetchOptions)
  const imageMeta = await Promise.all(
    posts.map(post => imageDimensions(post.feature_image))
  )
  return posts.map((post, i) => ({
    ...post,
    featureImageMeta: imageMeta[i]
  }))
}

export async function getAllPages() {
  return await api.pages.browse(postAndPageFetchOptions)
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

  // ToDo: avoid duplicate callings
  const { url } = await getAllSettings()

  const post = await api.posts.read({
    ...postAndPageFetchOptions,
    slug,
  })

  const ghostPost: GhostPostOrPage = {
    ...post,
    htmlAst: null
  }

  return await normalizePost(ghostPost, url)
}

export async function getPageBySlug(slug: string) {

  // ToDo: avoid duplicate callings
  const { url } = await getAllSettings()

  const page = await api.pages.read({
    ...postAndPageFetchOptions,
    slug,
  })

  const ghostPage: GhostPostOrPage = {
    ...page,
    htmlAst: null
  }

  return await normalizePost(ghostPage, url)
}

// specific data by author/tag slug
export async function getPostsByAuthor(slug: string) {
  return await api.posts.browse({
    ...postAndPageFetchOptions,
    filter: `authors.slug:${slug}`,
  })
}

export async function getPostsByTag(slug: string) {
  return await api.posts.browse({
    ...postAndPageFetchOptions,
    filter: `tags.slug:${slug}`,
  })
}

// Collections
export const collections = new Collections<PostOrPage>(config)
