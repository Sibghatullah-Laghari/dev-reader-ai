import { create } from "zustand";
import {
  DEFAULT_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
  ZOOM_STEP,
  type PDFFileSource,
} from "../types/pdf";

interface PDFState {
  currentFile: PDFFileSource | null;
  numPages: number;
  currentPage: number;
  zoom: number;
  loading: boolean;
  error: Error | null;

  setFile: (file: PDFFileSource | null) => void;
  setNumPages: (numPages: number) => void;
  setPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  clearError: () => void;
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const usePDFStore = create<PDFState>((set) => ({
  currentFile: null,
  numPages: 0,
  currentPage: 1,
  zoom: DEFAULT_ZOOM,
  loading: false,
  error: null,

  setFile: (file) =>
    set({
      currentFile: file,
      // Reset per-document state whenever the file changes.
      numPages: 0,
      currentPage: 1,
      error: null,
      loading: file !== null,
    }),

  setNumPages: (numPages) =>
    set((state) => ({
      numPages,
      loading: false,
      // Guard against stale page numbers when a smaller document loads.
      currentPage: clamp(state.currentPage, 1, Math.max(numPages, 1)),
    })),

  setPage: (page) =>
    set((state) => ({
      currentPage: clamp(page, 1, Math.max(state.numPages, 1)),
    })),

  nextPage: () =>
    set((state) => ({
      currentPage: clamp(state.currentPage + 1, 1, Math.max(state.numPages, 1)),
    })),

  previousPage: () =>
    set((state) => ({
      currentPage: clamp(state.currentPage - 1, 1, Math.max(state.numPages, 1)),
    })),

  zoomIn: () =>
    set((state) => ({
      zoom: clamp(
        Number((state.zoom + ZOOM_STEP).toFixed(2)),
        MIN_ZOOM,
        MAX_ZOOM
      ),
    })),

  zoomOut: () =>
    set((state) => ({
      zoom: clamp(
        Number((state.zoom - ZOOM_STEP).toFixed(2)),
        MIN_ZOOM,
        MAX_ZOOM
      ),
    })),

  resetZoom: () => set({ zoom: DEFAULT_ZOOM }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error, loading: false }),

  clearError: () => set({ error: null }),
}));
