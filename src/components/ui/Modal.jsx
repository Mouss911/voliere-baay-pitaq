import { useEffect } from "react";

/**
 * @param {{
 *   open: boolean;
 *   onClose: () => void;
 *   title: string;
 *   description?: string;
 *   children: import('react').ReactNode;
 *   footer?: import('react').ReactNode;
 * }} props
 */
export function Modal({ open, onClose, title, description, children, footer }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-4 sm:items-center"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ui-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="ui-modal-title" className="text-lg font-semibold text-gray-900">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        ) : null}
        <div className="mt-4">{children}</div>
        {footer ? <div className="mt-6">{footer}</div> : null}
      </div>
    </div>
  );
}
