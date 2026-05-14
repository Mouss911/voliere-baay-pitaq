import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useVoliere } from "../../context/VoliereDataContext";

export const ShowCouple = () => {
  const { id } = useParams();
  const { getCoupleById, updateCouple } = useVoliere();
  const couple = getCoupleById(id);

  if (!couple) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Couple introuvable</h1>
        <Link to="/couples" className="text-green-600 hover:text-green-700">
          Retour à la liste
        </Link>
      </div>
    );
  }

  const estDissous = couple.statut === "Dissous";

  const handleDissoudre = async () => {
    try {
      await updateCouple(couple.id, { statut: "Dissous" });
      toast.success("Couple dissous");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/couples"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          ← Couples
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">{couple.nom}</h1>
        <p className="text-sm text-gray-500">
          Saison {couple.saison} · Fiche Firestore.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Composition
          </h2>
          <ul className="mt-4 space-y-3 text-gray-900">
            <li>
              <span className="text-gray-500">Mâle :</span>{" "}
              <span className="font-medium">{couple.maleBague}</span>
            </li>
            <li>
              <span className="text-gray-500">Femelle :</span>{" "}
              <span className="font-medium">{couple.femelleBague}</span>
            </li>
            <li>
              <span className="text-gray-500">Cage :</span> {couple.cage}
            </li>
            <li>
              <span className="text-gray-500">Statut :</span> {couple.statut}
            </li>
          </ul>

          {!estDissous ? (
            <button
              type="button"
              onClick={handleDissoudre}
              className="mt-6 w-full rounded-lg border border-amber-300 bg-amber-50 py-2.5 text-sm font-medium text-amber-900 hover:bg-amber-100"
            >
              Rompre ce couple
            </button>
          ) : (
            <p className="mt-4 text-sm text-gray-500">Ce couple est dissous.</p>
          )}
        </section>
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Rappels (exemple)
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-gray-600">
            <li>Vérifier grit et eau</li>
            <li>Noter comportement au nid</li>
            <li>Prochaine visite volière : samedi</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
