import { GhostSettings } from 'lib/ghost'
import { SiteNav } from '@components'
import { StickyNavContainer } from '@effects'

interface HeaderPostProps {
  settings: GhostSettings,
  title?: string
  sticky: StickyNavContainer
}

const HeaderPost = ({ settings, title, sticky }: HeaderPostProps) => (
  <header className="site-header" >
    <div className={`outer site-nav-main ${sticky && sticky.state.currentClass}`}>
      <div className="inner">
        <SiteNav settings={settings} className="site-nav" postTitle={title} />
      </div>
    </div>
  </header>
)

export default HeaderPost
