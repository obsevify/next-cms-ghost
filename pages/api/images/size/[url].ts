import { NextApiRequest, NextApiResponse } from 'next'
import probe from 'probe-image-size'

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

  const dimensions = await probe(imageUrl)
  res.json(dimensions)
}
