import { GhostSettings } from '@lib/ghost'
import { SiteNav } from '@components'
import { OverlayContainer } from '@effects'

interface HeaderPageProps {
  settings: GhostSettings
  overlay: OverlayContainer
}

const HeaderPage = ({ settings, overlay }: HeaderPageProps) => (
  <header className="site-header">
    <div className="outer site-nav-main">
      <div className="inner">
        <SiteNav settings={settings} className="site-nav" overlay={overlay} />
      </div>
    </div>
  </header>
)

export default HeaderPage
