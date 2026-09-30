# 11:11

The public website foundation for the 11:11 event platform. Built with React, Vite, React Router, and plain CSS.

## Run locally

```sh
npm install
npm run dev
```

Use `npm run build` to create a production bundle.

## Structure

- `src/app` defines the public routes.
- `src/components/layout` owns the shared website frame, header, decoration, and website-only intro boundary.
- `src/components/ui` holds reusable cards, icons, and controls.
- `src/data/projects.js` is the temporary source for project categories and slugs.
- `src/pages` contains route-level screens; project detail is intentionally a placeholder.
- `src/styles` holds design tokens and global responsive styles.

Future event experiences can be introduced as separate route layouts while reusing shared data and visual components. The website intro loader is scoped to the marketing routes.
