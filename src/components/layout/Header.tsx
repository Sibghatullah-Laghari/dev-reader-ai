import { BookOpenText, FolderOpen, Search } from "lucide-react";
import { useOpenPDF } from "../../hooks/useOpenPDF";

/**
 * Application top bar.
 *
 * Brand identity on the left, the primary "Open PDF" action, and a
 * placeholder search field that will power document & content search
 * in a later milestone.
 */
export default function Header() {
  const openPDF = useOpenPDF();

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-4">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
          <BookOpenText size={18} strokeWidth={2} />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            DevReader
            <span className="ml-0.5 text-indigo-600">AI</span>
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            Smart PDF Reader
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-slate-200" aria-hidden="true" />

      {/* Primary action */}
      <button
        type="button"
        onClick={openPDF}
        className="flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <FolderOpen size={16} strokeWidth={2} />
        Open PDF
      </button>

      {/* Spacer pushes the search box to the right */}
      <div className="flex-1" />

      {/* Placeholder search box */}
      <div className="relative w-72">
        <Search
          size={15}
          strokeWidth={2}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          placeholder="Search documents…"
          disabled
          aria-label="Search documents"
          title="Search will be available in a later milestone"
          className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 transition-colors hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </header>
  );
}
