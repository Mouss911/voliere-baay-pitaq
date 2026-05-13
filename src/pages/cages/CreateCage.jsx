import { Link } from "react-router-dom";

export const CreateCage = () => {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          to="/cages"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          ← Cages
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Nouvelle cage</h1>
        <p className="mt-1 text-sm text-gray-500">
          Définition d’un emplacement fictif — enregistrement désactivé.
        </p>
      </div>

      <form
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Code</span>
            <input
              type="text"
              placeholder="ex. C-04"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Zone</span>
            <input
              type="text"
              placeholder="Bloc C"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Étage</span>
            <input
              type="number"
              min={1}
              defaultValue={1}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Type</span>
            <select className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
              <option>Couple</option>
              <option>Jeunes</option>
              <option>Quarantaine</option>
              <option>Volier libre</option>
            </select>
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Capacité (indicatif)</span>
          <input
            type="number"
            min={1}
            defaultValue={2}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </label>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white opacity-60"
            disabled
          >
            Créer (API à brancher)
          </button>
          <Link
            to="/cages"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
};
