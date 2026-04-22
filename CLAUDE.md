# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal project portfolio site (`liangnan93u16.github.io`), deployed as a static site on GitHub Pages. It showcases developer products with a clean, Vercel-inspired black-and-white design.

## Tech Stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS 4 (via `@tailwindcss/postcss`)
- React Router DOM 7 with `HashRouter` (required for GitHub Pages static hosting)
- Geist font family (sans + mono)
- Lucide React for icons

## Common Commands

```bash
# Development server
npm run dev

# Production build (also runs TypeScript check)
npm run build

# Lint with ESLint
npm run lint

# Local preview script (installs deps if needed, starts on 127.0.0.1:5173)
./start.sh

# Push to GitHub with auto-commit (requires commit message argument)
./push.sh 'commit message'
```

## Project Structure

```
src/
  main.tsx          # Entry point — renders App in StrictMode
  App.tsx           # HashRouter + layout (Header + Routes + Footer)
  index.css         # Tailwind import + Geist @font-face declarations
  pages/
    Home.tsx        # Project list with stats and cards
    ProjectDetail.tsx # Project detail with images, features, tech stack
  components/
    Header.tsx      # Sticky nav with logo + links
    Footer.tsx      # Simple footer
    Lightbox.tsx    # Image lightbox with keyboard nav (Esc/Arrow keys)
    StatusBadge.tsx # Status pill badge component
  data/
    projects.ts     # All project data: types, static array, lookup helpers
```

## Key Architecture Notes

- **HashRouter**: The app uses `HashRouter` (not `BrowserRouter`) because GitHub Pages is a static host. All client-side routes must use hash-based URLs (`/#/project/foo`).
- **Static data model**: All project content lives in `src/data/projects.ts`. The `Project` interface defines the schema. Adding a new project means adding an entry to the `projects` array — no CMS or API.
- **Images**: Project screenshots are stored in `public/images/` and referenced with absolute paths (e.g., `/images/project-name/1.webp`). They are lazily loaded with `loading="lazy"`.
- **Design system**: See `DESIGN.md` for the full spec. Key tokens:
  - Background: `#ffffff`
  - Text: `#171717`
  - Secondary text: `#666666`
  - Accent: `#0a72ef`
  - Border: `#ebebeb`
  - Card surface: `#fafafa`
  - Font: Geist / Geist Mono
- **TypeScript strictness**: `noUnusedLocals` and `noUnusedParameters` are enabled. Unused imports/variables will fail the build.

## Adding a New Project

1. Add project images to `public/images/{project-id}/`
2. Add a new `Project` object to `src/data/projects.ts`
3. Ensure `id` is URL-safe (used in `/#/project/:id`)
4. **Convert all images to WebP using `cwebp`** before adding them to the repo. For example:
   ```bash
   cwebp input.png -o public/images/{project-id}/1.webp -q 85
   ```
   Always use `webp` for images — never commit PNG, JPEG, or other formats.

## Deployment

GitHub Actions auto-deploys on every push to `main`. The workflow builds the project and deploys the `dist/` folder to GitHub Pages. Do not commit the `dist/` directory.
