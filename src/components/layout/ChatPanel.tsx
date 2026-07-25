import { Bot, MessageSquare, SendHorizontal } from "lucide-react";

/**
 * Right-side AI panel.
 *
 * Fixed at 340px. Contains two placeholders: an "AI Assistant" header
 * and a "Chat" surface with a disabled input. AI wiring arrives in a
 * later milestone.
 */
export default function ChatPanel() {
  return (
    <aside className="flex h-full w-80 shrink-0 flex-col border-l border-slate-200 bg-white">
      {/* AI Assistant header */}
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
          <Bot size={15} strokeWidth={2} />
        </div>
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          AI Assistant
        </h2>
      </div>

      {/* Chat surface */}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-300">
            <MessageSquare size={22} strokeWidth={1.5} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-500">Chat</p>
            <p className="text-xs text-slate-400">
              Ask questions about your document.
              <br />
              AI features arrive soon.
            </p>
          </div>
        </div>

        {/* Disabled chat input (placeholder) */}
        <div className="border-t border-slate-200 p-3">
          <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
            <input
              type="text"
              placeholder="Message AI…"
              disabled
              title="AI chat will be available in a later milestone"
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none disabled:cursor-not-allowed"
            />
            <button
              type="button"
              disabled
              aria-label="Send message"
              title="AI chat will be available in a later milestone"
              className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-indigo-600"
            >
              <SendHorizontal size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
