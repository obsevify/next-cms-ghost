import Rehype from 'rehype'
import { Node, Parent } from 'unist'
import visit from 'unist-util-visit'
import { cloneDeep } from 'lodash'
import refractor from 'refractor'
import nodeToString from 'hast-util-to-string'
import { prism, prismIgnoreMissing, toc } from '@appConfig'
import { PostOrPage } from '@tryghost/content-api'
import { imageDimensions } from '@lib/images'
import { generateTableOfContents } from '@lib/toc'
import { GhostPostOrPage } from './ghost'

const rehype = Rehype().use({ settings: { fragment: true, space: `html`, emitParseErrors: false, verbose: false } })

export const normalizePost = async (post: PostOrPage, cmsUrl: string | undefined, basePath?: string): Promise<GhostPostOrPage> => {
  if (!cmsUrl) throw Error('ghost-normalize.ts: cmsUrl expected.')
  const rewriteGhostLinks = withRewriteGhostLinks(cmsUrl, basePath)

  const processors = [
    rewriteGhostLinks,
    rewriteRelativeLinks,
    syntaxHighlightWithPrismJS,
  ]

  let htmlAst = rehype.parse(post.html || '')
  for (const process of processors) {
    htmlAst = process(htmlAst)
  }

  const toc = tableOfContents(htmlAst)

  // image meta
  const featureImageMeta = await imageDimensions(post.feature_image)

  return {
    ...post,
    htmlAst,
    featureImageMeta,
    toc
  }
}


/**
 * Rewrite absolute Ghost CMS links to relative
 */

const withRewriteGhostLinks = (cmsUrl: string, basePath = '/') => (htmlAst: Node) => {

  visit(htmlAst, { tagName: `a` }, (node: Node) => {
    const href = (node.properties as HTMLAnchorElement).href
    if (href?.startsWith(cmsUrl)) {
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
    const href = (node.properties as HTMLAnchorElement).href
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

/**
 * Syntax Highlighting with PrismJS using refactor
 */

interface NodeProperties {
  className?: string[]
}

const syntaxHighlightWithPrismJS = (htmlAst: Node) => {
  if (!prism) return htmlAst

  const getLanguage = (node: Node) => {
    const className = (node.properties as NodeProperties).className || []

    for (const classListItem of className) {
      if (classListItem.slice(0, 9) === 'language-') {
        return classListItem.slice(9).toLowerCase()
      }
    }
    return null
  }

  visit(htmlAst, 'element', (node: Node, _index: number, parent: Parent | undefined) => {
    if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
      return
    }

    const lang = getLanguage(node)
    if (lang === null) return

    let className = (node.properties as NodeProperties).className

    let result
    try {
      className = (className || []).concat('language-' + lang)
      result = refractor.highlight(nodeToString(node), lang)
    } catch (err) {
      if (prismIgnoreMissing && /Unknown language/.test(err.message)) {
        return
      }
      throw err
    }
    node.children = result
  })

  return htmlAst
}

/**
 * Table of Contents
 */

const tableOfContents = (htmlAst: Node) => {
  if (!toc) return null
  return generateTableOfContents(htmlAst)
}
