/**
 * Minimal Tailwind config for this site's *additive* utility build.
 *
 * Source of truth: the `darkMode`, `theme.screens` and `theme.colors` blocks are
 * copied verbatim from Blowfish v2.97.0's `tailwind.config.js`
 * (github.com/nunocoracao/blowfish/v2 -> tailwind.config.js). They exist here so
 * that utilities generated for *this repo's* templates resolve to exactly the same
 * CSS-variable-backed colors and breakpoints as the theme's precompiled
 * `assets/css/compiled/main.css`, which we do NOT rebuild.
 *
 * Deliberately omitted (not needed by anything in layouts/ or content/, and all
 * already present in the theme's compiled CSS): the `theme.extend.typography`
 * block and the @tailwindcss/typography, @tailwindcss/forms and tailwind-scrollbar
 * plugins.
 *
 * If Blowfish is upgraded, re-check this file against the theme's config: it is the
 * one thing here that can silently drift.
 */
module.exports = {
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      md: "853px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      ...require("tailwindcss/colors"),
      transparent: "transparent",
      neutral: {
        DEFAULT: "rgba(var(--color-neutral), <alpha-value>)",
        50: "rgba(var(--color-neutral-50), <alpha-value>)",
        100: "rgba(var(--color-neutral-100), <alpha-value>)",
        200: "rgba(var(--color-neutral-200), <alpha-value>)",
        300: "rgba(var(--color-neutral-300), <alpha-value>)",
        400: "rgba(var(--color-neutral-400), <alpha-value>)",
        500: "rgba(var(--color-neutral-500), <alpha-value>)",
        600: "rgba(var(--color-neutral-600), <alpha-value>)",
        700: "rgba(var(--color-neutral-700), <alpha-value>)",
        800: "rgba(var(--color-neutral-800), <alpha-value>)",
        900: "rgba(var(--color-neutral-900), <alpha-value>)",
      },
      primary: {
        50: "rgba(var(--color-primary-50), <alpha-value>)",
        100: "rgba(var(--color-primary-100), <alpha-value>)",
        200: "rgba(var(--color-primary-200), <alpha-value>)",
        300: "rgba(var(--color-primary-300), <alpha-value>)",
        400: "rgba(var(--color-primary-400), <alpha-value>)",
        500: "rgba(var(--color-primary-500), <alpha-value>)",
        600: "rgba(var(--color-primary-600), <alpha-value>)",
        700: "rgba(var(--color-primary-700), <alpha-value>)",
        800: "rgba(var(--color-primary-800), <alpha-value>)",
        900: "rgba(var(--color-primary-900), <alpha-value>)",
      },
      secondary: {
        50: "rgba(var(--color-secondary-50), <alpha-value>)",
        100: "rgba(var(--color-secondary-100), <alpha-value>)",
        200: "rgba(var(--color-secondary-200), <alpha-value>)",
        300: "rgba(var(--color-secondary-300), <alpha-value>)",
        400: "rgba(var(--color-secondary-400), <alpha-value>)",
        500: "rgba(var(--color-secondary-500), <alpha-value>)",
        600: "rgba(var(--color-secondary-600), <alpha-value>)",
        700: "rgba(var(--color-secondary-700), <alpha-value>)",
        800: "rgba(var(--color-secondary-800), <alpha-value>)",
        900: "rgba(var(--color-secondary-900), <alpha-value>)",
      },
    },
  },
};
