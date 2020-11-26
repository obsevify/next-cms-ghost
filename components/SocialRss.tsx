import { RssIcon } from '@icons/RssIcon'

export const SocialRss = ({ url }: { url: string }) => (
  <a className="rss-button" href={`https://feedly.com/i/subscription/feed/${url}/rss.xml`} target="_blank" rel="noopener noreferrer" title="Rss">
    <RssIcon />
  </a>
)
