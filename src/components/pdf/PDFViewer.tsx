import { Document, Page, pdfjs } from "react-pdf";
import type { DocumentProps } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import { usePDFStore } from "../../store/pdfStore";
import type { PDFFileSource } from "../../types/pdf";
import EmptyView from "./EmptyView";
import ErrorView from "./ErrorView";
import LoadingView from "./LoadingView";

// Configure the PDF.js worker (required by react-pdf).
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PDFViewerProps {
  file: PDFFileSource | null;
  currentPage: number;
  zoom: number;
  error: Error | null;
  onLoadSuccess: DocumentProps["onLoadSuccess"];
  onLoadError: DocumentProps["onLoadError"];
}

/**
 * Stateless PDF viewer — a thin wrapper around react-pdf.
 *
 * Owns no application state. The document, current page, and zoom are
 * received via props; load results are reported through callbacks.
 *
 * Layout contract:
 *  - Fills all remaining space in the center column.
 *  - The viewport (outer) scrolls; the page never overflows horizontally.
 *  - The page is always centered and uses a subtle drop shadow.
 *  - Viewer background is a light gray (#f3f4f6).
 */
export default function PDFViewer({
  file,
  currentPage,
  zoom,
  error,
  onLoadSuccess,
  onLoadError,
}: PDFViewerProps) {
  const loading = usePDFStore((state) => state.loading);

  if (!file) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-100">
        <EmptyView />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-100">
        <ErrorView error={error} />
      </div>
    );
  }

  return (
    <div
      className="h-full w-full overflow-auto bg-slate-100"
      role="region"
      aria-label="PDF document viewer"
    >
      {/* Centering wrapper — grows with the page, never wider than content. */}
      <div className="flex min-h-full w-full justify-center p-6">
        {/* Document wrapper constrains the page width so it never
            overflows horizontally regardless of zoom level. */}
        <div className="flex justify-center">
          <Document
            file={file}
            onLoadSuccess={onLoadSuccess}
            onLoadError={onLoadError}
            loading={<LoadingView />}
            error={error ? <ErrorView error={error} /> : null}
            className="m-auto"
          >
            <Page
              pageNumber={currentPage}
              scale={zoom}
              className="rounded-md bg-white shadow-lg shadow-slate-900/10 ring-1 ring-slate-200/60"
            />
          </Document>
        </div>
      </div>

      {loading && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <LoadingView />
        </div>
      )}
    </div>
  );
}