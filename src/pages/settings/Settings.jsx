import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { useVoliere } from "../../context/VoliereDataContext";

const defaults = {
  nom: "",
  email: "",
  voliere: "",
};

function buildForm(settings, userEmail, userName) {
  if (!settings) return { ...defaults, email: userEmail ?? "", nom: userName ?? "" };
  return {
    nom: settings.nom ?? userName ?? "",
    email: settings.email ?? userEmail ?? "",
    voliere: settings.voliere ?? "",
  };
}

/** @param {{ settings: object | null; userEmail: string; userName?: string; saveSettings: (p: object) => Promise<void> }} props */
function SettingsFormInner({ settings, userEmail, userName, saveSettings }) {
  const [form, setForm] = useState(() => buildForm(settings, userEmail, userName));
  const [saving, setSaving] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSettings({
        nom: form.nom.trim(),
        email: form.email.trim() || userEmail || "",
        voliere: form.voliere.trim(),
      });
      toast.success("Paramètres enregistrés");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur à l’enregistrement");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Compte
        </h2>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Nom affiché</span>
            <input
              value={form.nom}
              onChange={handleChange("nom")}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">E-mail (profil)</span>
            <input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <span className="mt-1 block text-xs text-gray-500">
              Compte connecté : {userEmail || "—"}
            </span>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Volière</span>
            <input
              value={form.voliere}
              onChange={handleChange("voliere")}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </label>
        </div>
      </section>

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
      >
        {saving ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}

export const Settings = () => {
  const { user } = useAuth();
  const { settings, saveSettings } = useVoliere();
  const formKey = settings ? JSON.stringify(settings) : "empty";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="mt-1 text-sm text-gray-500">
          Profil et préférences — sauvegarde dans Firestore (
          <code className="rounded bg-gray-100 px-1">users/…/settings/profile</code>
          ).
        </p>
      </div>

      {!user ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Connectez-vous pour afficher et modifier vos paramètres.</p>
        </div>
      ) : (
        <SettingsFormInner
          key={formKey}
          settings={settings}
          userEmail={user?.email ?? ""}
          userName={user?.nom ?? ""}
          saveSettings={saveSettings}
        />
      )}
    </div>
  );
};
