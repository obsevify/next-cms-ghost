import { HeaderPage, Layout, ImgSharp, RenderContent } from '.'

import { PostClass } from '@helpers'
import { SEO } from '@meta'

import { GhostPostOrPage, GhostSettings } from '@lib/ghost'

/**
 * Single page (/:slug)
 *
 * This file renders a single page and loads all the content.
 *
 */

interface PageProps {
  cmsData: {
    page: GhostPostOrPage
    settings: GhostSettings
  }
}

const Page = ({ cmsData }: PageProps) => {
  const { page, settings } = cmsData
  const { meta_title, meta_description } = page

  const featImg = page.feature_image
  const postClass = PostClass({ tags: page.tags, isPage: page && true, isImage: !!featImg })
  const htmlAst = page.htmlAst
  if (htmlAst === undefined) throw Error('Page.tsx: htmlAst must be defined.')

  return (
    <>
      <SEO settings={settings} {...{ meta_title, meta_description }} />
      <Layout settings={settings} page={page} tags={page.tags} header={<HeaderPage settings={settings} />}>
        <div className="inner">
          <article className={`post-full ${postClass}`}>
            <header className="post-full-header">
              <h1 className="post-full-title">{page.title}</h1>
            </header>

            {featImg && (
              <figure className="post-full-image">
                <ImgSharp srcImg={featImg} title={page.title} />
              </figure>
            )}

            {/* The main page content */}
            <section className="post-full-content">
              <div className="post-content load-external-scripts">
                <RenderContent htmlAst={htmlAst} />
              </div>
            </section>
          </article>
        </div>
      </Layout>
    </>
  )
}

export default Page

// fluidClass="kg-card kg-code-card"
