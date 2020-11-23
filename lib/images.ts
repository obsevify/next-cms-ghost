import probe from 'probe-image-size'

/**
 * Determine image dimensions
 *
 * probe-image-size reacts sensitivily on bad network connections
 * See: https://github.com/nodeca/probe-image-size/issues/46
 * Frequent fails signify bad network connections
 *
 * Current measures:
 *
 * 1. Retries on fail
 * 2. Reduced network timeouts to speed up retries
 *
 *  Probing image sizes can slow down the build times.
 *  Is there a better method to determine image sizes server side?
 *
 */

const maxRetries = 50
const read_timeout = 3000 // ms
const response_timeout = 3000 // ms

export const imageDimensions = async (url: string | undefined | null) => {
  if (!url) return null

  let width = 0
  let height = 0

  let hasError: boolean
  let retry = 0

  do {
    try {
      const { width: w, height: h } = await probe(url, {
        read_timeout,
        response_timeout,
      })
      width = w
      height = h
      hasError = false
    } catch (error) {
      const { code } = error
      if (code !== 'ECONNRESET') throw new Error(error)
      //console.warn(`images.ts: Network error while probing image with url: ${url}.`)
      hasError = true
      retry = retry + 1
    }
  } while (hasError && retry < maxRetries)
  if (hasError) throw new Error(`images.ts: Bad network connection. Failed image probe after ${maxRetries} retries.`)

  return { width, height }
}
