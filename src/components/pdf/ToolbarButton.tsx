import type { LucideIcon } from "lucide-react";

interface ToolbarButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
}

/**.
 * Compact icon button used throughout the toolbars.
 *..
 * Light, professional styling with clear hover/disabled states.
 */
export default function ToolbarButton({
  label,
  icon: Icon,
  onClick,
  disabled = false,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className="rounded-md p-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-600"
    >
      <Icon size={17} strokeWidth={2} />
    </button>
  );
}
