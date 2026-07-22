interface LoadingViewProps {
  message?: string;
}

/**
 * Spinner + message shown while a PDF is loading or rendering.
 */
export default function LoadingView({
  message = "Loading PDF…",
}: LoadingViewProps) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 text-slate-500"
      role="status"
      aria-live="polite"
    >
      <svg
        className="h-7 w-7 animate-spin text-indigo-500"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <p className="text-sm">{message}</p>
    </div>
  );
}
