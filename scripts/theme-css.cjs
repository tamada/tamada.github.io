/**
 * Locates the precompiled CSS of the active theme.
 *
 * Why this matters: Blowfish concatenates our generated `assets/css/custom.css`
 * AFTER its own `compiled/main.css`, so a duplicate rule always wins on ties.
 * That silently breaks the theme's own overrides -- a re-emitted `.flex` beat
 * `.md\:hidden` and left the mobile hamburger showing on desktop, and a
 * re-emitted `.hidden` beat `.md\:flex` and hid the desktop nav entirely.
 * `scripts/dedupe-css.cjs` uses this to strip those duplicates after the build.
 */

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const THEME_CSS = path.join("assets", "css", "compiled", "main.css");

/** Module directories, in the order Hugo resolves them. */
function moduleDirs() {
  // `hugo config mounts` prints one JSON object per module, concatenated.
  const raw = execFileSync("hugo", ["config", "mounts"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  const dirs = [];
  let rest = raw;
  while (rest.length) {
    const start = rest.indexOf("{");
    if (start === -1) break;
    // Objects are pretty-printed and brace-balanced; walk to the matching brace.
    let depth = 0,
      end = -1,
      inStr = false,
      esc = false;
    for (let i = start; i < rest.length; i++) {
      const ch = rest[i];
      if (esc) { esc = false; continue; }
      if (ch === "\\") { esc = true; continue; }
      if (ch === '"') { inStr = !inStr; continue; }
      if (inStr) continue;
      if (ch === "{") depth++;
      else if (ch === "}" && --depth === 0) { end = i; break; }
    }
    if (end === -1) break;
    try {
      const obj = JSON.parse(rest.slice(start, end + 1));
      if (obj.dir) dirs.push(obj.dir);
    } catch { /* skip unparsable chunk */ }
    rest = rest.slice(end + 1);
  }
  return dirs;
}

/**
 * The compiled CSS Hugo actually serves: the first module that provides it
 * wins, exactly as Hugo's own file lookup does. Taking the union of every
 * module instead would strip rules the served file does not actually contain.
 */
function themeCssPath() {
  for (const dir of moduleDirs()) {
    const p = path.join(dir, THEME_CSS);
    if (fs.existsSync(p)) return p;
  }
  throw new Error(
    `No module provides ${THEME_CSS}. Run \`hugo mod get\` first, and make sure ` +
      `\`hugo\` is on PATH before the CSS build.`,
  );
}

module.exports = { themeCssPath };
