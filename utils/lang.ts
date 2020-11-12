export interface StringKeyObjectMap {
  [key: string]: string
}

export interface KeyObjectMap {
  [key: string]: StringKeyObjectMap
}

export const lang: KeyObjectMap = {
  en: {
    A_COLLECTION_OF: `A collection of`,
    BY: `by`,
    BY_THIS_AUTHOR: `by this author`,
    GOTO_FRONT_PAGE: `Go to the front page`,
    LATEST_POSTS: `Latest Posts`,
    IS_REQUIRED: `is required`,
    MIN_READ: `min read`,
    MORE_IN: `More in`,
    MORE_POSTS: `More posts`,
    MORE_POSTS_SM: `more posts`,
    NEXT: `Next`,
    NO_POSTS: `No posts`,
    PAGE_NOT_FOUND: `Page not found`,
    POST: `post`,
    POSTS: `posts`,
    PREVIOUS: `Previous`,
    READ: `Read`,
    SEE_ALL: `See all`,
    SUBSCRIBED_TO: `You've successfully subscribed to`,
    WEBSITE: `Website`,
    MULTIPLE_AUTHORS: `Multiple authors`,
    DARK_MODE: `DarkMode`,
  },
  de: {
    A_COLLECTION_OF: `Zu diesem Thema gibt es`,
    BY: `von`,
    BY_THIS_AUTHOR: `von diesem Autor`,
    GOTO_FRONT_PAGE: `Gehe zur Startseite`,
    LATEST_POSTS: `Neueste Artikel`,
    IS_REQUIRED: `ist erforderlich`,
    MIN_READ: `min Lesezeit`,
    MORE_IN: `Mehr von`,
    MORE_POSTS: `Weitere Artikel`,
    MORE_POSTS_SM: `weitere Artikel`,
    NEXT: `Weiter`,
    NO_POSTS: `Keine weiteren Artikel`,
    PAGE_NOT_FOUND: `Seite nicht gefunden`,
    POST: `Artikel`,
    POSTS: `Artikel`,
    PREVIOUS: `Zurück`,
    READ: `Lese`,
    SEE_ALL: `Alle`,
    SUBSCRIBED_TO: `Du hast dich erfolgreich angemeldet bei`,
    WEBSITE: `Webseite`,
    MULTIPLE_AUTHORS: `Mehrere Autoren`,
    DARK_MODE: `NachtModus`,
  },
}
