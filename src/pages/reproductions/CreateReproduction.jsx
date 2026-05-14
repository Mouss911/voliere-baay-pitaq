import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useVoliere } from "../../context/VoliereDataContext";

function addDaysToIsoDate(dateStr, days) {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export const CreateReproduction = () => {
  const { couples, addReproduction } = useVoliere();
  const navigate = useNavigate();
  const [coupleId, setCoupleId] = useState("");
  const [datePonte, setDatePonte] = useState("");
  const [oeufs, setOeufs] = useState(2);
  const [commentaire, setCommentaire] = useState("");
  const [busy, setBusy] = useState(false);

  const resolvedCoupleId =
    coupleId || (couples[0] ? String(couples[0].id) : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const couple = couples.find((c) => String(c.id) === String(resolvedCoupleId));
    if (!couple || !datePonte) {
      toast.error("Choisissez un couple et une date de ponte.");
      return;
    }
    const eclosionPrev = addDaysToIsoDate(datePonte, 16);
    setBusy(true);
    try {
      await addReproduction({
        coupleNom: couple.nom,
        datePonte,
        oeufs: Number(oeufs) || 0,
        eclosionPrev,
        statut: "Couvaison",
        jeunes: 0,
        jeunesBagues: "—",
        commentaire: commentaire.trim(),
      });
      toast.success("Ponte enregistrée");
      navigate("/reproductions");
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
          to="/reproductions"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          ← Reproductions
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Nouvelle ponte</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enregistrement lié aux couples Firestore.
        </p>
      </div>

      <form
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Couple</span>
          <select
            value={resolvedCoupleId}
            onChange={(e) => setCoupleId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            {couples.map((c) => (
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
              required
              type="date"
              value={datePonte}
              onChange={(e) => setDatePonte(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Nombre d’œufs</span>
            <input
              type="number"
              min={0}
              value={oeufs}
              onChange={(e) => setOeufs(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Commentaire</span>
          <textarea
            rows={3}
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            placeholder="ex. Œufs bien centrés, couple calme…"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </label>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
          >
            {busy ? "Enregistrement…" : "Enregistrer"}
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
