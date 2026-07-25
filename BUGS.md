# DevReader AI — Bug & Issue Report

> Prioritized list of bugs, problems, and errors found in the codebase.
> Last updated: 2026-07-25

---

## Priority Legend

| Priority | Label | Description |
|---|---|---|
| 🔴 **P0** | Critical | App crashes, data loss, or completely broken feature |
| 🟠 **P1** | High | Major bug that blocks a core workflow |
| 🟡 **P2** | Medium | Noticeable bug that degrades experience |
| 🔵 **P3** | Low | Minor issue, cosmetic, or improvement suggestion |
| ⚪ **P4** | Info | Observation or tech debt item |

---

## 🔴 P0 — Critical

### 1. No error boundary around the PDF viewer
**File:** `src/App.tsx`
**Issue:** The `PDFViewer` component renders an `ErrorView` when `error` is set, but there is no React error boundary wrapping the entire app. If any component throws an unhandled error (e.g., a PDF parsing exception), the entire app crashes with a white screen.
**Impact:** Users lose their session and must restart the app.
**Fix:** Add a React error boundary component at the top level of `App.tsx` or wrap `PDFViewer` in one.

### 2. `PDFViewer.tsx` — `loading` overlay is rendered twice
**File:** `src/components/pdf/PDFViewer.tsx`
**Issue:** The `Document` component already has a `loading={<LoadingView />}` prop, but there is also a separate `{loading && <div className="pointer-events-none absolute inset-0 ...">` overlay at the bottom of the component. This means when a PDF is loading, the spinner is rendered **twice** — once inside the `Document` and once as an absolute overlay.
**Impact:** Double spinner, confusing UX, unnecessary DOM nodes.
**Fix:** Remove the duplicate overlay or the `loading` prop on `<Document>`.

### 3. `PDFViewer.tsx` — `error` prop passed to `<Document>` even when `error` is null
**File:** `src/components/pdf/PDFViewer.tsx`
**Issue:** The `error` prop is passed to `<Document error={error ? <ErrorView error={error} /> : null} />`. When `error` is `null`, this passes `null` as the error prop. While `react-pdf` may handle this, it is inconsistent with the `loading` prop which also receives a component.
**Impact:** Potential unexpected behavior in `react-pdf` when `null` is passed as the error prop.
**Fix:** Only pass the `error` prop to `<Document>` when `error` is truthy, or always pass a component.

---

## 🟠 P1 — High

### 4. `Sidebar.tsx` — `w-65` is not a valid Tailwind class
**File:** `src/components/layout/Sidebar.tsx`
**Issue:** The class `w-65` does not exist in Tailwind CSS. The intended value is likely `w-64` (256px) or `w-72` (288px). Tailwind will ignore this class, causing the sidebar to use its default width or collapse.
**Impact:** Sidebar width is incorrect or undefined, breaking the layout.
**Fix:** Change `w-65` to a valid Tailwind width class (e.g., `w-64`).

### 5. `ChatPanel.tsx` — `w-85` is not a valid Tailwind class
**File:** `src/components/layout/ChatPanel.tsx`
**Issue:** Same as #4 — `w-85` is not a valid Tailwind class. The intended value is likely `w-80` (320px) or `w-84` (336px).
**Impact:** Chat panel width is incorrect or undefined, breaking the layout.
**Fix:** Change `w-85` to a valid Tailwind width class (e.g., `w-80`).

