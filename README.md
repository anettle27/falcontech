# FalconTech

Static site at https://falcontech.anetavostra.com. No build step.

- `public/` — the site (served as-is)
  - `en/` — English pages (Home, About, Competitions, Members, Sponsors, Contact)
  - `cs/` — Czech pages go here later; copy `en/`, translate, then enable the `CZ` link in each page header and the redirect in `public/index.html`
  - `assets/` — shared `style.css` and `site.js` (mobile menu, photo lightbox)
  - `img/` — logo and photos
- `wrangler.jsonc` — Cloudflare Worker (static assets) bound to the custom domain

The header and footer are repeated in every page, so a nav change has to be made in all six files.

## Adding members

Each season on `en/members.html` is an `<article class="season">`. To add a person, copy a `.person` block. To use a portrait instead of initials, put a photo in `img/members/` and replace the avatar's initials with `<img src="../img/members/name.jpg" alt="">`.
