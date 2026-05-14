import { Link } from "react-router-dom";

import { useVoliere } from "../../context/VoliereDataContext";

const labelsType = {
  vente: "Vente",
  deces: "Décès",
  perte: "Perte",
};

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
  const { pigeons, couples, cages, cagesList, sorties } = useVoliere();

  const pigeonsActifs = pigeons.filter((p) =>
    ["Actif", "Jeune", "Repos"].includes(p.statut)
  ).length;

  const cagesLibres = cages.filter((c) => c.typeOccupation === "libre").length;

  const sortiesTri = [...sorties].sort((a, b) =>
    String(b.date).localeCompare(String(a.date))
  );
  const derniereSortie = sortiesTri[0];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Tableau de bord — Baay Pitàq
        </h1>
        <p className="mt-2 text-gray-600">
          Aperçu quotidien de la volière. Les chiffres proviennent de Cloud
          Firestore (votre compte).
        </p>
      </div>

      <div
        className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
        role="status"
      >
        Données synchronisées en temps réel avec Firebase. La première connexion
        importe un jeu de démonstration dans votre espace.
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pigeons actifs / jeunes" value={pigeonsActifs} />
        <StatCard
          label="Couples actifs"
          value={couples.filter((c) => c.statut !== "Dissous").length}
        />
        <StatCard
          label="Cages libres / total"
          value={`${cagesLibres} / ${cagesList.length}`}
        />
        <StatCard
          label="Dernière sortie cheptel"
          value={
            derniereSortie
              ? labelsType[derniereSortie.type] ?? derniereSortie.type
              : "—"
          }
          hint={derniereSortie?.bague}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Couples suivis</h2>
            <Link
              to="/couples"
              className="text-sm font-medium text-green-600 hover:text-green-700"
            >
              Voir tout
            </Link>
          </div>
          <ul className="divide-y divide-gray-100">
            {couples.slice(0, 3).map((c) => (
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
              Visualisation volière
            </h2>
            <Link
              to="/voliere"
              className="text-sm font-medium text-green-600 hover:text-green-700"
            >
              Ouvrir la grille
            </Link>
          </div>
          <p className="text-sm text-gray-600">
            Consultez la grille des cages et gérez les affectations ; les
            changements sont enregistrés dans Firestore.
          </p>
          <ul className="mt-4 divide-y divide-gray-100">
            {cagesList
              .filter((c) => c.typeOccupation !== "libre")
              .slice(0, 4)
              .map((c) => (
                <li key={c.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">{c.numero}</p>
                    <p className="text-sm text-gray-500">{c.occupation}</p>
                  </div>
                  <span className="text-xs text-gray-500">{c.superficieM2} m²</span>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
