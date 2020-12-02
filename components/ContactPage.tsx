import Image from 'next/image'

import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { contactPage } from '@appConfig'

import { HeaderPage } from '@components/HeaderPage'
import { Layout } from '@components/Layout'
import { PostCard } from '@components/PostCard'

import { ServiceConfig, ContactForm } from '@components/contact/ContactForm'
import { PostClass } from '@helpers/PostClass'
import { SEO } from '@meta/seo'

import { GhostPostOrPage, GhostPostsOrPages, GhostSettings } from '@lib/ghost'
import { ISeoImage } from '@meta/seoImage'

import { nextFeatureImages, imageQuality } from 'appConfig'

interface ContactPage extends GhostPostOrPage {
  form_topics: string[]
  serviceConfig: ServiceConfig
}

interface PageProps {
  cmsData: {
    siteUrl: string
    page: ContactPage
    previewPosts?: GhostPostsOrPages
    settings: GhostSettings
    seoImage: ISeoImage
  }
}

export function Contact({ cmsData }: PageProps) {

  if (!contactPage) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  const { page, previewPosts, siteUrl, settings, seoImage } = cmsData
  const { meta_title, meta_description } = page

  const featImg = page.featureImage
  const postClass = PostClass({ tags: page.tags, isPage: page && true, isImage: !!featImg })
  //const htmlAst = page.htmlAst
  //if (htmlAst === undefined) throw Error('Page.tsx: htmlAst must be defined.')

  return (
    <>
      <SEO {...{ siteUrl, settings, meta_title, meta_description, seoImage }} />
      <Layout {...{ siteUrl, settings, page }} tags={page.tags} header={<HeaderPage {...{ siteUrl, settings }} />}>
        <div className="inner">
          <article className={`post-full ${postClass}`}>

            <header className="post-full-header">
              <h1 className="post-full-title">{page.title}</h1>

              {page.custom_excerpt &&
                <p className="post-full-custom-excerpt">{page.custom_excerpt}</p>
              }
            </header>

            {featImg && (
              nextFeatureImages && featImg.dimensions ? (
                <figure className="post-full-image" style={{ display: 'inherit' }}>
                  <Image
                    src={featImg.url}
                    alt={page.title}
                    quality={imageQuality}
                    layout="responsive"
                    sizes={`
                              (max-width: 350px) 350px,
                              (max-width: 530px) 530px,
                              (max-width: 710px) 710px,
                              (max-width: 1170px) 1170px,
                              (max-width: 2110px) 2110px, 2000px
                            `}
                    {...featImg.dimensions}
                  />
                </figure>
              ) : (page.feature_image && (
                <figure className="post-full-image">
                  <img src={page.feature_image} alt={page.title} />
                </figure>
              ))
            )}

            <section className="post-full-content">

              <div className="post-content">
                <ContactForm topics={page.form_topics} serviceConfig={page.serviceConfig} />
              </div>

              <div className="post-content" dangerouslySetInnerHTML={{ __html: page.html || '' }}>
                {/* <RenderContent htmlAst={htmlAst} /> */}
              </div>

            </section>
          </article>

          <div className="post-feed">
            {previewPosts?.map((post, i) => (
              <PostCard key={post.id} post={post} num={i} />
            ))}
          </div>

        </div>
      </Layout>
    </>
  )
}
