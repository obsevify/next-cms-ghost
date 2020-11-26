import Link from 'next/link'

import { resolveUrl } from '@utils/routing'
import { useLang, get } from '@utils/use-lang'

import { HoverOnAvatar } from '@components/effects/HoverOnAvatar'
import { AvatarIcon } from '@icons/AvatarIcon'
import { Author } from '@tryghost/content-api'

interface AuthorListProps {
  authors?: Author[]
  isPost?: boolean
}

export const AuthorList = ({ authors, isPost }: AuthorListProps) => {
  const text = get(useLang())

  return (
    <ul className="author-list">
      {authors?.map((author, i) => {
        const url = resolveUrl({ slug: author.slug, url: author.url || undefined })
        const profileImg = author.profile_image || ''

        return (
          <HoverOnAvatar
            key={i}
            activeClass="hovered"
            render={(hover) => (
              <li key={i} ref={hover.anchorRef} className="author-list-item">
                {!isPost && <div className="author-name-tooltip">{author.name}</div>}
                {isPost && (
                  <div className={`author-card ${hover.state.currentClass}`}>
                    <div className="author-profile-image">
                      <img src={profileImg} alt={author.name} />
                    </div>
                    <div className="author-info">
                      {author.bio ? (
                        <div className="bio">
                          <h2>{author.name}</h2>
                          <p>{author.bio}</p>
                          <p>
                            <Link href={url}>
                              <a>{text(`MORE_POSTS`)}</a>
                            </Link>{' '}
                            {text(`BY`)} {author.name}.
                          </p>
                        </div>
                      ) : (
                          <>
                            <h2>{author.name}</h2>
                            <p>
                              {text(`READ`)}{' '}
                              <Link href={url}>
                                <a>{text(`MORE_POSTS_SM`)}</a>
                              </Link>{' '}
                              {text(`BY_THIS_AUTHOR`)}.
                          </p>
                          </>
                        )}
                    </div>
                  </div>
                )}
                {profileImg ? (
                  <Link href={url}>
                    <a className={`${(isPost && `author`) || `static`}-avatar`}>
                      <img src={profileImg} alt={author.name} />
                    </a>
                  </Link>
                ) : (
                    <Link href={url}>
                      <a className={`${(isPost && `author`) || `static`}-avatar author-profile-image`}>
                        <AvatarIcon />
                      </a>
                    </Link>
                  )}
              </li>
            )}
          />
        )
      })}
    </ul>
  )
}
