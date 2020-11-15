import Link from 'next/link'

import { SiteNav, HeaderBackground } from '.'
import { useLang, get } from '@utils/use-lang'
import { GhostSettings } from '@lib/ghost'

interface HeaderIndexProps {
  settings: GhostSettings
}

const HeaderIndex = ({ settings }: HeaderIndexProps) => {
  const text = get(useLang())
  const site = settings
  const siteLogo = site.logo
  const coverImg = site.cover_image || ''
  const title = text(`SITE_TITLE`, site.title)

  return (
    <header className="site-home-header">
      <HeaderBackground srcImg={coverImg}>
        <div className="inner">
          <SiteNav className="site-nav"  {...{ settings }} />
          <div className="site-header-content">
            <h1 className="site-title">
              {siteLogo ? (
                <Link href="/">
                  <a>
                    <img className="site-logo" src={siteLogo} alt={title} />
                  </a>
                </Link>
              ) : (
                  title
                )}
            </h1>
            <h2 className="site-description">{site.description}</h2>
          </div>
        </div>
      </HeaderBackground>
    </header>
  )
}

export default HeaderIndex
