import { NextApiRequest, NextApiResponse } from 'next'
import { imageDimensions } from '@lib/images'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse | void> => {

  if (req.method !== 'GET') {
    return res.status(400).json({
      error: 400,
      message: 'Wrong request method.'
    })
  }

  const { query: { url } } = req
  if (!(url && url.length > 0)) {
    return res.status(400).json({
      error: 400,
      message: 'Wrong name.'
    })
  }
  const imageUrl = Array.isArray(url) ? url[0] : url

  const dimensions = await imageDimensions(imageUrl, false)
  res.json(dimensions)
}
