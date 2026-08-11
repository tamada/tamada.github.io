/**
 * Points the products page's `date` at the most recently updated product.
 *
 * The page itself is generated from https://tamada.github.io/api/products/ at
 * build time, so a hand-written `date` in its front matter goes stale the
 * moment any product is touched. Hugo's `.Date` is read-only during rendering,
 * which is why this rewrites the source file before `hugo` runs rather than
 * being solved inside the shortcode. Doing it this way keeps `.Date` correct
 * everywhere it matters -- RSS, the sitemap, schema.org, list ordering -- and
 * not just in the visible byline.
 *
 * Run from CI (see .github/workflows/publish_site.yaml) before the site build.
 * The rewrite is intentionally NOT committed; the repo copy stays at whatever
 * was last committed, exactly like the generated assets/css/custom.css.
 *
 * A failed fetch is a warning, not an error: publishing with a slightly stale
 * date beats failing the deploy over a transient network problem.
 */

const fs = require("node:fs");

const API = "https://tamada.github.io/api/products/";
const PAGE = "content/products/_index.md";

async function latestUpdate() {
  const res = await fetch(API);
  if (!res.ok) throw new Error(`${API} responded ${res.status}`);
  const products = await res.json();
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error(`${API} returned no products`);
  }
  const stamps = products.map((p) => p.last_updated).filter(Boolean).sort();
  if (stamps.length === 0) throw new Error(`no last_updated in ${API}`);
  return stamps[stamps.length - 1].slice(0, 10); // YYYY-MM-DD
}

/** Replace (or add) the top-level `date:` of the first YAML front matter block. */
function withDate(source, date) {
  const fm = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) throw new Error(`${PAGE} has no YAML front matter`);
  const body = fm[1];
  const updated = /^date:/m.test(body)
    ? body.replace(/^date:.*$/m, `date: '${date}'`)
    : `${body}\ndate: '${date}'`;
  return source.slice(0, fm.index) + `---\n${updated}\n---` + source.slice(fm.index + fm[0].length);
}

(async () => {
  let date;
  try {
    date = await latestUpdate();
  } catch (err) {
    console.warn(`update-products-date: keeping the committed date (${err.message})`);
    return;
  }

  const before = fs.readFileSync(PAGE, "utf8");
  const after = withDate(before, date);
  if (before === after) {
    console.log(`update-products-date: ${PAGE} already at ${date}`);
    return;
  }
  fs.writeFileSync(PAGE, after);
  console.log(`update-products-date: ${PAGE} date -> ${date}`);
})();
