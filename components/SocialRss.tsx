import { RssIcon } from '@icons/RssIcon'
import { siteUrl } from '@lib/environment'
import { resolve } from 'url'

export const SocialRss = () => (
  <a className="rss-button" href={`https://feedly.com/i/subscription/feed/${resolve(siteUrl, 'rss.xml')}`} target="_blank" rel="noopener noreferrer" title="Rss">
    <RssIcon />
  </a>
)
