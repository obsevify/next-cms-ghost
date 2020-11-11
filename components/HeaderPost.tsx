import { GhostSettings } from 'lib/ghost'
import { SiteNav } from '@components'
import { OverlayContainer, StickyNavContainer } from '@effects'

interface HeaderPostProps {
  settings: GhostSettings,
  title?: string
  sticky: StickyNavContainer
  overlay: OverlayContainer
}

const HeaderPost = ({ settings, title, sticky, overlay }: HeaderPostProps) => (
  <header className="site-header" >
    <div className={`outer site-nav-main ${sticky && sticky.state.currentClass}`}>
      <div className="inner">
        <SiteNav settings={settings} className="site-nav" postTitle={title} overlay={overlay} />
      </div>
    </div>
  </header>
)

export default HeaderPost
