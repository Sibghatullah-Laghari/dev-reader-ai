import { usePDFStore } from "./store/pdfStore";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import PDFViewer from "./components/pdf/PDFViewer";
import PDFToolbar from "./components/pdf/PDFToolbar";
import ChatPanel from "./components/layout/ChatPanel";
import StatusBar from "./components/layout/StatusBar";

/**
 * Main application container. The only component that owns state.
 * Delegates rendering to child components.
 */
export default function App() {
  const {
    currentFile,
    currentPage,
    zoom,
    loading,
    error,
    setNumPages,
    setError,
  } = usePDFStore();

  return (
    <div className="h-screen w-screen flex flex-col bg-zinc-950 text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <PDFToolbar />
          <PDFViewer
            file={currentFile}
            currentPage={currentPage}
            zoom={zoom}
            loading={loading}
            error={error}
            onLoadSuccess={(doc: any) => {
              setNumPages(doc.numPages);
            }}
            onLoadError={(err: any) => {
              setError(err);
            }}
          />
        </div>
        <ChatPanel />
      </div>
      <StatusBar />
    </div>
  );
}