import { SiteNav } from '.'
import { SiteNavProps } from './SiteNav'

const StickyNav = (props: SiteNavProps) => (
  <div className="outer site-nav-main">
    <div className="inner">
      <SiteNav {...props} />
    </div>
  </div>
)

export default StickyNav
