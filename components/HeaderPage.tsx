import { GhostSettings } from '@lib/ghost'
import { SiteNav } from '@components'

interface HeaderPageProps {
  settings: GhostSettings
}

const HeaderPage = ({ settings }: HeaderPageProps) => (
  <header className="site-header">
    <div className="outer site-nav-main">
      <div className="inner">
        <SiteNav settings={settings} className="site-nav" />
      </div>
    </div>
  </header>
)

export default HeaderPage
