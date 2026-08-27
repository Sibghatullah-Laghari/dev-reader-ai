import type { DocumentProps } from "react-pdf";
import { usePDFStore } from "./store/pdfStore";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import ChatPanel from "./components/layout/ChatPanel";
import StatusBar from "./components/layout/StatusBar";
import PDFToolbar from "./components/pdf/PDFToolbar";
import PDFViewer from "./components/pdf/PDFViewer";

/**
 * Main application container.
 *
 * Desktop layout (fills the window, no page scroll):
 *
 *   ┌───────────────────────────────────────────┐
 * │                 Header                    │
 *   ├──────┬───────────────────────┬────────────┤
 *   │      │     PDF Toolbar        │            │
 *   │ Side │ ┌───────────────────┐ │  AI Chat   │
 *   │ bar  │ │   PDF Viewer       │ │  Panel    │
 *   │      │ │  (scrollable)      │ │            │
 *   │      │ └───────────────────┘ │            │
 *   ├──────┴───────────────────────┴────────────┤
 *   │                Status Bar                 │
 *   └───────────────────────────────────────────┘
 *
 * Only the PDF viewer area scrolls; every other region is fixed.
 */
export default function App() {
  const currentFile = usePDFStore((state) => state.currentFile);
  const error = usePDFStore((state) => state.error);
  const setNumPages = usePDFStore((state) => state.setNumPages);
  const setError = usePDFStore((state) => state.setError);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-100 text-slate-900">
      {/* Top header — fixed height */}
      <Header />

      {/* Body — fills the remaining vertical space, never scrolls */}
      <div className="flex min-h-0 flex-1">
        {/* Left sidebar — fixed 256px */}
        <Sidebar />

        {/* Center column — grows, holds toolbar + scrollable viewer */}
        <div className="flex min-w-0 flex-1 flex-col">
          <PDFToolbar />
          <PDFViewer
            file={currentFile}
            error={error}
            onLoadSuccess={(doc: DocumentProps) => {
              setNumPages(doc.numPages);
            }}
            onLoadError={(err: Error) => setError(err)}
          />
        </div>

        {/* Right sidebar — fixed 320px */}
        <ChatPanel />
      </div>

      {/* Bottom status bar — fixed height */}
      <StatusBar />
    </div>
  );
}