### 6. `App.tsx` — `currentPage` and `zoom` are unused
**File:** `src/App.tsx`
**Issue:** The `currentPage` and `zoom` values are read from the store but never passed to `PDFViewer`. The `PDFViewer` component receives `currentPage` and `zoom` as props, but the values come from `usePDFStore` directly in `App.tsx` and are not connected to the viewer's internal state management.
**Impact:** The PDF viewer may not reflect the current page or zoom level from the store.
**Fix:** Pass `currentPage` and `zoom` from the store to `PDFViewer` as props (they are already being passed, but verify the prop names match the component's expected interface).

### 7. No TypeScript `noUnusedLocals` violation for `setNumPages` in `App.tsx`
**File:** `src/App.tsx`
**Issue:** `setNumPages` is extracted from the store but is only used inside the `onLoadSuccess` callback of `<PDFViewer>`. While this is technically used, the `onLoadSuccess` callback is defined inline and captures `setNumPages` — this is fine, but the pattern is fragile. If the callback is removed or refactored, `setNumPages` becomes unused and TypeScript will error.
**Impact:** Low risk, but fragile code.
**Fix:** Consider moving the `onLoadSuccess` handler to a stable callback or using a ref.

---

## 🟡 P2 — Medium

### 8. `fileService.ts` — `open` returns `string | null | string[]` but `multiple: false` is set
**File:** `src/services/fileService.ts`
**Issue:** The `open` function from `@tauri-apps/plugin-dialog` returns `string | null | string[]` depending on the `multiple` option. With `multiple: false`, it should return `string | null`, but the type signature of `open()` may still include `string[]` in the union. The `typeof selected === "string"` check handles this correctly at runtime, but the TypeScript type may not reflect this.
**Impact:** Potential type narrowing issue — TypeScript may not narrow `selected` to `string` after the check.
**Fix:** Add a type assertion or use a more explicit type guard.

### 9. `useOpenPDF.ts` — Error message is generic and unhelpful
**File:** `src/hooks/useOpenPDF.ts`
**Issue:** When the file dialog fails (e.g., permission denied), the error message is `"Failed to open the file dialog."` which does not include the original error details. Users cannot diagnose why the dialog failed.
**Impact:** Poor debugging experience for users and developers.
**Fix:** Include the original error message: `new Error(\`Failed to open the file dialog: ${cause.message}\`)`.

### 10. `PDFToolbar.tsx` — `Fit width` button has no visual feedback
**File:** `src/components/pdf/PDFToolbar.tsx`
**Issue:** The "Fit width" button is `disabled` and has a `onClick` that does nothing. When disabled, it shows `opacity-30` but there is no tooltip or visual indication that it's a placeholder for a future feature.
**Impact:** Users may try clicking it and wonder why nothing happens.
**Fix:** Add a tooltip or change the button to show "coming soon" text instead of just being disabled.

### 11. `Header.tsx` — Search is disabled with no future integration path
**File:** `src/components/layout/Header.tsx`
**Issue:** The search input is `disabled` and has a `title` tooltip. However, there is no keyboard shortcut or other indication that search will be available. The search bar takes up `w-72` of the header space, which could be better used.
**Impact:** Wasted UI space; confusing for users.
**Fix:** Either remove the search bar until it's implemented, or make it clickable with a placeholder state that indicates it's coming soon.

### 12. `pdfStore.ts` — `setFile` sets `loading: file !== null` but `setLoading` exists separately
**File:** `src/store/pdfStore.ts`
**Issue:** When `setFile` is called with a non-null file, it automatically sets `loading: true`. However, there is also a `setLoading` action that can set loading independently. This creates a potential inconsistency — if `setFile(null)` is called (to clear the file), `loading` is set to `false`, but there is no explicit `setLoading(false)` call that would be obvious to future developers.
**Impact:** Low risk, but implicit behavior that could surprise developers.
**Fix:** Document the implicit loading behavior in `setFile`, or make loading state explicit in all paths.

---

## 🔵 P3 — Low

### 13. `index.html` — Title is generic
**File:** `index.html`
**Issue:** The page title is `"Tauri + React + Typescript"` — the default Tauri template title. It should be `"DevReader AI"` to match the app's branding.
**Impact:** Minor — wrong title in browser tabs and task switcher.
**Fix:** Change `<title>Tauri + React + Typescript</title>` to `<title>DevReader AI</title>`.

### 14. `Cargo.toml` — `description` is generic
**File:** `src-tauri/Cargo.toml`
**Issue:** The description is `"A Tauri App"` — the default template value. Should be updated to reflect the app's purpose.
**Impact:** Minor — wrong description in package metadata.
**Fix:** Change description to `"A smart PDF reader for developers"`.

### 15. `tauri.conf.json` — `productName` and `identifier` are defaults
**File:** `src-tauri/tauri.conf.json`
**Issue:** `productName` is `"tauri-app"` and `identifier` is `"com.sibghatullah.tauri-app"`. The product name should be `"DevReader AI"` and the identifier should be more specific.
**Impact:** Minor — wrong app name in system menus and build output.
**Fix:** Update `productName` to `"DevReader AI"` and `identifier` to `"com.sibghatullah.devreader-ai"`.

### 16. No `.editorconfig` or `.prettierrc`
**Files:** Root directory
**Issue:** The project has no editor configuration or Prettier config. Different developers may use different formatting styles.
**Impact:** Inconsistent code formatting across the team.
**Fix:** Add `.editorconfig` and optionally `.prettierrc`.

### 17. No `.gitignore` for build artifacts
**Files:** Root directory
**Issue:** The `dist/` and `src-tauri/target/` directories are not gitignored. Build artifacts may be accidentally committed.
**Impact:** Bloated repository size, potential CI issues.
**Fix:** Add a `.gitignore` with entries for `dist/`, `src-tauri/target/`, `node_modules/`, etc.

### 18. `src-tauri/src/lib.rs` — `greet` command is a placeholder
**File:** `src-tauri/src/lib.rs`
**Issue:** The only Tauri command is `greet`, which returns a hardcoded string. This is a leftover from the Tauri template and serves no purpose in the app.
**Impact:** Dead code that adds noise to the Rust source.
**Fix:** Remove the `greet` command or replace it with a meaningful command (e.g., file metadata extraction).

---

## ⚪ P4 — Info / Tech Debt

### 19. Unused dependencies
**File:** `package.json`
**Issue:** The following dependencies are installed but not imported anywhere in the source code:
- `axios` — no HTTP calls are made yet
- `@tanstack/react-query` — no query hooks are used
- `react-router-dom` — no routes are defined
- `clsx` — not imported in any component

**Impact:** Bloated bundle size, unnecessary dependency maintenance.
**Fix:** Either remove unused dependencies or start using them as planned.

### 20. No logging infrastructure
**Files:** Entire project
**Issue:** There is no logging anywhere in the codebase. Errors are stored in Zustand state and displayed in the UI, but there is no persistent logging (console, file, or remote). This makes debugging production issues difficult.
**Impact:** Hard to diagnose issues in production.
**Fix:** Add `console.error`/`console.warn` for errors, or integrate a logging library like `loglevel` or `tracing` (Rust side).

### 21. No tests
**Files:** Entire project
**Issue:** There are zero test files. No unit tests, integration tests, or E2E tests exist.
**Impact:** No safety net for refactoring; bugs are harder to catch.
**Fix:** Set up Vitest for unit tests and Playwright for E2E tests.

### 22. `vite-env.d.ts` is minimal
**File:** `src/vite-env.d.ts`
**Issue:** The file only contains a triple-reference comment. It should reference the Tauri types if available.
**Impact:** No type safety for Tauri APIs in the frontend.
**Fix:** Add `/// <reference types="@tauri-apps/api" />` or install `@tauri-apps/api` types.

### 23. `src-tauri/src/lib.rs` — No actual Tauri commands implemented
**File:** `src-tauri/src/lib.rs`
**Issue:** The `greet` command is a template placeholder. The app does not use any Rust-side commands for PDF operations (e.g., file metadata, text extraction). All PDF work is done in the frontend via `pdfjs-dist`.
**Impact:** The Rust backend is essentially unused; Tauri's native capabilities are not leveraged.
**Fix:** Either implement Rust-side PDF operations or remove the Tauri Rust backend and use a pure web approach.

---

## Summary

| Priority | Count |
|---|---|
| 🔴 P0 — Critical | 3 |
| 🟠 P1 — High | 4 |
| 🟡 P2 — Medium | 5 |
| 🔵 P3 — Low | 6 |
| ⚪ P4 — Info | 5 |
| **Total** | **23** |

### Top 3 Must-Fix Issues
1. **No error boundary** (P0) — app crashes on unhandled errors
2. **Invalid Tailwind classes `w-65` / `w-85`** (P1) — layout is broken
3. **Duplicate loading spinner in PDFViewer** (P0) — confusing UX

### Recommended Fix Order
1. Fix invalid Tailwind classes (`w-65` → `w-64`, `w-85` → `w-80`) — 5 min
2. Add error boundary to `App.tsx` — 30 min
3. Remove duplicate loading overlay in `PDFViewer.tsx` — 10 min
4. Update `index.html` title and `tauri.conf.json` product name — 5 min
5. Remove unused `greet` command from `lib.rs` — 5 min
6. Add `.gitignore` — 5 min
7. Remove unused dependencies or start using them — 1 hour