import { open } from "@tauri-apps/plugin-dialog";
import type { DialogFilter } from "@tauri-apps/plugin-dialog";

/**
 * Opens the native Tauri file dialog filtered to PDF files only.
 *
 * Pure service function — returns the selected file path and never
 * touches React state. Returns `null` when the user cancels.
 */
export async function openPDF(): Promise<string | null> {
  // Define filter inline to avoid typing issues
  const pdfFilter: DialogFilter = {
    name: "PDF Document",
    extensions: ["pdf"],
  };

  const selected = await open({
    multiple: false,
    directory: false,
    filters: [pdfFilter],
  });

  // With multiple: false the dialog resolves to a single path or null.
  return typeof selected === "string" ? selected : null;
}
