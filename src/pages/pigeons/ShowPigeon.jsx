import { Link, useParams } from "react-router-dom";

import { useVoliere } from "../../context/VoliereDataContext";

export const ShowPigeon = () => {
  const { id } = useParams();
  const { getPigeonById } = useVoliere();
  const pigeon = getPigeonById(id);

  if (!pigeon) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Pigeon introuvable</h1>
        <p className="text-gray-600">Aucune fiche pour l’identifiant « {id} ».</p>
        <Link to="/pigeons" className="text-green-600 hover:text-green-700">
          Retour à la liste
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            to="/pigeons"
            className="text-sm font-medium text-green-600 hover:text-green-700"
          >
            ← Liste des pigeons
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">{pigeon.bague}</h1>
          <p className="text-sm text-gray-500">Fiche Firestore #{pigeon.id}</p>
          {["Vendu", "Mort", "Perdu"].includes(pigeon.statut) ? (
            <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              Sortie du cheptel : ce pigeon ne doit plus occuper de cage ; la fiche
              reste consultable pour la traçabilité.
            </p>
          ) : null}
        </div>
        <Link
          to={`/pigeons/${pigeon.id}/edit`}
          className="inline-flex rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Modifier
        </Link>
      </div>

      <dl className="grid gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Sexe
          </dt>
          <dd className="mt-1 text-gray-900">{pigeon.sexe}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Statut
          </dt>
          <dd className="mt-1 text-gray-900">{pigeon.statut}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Couleur
          </dt>
          <dd className="mt-1 text-gray-900">{pigeon.couleur}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Naissance
          </dt>
          <dd className="mt-1 text-gray-900">{pigeon.naissance}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Lignée
          </dt>
          <dd className="mt-1 text-gray-900">{pigeon.lignee}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Notes
          </dt>
          <dd className="mt-1 text-gray-900">{pigeon.notes || "—"}</dd>
        </div>
      </dl>
    </div>
  );
};
