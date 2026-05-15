/**
 * @param {{ children: import('react').ReactNode; className?: string }} props
 */
export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * @param {{ children: import('react').ReactNode; className?: string }} props
 */
export function CardHeader({ children, className = "" }) {
  return (
    <div className={`border-b border-gray-100 px-5 py-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * @param {{ children: import('react').ReactNode; className?: string }} props
 */
export function CardBody({ children, className = "" }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}
