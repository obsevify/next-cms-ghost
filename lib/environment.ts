export const siteUrl = process.env.SITE_URL || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || process.env.URL || 'http://localhost:3000'
export const ghostAPIUrl = process.env.CMS_GHOST_API_URL || 'https://cms.gotsby.org'
export const ghostAPIKey = process.env.CMS_GHOST_API_KEY || '387f956eaa95345f7bb484d0b8'
