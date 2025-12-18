# Quick Audit Summary - CCC Light International

Short, prioritized list of findings and immediate actions to ship safely.

1) Blocker: Lighthouse headless interstitial
   - Symptom: Headless Chrome sometimes opens `chrome-error://chromewebdata/` when running Lighthouse locally.
   - Fix: Run Lighthouse with additional flags or in headed mode: 
     ```bash
     npx -y lighthouse http://localhost:4173 --chrome-flags="--no-sandbox --disable-features=IsolateOrigins,site-per-process" --output html --output-path=./lighthouse-local
     ```

2) High priority - Performance
   - Large bundles: `index` (~322KB), `vendor` (~139KB), `Index` (~180KB).
   - Fixes: Code-split route entrypoints (already using lazy imports) and audit large pages (`Index`, `Bible`, `Search`) to defer/SSR heavy libraries.
   - Quick: Purge unused Tailwind classes and extract critical CSS (already in place for hero).

3) High priority - Accessibility
   - Ensure `<html lang="en">` and `<title>`/meta description present (confirmed in `index.html`).
   - Ensure images have meaningful `alt` attributes (most critical ones already set in preloader). Fix any missing `alt` flagged by Lighthouse.
   - Keyboard: skip link present (`App.tsx`) and `main` has `id="main-content"`.

4) Medium priority - UX
   - LCP: Continue using LQIP/critical hero CSS (already added).
   - Lazy-load heavy embed components (`YouTubeLightbox`, `AudioVisualizer`) — already lazy imported.

5) Quick deploy checklist (run before launch)
   - `npm run build`
   - `npm run preview` (open http://localhost:4173 and smoke-test)
   - Run Lighthouse (see command above) and inspect `./lighthouse-local.report.html` or `./lighthouse-a11y.report.html`.

6) Suggested follow-ups (post-launch)
   - Replace heavy client-side features with server-side rendering where possible for `Index` and `Bible` pages.
   - Audit third-party scripts and remove unused ones (analytics, fonts) or load them after TTI.

If you want, I can implement any of the specific code fixes (bundle splitting, Tailwind purge tuning, inlining critical CSS) — specify which and I'll patch, test, and push.
