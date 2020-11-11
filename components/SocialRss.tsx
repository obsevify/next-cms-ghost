import RssIcon from '@icons/rss-icon'

const SocialRss = ({ url }: { url: string }) => (
  <a className="rss-button" href={`https://feedly.com/i/subscription/feed/${url}/rss`} target="_blank" rel="noopener noreferrer" title="Rss">
    <RssIcon />
  </a>
)

export default SocialRss
