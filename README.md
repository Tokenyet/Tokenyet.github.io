# Dowen's World

Next.js + TypeScript rebuild of `www.dowen.idv.tw`.

## Development

```powershell
pnpm install
pnpm dev
```

## Validation

```powershell
pnpm audit:content
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Google verification

- Meta tag: build with `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<token>`.
- HTML file: place Google's generated file under `public/google-verification/`, or at `public/` if Google requires the root path.

## Deployment

The site is a static export for GitHub Pages. The `pages.yml` workflow builds `out/` and deploys it with GitHub Pages Actions.
