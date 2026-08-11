/**
 * Strips rules from the generated `assets/css/custom.css` whose selector the
 * theme's precompiled CSS already defines.
 *
 * Blowfish concatenates our file AFTER its own, so a duplicated rule wins on
 * ties and silently defeats the theme's own overrides. Two real regressions
 * came from exactly this: a re-emitted `.flex` beat `.md\:hidden` and left the
 * mobile hamburger on screen at desktop widths, and a re-emitted `.hidden`
 * beat `.md\:flex` and hid the desktop nav at every width.
 *
 * Matching is on the exact selector string, not on parsed class names. Both
 * files come out of the same Tailwind version and the same config, so the same
 * utility always serialises identically -- and comparing strings keeps variants
 * apart. That distinction is the reason this runs here instead of through
 * Tailwind's `blocklist`, which matches a utility across all of its variants:
 * blocklisting the theme's `lg:order-last` also dropped our plain `order-last`.
 */

const fs = require("node:fs");
const { themeCssPath } = require("./theme-css.cjs");

const CUSTOM_CSS = "assets/css/custom.css";

/**
 * Split minified CSS into top-level-addressable rules, tracking the at-rule
 * nesting so `@media`/`@supports` blocks survive intact.
 * Returns a flat list of { selector, start, end } for style rules only.
 */
function styleRules(css) {
  const rules = [];
  let depth = 0;
  let tokenStart = 0;
  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    if (ch === "{") {
      const head = css.slice(tokenStart, i).trim();
      const bodyStart = i;
      // Walk to the matching close brace.
      let d = 1;
      let j = i + 1;
      for (; j < css.length && d > 0; j++) {
        if (css[j] === "{") d++;
        else if (css[j] === "}") d--;
      }
      const end = j; // one past the matching '}'
      if (head.startsWith("@")) {
        // At-rule: recurse into its body so nested style rules are visible.
        const inner = css.slice(bodyStart + 1, end - 1);
        for (const r of styleRules(inner)) {
          rules.push({
            selector: r.selector,
            start: bodyStart + 1 + r.start,
            end: bodyStart + 1 + r.end,
          });
        }
      } else if (head) {
        rules.push({ selector: head, start: tokenStart, end });
      }
      i = end - 1;
      tokenStart = end;
      depth = 0;
      void depth;
    } else if (ch === "}") {
      tokenStart = i + 1;
    }
  }
  return rules;
}

const themePath = themeCssPath();
const themeCss = fs.readFileSync(themePath, "utf8");
const customCss = fs.readFileSync(CUSTOM_CSS, "utf8");

const themeSelectors = new Set(styleRules(themeCss).map((r) => r.selector));

// Remove from the end so earlier offsets stay valid.
const dupes = styleRules(customCss)
  .filter((r) => themeSelectors.has(r.selector))
  .sort((a, b) => b.start - a.start);

let out = customCss;
for (const r of dupes) out = out.slice(0, r.start) + out.slice(r.end);

// Empty at-rule blocks can be left behind once their only rule is gone.
let before;
do {
  before = out;
  out = out.replace(/@[a-z-]+[^{}]*\{\s*\}/g, "");
} while (out !== before);

fs.writeFileSync(CUSTOM_CSS, out);

const kept = styleRules(out).length;
console.log(
  `dedupe-css: removed ${dupes.length} rule(s) already in ${themePath}; ${kept} rule(s) kept ` +
    `(${customCss.length} -> ${out.length} bytes)`,
);
