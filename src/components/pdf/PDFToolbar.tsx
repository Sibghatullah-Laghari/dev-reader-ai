import { Maximize, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { usePDFStore } from "../../store/pdfStore";
import { MAX_ZOOM, MIN_ZOOM } from "../../types/pdf";
import PageNavigation from "./PageNavigation";
import ToolbarButton from "./ToolbarButton";

export default function PDFToolbar() {
  const zoom = usePDFStore((state) => state.zoom);
  const numPages = usePDFStore((state) => state.numPages);
  const zoomIn = usePDFStore((state) => state.zoomIn);
  const zoomOut = usePDFStore((state) => state.zoomOut);
  const resetZoom = usePDFStore((state) => state.resetZoom);

  const hasDocument = numPages > 0;

  return (
    <div className="flex h-11 shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3">
      <PageNavigation />

      <div className="flex items-center gap-1">
        <ToolbarButton
          label="Zoom out"
          icon={ZoomOut}
          onClick={zoomOut}
          disabled={!hasDocument || zoom <= MIN_ZOOM}
        />
        <span className="min-w-12 text-center text-xs text-zinc-400 tabular-nums">
          {Math.round(zoom * 100)}%
        </span>
        <ToolbarButton
          label="Zoom in"
          icon={ZoomIn}
          onClick={zoomIn}
          disabled={!hasDocument || zoom >= MAX_ZOOM}
        />

        <div className="mx-1 h-4 w-px bg-zinc-700" aria-hidden="true" />

        <ToolbarButton
          label="Reset zoom"
          icon={RotateCcw}
          onClick={resetZoom}
          disabled={!hasDocument}
        />
        <ToolbarButton
          label="Fit width (coming soon)"
          icon={Maximize}
          onClick={() => {
            // Placeholder — fit-width mode will be implemented in a
            // later milestone. Intentionally a no-op for now.
          }}
          disabled={!hasDocument}
        />
      </div>
    </div>
  );
}
