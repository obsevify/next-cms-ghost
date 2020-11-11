import { Collection } from '@lib/collections'
import { PostOrPage } from "@tryghost/content-api"

export const collections: Collection<PostOrPage>[] = []

//export const collections: Collection<PostOrPage>[] = [{
//  path: `themes`,
//  selector: node => node.primary_tag && node.primary_tag.slug === `themes`
//}]

//export const collections: Collection<PostOrPage>[] = [{
//  path: `luther`,
//  selector: node => node.authors && node.authors.filter(a => a.slug === `martin`).length > 0,
//}]
