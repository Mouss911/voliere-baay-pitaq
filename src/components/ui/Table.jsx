/**
 * @param {{ children: import('react').ReactNode; className?: string }} props
 */
export function Table({ children, className = "" }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full text-left text-sm">{children}</table>
    </div>
  );
}

/** @param {{ children: import('react').ReactNode; className?: string }} props */
export function TableHead({ children, className = "" }) {
  return (
    <thead
      className={`border-b border-gray-200 bg-gray-50 text-gray-600 ${className}`}
    >
      {children}
    </thead>
  );
}

/** @param {{ children: import('react').ReactNode; className?: string }} props */
export function TableBody({ children, className = "" }) {
  return (
    <tbody className={`divide-y divide-gray-100 ${className}`}>{children}</tbody>
  );
}

/** @param {{ children: import('react').ReactNode; className?: string }} props */
export function TableRow({ children, className = "" }) {
  return <tr className={`hover:bg-gray-50 ${className}`}>{children}</tr>;
}

/** @param {{ children: import('react').ReactNode; className?: string }} props */
export function TableHeaderCell({ children, className = "" }) {
  return (
    <th className={`px-4 py-3 font-medium ${className}`}>{children}</th>
  );
}

/** @param {{ children: import('react').ReactNode; className?: string }} props */
export function TableCell({ children, className = "" }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}
