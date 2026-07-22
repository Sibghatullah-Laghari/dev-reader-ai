import { useCallback } from "react";
import { openPDF } from "../services/fileService";
import { usePDFStore } from "../store/pdfStore";

/**
 * Shared "Open PDF" action.
 *
 * Delegates all file-system work to {@link openPDF} and updates the
 * PDF store with the selected path. Handles both cancellation and
 * errors so callers only need to wire up the click handler.
 */
export function useOpenPDF(): () => Promise<void> {
  const setFile = usePDFStore((state) => state.setFile);
  const setError = usePDFStore((state) => state.setError);

  return useCallback(async () => {
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
          : new Error("Failed to open the file dialog."),
      );
    }
  }, [setFile, setError]);
}
