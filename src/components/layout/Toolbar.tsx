import { BookOpenText, FolderOpen } from "lucide-react";
import { openPDF } from "../../services/fileService";
import { usePDFStore } from "../../store/pdfStore";
import ToolbarButton from "../pdf/ToolbarButton";

/**
 * Application toolbar. Communicates exclusively with pdfStore and
 * delegates all file-system work to fileService.
 */
export default function Toolbar() {
  const setFile = usePDFStore((state) => state.setFile);
  const setError = usePDFStore((state) => state.setError);

  async function handleOpenPDF(): Promise<void> {
    try {
      const path = await openPDF();

      // null means the user cancelled the dialog — not an error.
      if (path !== null) {
        setFile(path);
      }
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause
          : new Error("Failed to open the file dialog.")
      );
    }
  }

  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-zinc-800 bg-zinc-900 px-4">
      <div className="flex items-center gap-2">
        <BookOpenText size={18} className="text-indigo-400" />
        <span className="text-sm font-semibold tracking-wide text-zinc-100">
          DevReader AI
        </span>
      </div>

      <div className="h-4 w-px bg-zinc-700" aria-hidden="true" />

      <ToolbarButton label="Open PDF" icon={FolderOpen} onClick={handleOpenPDF} />
    </header>
  );
}
