import Rehype from 'rehype'
import { Node } from 'unist'
import visit from 'unist-util-visit'
import { GhostPostOrPage } from '@lib/ghost'
import { cloneDeep } from 'lodash'
import probe from 'probe-image-size'

const rehype = Rehype().use({ settings: { fragment: true, space: `html`, emitParseErrors: false, verbose: false } })

export const normalizePost = async (post: GhostPostOrPage, cmsUrl: string | undefined, basePath?: string) => {
  if (!cmsUrl) throw Error('ghost-normalize.ts: cmsUrl expected.')

  const hast = rehype.parse(post.html || '')
  const hastGL = rewriteGhostLinks(hast, cmsUrl, basePath)
  const hastRL = rewriteRelativeLinks(hastGL)
  post.htmlAst = hastRL

  // image meta
  post.featureImageMeta = await imageDimensions(post.feature_image)
  return post
}

/**
 * Determine image dimensions
 */

export const imageDimensions = async (url: string | undefined | null) => {
  if (!url) return undefined
  const { width, height } = await probe(url)
  return { width, height }
}

/**
 * Rewrite absolute Ghost CMS links to relative
 */

const rewriteGhostLinks = (htmlAst: Node, cmsUrl: string, basePath = '/') => {

  visit(htmlAst, { tagName: `a` }, (node: Node) => {
    const href = node.properties && (node.properties as HTMLAnchorElement).href
    if (href && href.startsWith(cmsUrl)) {
      (node.properties as HTMLAnchorElement).href = href.replace(cmsUrl, basePath).replace('//', '/')
    }
  })

  return htmlAst
}

/**
 * Rewrite relative links to be used with next/link
 */

const rewriteRelativeLinks = (htmlAst: Node) => {

  visit(htmlAst, { tagName: `a` }, (node: Node) => {
    const href = node.properties && (node.properties as HTMLAnchorElement).href
    if (href && !href.startsWith(`http`)) {
      const copyOfNode = cloneDeep(node)
      delete copyOfNode.properties
      delete copyOfNode.position
      copyOfNode.tagName = `span`
      node.tagName = `Link`
      node.children = [copyOfNode]
    }
  })

  return htmlAst
}
