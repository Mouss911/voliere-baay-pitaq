import { Link, useParams } from "react-router-dom";
import { getPigeonById } from "../../data/mockData";

export const EditPigeon = () => {
  const { id } = useParams();
  const pigeon = getPigeonById(id);

  if (!pigeon) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Pigeon introuvable</h1>
        <Link to="/pigeons" className="text-green-600 hover:text-green-700">
          Retour à la liste
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          to={`/pigeons/${pigeon.id}`}
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          ← Fiche {pigeon.bague}
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          Modifier {pigeon.bague}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Champs préremplis avec les données fictives — sauvegarde désactivée.
        </p>
      </div>

      <form
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Bague</span>
          <input
            type="text"
            defaultValue={pigeon.bague}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Sexe</span>
            <select
              defaultValue={pigeon.sexe}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option>M</option>
              <option>F</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Statut</span>
            <input
              type="text"
              defaultValue={pigeon.statut}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-gray-700">Couleur</span>
            <input
              type="text"
              defaultValue={pigeon.couleur}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-gray-700">Notes</span>
            <textarea
              rows={3}
              defaultValue={pigeon.notes}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white opacity-60"
            disabled
          >
            Mettre à jour (API à brancher)
          </button>
          <Link
            to={`/pigeons/${pigeon.id}`}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
};
