import { FileText } from "lucide-react";

interface EmptyViewProps {
  message?: string;
}

/**
 * Shown when no PDF has been opened yet. Centered, calm, inviting.
 */
export default function EmptyView({
  message = "Open a PDF to begin reading.",
}: EmptyViewProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <FileText size={34} strokeWidth={1.5} className="text-slate-300" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-600">{message}</p>
        <p className="text-xs text-slate-400">
          Use “Open PDF” in the toolbar or the top bar.
        </p>
      </div>
    </div>
  );
}
