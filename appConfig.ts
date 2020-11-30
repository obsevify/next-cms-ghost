// Cache control
export const fileCache: boolean = true

// Dark mode
export type DarkMode = 'dark' | 'light' | null
export const defaultMode: DarkMode = 'light'
export const overrideOS: boolean = true

// Images
export const imageQuality: number = 80
export const nextFeatureImages: boolean = true
export const nextInlineImages: boolean = true

// RSS
export const rssFeed: boolean = true

// Ghost Member Subscriptions
export const memberSubscriptions: boolean = true

// Commento commenting system
export const commento: boolean = false
export const commentoUrl: string | undefined = undefined //https://commento.your-blog.com

// PrismJS
export const prism: boolean = true
export const prismIgnoreMissing: boolean = true

// Contact Page
export const contactPage: boolean = true
export const customPage = {}

// Table of Contents
export const toc: boolean = true
export const maxDepth: number = 2
