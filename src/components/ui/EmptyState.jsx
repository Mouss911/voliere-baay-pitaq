/**
 * @param {{
 *   title: string;
 *   description?: string;
 *   children?: import('react').ReactNode;
 * }} props
 */
export function EmptyState({ title, description, children }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50/90 px-6 py-14 text-center">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {description ? (
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      ) : null}
      {children ? <div className="mt-6 flex justify-center">{children}</div> : null}
    </div>
  );
}
