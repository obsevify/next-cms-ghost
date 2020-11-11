import Link from 'next/link'
import { useLang, get } from '@utils/use-lang'

interface PaginationProps {
  previousPagePath: string,
  nextPagePath: string
}

const Pagination = ({ previousPagePath, nextPagePath }: PaginationProps) => {
  const text = get(useLang())

  return (
    <nav className="pagination" role="navigation">
      <div>
        {previousPagePath && (
          <Link href={previousPagePath}>
            <a rel="prev">← {text(`PREVIOUS`)}</a>
          </Link>
        )}
      </div>
      <div>
        {nextPagePath && (
          <Link href={nextPagePath}>
            <a rel="next">{text(`NEXT`)} →</a>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Pagination
