const VARIANT_CLASS = {
  success: "bg-green-100 text-green-800",
  info: "bg-sky-100 text-sky-800",
  neutral: "bg-gray-100 text-gray-800",
  muted: "bg-zinc-200 text-zinc-900",
  warning: "bg-orange-100 text-orange-900",
  danger: "bg-red-100 text-red-800",
  emerald: "bg-emerald-100 text-emerald-900",
  amber: "bg-amber-100 text-amber-900",
};

/**
 * @param {{ variant?: keyof typeof VARIANT_CLASS; children: import('react').ReactNode; className?: string }} props
 */
export function Badge({ variant = "neutral", children, className = "" }) {
  const pill =
    VARIANT_CLASS[variant] ?? VARIANT_CLASS.neutral;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${pill} ${className}`}
    >
      {children}
    </span>
  );
}
