import { Link } from "react-router-dom";
import { MOCK_PIGEONS } from "../../data/mockData";

export default function PigeonsList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pigeons</h1>
          <p className="mt-1 text-sm text-gray-500">
            Inventaire fictif ({MOCK_PIGEONS.length} fiches).
          </p>
        </div>
        <Link
          to="/pigeons/create"
          className="inline-flex justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Ajouter un pigeon
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">Bague</th>
                <th className="px-4 py-3 font-medium">Sexe</th>
                <th className="px-4 py-3 font-medium">Couleur</th>
                <th className="px-4 py-3 font-medium">Naissance</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Lignée</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_PIGEONS.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {p.bague}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.sexe}</td>
                  <td className="px-4 py-3 text-gray-600">{p.couleur}</td>
                  <td className="px-4 py-3 text-gray-600">{p.naissance}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800">
                      {p.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.lignee}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/pigeons/${p.id}`}
                      className="font-medium text-green-600 hover:text-green-700"
                    >
                      Fiche
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
