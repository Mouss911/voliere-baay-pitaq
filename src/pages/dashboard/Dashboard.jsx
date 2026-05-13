import { Link } from "react-router-dom";
import {
  MOCK_PIGEONS,
  MOCK_COUPLES,
  MOCK_CAGES,
  MOCK_SORTIES,
} from "../../data/mockData";

function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
      {hint ? (
        <p className="mt-2 text-xs text-gray-400">{hint}</p>
      ) : null}
    </div>
  );
}

export default function Dashboard() {
  const pigeonsActifs = MOCK_PIGEONS.filter((p) =>
    ["Actif", "Jeune"].includes(p.statut)
  ).length;
  const cagesOccupees = MOCK_CAGES.filter((c) => c.statut === "Occupée").length;
  const derniereSortie = MOCK_SORTIES[0];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Tableau de bord
        </h1>
        <p className="mt-2 text-gray-600">
          Vue d’ensemble de la volière — chiffres et listes ci-dessous sont des{" "}
          <strong>exemples</strong> en attendant le backend.
        </p>
      </div>

      <div
        className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
        role="status"
      >
        Données fictives : elles servent uniquement à prévisualiser l’interface.
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pigeons (actifs / jeunes)" value={pigeonsActifs} />
        <StatCard label="Couples cette saison" value={MOCK_COUPLES.length} />
        <StatCard
          label="Cages occupées"
          value={`${cagesOccupees} / ${MOCK_CAGES.length}`}
        />
        <StatCard
          label="Dernière sortie"
          value={derniereSortie ? `${derniereSortie.distanceKm} km` : "—"}
          hint={derniereSortie?.date}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Couples suivis
            </h2>
            <Link
              to="/couples"
              className="text-sm font-medium text-green-600 hover:text-green-700"
            >
              Voir tout
            </Link>
          </div>
          <ul className="divide-y divide-gray-100">
            {MOCK_COUPLES.slice(0, 3).map((c) => (
              <li key={c.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-900">{c.nom}</p>
                  <p className="text-sm text-gray-500">
                    {c.maleBague} × {c.femelleBague}
                  </p>
                </div>
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                  {c.statut}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Prochaines cages à vérifier
            </h2>
            <Link
              to="/cages"
              className="text-sm font-medium text-green-600 hover:text-green-700"
            >
              Cages
            </Link>
          </div>
          <ul className="divide-y divide-gray-100">
            {MOCK_CAGES.filter((c) => c.statut === "Occupée").map((c) => (
              <li key={c.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-900">{c.code}</p>
                  <p className="text-sm text-gray-500">{c.occupant}</p>
                </div>
                <span className="text-sm text-gray-500">{c.zone}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
