import { Link } from "react-router-dom";

const BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const VARIANT_CLASS = {
  primary: "bg-green-600 text-white hover:bg-green-700",
  secondary: "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50",
  danger: "border border-red-200 bg-red-50 text-red-800 hover:bg-red-100",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  amber: "bg-amber-600 text-white hover:bg-amber-700",
  nav: "shrink-0 bg-green-600 px-3 py-2 text-sm text-white sm:px-4 sm:text-base",
};

/**
 * @param {{
 *   variant?: keyof typeof VARIANT_CLASS;
 *   to?: string;
 *   type?: "button" | "submit" | "reset";
 *   className?: string;
 *   disabled?: boolean;
 *   children: import('react').ReactNode;
 * } & import('react').ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export function Button({
  variant = "primary",
  to,
  type = "button",
  className = "",
  disabled,
  children,
  ...rest
}) {
  const cls = `${BASE} ${VARIANT_CLASS[variant] ?? VARIANT_CLASS.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
