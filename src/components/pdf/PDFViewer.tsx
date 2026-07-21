import { Document, Page, pdfjs } from "react-pdf";
import type { DocumentProps } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import type {
  PDFFileSource,
} from "../../types/pdf";
import EmptyView from "./EmptyView";
import ErrorView from "./ErrorView";
import LoadingView from "./LoadingView";

// Configure the PDF.js worker (required by react-pdf).
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFViewerProps {
  file: PDFFileSource | null;
  currentPage: number;
  zoom: number;
  loading: boolean;
  error: Error | null;
  onLoadSuccess: DocumentProps['onLoadSuccess'];
  onLoadError: DocumentProps['onLoadError'];
}

/**
 * Stateless PDF viewer — a thin wrapper around react-pdf.
 *
 * Owns no application state. The document, current page, and zoom are
 * received via props; load results are reported through callbacks.
 */
export default function PDFViewer({
  file,
  currentPage,
  zoom,
  loading,
  error,
  onLoadSuccess,
  onLoadError,
}: PDFViewerProps) {
  if (!file) {
    return <EmptyView />;
  }

  if (error) {
    return <ErrorView error={error} />;
  }

  return (
    <div className="flex h-full w-full flex-col overflow-auto bg-zinc-950">
      <div className="flex flex-1 justify-center p-6">
        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
          onLoadError={onLoadError}
          loading={<LoadingView />}
          error={error ? <ErrorView error={error} /> : null}
        >
          <Page
            pageNumber={currentPage}
            scale={zoom}
            className="shadow-2xl shadow-black/60"
          />
        </Document>
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingView />
        </div>
      )}
    </div>
  );
}