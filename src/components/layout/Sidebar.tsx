import { FileText, Library } from "lucide-react";

/**
 * Left navigation rail.
 *
 * Fixed at 260px. Hosts the document library heading and a list of
 * recently opened documents (placeholder for a later milestone).
 */
export default function Sidebar() {
  return (
    <aside className="flex h-full w-65 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Library heading */}
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
        <Library size={15} strokeWidth={2} className="text-slate-400" />
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Library
        </h2>
      </div>

      {/* Recent section */}
      <div className="px-4 py-3">
        <h3 className="mb-2 text-xs font-medium text-slate-400">Recent</h3>
        <ul className="space-y-1">
          {/* Placeholder recent documents */}
          {[0, 1, 2].map((i) => (
            <li key={i}>
              <div
                className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-slate-400"
                aria-hidden="true"
              >
                <FileText size={15} strokeWidth={2} className="shrink-0 opacity-50" />
                <div className="flex-1">
                  <div className="h-2.5 w-3/4 rounded-full bg-slate-100" />
                  <div className="mt-1 h-2 w-1/2 rounded-full bg-slate-50" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer hint */}
      <div className="mt-auto border-t border-slate-200 px-4 py-3">
        <p className="text-center text-[11px] text-slate-400">
          Recent documents will appear here.
        </p>
      </div>
    </aside>
  );
}
