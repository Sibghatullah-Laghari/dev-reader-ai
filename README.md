# DevReader AI

A modern, desktop-first PDF reader built with **Tauri 2**, **React 19**, and **TypeScript**. Lightweight, fast, and designed for developers who read a lot of documentation.

<p align="center">
  <img src="public/vite.svg" alt="DevReader AI logo" width="120" />
</p>

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Usage](#-usage)
- [Architecture](#-architecture)
- [Component Overview](#-component-overview)
- [State Management](#-state-management)
- [Roadmap](#-roadmap)
- [Known Issues](#-known-issues)
- [Development](#-development)
- [License](#-license)
- [Contributing](#-contributing)

---

## ✨ Features

| Feature | Status | Description |
|---|---|---|
| **PDF Rendering** | ✅ Working | Fast, high-fidelity PDF rendering powered by `pdfjs-dist` and `react-pdf` |
| **Page Navigation** | ✅ Working | Previous/Next page with keyboard-friendly toolbar controls |
| **Zoom Controls** | ✅ Working | Zoom in/out/reset with clamping between 50% and 300% |
| **File Open Dialog** | ✅ Working | Native OS file dialog filtered to PDF files via Tauri |
| **Status Bar** | ✅ Working | Real-time status (Ready/Loading/Error), page indicator, zoom level |
| **AI Assistant Panel** | 🔜 Planned | Placeholder sidebar for future AI-powered document Q&A |
| **Document Library** | 🔜 Planned | Sidebar with recent documents (coming soon) |
| **Full-Text Search** | 🔜 Planned | Search bar placeholder for document & content search |
| **Dark Mode** | 🔜 Planned | Theme toggle for light/dark modes |
| **Bookmarks & Annotations** | 🔜 Planned | Highlight and note-taking support |

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Desktop Shell** | Tauri | v2 |
| **Frontend Framework** | React | v19 |
| **Build Tool** | Vite | v7 |
| **Language** | TypeScript | v5.8 |
| **Styling** | Tailwind CSS | v4 |
| **State Management** | Zustand | v5 |
| **PDF Engine** | react-pdf + pdfjs-dist | v10 + v6 |
| **Icons** | Lucide React | v1.25 |
| **Dialog Plugin** | @tauri-apps/plugin-dialog | v2.7 |
| **Opener Plugin** | @tauri-apps/plugin-opener | v2 |

---

## 📦 Project Structure

```
dev-reader-ai/
├── index.html                 # Entry HTML (title: "DevReader AI")
├── package.json               # Frontend dependencies & scripts
├── pnpm-lock.yaml             # Locked dependencies
├── pnpm-workspace.yaml        # Workspace configuration
├── tsconfig.json              # TypeScript config (strict mode)
├── tsconfig.node.json         # Node-specific TS config
├── vite.config.ts             # Vite + Tauri dev configuration
├── README.md                  # This file
├── BUGS.md                    # Prioritized bug/issue report
├── IMPROVEMENTS.md            # Project health & roadmap
├── .gitignore                 # Comprehensive gitignore
│
├── public/
│   ├── vite.svg               # App icon (SVG)
│   └── tauri.svg              # Tauri branding
│
├── src/
│   ├── App.tsx                # Main layout (Header, Sidebar, Viewer, Chat, StatusBar)
│   ├── main.tsx               # React entry point
│   ├── index.css              # Global styles + Tailwind import
│   ├── vite-env.d.ts          # Vite/Tauri type declarations
│   │
│   ├── types/
│   │   └── pdf.ts             # PDF type definitions & zoom constants
│   │       ├── MIN_ZOOM = 0.5
│   │       ├── MAX_ZOOM = 3.0
│   │       ├── ZOOM_STEP = 0.25
│   │       └── DEFAULT_ZOOM = 1.0
│   │
│   ├── store/
│   │   └── pdfStore.ts        # Zustand store for PDF state management
│   │
│   ├── hooks/
│   │   └── useOpenPDF.ts      # Shared "Open PDF" action hook
│   │
│   ├── services/
│   │   └── fileService.ts     # Tauri dialog file picker service
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx     # Top bar with brand, Open PDF, search placeholder
│   │   │   ├── Sidebar.tsx    # Left library rail (recent documents placeholder)
│   │   │   ├── ChatPanel.tsx  # Right AI assistant panel (chat placeholder)
│   │   │   └── StatusBar.tsx  # Bottom status bar (status, page, zoom)
│   │   │
│   │   └── pdf/
│   │       ├── PDFViewer.tsx      # Core PDF rendering (react-pdf wrapper)
│   │       ├── PDFToolbar.tsx     # Navigation & zoom toolbar
│   │       ├── ToolbarButton.tsx  # Reusable icon button component
│   │       ├── EmptyView.tsx      # Placeholder when no PDF is open
│   │       ├── ErrorView.tsx      # Error display on load failure
│   │       └── LoadingView.tsx    # Spinner during PDF load
│   │
│   └── assets/
│       └── react.svg          # React logo asset
│
└── src-tauri/                 # Tauri backend (Rust)
    ├── Cargo.toml             # Rust dependencies
    ├── Cargo.lock             # Locked Rust dependencies
    ├── build.rs               # Build script
    ├── tauri.conf.json        # Tauri app configuration
    │
    ├── capabilities/
    │   └── default.json       # Tauri permissions/capabilities
    │
    ├── icons/                 # App icons (multiple sizes/formats)
    │   ├── icon.png
    │   ├── icon.ico
    │   ├── icon.icns
    │   └── ... (various sizes)
    │
    └── src/
        ├── main.rs            # Rust entry point
        └── lib.rs             # Tauri commands (greet placeholder)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **pnpm** 9+
- **Rust** stable (via [rustup](https://rustup.rs/))
- **Tauri CLI** — installed automatically via pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Sibghatullah-Laghari/dev-reader-ai.git
cd dev-reader-ai

# Install frontend dependencies
pnpm install

# Start the development server
pnpm dev
```

### System Requirements

| OS | Version | Notes |
|---|---|---|
| **Windows** | 10+ | Requires Visual C++ Redistributable |
| **macOS** | 10.15+ | Xcode Command Line Tools required |
| **Linux** | Recent distros | Requires `libgtk-3-dev`, `libwebkit2gtk-4.1-dev` |

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start Vite dev server + Tauri in development mode (port 1420) |
| `pnpm build` | Type-check with TypeScript and build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm tauri` | Run Tauri CLI commands (e.g., `pnpm tauri build`) |
| `pnpm tauri dev` | Run Tauri in development mode |
| `pnpm tauri build` | Build production desktop installer |

---

## 🖱 Usage

### Opening a PDF

1. Click the **Open PDF** button in the top header bar
2. Alternatively, click **Open PDF** in the toolbar below the header
3. Select a PDF file from the native file dialog
4. The document will load and display in the viewer

### Navigation

- **Previous Page**: Click the left arrow button in the toolbar
- **Next Page**: Click the right arrow button in the toolbar
- **Page Indicator**: Shows current page / total pages in toolbar and status bar

### Zoom

- **Zoom In**: Click the `+` button (increases by 25%)
- **Zoom Out**: Click the `-` button (decreases by 25%)
- **Zoom Level**: Displayed in both toolbar and status bar
- **Zoom Range**: Clamped between 50% and 300%

### Status Bar

The bottom status bar displays:
- **App Status**: Ready (green), Loading (amber), or Error (red)
- **Page Indicator**: Current page / total pages
- **Zoom Level**: Current zoom percentage

---

## 🏗 Architecture

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                        Header                                │
│  [Logo] [Open PDF] ───────────── [Search (disabled)]        │
├──────────┬─────────────────────────────┬────────────────────┤
│          │      PDF Toolbar            │                    │
│ Sidebar  │ [←] 2/10 [+] [Fit Width]    │   ChatPanel        │
│ (256px)  │─────────────────────────────│   (320px)          │
│          │                             │                    │
│ Library  │     PDF Viewer              │   AI Assistant     │
│ Recent   │   (scrollable area)         │   Chat             │
│          │                             │                    │
├──────────┴─────────────────────────────┴────────────────────┤
│                      StatusBar                               │
│  ● Ready    Page 2 / 10    100%                             │
└─────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

1. **Desktop-First**: Fixed-height header/status bar; only the PDF viewer scrolls
2. **Three-Column Layout**: Sidebar (left) + Viewer (center) + ChatPanel (right)
3. **State Management**: Zustand store for lightweight, reactive state
4. **Component Composition**: Small, focused components with single responsibilities
5. **Type Safety**: Full TypeScript with strict mode enabled

---

## 🧩 Component Overview

### Layout Components

| Component | Width | Purpose |
|---|---|---|
| `Header` | Full width | Brand, Open PDF action, Search placeholder |
| `Sidebar` | 256px | Document library, recent files |
| `ChatPanel` | 320px | AI assistant chat interface |
| `StatusBar` | Full width | Status, page indicator, zoom level |

### PDF Components

| Component | Purpose |
|---|---|
| `PDFViewer` | Core PDF rendering with react-pdf |
| `PDFToolbar` | Navigation and zoom controls |
| `ToolbarButton` | Reusable button with icon support |
| `EmptyView` | Shown when no document is open |
| `ErrorView` | Displays PDF load errors |
| `LoadingView` | Spinner during document load |

---

## 📊 State Management

### PDF Store (Zustand)

The `usePDFStore` hook provides access to the global PDF state:

```typescript
interface PDFState {
  currentFile: PDFFileSource | null;  // Currently opened PDF
  numPages: number;                   // Total pages in document
  currentPage: number;                // Current page (1-indexed)
  zoom: number;                       // Zoom level (0.5 - 3.0)
  loading: boolean;                   // Loading state
  error: Error | null;                // Error state

  // Actions
  setFile: (file) => void;
  setNumPages: (numPages) => void;
  setPage: (page) => void;
  nextPage: () => void;
  previousPage: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  setLoading: (loading) => void;
  setError: (error) => void;
  clearError: () => void;
}
```

### Zoom Constants

| Constant | Value | Description |
|---|---|---|
| `MIN_ZOOM` | 0.5 | Minimum zoom (50%) |
| `MAX_ZOOM` | 3.0 | Maximum zoom (300%) |
| `ZOOM_STEP` | 0.25 | Zoom increment/decrement |
| `DEFAULT_ZOOM` | 1.0 | Default zoom (100%) |

---

## 🔜 Roadmap

### High Priority

- [ ] **AI Document Q&A** — Chat with your PDFs using an LLM backend
- [ ] **Document Library Persistence** — Save recent files to localStorage/filesystem
- [ ] **Full-Text Search** — Search within PDF content using pdfjs-dist
- [ ] **Testing** — Add unit tests (Vitest) and E2E tests (Playwright)

### Medium Priority

- [ ] **Fit Width / Fit Page** — Responsive zoom modes
- [ ] **Dark Mode** — Theme toggle with CSS custom properties
- [ ] **Logging** — Structured logging for debugging
- [ ] **CI/CD** — GitHub Actions for lint, test, build

### Low Priority

- [ ] **Bookmarks & Annotations** — Highlight and note-taking
- [ ] **Multi-language Support** — i18n with react-i18next
- [ ] **Keyboard Shortcuts** — J/K for pages, +/- for zoom
- [ ] **Plugin System** — Third-party extensions for AI panel

---

## 🐛 Known Issues

See [BUGS.md](./BUGS.md) for a detailed, prioritized list of:
- Critical bugs (P0)
- High-priority issues (P1)
- Medium-priority issues (P2)
- Low-priority issues (P3)
- Tech debt items (P4)

### Top Must-Fix Issues

1. **No error boundary** (P0) — App crashes on unhandled React errors
2. **Invalid Tailwind classes** (P1) — `w-65` and `w-85` are not valid
3. **Duplicate loading spinner** (P0) — Spinner rendered twice during load

---

## 💻 Development

### Dev Server Configuration

- **Port**: 1420 (Vite dev server)
- **HMR Port**: 1421 (WebSocket for hot module replacement)
- **Host**: Configured via `TAURI_DEV_HOST` environment variable

### Adding New Features

1. **New Component**: Create in appropriate `src/components/` subdirectory
2. **New State**: Add to `src/store/pdfStore.ts` or create new store slice
3. **New Service**: Create in `src/services/` directory
4. **New Hook**: Create in `src/hooks/` directory
5. **New Types**: Add to `src/types/` directory

### Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Prettier recommended (not yet configured)
- **Linting**: ESLint recommended (not yet configured)
- **Editor Config**: `.editorconfig` recommended (not yet created)

### Building for Production

```bash
# Build the production bundle
pnpm build

# Build desktop installers (Windows, macOS, Linux)
pnpm tauri build

# Output location:
# - Windows: src-tauri/target/release/bundle/msi/
# - macOS: src-tauri/target/release/bundle/dmg/
# - Linux: src-tauri/target/release/bundle/deb/
```

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Before Submitting a PR

- [ ] Run `pnpm build` to ensure no TypeScript errors
- [ ] Test the app with `pnpm dev`
- [ ] Update documentation if needed
- [ ] Check [BUGS.md](./BUGS.md) for known issues

### Reporting Bugs

- Open an issue with a clear title and description
- Include steps to reproduce the bug
- Add screenshots if applicable
- Mention your OS and version

---

## 📝 Changelog

### v0.1.0 (Initial Release)

- ✅ PDF rendering with `react-pdf` + `pdfjs-dist`
- ✅ Navigation (prev/next page) and zoom (in/out/reset)
- ✅ Native file open dialog via Tauri
- ✅ Zustand state management
- ✅ Responsive desktop layout (Header, Sidebar, ChatPanel, StatusBar)
- ✅ Loading, empty, and error states for PDF viewer
- ✅ Clean, modern UI with Tailwind CSS + Lucide icons

---

## 🙏 Acknowledgments

- [Tauri](https://tauri.app/) - Desktop framework
- [React-PDF](https://github.com/wojtekmaj/react-pdf) - PDF rendering
- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF engine
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Icons

---

## 📞 Support

- **GitHub Issues**: [Report a bug or request a feature](https://github.com/Sibghatullah-Laghari/dev-reader-ai/issues)
- **GitHub Discussions**: [Ask questions](https://github.com/Sibghatullah-Laghari/dev-reader-ai/discussions)