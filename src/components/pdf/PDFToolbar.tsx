import {
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Maximize,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useOpenPDF } from "../../hooks/useOpenPDF";
import { usePDFStore } from "../../store/pdfStore";
import { MAX_ZOOM, MIN_ZOOM } from "../../types/pdf";
import ToolbarButton from "./ToolbarButton";

/**
 * Center-area toolbar.
 *
 * Horizontal controls for document navigation and zoom, plus the
 * "Open PDF" action and a "Fit width" placeholder. All state is read
 * from the shared PDF store.
 */
export default function PDFToolbar() {
  const openPDF = useOpenPDF();

  const currentPage = usePDFStore((state) => state.currentPage);
  const numPages = usePDFStore((state) => state.numPages);
  const zoom = usePDFStore((state) => state.zoom);
  const nextPage = usePDFStore((state) => state.nextPage);
  const previousPage = usePDFStore((state) => state.previousPage);
  const zoomIn = usePDFStore((state) => state.zoomIn);
  const zoomOut = usePDFStore((state) => state.zoomOut);

  const hasDocument = numPages > 0;

  return (
    <div className="flex h-11 shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-3">
      {/* Open PDF */}
      <ToolbarButton
        label="Open PDF"
        icon={FolderOpen}
        onClick={openPDF}
      />

      <Divider />

      {/* Page navigation */}
      <ToolbarButton
        label="Previous page"
        icon={ChevronLeft}
        onClick={previousPage}
        disabled={!hasDocument || currentPage <= 1}
      />
      <span className="min-w-18 text-center text-xs font-medium text-slate-600 tabular-nums">
        {hasDocument ? `${currentPage} / ${numPages}` : "— / —"}
      </span>
      <ToolbarButton
        label="Next page"
        icon={ChevronRight}
        onClick={nextPage}
        disabled={!hasDocument || currentPage >= numPages}
      />

      <Divider />

      {/* Zoom controls */}
      <ToolbarButton
        label="Zoom out"
        icon={ZoomOut}
        onClick={zoomOut}
        disabled={!hasDocument || zoom <= MIN_ZOOM}
      />
      <span className="min-w-12 text-center text-xs font-medium text-slate-600 tabular-nums">
        {Math.round(zoom * 100)}%
      </span>
      <ToolbarButton
        label="Zoom in"
        icon={ZoomIn}
        onClick={zoomIn}
        disabled={!hasDocument || zoom >= MAX_ZOOM}
      />

      <Divider />

      {/* Fit width (placeholder) */}
      <ToolbarButton
        label="Fit width (coming soon)"
        icon={Maximize}
        onClick={() => {
          // Placeholder — fit-width mode will land in a later milestone.
        }}
        disabled={!hasDocument}
      />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Document name (future) */}
      <span className="truncate text-xs text-slate-400">
        {hasDocument ? "PDF Document" : ""}
      </span>
    </div>
  );
}

/** Small vertical separator used between toolbar groups. */
function Divider() {
  return <div className="mx-1 h-5 w-px bg-slate-200" aria-hidden="true" />;
}
