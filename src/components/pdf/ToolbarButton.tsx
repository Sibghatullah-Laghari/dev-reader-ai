import type { LucideIcon } from "lucide-react";

interface ToolbarButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
}

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
      className="rounded p-1.5 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-300"
    >
      <Icon size={16} />
    </button>
  );
}
