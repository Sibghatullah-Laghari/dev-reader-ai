/**
 * Application sidebar. Placeholder for the upcoming document library,
 * notes, and collections panels.
 */
export default function Sidebar() {
  return (
    <aside className="flex h-full w-full flex-col bg-zinc-900">
      <div className="border-b border-zinc-800 px-4 py-3">
        <h2 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
          Library
        </h2>
      </div>
      <div className="flex flex-1 items-center justify-center px-4">
        <p className="text-center text-xs text-zinc-600">
          Document library coming soon.
        </p>
      </div>
    </aside>
  );
}
