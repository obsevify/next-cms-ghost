import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'

import { readingTime as readingTimeHelper } from '@lib/readingTime'

import { resolveUrl } from '@utils/routing'
import { useLang, get } from '@utils/use-lang'

import { Layout, HeaderPost, AuthorList, PreviewPosts, ImgSharp, RenderContent } from '@components'
import { Comments, TableOfContents, Subscribe } from '@components'

import { StickyNavContainer } from '@effects'
import { SEO } from '@meta'

import { PostClass } from '@helpers'
import { GhostPostOrPage, GhostPostsOrPages, GhostSettings } from '@lib/ghost'
import { collections } from '@lib/collections'
import { imageQuality } from '@mediaConfig'

import { nextImages } from '@siteOptions'
import { memberSubscriptions, commento } from '@appConfig'

interface PostProps {
  cmsData: {
    post: GhostPostOrPage
    settings: GhostSettings
    previewPosts?: GhostPostsOrPages
    prevPost?: GhostPostOrPage
    nextPost?: GhostPostOrPage
  }
}

const Post = ({ cmsData }: PostProps) => {
  const { post, settings, previewPosts, prevPost, nextPost } = cmsData
  const { slug, url, meta_description, excerpt } = post
  const description = meta_description || excerpt

  const text = get(useLang())
  const readingTime = readingTimeHelper(post).replace(`min read`, text(`MIN_READ`))
  const featImg = post.feature_image
  const dimensions = post.featureImageMeta
  const postClass = PostClass({ tags: post.tags, isFeatured: !!featImg, isImage: !!featImg })

  // TODO: attach toc to post
  const toc: string[] = [] // post.tableOfContent
  const htmlAst = post.htmlAst
  if (htmlAst === undefined) throw Error('Post.tsx: htmlAst must be defined.')

  const collectionPath = collections.getCollectionByNode(post)

  return (
    <>
      <SEO {...{ description, settings, imageUrl: featImg, article: post }} />
      <StickyNavContainer
        throttle={300}
        isPost={true}
        activeClass="nav-post-title-active"
        render={(sticky) => (
          <Layout
            settings={settings}
            isPost={true}
            sticky={sticky}
            header={<HeaderPost settings={settings} sticky={sticky} title={post.title} />}
            previewPosts={<PreviewPosts primaryTag={post.primary_tag} posts={previewPosts} prev={prevPost} next={nextPost} />}
          >
            <div className="inner">
              <article className={`post-full ${postClass}`}>
                <header className="post-full-header">
                  {post.primary_tag && (
                    <section className="post-full-tags">
                      <Link href={resolveUrl({ slug: post.primary_tag.slug, url: post.primary_tag.url })}>
                        <a>{post.primary_tag.name}</a>
                      </Link>
                    </section>
                  )}

                  <h1 ref={sticky && sticky.anchorRef} className="post-full-title">
                    {post.title}
                  </h1>

                  {post.custom_excerpt && <p className="post-full-custom-excerpt">{post.custom_excerpt}</p>}

                  <div className="post-full-byline">
                    <section className="post-full-byline-content">
                      <AuthorList authors={post.authors} isPost={true} />

                      <section className="post-full-byline-meta">
                        <h4 className="author-name">
                          {post.authors?.map((author, i) => (
                            <div key={i}>
                              {i > 0 ? `, ` : ``}
                              <Link href={resolveUrl({ slug: author.slug, url: author.url || undefined })}>
                                <a>{author.name}</a>
                              </Link>
                            </div>
                          ))}
                        </h4>
                        <div className="byline-meta-content">
                          <time className="byline-meta-date" dateTime={post.published_at || ''}>
                            {dayjs(post.published_at || '').format('D MMMM, YYYY')}&nbsp;
                              </time>
                          <span className="byline-reading-time">
                            <span className="bull">&bull;</span> {readingTime}
                          </span>
                        </div>
                      </section>
                    </section>
                  </div>
                </header>

                {featImg && (
                  nextImages && dimensions ? (
                    <figure className="post-full-image" style={{ display: 'inherit' }}>
                      <Image
                        src={featImg}
                        alt={post.title}
                        quality={imageQuality}
                        layout="responsive"
                        sizes={`
                              (max-width: 350px) 350px,
                              (max-width: 530px) 530px,
                              (max-width: 710px) 710px,
                              (max-width: 1170px) 1170px,
                              (max-width: 2110px) 2110px, 2000px
                            `}
                        {...dimensions}
                      />
                    </figure>
                  ) : (
                      <figure className="post-full-image">
                        <ImgSharp srcImg={featImg} title={post.title} />
                      </figure>
                    )
                )}

                <section className="post-full-content">
                  <TableOfContents toc={toc} url={resolveUrl({ collectionPath, slug, url })} />
                  <div className="post-content load-external-scripts">
                    <RenderContent htmlAst={htmlAst} />
                  </div>
                </section>

                {memberSubscriptions && (
                  <Subscribe {...{ settings }} />
                )}

                {commento && (
                  <Comments id={post.id} />
                )}
              </article>
            </div>
          </Layout>
        )}
      />
    </>
  )
}

export default Post
