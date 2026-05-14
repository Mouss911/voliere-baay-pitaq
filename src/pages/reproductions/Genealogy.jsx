import { Link } from "react-router-dom";

import { useVoliere } from "../../context/VoliereDataContext";

export const Genealogy = () => {
  const { genealogy } = useVoliere();

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/reproductions"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          ← Reproductions
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Généalogie</h1>
        <p className="mt-1 text-sm text-gray-500">
          Parents, grands-parents et descendance — données stockées dans
          Firestore.
        </p>
      </div>

      <div className="space-y-6">
        {genealogy.map((g) => (
          <section
            key={g.sujet ?? g.id}
            className="overflow-x-auto rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Sujet : {g.sujet}
            </h2>
            <div className="mt-6 min-w-[280px] font-mono text-sm text-gray-800">
              <pre className="whitespace-pre leading-relaxed">
{`                    [${g.gpPaternel}]     [${g.gmPaternelle}]
                           \\           /
                            [${g.pere}]
                                 \\
                                  [${g.sujet}]
                                 /
                            [${g.mere}]
                           /           \\
                    [${g.gpMaternel}]     [${g.gmMaternelle}]`}
              </pre>
            </div>
            <div className="mt-4 rounded-lg border border-green-100 bg-green-50/80 p-4">
              <h3 className="text-sm font-semibold text-green-900">Descendance</h3>
              <p className="mt-2 text-sm text-green-900/90">{g.enfants}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
