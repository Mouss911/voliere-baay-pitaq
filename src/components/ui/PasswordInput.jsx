import { useId, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/**
 * @param {{
 *   label: string;
 *   name?: string;
 *   autoComplete?: string;
 *   value: string;
 *   onChange: import('react').ChangeEventHandler<HTMLInputElement>;
 *   disabled?: boolean;
 *   error?: string;
 * }} props
 */
export function PasswordInput({
  label,
  name,
  autoComplete,
  value,
  onChange,
  disabled,
  error,
}) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  const ring = error
    ? "border-red-400 focus:border-red-500 focus:ring-red-500"
    : "border-gray-300 focus:border-green-500 focus:ring-green-500";

  return (
    <div className="block">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full rounded-lg border px-3 py-2.5 pr-11 text-gray-900 shadow-sm focus:outline-none focus:ring-1 ${ring}`}
        />
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          aria-pressed={visible}
        >
          {visible ? (
            <FaEyeSlash className="h-4 w-4" aria-hidden />
          ) : (
            <FaEye className="h-4 w-4" aria-hidden />
          )}
        </button>
      </div>
      {error ? (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
