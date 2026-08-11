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
| `scripts/theme-css.cjs` | Locates the active theme's precompiled CSS via `hugo config mounts`. |
| `scripts/dedupe-css.cjs` | Drops rules the theme already defines. Runs as the second half of `build:css`. |
| `assets/css/custom.css` | **Generated output. Do not edit, do not commit.** |

CI (`.github/workflows/publish_site.yaml`) sets up Hugo, then runs
`npm ci && npm run build:css` before `hugo --minify`, so the deployed site always has
the stylesheet. Hugo has to be installed *before* the CSS build, because the dedupe
step calls `hugo config mounts` to find the theme.

### Why the build strips duplicate rules

Blowfish loads `assets/css/custom.css` **after** its own `compiled/main.css`, so any
rule we emit that the theme already defines wins on ties — and that quietly defeats
the theme's own responsive overrides. Both of these actually happened:

- a re-emitted `.flex` beat the theme's `.md\:hidden`, leaving the mobile hamburger
  on screen at desktop widths;
- a re-emitted `.hidden` beat `.md\:flex`, hiding the desktop nav at every width.

`scripts/dedupe-css.cjs` removes those duplicates after Tailwind runs, so our file
only ever contains utilities the theme lacks. Two consequences worth knowing:

- **Keep Tailwind classes in `layouts/`, never in `content/`.** The scanner is plain
  text matching, so front matter keys become class candidates — a page with
  `hidden: true` is what emitted that `.hidden` above. `content/` is deliberately not
  in `@source` for this reason.
- Tailwind's `blocklist` is *not* used for this: it matches a utility across all of
  its variants, so blocking the theme's `lg:order-last` also dropped our plain
  `order-last`. Selector-level filtering keeps variants apart.

