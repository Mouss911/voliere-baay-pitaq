import { Link } from "react-router-dom";

import { useVoliere } from "../../context/VoliereDataContext";

export const CagesList = () => {
  const { cagesList } = useVoliere();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cages</h1>
          <p className="mt-1 text-sm text-gray-500">
            {cagesList.length} compartiments — données Firestore, synchronisées
            avec la visualisation virtuelle.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/voliere"
            className="inline-flex justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Vue volière
          </Link>
          <Link
            to="/cages/create"
            className="inline-flex justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Nouvelle cage
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">Numéro</th>
                <th className="px-4 py-3 font-medium">Nom</th>
                <th className="px-4 py-3 font-medium">Superficie (m²)</th>
                <th className="px-4 py-3 font-medium">Occupation</th>
                <th className="px-4 py-3 font-medium">État</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cagesList.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.numero}</td>
                  <td className="px-4 py-3 text-gray-600">{c.nom}</td>
                  <td className="px-4 py-3 text-gray-600">{c.superficieM2}</td>
                  <td className="px-4 py-3 text-gray-600">{c.occupation}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        c.typeOccupation === "libre"
                          ? "rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-900"
                          : c.typeOccupation === "pigeon_seul"
                            ? "rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-900"
                            : "rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-900"
                      }
                    >
                      {c.typeOccupation === "libre"
                        ? "Libre"
                        : c.typeOccupation === "pigeon_seul"
                          ? "1 pigeon"
                          : "Couple"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
