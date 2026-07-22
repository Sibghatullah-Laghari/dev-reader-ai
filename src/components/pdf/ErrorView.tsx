import { AlertTriangle } from "lucide-react";

interface ErrorViewProps {
  error: Error;
}

/**
 * Shown when a PDF fails to load. Calm, red-accented, informative.
 */
export default function ErrorView({ error }: ErrorViewProps) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-center"
      role="alert"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
        <AlertTriangle size={26} strokeWidth={1.75} />
      </div>
      <div className="space-y-1.5">
        <p className="text-sm font-semibold text-slate-700">
          Failed to load PDF document
        </p>
        <p className="max-w-md text-xs wrap-break-word text-slate-500">
          {error.message}
        </p>
      </div>
    </div>
  );
}
