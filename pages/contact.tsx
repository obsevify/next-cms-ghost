import { GetStaticProps } from 'next'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { contactPage, customPage } from '@appConfig'

import { HeaderPage, Layout, ImgSharp, PostCard, ContactForm } from '@components'
import { ServiceConfig } from '@components/contact/ContactForm'
import { PostClass } from '@helpers'
import { SEO } from '@meta'

import { GhostPostOrPage, GhostPostsOrPages, GhostSettings, getPosts, getAllSettings } from '@lib/ghost'
import { imageDimensions } from '@lib/images'

interface ContactPage extends GhostPostOrPage {
  form_topics: string[]
  serviceConfig: ServiceConfig
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts({ limit: 3 })
  const settings = await getAllSettings()

  const defaultPage: ContactPage = {
    id: 'custom-page-contact',
    slug: 'contact',
    url: '/contact',
    title: 'Contact Us',
    feature_image: 'https://static.gotsby.org/v1/assets/images/gatsby-ghost-contact.png',
    custom_excerpt: 'Want to get in touch with the team? Just drop us a line!',
    form_topics: ['I want to give feedback', 'I want to ask a question'],
    meta_title: 'Contact Us',
    meta_description: 'A contact form page.',
    html: '',
    serviceConfig: {
      url: '/api/v1/contact',
      contentType: 'application/json',
    },
    featureImageMeta: null
  }

  const page = { ...defaultPage, ...customPage }
  if (page.feature_image) {
    page.featureImageMeta = await imageDimensions(page.feature_image)
  }

  const cmsData = {
    page,
    settings,
    posts,
  }

  return {
    props: {
      cmsData,
    },
  }
}

interface PageProps {
  cmsData: {
    page: ContactPage
    posts: GhostPostsOrPages
    settings: GhostSettings
  }
}

export default function Contact({ cmsData }: PageProps) {

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

  const { page, posts, settings } = cmsData
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
                <ImgSharp srcImg={featImg} title={page.title} />
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
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} num={i} />
            ))}
          </div>

        </div>
      </Layout>
    </>
  )
}
