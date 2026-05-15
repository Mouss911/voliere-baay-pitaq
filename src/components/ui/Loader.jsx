/**
 * @param {{ message?: string; fullScreen?: boolean; className?: string }} props
 */
export function Loader({ message = "Chargement…", fullScreen = true, className = "" }) {
  const wrap = fullScreen
    ? "flex min-h-screen items-center justify-center bg-gray-100 px-4"
    : "flex min-h-[40vh] items-center justify-center py-12";

  return (
    <div className={`${wrap} ${className}`} role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <span
          className="h-9 w-9 animate-spin rounded-full border-2 border-green-600 border-t-transparent"
          aria-hidden
        />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
}
