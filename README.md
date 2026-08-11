# tamada.github.io

This is the source code of my personal web site: [tamada.github.io](https://tamada.github.io/).
It is built by [Hugo](https://gohugo.io) static site generator.
The site introduces my developed software products, research works, and blog articles.

## Local development

> [!IMPORTANT]
> **`hugo server` alone is not enough on a fresh clone — the site will render unstyled.**
> The stylesheet `assets/css/custom.css` is **generated**, and it is gitignored.
> You must build it at least once before (or while) running Hugo.

The Blowfish theme ships a precompiled, JIT-purged `main.css` that only contains the
utility classes the theme itself uses. Any Tailwind class used by *this repo's* own
templates would silently do nothing. To fix that, this repo runs its own small Tailwind
build that emits **only the extra utilities** used by `layouts/` and `content/`, into
`assets/css/custom.css`. Blowfish loads that file automatically, right after its own CSS.

```console
npm install            # once, after cloning
npm run build:css      # generates assets/css/custom.css
hugo server
```

While editing templates, run the watcher in a second terminal so new classes are picked
up as you add them:

```console
npm run watch:css      # terminal 1
hugo server            # terminal 2
```

Relevant files:

| File | Role |
|:-----|:-----|
| `assets/css/tailwind.css` | Tailwind entry point. Emits utilities only — no preflight, no theme layer. |
| `tailwind.config.js` | Colors/breakpoints/`darkMode` copied from Blowfish, so generated utilities match the theme. |
| `assets/css/custom.css` | **Generated output. Do not edit, do not commit.** |

CI (`.github/workflows/publish_site.yaml`) runs `npm ci && npm run build:css` before
`hugo --minify`, so the deployed site always has the stylesheet.

