# FalconTech

Static site at https://falcontech.anetavostra.com. No build step.

- `public/` — the site (served as-is)
  - `en/` — English pages (Home, About, Competitions, Members, Sponsors, Contact)
  - `cs/` — Czech pages, same file names as `en/`; the EN/CZ switcher links matching pages
  - `index.html` — redirects to `/cs/` or `/en/` (saved choice first, then browser language)
  - `assets/` — shared `style.css` and `site.js` (mobile menu, photo lightbox)
  - `img/` — logo and photos
- `wrangler.jsonc` — Cloudflare Worker (static assets) bound to the custom domain

The header and footer are repeated in every page, so a nav change has to be made in all twelve files (six per language). When you change content, update both `en/` and `cs/`.

## Adding members

Each season on `en/members.html` (and `cs/members.html`) is an `<article class="season">`. To add a person, copy a `.person` block. To use a portrait instead of initials, put a photo in `img/members/` and replace the avatar's initials with `<img src="../img/members/name.jpg" alt="">`.

## Deploying

Every push to `main` deploys automatically through GitHub Actions (`.github/workflows/deploy.yml`), using the `CLOUDFLARE_API_TOKEN` repository secret. You can also run it by hand from the repo's Actions tab ("Deploy to Cloudflare" → Run workflow).
