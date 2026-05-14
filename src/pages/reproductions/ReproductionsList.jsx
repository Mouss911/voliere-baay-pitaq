import { Link } from "react-router-dom";
import { MOCK_REPRODUCTIONS } from "../../data/mockData";

export const ReproductionsList = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reproductions</h1>
          <p className="mt-1 text-sm text-gray-500">
            Suivi des pontes et couvées (données fictives).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/genealogy"
            className="inline-flex justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Généalogie
          </Link>
          <Link
            to="/reproductions/create"
            className="inline-flex justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Enregistrer une ponte
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">Couple</th>
                <th className="px-4 py-3 font-medium">Date ponte</th>
                <th className="px-4 py-3 font-medium">Œufs</th>
                <th className="px-4 py-3 font-medium">Éclosion prévue</th>
                <th className="px-4 py-3 font-medium">Jeunes (nombre)</th>
                <th className="px-4 py-3 font-medium">Jeunes bagués</th>
                <th className="px-4 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_REPRODUCTIONS.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {r.coupleNom}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{r.datePonte}</td>
                  <td className="px-4 py-3 text-gray-600">{r.oeufs}</td>
                  <td className="px-4 py-3 text-gray-600">{r.eclosionPrev}</td>
                  <td className="px-4 py-3 text-gray-600">{r.jeunes}</td>
                  <td className="max-w-[220px] px-4 py-3 text-gray-600">
                    {r.jeunesBagues ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800">
                      {r.statut}
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
