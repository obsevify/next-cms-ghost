import { GhostSettings } from '@lib/ghost'
import { SiteNav } from '@components/SiteNav'

interface HeaderPageProps {
  siteUrl: string
  settings: GhostSettings
}

export const HeaderPage = ({ siteUrl, settings }: HeaderPageProps) => (
  <header className="site-header">
    <div className="outer site-nav-main">
      <div className="inner">
        <SiteNav {...{ siteUrl, settings }} className="site-nav" />
      </div>
    </div>
  </header>
)
