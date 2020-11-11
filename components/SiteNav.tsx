import { Navigation, SocialLinks, DarkMode, SubscribeButton } from '@components'
import { useLang, get } from '@utils/use-lang'
import { GhostSettings, NavItem } from '@lib/ghost'
import { OverlayContainer } from './effects'
import { siteUrl } from '@siteConfig'

export interface SiteNavProps {
  settings: GhostSettings
  className: string
  overlay: OverlayContainer
  postTitle?: string
}

const SiteNav = ({ settings, className, postTitle, overlay }: SiteNavProps) => {
  const text = get(useLang())
  const config: {
    overwriteGhostNavigation: NavItem[]
    navigation: NavItem[]
  } = {
    overwriteGhostNavigation: [],
    navigation: []
  }
  const site = settings
  const title = text(`SITE_TITLE`, site.title)
  const secondaryNav = site.secondary_navigation && 0 < site.secondary_navigation.length
  const siteLogo = site.logo

  const navigation = site.navigation

  // overwrite navigation if specified in options
  const labels = navigation?.map((item) => item.label)
  if (labels && labels.length > 0 && config.overwriteGhostNavigation && config.overwriteGhostNavigation.length > 0) {
    config.overwriteGhostNavigation.map((item) => {
      const index = item.label && labels.indexOf(item.label) || -1
      if (index > -1 && navigation && navigation[index]) {
        navigation[index].url = item.url
      }
    })
  }

  // allow plugins to add menu items
  const urls = navigation?.map((item) => item.url)
  if (config.navigation && config.navigation.length > 0) {
    config.navigation.map((item) => urls?.indexOf(item.url) === -1 && navigation?.push(item))
  }

  return (
    <nav className={className}>
      <div className="site-nav-left-wrapper">
        <div className="site-nav-left">
          {siteLogo ? (
            <a className="site-nav-logo" href={siteUrl}>
              <img src={siteLogo} alt={title} />
            </a>
          ) : (
              <a className="site-nav-logo" href={siteUrl}>
                {title}
              </a>
            )}
          <div className="site-nav-content">
            <Navigation data={navigation} />
            {postTitle && <span className={`nav-post-title ${site.logo || `dash`}`}>{postTitle}</span>}
          </div>
        </div>
      </div>
      <div className="site-nav-right">
        {secondaryNav ? (
          <Navigation data={site.secondary_navigation} />
        ) : (
            <div className="social-links">
              <SocialLinks site={site} siteUrl={siteUrl} />
            </div>
          )}
        <DarkMode />
        <SubscribeButton overlay={overlay} />
      </div>
    </nav>
  )
}

export default SiteNav
