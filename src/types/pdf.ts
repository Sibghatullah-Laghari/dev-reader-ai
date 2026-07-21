import type { PDFDocumentProxy } from "pdfjs-dist";

/** File source accepted by the PDF viewer. */
export type PDFFileSource = string | File | ArrayBuffer;

/** Callback fired when a PDF document finishes loading. */
export type PDFLoadSuccessHandler = (document: PDFDocumentProxy) => void;

/** Callback fired when a PDF document fails to load. */
export type PDFLoadErrorHandler = (error: Error) => void;

/** Zoom constraints for the viewer. */
export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 3.0;
export const ZOOM_STEP = 0.25;
export const DEFAULT_ZOOM = 1.0;
