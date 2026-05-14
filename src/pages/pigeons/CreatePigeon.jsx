import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useVoliere } from "../../context/VoliereDataContext";

export const CreatePigeon = () => {
  const { addPigeon } = useVoliere();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [bague, setBague] = useState("");
  const [sexe, setSexe] = useState("M");
  const [naissance, setNaissance] = useState("");
  const [couleur, setCouleur] = useState("");
  const [lignee, setLignee] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bague.trim()) {
      toast.error("Indiquez un numéro de bague.");
      return;
    }
    setBusy(true);
    try {
      const id = await addPigeon({
        bague: bague.trim(),
        sexe,
        couleur: couleur.trim() || "—",
        naissance: naissance || "—",
        statut: "Actif",
        lignee: lignee.trim() || "—",
        notes: notes.trim(),
      });
      toast.success("Pigeon enregistré");
      navigate(`/pigeons/${id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur à l’enregistrement");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          to="/pigeons"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          ← Retour à la liste
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          Nouveau pigeon
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Enregistrement dans Cloud Firestore.
        </p>
      </div>

      <form
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-gray-700">Numéro de bague</span>
            <input
              required
              type="text"
              value={bague}
              onChange={(e) => setBague(e.target.value)}
              placeholder="ex. SN-2025-100"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Sexe</span>
            <select
              value={sexe}
              onChange={(e) => setSexe(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Date de naissance</span>
            <input
              type="date"
              value={naissance}
              onChange={(e) => setNaissance(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-gray-700">Couleur / robe</span>
            <input
              type="text"
              value={couleur}
              onChange={(e) => setCouleur(e.target.value)}
              placeholder="ex. Gris barré"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-gray-700">Lignée</span>
            <input
              type="text"
              value={lignee}
              onChange={(e) => setLignee(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-gray-700">Notes</span>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
          >
            {busy ? "Enregistrement…" : "Enregistrer"}
          </button>
          <Link
            to="/pigeons"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
};
