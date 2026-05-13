import { Link } from "react-router-dom";
import { MOCK_COUPLES } from "../../data/mockData";

export const CreateReproduction = () => {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          to="/reproductions"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          ← Reproductions
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Nouvelle ponte</h1>
        <p className="mt-1 text-sm text-gray-500">
          Formulaire de démonstration lié aux couples fictifs.
        </p>
      </div>

      <form
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Couple</span>
          <select className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
            {MOCK_COUPLES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nom}
              </option>
            ))}
          </select>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Date de ponte</span>
            <input
              type="date"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Nombre d’œufs</span>
            <input
              type="number"
              min={0}
              defaultValue={2}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Commentaire</span>
          <textarea
            rows={3}
            placeholder="ex. Œufs bien centrés, couple calme…"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </label>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white opacity-60"
            disabled
          >
            Enregistrer (API à brancher)
          </button>
          <Link
            to="/reproductions"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
};
