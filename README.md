# VAMSHAA Agrotech Foundation website

Static 10-page site: plain HTML, CSS and JS, no framework.

```
src/content.mjs   all site copy (from the Foundation's profile)
src/icons.mjs     icon set (Phosphor duotone, MIT, plus 3 custom bamboo icons)
src/build.mjs     page templates; writes public/*.html
public/           the deployable site (assets, fonts, GSAP + Lenis vendored)
```

## Edit and build

Change copy in `src/content.mjs`, then run `npm run build` (Node 18+). Don't edit `public/*.html` by hand; the build overwrites them.

## Run locally

`npm start` and open http://localhost:8080, or on Windows double-click `public/start-site.bat` (needs nothing installed).

## Deploy

Upload `public/` to any static host. On Vercel, set the output directory to `public` with no build command.

## SEO

Each page gets its own title, description, canonical link, Open Graph and Twitter tags, and JSON-LD (NGO, WebSite or breadcrumbs, WebPage). The build also writes `public/sitemap.xml` and `public/robots.txt`. Titles and descriptions live in the `SEO` table at the top of `src/build.mjs`.

**Before launch, set the real domain.** Either change `SITE` in `src/build.mjs` or build with `SITE_URL=https://your-domain npm run build`. Until then every absolute URL points at the placeholder `https://vamshaa.example`. After launch, submit the sitemap in Google Search Console and Bing Webmaster Tools.

## To do

- Email and official website are "To be updated" in `src/content.mjs`.
- Set the live domain (see SEO above).

Designed & developed by Lios Labs.
