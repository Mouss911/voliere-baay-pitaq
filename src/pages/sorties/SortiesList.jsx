import { MOCK_SORTIES_CHEPTEL } from "../../data/mockData";

const labels = {
  vente: "Vente",
  deces: "Décès",
  perte: "Perte",
};

const badgeClass = {
  vente: "bg-blue-100 text-blue-800",
  deces: "bg-gray-200 text-gray-800",
  perte: "bg-orange-100 text-orange-900",
};

export const SortiesList = () => {
  const ventes = MOCK_SORTIES_CHEPTEL.filter((s) => s.type === "vente");
  const deces = MOCK_SORTIES_CHEPTEL.filter((s) => s.type === "deces");
  const pertes = MOCK_SORTIES_CHEPTEL.filter((s) => s.type === "perte");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sorties du cheptel</h1>
        <p className="mt-2 max-w-3xl text-sm text-gray-600">
          Conformément au cahier de validation : une <strong>sortie</strong> retire
          le pigeon de l’effectif actif (vente, décès ou perte). L’historique reste
          consultable ; le pigeon ne doit plus apparaître dans les cages occupées
          une fois la sortie enregistrée (ici : exemples statiques + liste
          pigeons avec statuts vendu / mort).
        </p>
      </div>

      <SectionTable title="Ventes" rows={ventes} empty="Aucune vente fictive." />
      <SectionTable title="Décès" rows={deces} empty="Aucun décès enregistré." />
      <SectionTable title="Pertes" rows={pertes} empty="Aucune perte enregistrée." />
    </div>
  );
};

function SectionTable({ title, rows, empty }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-4 py-3 sm:px-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      {rows.length === 0 ? (
        <p className="px-4 py-6 text-sm text-gray-500 sm:px-6">{empty}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium sm:px-6">Date</th>
                <th className="px-4 py-3 font-medium sm:px-6">Bague</th>
                <th className="px-4 py-3 font-medium sm:px-6">Type</th>
                <th className="px-4 py-3 font-medium sm:px-6">Détail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900 sm:px-6">{s.date}</td>
                  <td className="px-4 py-3 font-medium text-gray-900 sm:px-6">
                    {s.bague}
                  </td>
                  <td className="px-4 py-3 sm:px-6">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${badgeClass[s.type]}`}
                    >
                      {labels[s.type]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 sm:px-6">{s.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
