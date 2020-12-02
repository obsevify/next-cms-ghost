![next-cms-ghost](https://static.gotsby.org/v1/assets/images/next-ghost.png)

# next-cms-ghost

[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

Create and publish flaring fast blogs with this Jamify blogging system. Powered by the React framework Next.js and content fed by headleass Ghost, you'll get a production ready hybrid static & server rendered website that you can easily distribute globally. At the same time your content creators can continue to work with the Ghost authoring system as they used to.

&nbsp;

## 🎉 Demo

Play with the [Demo](https://next.jamify.org/) to get a first impression.

&nbsp;

## ✨ Features

<details>
<summary>Ghost CMS integration</summary>
</details>
<details>
<summary>Ghost Casper look & feel</summary>
<br />
<ul>
  <li>Infinite scroll</li>
  <li>Fully responsive</li>
  <li>Sticky navigation headers</li>
  <li>Hover on author avatar</li>
  <li>Styled 404 page</li>
  <li>Preview Section in posts</li>
  <li>Sitemap</li>
  <li>RSS feed</li>
  <li>SEO optimized</li>
</ul>
</details>
<details>
<summary>Extened Casper Styles ✨</summary>
<br />
<ul>
  <li>Dark Mode</li>
  <li>Featured posts pinned on top</li>
  <li>Customizable navigation headers</li>
</ul>
</details>
<details>
<summary>Images with Next/Images 🚀</summary>
<br />
<ul>
  <li>Feature and inline images</li>
  <li>Auto optimized images</li>
  <li>No content shifts due to conistent placeholders</li>
</ul>
</details>
<details>
<summary>Andvanced Routing</summary>
<br />
<ul>
  <li>Auto detects custom paths</li>
  <li>Configurable collections</li>
</ul>
</details>
<details>
<summary>Developer friendly</summary>
<br />
<ul>
  <li>Truly open-source</li>
  <li>MIT licenced</li>
  <li>Easy to contribute</li>
  <li>Made type safe with TypeScript</li>
</ul>
</details>
<details>
<summary>Integrated Plugins</summary>
<br />
<ul>
  <li>Member Subscriptions</li>
  <li>Commenting with Commento</li>
  <li>Syntax highlighting with PrismJS</li>
  <li>Table Of Contents</li>
  <li>Contact Page with built-in notification service</li>
</ul>
</details>
<details>
<summary>Coming soon...</summary>
<br />
<ul>
  <li>Preview</li>
  <li>Incremental Regeneration</li>
</ul>
</details>

&nbsp;

## 🚀 Performance

![Lighthouse Score](https://static.gotsby.org/v1/assets/images/jamify-lh-scores-light.gif)

<sup>Scores calculated with Lighthouse 6.4.0.</sup>

&nbsp;

## 🏁 Getting Started

```bash
git clone https://github.com/styxlab/next-cms-ghost.git
cd next-cms-ghost
yarn

# Development
yarn dev

# Production
yarn build
```

&nbsp;

## 🌀 NextJS image optimizations

You must add all domains that you use for insourcing images in the `next.config.js` file, for example:

```javascript
module.exports = {
  images: {
    domains: ['images.unsplash.com', 'static.gotsby.org'],
  },
}
```

&nbsp;

## 🔑 Ghost Content API keys

All content is sourced from a Ghost CMS. Choose the method according to your build scenario.

### Building locally

Create a new text file `.env.local` in the project root folder:

```
CMS_GHOST_API_URL=http://localhost:2368
CMS_GHOST_API_KEY=9fccdb0e4ea5b572e2e5b92942
```

### Building with cloud providers

If you build your project with a cloud provider, the best option is to provide the keys with environment variables:

| Key               | Value (example)            |
| ----------------- | -------------------------- |
| CMS_GHOST_API_URL | http:\/\/localhost:2368    |
| CMS_GHOST_API_KEY | 9fccdb0e4ea5b572e2e5b92942 |

&nbsp;

## 🌎 Domain Settings

The `SITE_URL` environment variable should be set to the public facing URL of your site, in most cases to your custom domain. If you don't have a
custom domain and you deploy with vercel, you can map `VERCEL_URL` to `SITE_URL` in the vercel dahboard under _Settings > Environment Variables_.

| Key      | Value (example)       |
| -------- | --------------------- |
| SITE_URL | https://your.blog.org |

&nbsp;

## 💫 Deploy

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/styxlab/next-cms-ghost)

<!--
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/styxlab/next-cms-ghost&utm_source=github&utm_medium=next-cms-ghost-netlify)
-->

&nbsp;

## 🤯 Ensure headless mode of Ghost CMS

For best SEO results it is strongly recommended to disable the default Ghost Handlebars theme front-end by selecting the _Make this site private_ flag within your Ghost admin settings.

&nbsp;

## 💣 Reporting issues

Please report all bugs and issues at [next-cms-ghost/issues](https://github.com/styxlab/next-cms-ghost/issues).

&nbsp;

## 🎈 Contributing

PRs are welcome! Consider contributing to this project if you want to make a better web.

&nbsp;

## 🧐 Disclaimer

This project is not affiliated with [NextJS](https://nextjs.org/) or [Ghost](https://ghost.org/).

&nbsp;

# Copyright & License

Copyright (c) 2020 styxlab - Released under the [MIT license](LICENSE).
