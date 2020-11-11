import TwitterIcon from './icons/twitter-icon'
import FacebookIcon from './icons/facebook-icon'

import { SocialRss } from '@components'
import { GhostSettings } from '@lib/ghost'

interface SocialLinkProps {
  site: GhostSettings
  siteUrl: string
}

const SocialLinks = ({ site, siteUrl }: SocialLinkProps) => {
  const twitterUrl = site.twitter && `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
  const facebookUrl = site.facebook && `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`

  return (
    <>
      {site.facebook && (
        <a href={facebookUrl} className="social-link social-link-fb" target="_blank" rel="noopener noreferrer" title="Facebook">
          <FacebookIcon />
        </a>
      )}
      {site.twitter && (
        <a href={twitterUrl} className="social-link social-link-tw" target="_blank" rel="noopener noreferrer" title="Twitter">
          <TwitterIcon />
        </a>
      )}
      <SocialRss url={siteUrl} />
    </>
  )
}

export default SocialLinks
