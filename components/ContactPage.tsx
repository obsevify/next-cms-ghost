import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { contactPage } from '@appConfig'

import { HeaderPage, Layout, PostCard, ContactForm } from '@components'

import { ServiceConfig } from '@components/contact/ContactForm'
import { PostClass } from '@helpers'
import { SEO } from '@meta'

import { GhostPostOrPage, GhostPostsOrPages, GhostSettings } from '@lib/ghost'

interface ContactPage extends GhostPostOrPage {
  form_topics: string[]
  serviceConfig: ServiceConfig
}

interface PageProps {
  cmsData: {
    page: ContactPage
    previewPosts?: GhostPostsOrPages
    settings: GhostSettings
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

  const { page, previewPosts, settings } = cmsData
  const { meta_title, meta_description } = page

  const featImg = page.feature_image
  const postClass = PostClass({ tags: page.tags, isPage: page && true, isImage: !!featImg })
  //const htmlAst = page.htmlAst
  //if (htmlAst === undefined) throw Error('Page.tsx: htmlAst must be defined.')

  return (
    <>
      <SEO settings={settings} {...{ meta_title, meta_description }} />
      <Layout settings={settings} page={page} tags={page.tags} header={<HeaderPage settings={settings} />}>
        <div className="inner">
          <article className={`post-full ${postClass}`}>

            <header className="post-full-header">
              <h1 className="post-full-title">{page.title}</h1>

              {page.custom_excerpt &&
                <p className="post-full-custom-excerpt">{page.custom_excerpt}</p>
              }
            </header>

            {featImg &&
              <figure className="post-full-image">
                <img src={featImg} alt={page.title} />
              </figure>
            }

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
