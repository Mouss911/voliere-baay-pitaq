import { useId, useRef } from "react";

/**
 * @param {{
 *   label?: string;
 *   hint?: string;
 *   previewUrl?: string | null;
 *   onFileSelect: (file: File) => void;
 *   onClear: () => void;
 *   disabled?: boolean;
 * }} props
 */
export function ImageUpload({
  label = "Image du pigeon",
  hint = "JPEG, PNG, WebP ou GIF — max 5 Mo. Hébergement Cloudinary.",
  previewUrl,
  onFileSelect,
  onClear,
  disabled = false,
}) {
  const inputId = useId();
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    e.target.value = "";
  };

  return (
    <div className="block sm:col-span-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>

      {previewUrl ? (
        <div className="mt-2">
          <div className="relative inline-block">
            <img
              src={previewUrl}
              alt="Aperçu"
              className="h-36 w-36 rounded-lg border border-gray-200 object-cover"
            />
            <button
              type="button"
              onClick={() => {
                onClear();
                if (inputRef.current) inputRef.current.value = "";
              }}
              disabled={disabled}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white hover:bg-red-600 disabled:opacity-50"
              aria-label="Retirer l'image"
            >
              ✕
            </button>
          </div>
          <button
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className="mt-2 block text-sm font-medium text-green-600 hover:text-green-700 disabled:opacity-50"
          >
            Changer l'image
          </button>
        </div>
      ) : null}

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleChange}
        disabled={disabled}
        className={`mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm file:mr-3 file:rounded-md file:border-0 file:bg-green-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-green-800 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50 ${previewUrl ? "sr-only" : ""}`}
      />
      {hint ? <p className="mt-1 text-xs text-gray-500">{hint}</p> : null}
    </div>
  );
}
