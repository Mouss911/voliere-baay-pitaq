import { Link } from "react-router-dom";
import { MOCK_COUPLES } from "../../data/mockData";

export const CouplesList = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Couples</h1>
          <p className="mt-1 text-sm text-gray-500">
            Créer un couple (mâle + femelle disponibles) — liste fictive. Consulter
            les couples actifs et rompre un couple depuis la fiche détail.
          </p>
        </div>
        <Link
          to="/couples/create"
          className="inline-flex justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Nouveau couple
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {MOCK_COUPLES.map((c) => (
          <article
            key={c.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-semibold text-gray-900">{c.nom}</h2>
              <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800">
                {c.statut}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              <span className="font-medium text-gray-800">{c.maleBague}</span>
              {" × "}
              <span className="font-medium text-gray-800">{c.femelleBague}</span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Saison {c.saison} · Cage {c.cage}
            </p>
            <Link
              to={`/couples/${c.id}`}
              className="mt-4 inline-block text-sm font-medium text-green-600 hover:text-green-700"
            >
              Détails →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};
