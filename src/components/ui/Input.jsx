import { forwardRef } from "react";

export const Input = forwardRef(function Input(
  { label, id, name, error, className = "", ...props },
  ref
) {
  const inputId = id ?? name;
  const ring = error
    ? "border-red-400 focus:border-red-500 focus:ring-red-500"
    : "border-gray-300 focus:border-green-500 focus:ring-green-500";

  return (
    <label className="block">
      {label ? (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      ) : null}
      <input
        ref={ref}
        id={inputId}
        name={name}
        className={`mt-1 w-full rounded-lg border px-3 py-2.5 text-gray-900 shadow-sm focus:outline-none focus:ring-1 ${ring} ${className}`}
        {...props}
      />
      {error ? (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
});
