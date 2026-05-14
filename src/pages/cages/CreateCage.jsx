import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useVoliere } from "../../context/VoliereDataContext";

export const CreateCage = () => {
  const { addCage } = useVoliere();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [zone, setZone] = useState("");
  const [etage, setEtage] = useState(1);
  const [type, setType] = useState("Couple");
  const [capacite, setCapacite] = useState(2);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Indiquez un code de cage.");
      return;
    }
    setBusy(true);
    try {
      await addCage({
        numero: code.trim(),
        nom: zone.trim() || `Étage ${etage}`,
        superficieM2: Number((1 + (capacite % 4) * 0.15).toFixed(2)),
        typeOccupation: "libre",
        pigeonSoloBague: null,
        coupleMale: null,
        coupleFemelle: null,
        historiqueApercu: `Cage créée — ${type}, capacité indicative ${capacite}.`,
        reproductionApercu: "—",
        metaEtage: etage,
        metaType: type,
      });
      toast.success("Cage créée");
      navigate("/cages");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setBusy(false);
    }
  };

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
          L’emplacement est enregistré dans Firestore et apparaît dans la vue
          volière.
        </p>
      </div>

      <form
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Code</span>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="ex. C-04"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Zone</span>
            <input
              type="text"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              placeholder="Bloc C"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Étage</span>
            <input
              type="number"
              min={1}
              value={etage}
              onChange={(e) => setEtage(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Type</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            >
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
            value={capacite}
            onChange={(e) => setCapacite(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </label>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
          >
            {busy ? "Création…" : "Créer"}
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
