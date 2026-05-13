import { MOCK_SORTIES } from "../../data/mockData";

export const SortiesList = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sorties</h1>
        <p className="mt-1 text-sm text-gray-500">
          Historique fictif d’entraînements et concours (retours / lâchés).
        </p>
      </div>

      <ul className="space-y-4">
        {MOCK_SORTIES.map((s) => (
          <li
            key={s.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {s.type} · {s.distanceKm} km
                </p>
                <p className="text-sm text-gray-500">
                  {s.date} — {s.lieu}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                {s.meteo}
              </span>
            </div>
            <div className="mt-4 grid gap-3 border-t border-gray-100 pt-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase text-gray-500">
                  Lâchés
                </p>
                <p className="text-xl font-bold text-gray-900">{s.liberes}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-gray-500">
                  Retours
                </p>
                <p className="text-xl font-bold text-green-700">{s.retours}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-gray-500">
                  Taux (exemple)
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {s.liberes
                    ? Math.round((s.retours / s.liberes) * 100)
                    : 0}
                  %
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
