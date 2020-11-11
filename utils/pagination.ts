/**
* Paginate Pages
*
* Note: awesome-pagination plugin inhibits incremental builds.
*
*/

interface Paginate {
  totalItems: number,
  itemsPerPage: number,
  pathPrefix: ({ pageNumber }: { pageNumber: number }) => string
  context: Object
}

const paginate = ({
  totalItems = 0,
  itemsPerPage,
  pathPrefix,
  context,
}: Paginate) => {
  const numberOfPages = Math.ceil(totalItems / itemsPerPage)

  const pagePath = (page: number) => {
    const path = pathPrefix({ pageNumber: page - 1 })
    return page === 1 ? path : `${path}/${page}/`
  }

  return Array.from({ length: numberOfPages }).map((__, pageNumber) => {
    const currentPage = pageNumber + 1

    const prevPageNumber = currentPage <= 1 ? null : currentPage - 1
    const nextPageNumber = currentPage + 1 > numberOfPages ? null : currentPage + 1

    const previousPagePath = prevPageNumber ? pagePath(prevPageNumber) : null
    const nextPagePath = nextPageNumber ? pagePath(nextPageNumber) : null

    return {
      path: pagePath(currentPage),
      context: {
        pageNumber: pageNumber,
        limit: itemsPerPage,
        skip: pageNumber * itemsPerPage,
        totalPosts: totalItems,
        numberOfPages: numberOfPages,
        humanPageNumber: currentPage,
        prevPageNumber: prevPageNumber,
        nextPageNumber: nextPageNumber,
        previousPagePath: previousPagePath,
        nextPagePath: nextPagePath,
        ...context,
      }
    }
  })
}

export default paginate
