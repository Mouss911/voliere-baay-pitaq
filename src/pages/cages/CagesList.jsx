import { Link } from "react-router-dom";
import { MOCK_CAGES } from "../../data/mockData";

export const CagesList = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cages</h1>
          <p className="mt-1 text-sm text-gray-500">
            Plan fictif des emplacements ({MOCK_CAGES.length} cages).
          </p>
        </div>
        <Link
          to="/cages/create"
          className="inline-flex justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Nouvelle cage
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Zone</th>
                <th className="px-4 py-3 font-medium">Étage</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Occupant</th>
                <th className="px-4 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_CAGES.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.code}</td>
                  <td className="px-4 py-3 text-gray-600">{c.zone}</td>
                  <td className="px-4 py-3 text-gray-600">{c.etage}</td>
                  <td className="px-4 py-3 text-gray-600">{c.type}</td>
                  <td className="px-4 py-3 text-gray-600">{c.occupant}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        c.statut === "Occupée"
                          ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800"
                          : "rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                      }
                    >
                      {c.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
