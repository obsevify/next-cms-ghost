import { GhostSettings } from 'lib/ghost'
import { SiteNav } from '@components/SiteNav'
import { StickyNavContainer } from '@effects/StickyNavContainer'

interface HeaderPostProps {
  siteUrl: string
  settings: GhostSettings,
  title?: string
  sticky: StickyNavContainer
}

export const HeaderPost = ({ siteUrl, settings, title, sticky }: HeaderPostProps) => (
  <header className="site-header" >
    <div className={`outer site-nav-main ${sticky && sticky.state.currentClass}`}>
      <div className="inner">
        <SiteNav {...{ siteUrl, settings }} className="site-nav" postTitle={title} />
      </div>
    </div>
  </header>
)
