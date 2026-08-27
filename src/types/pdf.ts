/**
 * Source types for PDF files.
 * - string: File path (from Tauri dialog)
 * - File: Browser File object
 * - ArrayBuffer: Raw binary data
 */
export type PDFFileSource = string | File | ArrayBuffer;

/** Zoom constraints for the viewer. */
export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 3.0;
export const ZOOM_STEP = 0.25;
export const DEFAULT_ZOOM = 1.0;
