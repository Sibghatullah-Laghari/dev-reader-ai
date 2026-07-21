import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePDFStore } from "../../store/pdfStore";
import ToolbarButton from "./ToolbarButton";

export default function PageNavigation() {
  const currentPage = usePDFStore((state) => state.currentPage);
  const numPages = usePDFStore((state) => state.numPages);
  const nextPage = usePDFStore((state) => state.nextPage);
  const previousPage = usePDFStore((state) => state.previousPage);

  const hasDocument = numPages > 0;

  return (
    <div className="flex items-center gap-1">
      <ToolbarButton
        label="Previous page"
        icon={ChevronLeft}
        onClick={previousPage}
        disabled={!hasDocument || currentPage <= 1}
      />
      <span className="min-w-20 text-center text-xs text-zinc-400 tabular-nums">
        {hasDocument ? `${currentPage} / ${numPages}` : "— / —"}
      </span>
      <ToolbarButton
        label="Next page"
        icon={ChevronRight}
        onClick={nextPage}
        disabled={!hasDocument || currentPage >= numPages}
      />
    </div>
  );
}
