interface ErrorViewProps {
  error: Error;
}

export default function ErrorView({ error }: ErrorViewProps) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 px-8 text-center"
      role="alert"
    >
      <svg
        className="h-12 w-12 text-red-500/70"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
      <p className="text-sm font-medium text-red-400">
        Failed to load PDF document
      </p>
      <p className="max-w-md text-xs break-words text-zinc-500">
        {error.message}
      </p>
    </div>
  );
}
