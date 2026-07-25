# DevReader AI

A modern, desktop PDF reader built with **Tauri 2**, **React 19**, and **TypeScript**. Lightweight, fast, and designed for developers who read a lot of documentation.

<p align="center">
  <img src="public/vite.svg" alt="DevReader AI logo" width="120" />
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| **PDF Rendering** | Fast, high-fidelity PDF rendering powered by `pdfjs-dist` and `react-pdf` |
| **Navigation** | Previous / Next page with keyboard-friendly toolbar controls |
| **Zoom** | Zoom in, zoom out, and reset — clamped between 50% and 300% |
| **File Open** | Native OS file dialog filtered to PDF files via Tauri's dialog plugin |
| **Status Bar** | Real-time status (Ready / Loading / Error), page indicator, and zoom level |
| **AI Assistant Panel** | Placeholder sidebar for future AI-powered document Q&A (coming soon) |
| **Document Library** | Sidebar with recent documents placeholder (coming soon) |
| **Search** | Search bar placeholder for document & content search (coming soon) |
| **Modern UI** | Clean, light-themed interface built with Tailwind CSS and Lucide icons |
| **Desktop-First** | Full-screen layout with fixed header, sidebar, and status bar — only the PDF viewer scrolls |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Desktop Shell** | Tauri 2 (Rust) |
| **Frontend** | React 19 + TypeScript + Vite |
| **Styling** | Tailwind CSS v4 |
| **State** | Zustand (lightweight store) |
| **PDF Engine** | pdfjs-dist + react-pdf |
| **UI Icons** | Lucide React |
| **HTTP** | Axios (reserved for future API calls) |
| **Routing** | React Router DOM v7 |
| **Query Cache** | TanStack React Query v5 |

---

## 📦 Project Structure

```
dev-reader-ai/
├── index.html              # Entry HTML
├── package.json            # Frontend dependencies & scripts
├── vite.config.ts          # Vite + Tauri dev configuration
├── tsconfig.json           # TypeScript config
├── src/
│   ├── App.tsx             # Main layout (Header, Sidebar, Viewer, Chat, StatusBar)
│   ├── main.tsx            # React entry point
│   ├── index.css           # Global styles + Tailwind import
│   ├── types/
│   │   └── pdf.ts          # PDF type definitions & zoom constants
│   ├── store/
│   │   └── pdfStore.ts     # Zustand store for PDF state
│   ├── hooks/
│   │   └── useOpenPDF.ts   # Shared "Open PDF" hook
│   ├── services/
│   │   └── fileService.ts  # Tauri dialog file picker service
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Top bar with brand, Open PDF, search
│   │   │   ├── Sidebar.tsx     # Left library rail
│   │   │   ├── ChatPanel.tsx   # Right AI assistant panel
│   │   │   └── StatusBar.tsx   # Bottom status bar
│   │   └── pdf/
│   │       ├── PDFViewer.tsx   # Core PDF rendering (react-pdf wrapper)
│   │       ├── PDFToolbar.tsx  # Navigation & zoom toolbar
│   │       ├── ToolbarButton.tsx # Reusable icon button
│   │       ├── EmptyView.tsx   # Placeholder when no PDF is open
│   │       ├── ErrorView.tsx   # Error display on load failure
│   │       └── LoadingView.tsx # Spinner during PDF load
└── src-tauri/
    ├── Cargo.toml            # Rust dependencies
    ├── tauri.conf.json       # Tauri app configuration
    ├── capabilities/
    │   └── default.json      # Tauri permissions
    └── src/
        ├── main.rs           # Rust entry point
        └── lib.rs            # Tauri commands (greet placeholder)
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
git clone <repo-url>
cd dev-reader-ai

# Install frontend dependencies
pnpm install

# Start the development server
pnpm dev
```

### Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start Vite dev server + Tauri in development mode |
| `pnpm build` | Type-check with TypeScript and build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm tauri` | Run Tauri CLI commands (e.g., `pnpm tauri build`) |

---

## 📖 Usage

1. **Open a PDF** — Click the **Open PDF** button in the top bar or toolbar.
2. **Navigate** — Use the **Previous** / **Next** arrow buttons in the toolbar to move between pages.
3. **Zoom** — Use the **+** / **−** buttons to zoom in and out. The zoom level is shown in the toolbar and status bar.
4. **Status** — The bottom status bar shows the current page, total pages, zoom percentage, and app status.
5. **AI Chat** — The right panel is a placeholder for future AI-powered document questioning.

---

## 🔜 Roadmap

- [ ] **AI Document Q&A** — Chat with your PDFs using an LLM backend
- [ ] **Document Library** — Persist and display recently opened documents
- [ ] **Full-Text Search** — Search within PDF content
- [ ] **Fit Width / Fit Page** — Responsive zoom modes
- [ ] **Dark Mode** — Theme toggle for light/dark
- [ ] **Bookmarks & Annotations** — Highlight and note-taking support
- [ ] **Multi-language Support** — i18n for international users

---

## 📄 License

MIT

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📝 Changelog

### v0.1.0 (Initial Release)
- PDF rendering with `react-pdf` + `pdfjs-dist`
- Navigation (prev/next page) and zoom (in/out/reset)
- Native file open dialog via Tauri
- Zustand state management
- Responsive desktop layout with Header, Sidebar, ChatPanel, StatusBar
- Loading, empty, and error states for PDF viewer
- Clean, modern UI with Tailwind CSS + Lucide icons
