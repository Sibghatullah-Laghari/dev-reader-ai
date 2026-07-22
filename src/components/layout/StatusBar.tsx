import { Circle } from "lucide-react";
import { usePDFStore } from "../../store/pdfStore";

/**
 * Bottom status bar.
 *
 * Shows the app status (Ready / Loading / Error), the current page
 * indicator, and the active zoom level — all derived from the store.
 */
export default function StatusBar() {
  const currentPage = usePDFStore((state) => state.currentPage);
  const numPages = usePDFStore((state) => state.numPages);
  const zoom = usePDFStore((state) => state.zoom);
  const loading = usePDFStore((state) => state.loading);
  const error = usePDFStore((state) => state.error);
  const hasDoc = numPages > 0;

  const status = error ? "Error" : loading ? "Loading…" : "Ready";
  const statusColor = error
    ? "text-red-500"
    : loading
      ? "text-amber-500"
      : "text-emerald-500";

  return (
    <footer className="flex h-7 shrink-0 items-center justify-between border-t border-slate-200 bg-white px-3 text-[11px] text-slate-500">
      {/* Status */}
      <div className="flex items-center gap-1.5">
        <Circle
          size={7}
          strokeWidth={0}
          fill="currentColor"
          className={statusColor}
        />
        <span>{status}</span>
      </div>

      {/* Page + zoom */}
      <div className="flex items-center gap-4 tabular-nums">
        <span>Page {hasDoc ? `${currentPage} / ${numPages}` : "— / —"}</span>
        <span>{Math.round(zoom * 100)}%</span>
      </div>
    </footer>
  );
}
