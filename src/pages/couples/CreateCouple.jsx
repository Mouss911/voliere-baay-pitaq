import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useVoliere } from "../../context/VoliereDataContext";

export const CreateCouple = () => {
  const { pigeons, addCouple } = useVoliere();
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [maleId, setMaleId] = useState("");
  const [femelleId, setFemelleId] = useState("");
  const [cage, setCage] = useState("");
  const [busy, setBusy] = useState(false);

  const males = useMemo(
    () => pigeons.filter((p) => p.sexe === "M"),
    [pigeons]
  );
  const femelles = useMemo(
    () => pigeons.filter((p) => p.sexe === "F"),
    [pigeons]
  );

  const resolvedMaleId = maleId || (males[0] ? String(males[0].id) : "");
  const resolvedFemelleId = femelleId || (femelles[0] ? String(femelles[0].id) : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const m = males.find((p) => String(p.id) === String(resolvedMaleId));
    const f = femelles.find((p) => String(p.id) === String(resolvedFemelleId));
    if (!m || !f) {
      toast.error("Choisissez un mâle et une femelle valides.");
      return;
    }
    setBusy(true);
    try {
      const id = await addCouple({
        nom: nom.trim() || `Couple ${m.bague} × ${f.bague}`,
        maleBague: m.bague,
        femelleBague: f.bague,
        saison: String(new Date().getFullYear()),
        statut: "Actif",
        cage: cage.trim() || "—",
      });
      toast.success("Couple créé");
      navigate(`/couples/${id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur à la création");
    } finally {
      setBusy(false);
    }
  };

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
          Sélection parmi les pigeons enregistrés dans Firestore.
        </p>
      </div>

      <form
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Nom du couple</span>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="ex. Paire terrasse"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Mâle</span>
          <select
            value={resolvedMaleId}
            onChange={(e) => setMaleId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            {males.map((p) => (
              <option key={p.id} value={p.id}>
                {p.bague} — {p.couleur}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Femelle</span>
          <select
            value={resolvedFemelleId}
            onChange={(e) => setFemelleId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          >
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
            value={cage}
            onChange={(e) => setCage(e.target.value)}
            placeholder="ex. Cage03"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </label>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
          >
            {busy ? "Création…" : "Créer le couple"}
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
