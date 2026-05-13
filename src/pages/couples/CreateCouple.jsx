import { Link } from "react-router-dom";
import { MOCK_PIGEONS } from "../../data/mockData";

export const CreateCouple = () => {
  const males = MOCK_PIGEONS.filter((p) => p.sexe === "M");
  const femelles = MOCK_PIGEONS.filter((p) => p.sexe === "F");

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          to="/couples"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          ← Retour aux couples
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Former un couple</h1>
        <p className="mt-1 text-sm text-gray-500">
          Sélection fictive depuis la base locale de démonstration.
        </p>
      </div>

      <form
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Nom du couple</span>
          <input
            type="text"
            placeholder="ex. Paire terrasse"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Mâle</span>
          <select className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
            {males.map((p) => (
              <option key={p.id} value={p.id}>
                {p.bague} — {p.couleur}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Femelle</span>
          <select className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
            {femelles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.bague} — {p.couleur}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Cage</span>
          <input
            type="text"
            placeholder="ex. A-14"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </label>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white opacity-60"
            disabled
          >
            Créer le couple (API à brancher)
          </button>
          <Link
            to="/couples"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
};
