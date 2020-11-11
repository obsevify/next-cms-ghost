import { GhostSettings } from 'lib/ghost'
import { Helmet } from 'react-helmet'
import { useRouter } from 'next/router'

interface DocumentHeadProps {
  site: GhostSettings
  className: string
}

const DocumentHead = ({ site, className }: DocumentHeadProps) => {
  const router = useRouter()
  const { action } = router.query || { action: `ssr` }

  return (
    <Helmet>
      <html lang={site.lang} className="casper" />
      <body className={`${className} ${action && action === `subscribe` ? `subscribe-success` : null}`} />
    </Helmet>
  )
}

export default DocumentHead
