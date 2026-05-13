import { Link } from "react-router-dom";
import { MOCK_CAGES } from "../../data/mockData";

export const VoliereView = () => {
  const zones = [...new Set(MOCK_CAGES.map((c) => c.zone))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volière</h1>
          <p className="mt-1 text-sm text-gray-500">
            Vue schématique des cages fictives par zone (aperçu visuel).
          </p>
        </div>
        <Link
          to="/cages"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          Tableau des cages →
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-gray-600">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-6 rounded border border-green-700 bg-green-600" />
          Occupée
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-6 rounded border border-gray-300 bg-gray-100" />
          Libre
        </span>
      </div>

      {zones.map((zone) => (
        <section key={zone} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">{zone}</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {MOCK_CAGES.filter((c) => c.zone === zone).map((c) => (
              <div
                key={c.id}
                title={`${c.code} — ${c.occupant}`}
                className={`flex min-w-[100px] flex-col rounded-lg border p-3 text-center shadow-sm ${
                  c.statut === "Occupée"
                    ? "border-green-700 bg-green-600 text-white"
                    : "border-gray-200 bg-gray-50 text-gray-800"
                }`}
              >
                <span className="text-xs font-medium opacity-90">{c.code}</span>
                <span className="mt-1 text-[11px] leading-tight opacity-90 line-clamp-2">
                  {c.occupant}
                </span>
                <span className="mt-2 text-[10px] uppercase tracking-wide opacity-75">
                  {c.type}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
